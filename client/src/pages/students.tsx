import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Search, Filter, Eye, Edit, Trash2, Download, User, Users } from "lucide-react";
import StudentModal from "@/components/modals/student-modal";
import type { Student } from "@shared/schema";

interface StudentsResponse {
  students: Student[];
  total: number;
}

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const { data, isLoading, error } = useQuery<StudentsResponse>({
    queryKey: ["/api/students", { search: searchTerm, limit, offset }],
    queryFn: async () => {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      });
      
      if (searchTerm) {
        params.append("search", searchTerm);
      }

      const response = await fetch(`/api/students?${params}`);
      if (!response.ok) throw new Error("Failed to fetch students");
      return response.json();
    },
  });

  const deleteStudentMutation = useMutation({
    mutationFn: async (studentId: number) => {
      await apiRequest("DELETE", `/api/students/${studentId}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Student deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete student",
        variant: "destructive",
      });
    },
  });

  const handleSearch = () => {
    setCurrentPage(1);
    queryClient.invalidateQueries({ queryKey: ["/api/students"] });
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleDelete = (studentId: number) => {
    if (confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
      deleteStudentMutation.mutate(studentId);
    }
  };

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const formatContactInfo = (student: Student) => {
    const contact = student.contact_number || "N/A";
    const email = `${student.first_name?.toLowerCase() || "user"}@email.com`;
    return { contact, email };
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load students. Please try again.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-2" data-testid="text-page-title">
            Student Management
          </h1>
          <p className="text-gray-600">Manage student profiles and information</p>
        </div>
        <Button
          onClick={() => {
            setEditingStudent(null);
            setShowModal(true);
          }}
          className="mt-4 sm:mt-0 bg-primary text-white hover:bg-blue-700"
          data-testid="button-add-student"
        >
          <Plus className="mr-2" size={16} />
          Add Student
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Students
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by name, contact, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10"
                  data-testid="input-search-students"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger data-testid="select-status-filter">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                className="w-full bg-gray-600 text-white hover:bg-gray-700"
                data-testid="button-apply-filters"
              >
                <Filter className="mr-2" size={16} />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">All Students</CardTitle>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600" data-testid="text-results-count">
                Showing {offset + 1}-{Math.min(offset + limit, data?.total || 0)} of {data?.total || 0} results
              </span>
              <Button
                variant="outline"
                size="sm"
                className="text-primary hover:text-blue-700"
                data-testid="button-export-students"
              >
                <Download className="mr-1" size={16} />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading students...</p>
            </div>
          ) : data?.students.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Users size={32} className="mx-auto mb-2 opacity-50" />
              <p>No students found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.students.map((student) => {
                    const { contact, email } = formatContactInfo(student);
                    return (
                      <tr key={student.id} className="hover:bg-gray-50" data-testid={`row-student-${student.id}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                              <User className="text-gray-600" size={16} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {`${student.first_name || ""} ${student.last_name || ""}`.trim() || "N/A"}
                              </div>
                              <div className="text-sm text-gray-500">STU-{student.id.toString().padStart(4, '0')}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{contact}</div>
                          <div className="text-sm text-gray-500">{email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.address || "N/A"}</div>
                          <div className="text-sm text-gray-500">{student.birth_place || "N/A"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:text-blue-700"
                              data-testid={`button-view-${student.id}`}
                            >
                              <Eye size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(student)}
                              className="text-gray-600 hover:text-gray-800"
                              data-testid={`button-edit-${student.id}`}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(student.id)}
                              className="text-red-600 hover:text-red-800"
                              data-testid={`button-delete-${student.id}`}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {data && data.total > limit && (
            <div className="bg-white px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{offset + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(offset + limit, data.total)}</span> of{" "}
                  <span className="font-medium">{data.total}</span> results
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    data-testid="button-previous-page"
                  >
                    Previous
                  </Button>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        data-testid={`button-page-${page}`}
                      >
                        {page}
                      </Button>
                    );
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    data-testid="button-next-page"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Modal */}
      {showModal && (
        <StudentModal
          student={editingStudent}
          onClose={() => {
            setShowModal(false);
            setEditingStudent(null);
          }}
          onSuccess={() => {
            setShowModal(false);
            setEditingStudent(null);
            queryClient.invalidateQueries({ queryKey: ["/api/students"] });
            queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
          }}
        />
      )}
    </div>
  );
}
