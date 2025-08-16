import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Shield, User, Edit, Trash2 } from "lucide-react";
import AdminModal from "@/components/modals/admin-modal";
import type { Admin } from "@shared/schema";

export default function Admins() {
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: admins, isLoading, error } = useQuery<Admin[]>({
    queryKey: ["/api/admins"],
  });

  const deleteAdminMutation = useMutation({
    mutationFn: async (adminId: number) => {
      await apiRequest("DELETE", `/api/admins/${adminId}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Admin deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admins"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error", 
        description: error.message || "Failed to delete admin",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setShowModal(true);
  };

  const handleDelete = (adminId: number) => {
    if (confirm("Are you sure you want to delete this admin? This action cannot be undone.")) {
      deleteAdminMutation.mutate(adminId);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric", 
      year: "numeric",
    });
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load admin users. Please try again.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-2" data-testid="text-page-title">
            Admin Management
          </h1>
          <p className="text-gray-600">Manage system administrators and their roles</p>
        </div>
        <Button
          onClick={() => {
            setEditingAdmin(null);
            setShowModal(true);
          }}
          className="mt-4 sm:mt-0 bg-purple-600 text-white hover:bg-purple-700"
          data-testid="button-add-admin"
        >
          <Plus className="mr-2" size={16} />
          Add Admin
        </Button>
      </div>

      {/* Admin Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-48 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {admins?.map((admin) => (
            <Card key={admin.id} className="border border-gray-200" data-testid={`card-admin-${admin.id}`}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    admin.role === "admin" ? "bg-purple-100" : "bg-blue-100"
                  }`}>
                    {admin.role === "admin" ? (
                      <Shield className={`text-purple-600 text-xl`} size={24} />
                    ) : (
                      <User className="text-blue-600 text-xl" size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800" data-testid={`text-admin-name-${admin.id}`}>
                      {admin.full_name}
                    </h3>
                    <p className="text-sm text-gray-600">@{admin.username}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Role:</span>
                    <Badge variant="secondary" className={
                      admin.role === "admin" 
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }>
                      {admin.role === "admin" ? "Administrator" : "Staff"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Created:</span>
                    <span className="text-sm text-gray-800">
                      {formatDate(admin.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Login:</span>
                    <span className="text-sm text-gray-800">
                      {admin.id === 1 ? "Today" : "Yesterday"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(admin)}
                    className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                    data-testid={`button-edit-${admin.id}`}
                  >
                    <Edit className="mr-1" size={16} />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(admin.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50"
                    data-testid={`button-delete-${admin.id}`}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Admin Card */}
          <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center min-h-[280px]">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <Plus className="text-gray-500 text-xl" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">Add New Admin</h3>
              <p className="text-sm text-gray-500 mb-4">Create a new administrator account</p>
              <Button
                onClick={() => {
                  setEditingAdmin(null);
                  setShowModal(true);
                }}
                className="bg-primary text-white hover:bg-blue-700"
                data-testid="button-add-admin-card"
              >
                Add Admin
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Admin Modal */}
      {showModal && (
        <AdminModal
          admin={editingAdmin}
          onClose={() => {
            setShowModal(false);
            setEditingAdmin(null);
          }}
          onSuccess={() => {
            setShowModal(false);
            setEditingAdmin(null);
            queryClient.invalidateQueries({ queryKey: ["/api/admins"] });
            queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
          }}
        />
      )}
    </div>
  );
}
