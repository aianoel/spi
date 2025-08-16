import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertStudentSchema, type InsertStudent } from "@shared/schema";
import { Loader2, User, Users, GraduationCap } from "lucide-react";

export default function EnrollmentForm() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InsertStudent>({
    resolver: zodResolver(insertStudentSchema),
    defaultValues: {
      gender: "Male",
      religion: "Catholic",
      nationality: "Filipino",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertStudent) => {
      const response = await apiRequest("POST", "/api/students", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Student enrollment form submitted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit form",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertStudent) => {
    submitMutation.mutate(data);
  };

  const sections = [
    { title: "Personal Information", icon: User },
    { title: "Academic Information", icon: GraduationCap },
    { title: "Family Information", icon: Users },
  ];

  const renderPersonalInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <div>
        <Label htmlFor="nationality">Nationality</Label>
        <Input
          id="nationality"
          {...register("nationality")}
          data-testid="input-nationality"
        />
      </div>

      <div className="md:col-span-2 lg:col-span-3">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          {...register("address")}
          data-testid="input-address"
          placeholder="Complete address"
          className="min-h-[80px]"
        />
      </div>

      <div>
        <Label htmlFor="contact_number">Contact Number</Label>
        <Input
          id="contact_number"
          {...register("contact_number")}
          data-testid="input-contact-number"
          placeholder="09XXXXXXXXX"
        />
      </div>
    </div>
  );

  const renderFamilyInfo = () => (
    <div className="space-y-8">
      {/* Father Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Father's Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div>
            <Label htmlFor="father_education">Father's Education</Label>
            <Input
              id="father_education"
              {...register("father_education")}
              data-testid="input-father-education"
            />
          </div>
          <div>
            <Label htmlFor="father_occupation">Father's Occupation</Label>
            <Input
              id="father_occupation"
              {...register("father_occupation")}
              data-testid="input-father-occupation"
            />
          </div>
          <div>
            <Label htmlFor="father_employer">Father's Employer</Label>
            <Input
              id="father_employer"
              {...register("father_employer")}
              data-testid="input-father-employer"
            />
          </div>
          <div>
            <Label htmlFor="father_work_place">Father's Work Place</Label>
            <Input
              id="father_work_place"
              {...register("father_work_place")}
              data-testid="input-father-work-place"
            />
          </div>
          <div>
            <Label htmlFor="father_citizenship">Father's Citizenship</Label>
            <Input
              id="father_citizenship"
              {...register("father_citizenship")}
              data-testid="input-father-citizenship"
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
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Mother's Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div>
            <Label htmlFor="mother_education">Mother's Education</Label>
            <Input
              id="mother_education"
              {...register("mother_education")}
              data-testid="input-mother-education"
            />
          </div>
          <div>
            <Label htmlFor="mother_occupation">Mother's Occupation</Label>
            <Input
              id="mother_occupation"
              {...register("mother_occupation")}
              data-testid="input-mother-occupation"
            />
          </div>
          <div>
            <Label htmlFor="mother_employer">Mother's Employer</Label>
            <Input
              id="mother_employer"
              {...register("mother_employer")}
              data-testid="input-mother-employer"
            />
          </div>
          <div>
            <Label htmlFor="mother_work_place">Mother's Work Place</Label>
            <Input
              id="mother_work_place"
              {...register("mother_work_place")}
              data-testid="input-mother-work-place"
            />
          </div>
          <div>
            <Label htmlFor="mother_citizenship">Mother's Citizenship</Label>
            <Input
              id="mother_citizenship"
              {...register("mother_citizenship")}
              data-testid="input-mother-citizenship"
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

      {/* Guardian Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Guardian's Information (if different from parents)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="guardian_name">Guardian's Name</Label>
            <Input
              id="guardian_name"
              {...register("guardian_name")}
              data-testid="input-guardian-name"
            />
          </div>
          <div>
            <Label htmlFor="guardian_age">Guardian's Age</Label>
            <Input
              id="guardian_age"
              type="number"
              {...register("guardian_age", { valueAsNumber: true })}
              data-testid="input-guardian-age"
            />
          </div>
          <div>
            <Label htmlFor="guardian_education">Guardian's Education</Label>
            <Input
              id="guardian_education"
              {...register("guardian_education")}
              data-testid="input-guardian-education"
            />
          </div>
          <div>
            <Label htmlFor="guardian_occupation">Guardian's Occupation</Label>
            <Input
              id="guardian_occupation"
              {...register("guardian_occupation")}
              data-testid="input-guardian-occupation"
            />
          </div>
          <div>
            <Label htmlFor="guardian_employer">Guardian's Employer</Label>
            <Input
              id="guardian_employer"
              {...register("guardian_employer")}
              data-testid="input-guardian-employer"
            />
          </div>
          <div>
            <Label htmlFor="guardian_work_place">Guardian's Work Place</Label>
            <Input
              id="guardian_work_place"
              {...register("guardian_work_place")}
              data-testid="input-guardian-work-place"
            />
          </div>
          <div>
            <Label htmlFor="guardian_citizenship">Guardian's Citizenship</Label>
            <Input
              id="guardian_citizenship"
              {...register("guardian_citizenship")}
              data-testid="input-guardian-citizenship"
            />
          </div>
          <div>
            <Label htmlFor="guardian_contact">Guardian's Contact</Label>
            <Input
              id="guardian_contact"
              {...register("guardian_contact")}
              data-testid="input-guardian-contact"
            />
          </div>
        </div>
      </div>
    </div>
  );


  const renderAcademicInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>
        <Label htmlFor="department">Department</Label>
        <Select
          value={watch("department") || ""}
          onValueChange={(value) => setValue("department", value)}
        >
          <SelectTrigger data-testid="select-department">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Elementary">Elementary</SelectItem>
            <SelectItem value="Junior High School">Junior High School</SelectItem>
            <SelectItem value="Senior High School">Senior High School</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="year">Year/Grade</Label>
        <Input
          id="year"
          {...register("year")}
          data-testid="input-year"
          placeholder="e.g. Grade 1, Grade 7, Grade 11"
        />
      </div>
      <div>
        <Label htmlFor="level">Section/Strand</Label>
        <Input
          id="level"
          {...register("level")}
          data-testid="input-level"
          placeholder="e.g. Section A, STEM, ABM"
        />
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-form-title">
            Student Enrollment Form
          </h1>
          <p className="text-lg text-gray-600">
            Please fill out all required information to complete your enrollment
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 md:space-x-4">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = index === activeSection;
              const isCompleted = index < activeSection;
              
              return (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => setActiveSection(index)}
                    className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-colors ${
                      isActive
                        ? "bg-blue-600 border-blue-600 text-white"
                        : isCompleted
                        ? "bg-green-600 border-green-600 text-white"
                        : "border-gray-300 text-gray-400 hover:border-gray-400"
                    }`}
                    data-testid={`button-step-${index}`}
                  >
                    <Icon size={20} />
                  </button>
                  {index < sections.length - 1 && (
                    <div className={`hidden md:block w-12 h-0.5 ${isCompleted ? "bg-green-600" : "bg-gray-300"}`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold text-gray-800">{sections[activeSection].title}</h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="border border-gray-200">
            <CardContent className="p-8">
              {activeSection === 0 && renderPersonalInfo()}
              {activeSection === 1 && renderAcademicInfo()}
              {activeSection === 2 && renderFamilyInfo()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
              disabled={activeSection === 0}
              data-testid="button-previous"
            >
              Previous
            </Button>

            <div className="text-sm text-gray-600">
              Step {activeSection + 1} of {sections.length}
            </div>

            {activeSection < sections.length - 1 ? (
              <Button
                type="button"
                onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
                data-testid="button-next"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="bg-green-600 hover:bg-green-700"
                data-testid="button-submit"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Enrollment"
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}