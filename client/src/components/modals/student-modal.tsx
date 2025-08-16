import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertStudentSchema, type InsertStudent, type Student } from "@shared/schema";
import { Loader2 } from "lucide-react";

interface StudentModalProps {
  student: Student | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function StudentModal({ student, onClose, onSuccess }: StudentModalProps) {
  const { toast } = useToast();
  const isEditing = !!student;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InsertStudent>({
    resolver: zodResolver(insertStudentSchema),
    defaultValues: student || {
      gender: "Male",
      nationality: "Filipino",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertStudent) => {
      const url = isEditing ? `/api/students/${student.id}` : "/api/students";
      const method = isEditing ? "PUT" : "POST";
      const response = await apiRequest(method, url, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Student ${isEditing ? "updated" : "created"} successfully`,
      });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isEditing ? "update" : "create"} student`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertStudent) => {
    createMutation.mutate(data);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">
            {isEditing ? "Edit Student" : "Add New Student"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  {...register("last_name")}
                  data-testid="input-last-name"
                />
                {errors.last_name && (
                  <p className="text-sm text-red-600">{errors.last_name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  {...register("first_name")}
                  data-testid="input-first-name"
                />
                {errors.first_name && (
                  <p className="text-sm text-red-600">{errors.first_name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="middle_name">Middle Name</Label>
                <Input
                  id="middle_name"
                  {...register("middle_name")}
                  data-testid="input-middle-name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  {...register("nickname")}
                  data-testid="input-nickname"
                />
              </div>
              <div>
                <Label htmlFor="birth_date">Birth Date</Label>
                <Input
                  id="birth_date"
                  type="date"
                  {...register("birth_date")}
                  data-testid="input-birth-date"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="birth_place">Birth Place</Label>
                <Input
                  id="birth_place"
                  {...register("birth_place")}
                  data-testid="input-birth-place"
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={watch("gender") || ""}
                  onValueChange={(value) => setValue("gender", value)}
                >
                  <SelectTrigger data-testid="select-gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="religion">Religion</Label>
                <Input
                  id="religion"
                  {...register("religion")}
                  data-testid="input-religion"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  {...register("nationality")}
                  data-testid="input-nationality"
                />
              </div>
              <div>
                <Label htmlFor="contact_number">Contact Number</Label>
                <Input
                  id="contact_number"
                  {...register("contact_number")}
                  data-testid="input-contact-number"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                {...register("address")}
                data-testid="input-address"
              />
            </div>
          </div>

          {/* Father Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Father Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="father_name">Father's Name</Label>
                <Input
                  id="father_name"
                  {...register("father_name")}
                  data-testid="input-father-name"
                />
              </div>
              <div>
                <Label htmlFor="father_age">Father's Age</Label>
                <Input
                  id="father_age"
                  type="number"
                  {...register("father_age", { valueAsNumber: true })}
                  data-testid="input-father-age"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="father_occupation">Father's Occupation</Label>
                <Input
                  id="father_occupation"
                  {...register("father_occupation")}
                  data-testid="input-father-occupation"
                />
              </div>
              <div>
                <Label htmlFor="father_contact">Father's Contact</Label>
                <Input
                  id="father_contact"
                  {...register("father_contact")}
                  data-testid="input-father-contact"
                />
              </div>
            </div>
          </div>

          {/* Mother Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Mother Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mother_name">Mother's Name</Label>
                <Input
                  id="mother_name"
                  {...register("mother_name")}
                  data-testid="input-mother-name"
                />
              </div>
              <div>
                <Label htmlFor="mother_age">Mother's Age</Label>
                <Input
                  id="mother_age"
                  type="number"
                  {...register("mother_age", { valueAsNumber: true })}
                  data-testid="input-mother-age"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mother_occupation">Mother's Occupation</Label>
                <Input
                  id="mother_occupation"
                  {...register("mother_occupation")}
                  data-testid="input-mother-occupation"
                />
              </div>
              <div>
                <Label htmlFor="mother_contact">Mother's Contact</Label>
                <Input
                  id="mother_contact"
                  {...register("mother_contact")}
                  data-testid="input-mother-contact"
                />
              </div>
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
                isEditing ? "Update Student" : "Create Student"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
