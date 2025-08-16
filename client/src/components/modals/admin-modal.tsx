import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertAdminSchema, type InsertAdmin, type Admin } from "@shared/schema";
import { Loader2 } from "lucide-react";

interface AdminModalProps {
  admin: Admin | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminModal({ admin, onClose, onSuccess }: AdminModalProps) {
  const { toast } = useToast();
  const isEditing = !!admin;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InsertAdmin>({
    resolver: zodResolver(insertAdminSchema),
    defaultValues: admin ? {
      username: admin.username,
      password: "", // Don't prefill password for security
      full_name: admin.full_name,
      role: admin.role,
    } : {
      role: "staff",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertAdmin) => {
      const url = isEditing ? `/api/admins/${admin.id}` : "/api/admins";
      const method = isEditing ? "PUT" : "POST";
      
      // Don't send empty password on edit
      const payload = { ...data };
      if (isEditing && !payload.password) {
        delete payload.password;
      }
      
      const response = await apiRequest(method, url, payload);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Admin ${isEditing ? "updated" : "created"} successfully`,
      });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isEditing ? "update" : "create"} admin`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertAdmin) => {
    createMutation.mutate(data);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">
            {isEditing ? "Edit Admin User" : "Add New Admin User"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              {...register("username")}
              disabled={isEditing} // Don't allow username changes
              data-testid="input-username"
            />
            {errors.username && (
              <p className="text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">
              Password {isEditing ? "(leave blank to keep current)" : "*"}
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              data-testid="input-password"
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              {...register("full_name")}
              data-testid="input-full-name"
            />
            {errors.full_name && (
              <p className="text-sm text-red-600">{errors.full_name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="role">Role *</Label>
            <Select
              value={watch("role") || ""}
              onValueChange={(value) => setValue("role", value)}
            >
              <SelectTrigger data-testid="select-role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              data-testid="button-save"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                isEditing ? "Update Admin" : "Create Admin"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
