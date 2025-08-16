import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertChildSchema, type InsertChild, type Child, type Student } from "@shared/schema";
import { Loader2 } from "lucide-react";

interface ChildModalProps {
  child: Child | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ChildModal({ child, onClose, onSuccess }: ChildModalProps) {
  const { toast } = useToast();
  const isEditing = !!child;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InsertChild>({
    resolver: zodResolver(insertChildSchema),
    defaultValues: child || {
      child_status: "Single",
    },
  });

  // Fetch students for the dropdown
  const { data: studentsData } = useQuery<{ students: Student[] }>({
    queryKey: ["/api/students", { limit: 1000, offset: 0 }],
    queryFn: async () => {
      const response = await fetch("/api/students?limit=1000&offset=0");
      if (!response.ok) throw new Error("Failed to fetch students");
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertChild) => {
      const url = isEditing ? `/api/children/${child.id}` : "/api/children";
      const method = isEditing ? "PUT" : "POST";
      const response = await apiRequest(method, url, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Child record ${isEditing ? "updated" : "created"} successfully`,
      });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isEditing ? "update" : "create"} child record`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertChild) => {
    createMutation.mutate(data);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">
            {isEditing ? "Edit Child Record" : "Add New Child Record"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Parent Student Selection */}
          <div>
            <Label htmlFor="student_id">Parent Student *</Label>
            <Select
              value={watch("student_id")?.toString() || ""}
              onValueChange={(value) => setValue("student_id", parseInt(value))}
            >
              <SelectTrigger data-testid="select-parent-student">
                <SelectValue placeholder="Select parent student" />
              </SelectTrigger>
              <SelectContent>
                {studentsData?.students.map((student) => (
                  <SelectItem key={student.id} value={student.id.toString()}>
                    {`${student.first_name || ""} ${student.last_name || ""}`.trim() || `Student ${student.id}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.student_id && (
              <p className="text-sm text-red-600">{errors.student_id.message}</p>
            )}
          </div>

          {/* Child Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Child Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="child_name">Child Name *</Label>
                <Input
                  id="child_name"
                  {...register("child_name")}
                  data-testid="input-child-name"
                />
                {errors.child_name && (
                  <p className="text-sm text-red-600">{errors.child_name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="child_age">Age</Label>
                <Input
                  id="child_age"
                  type="number"
                  min="0"
                  max="100"
                  {...register("child_age", { valueAsNumber: true })}
                  data-testid="input-child-age"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="child_status">Status</Label>
                <Select
                  value={watch("child_status") || ""}
                  onValueChange={(value) => setValue("child_status", value)}
                >
                  <SelectTrigger data-testid="select-child-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="child_school">School</Label>
                <Input
                  id="child_school"
                  {...register("child_school")}
                  data-testid="input-child-school"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="child_occupation">Occupation</Label>
              <Input
                id="child_occupation"
                {...register("child_occupation")}
                data-testid="input-child-occupation"
              />
            </div>
          </div>

          {/* Action Buttons */}
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
                isEditing ? "Update Child Record" : "Create Child Record"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
