import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Baby, Shield, Heart, UserPlus, Plus, Download, TrendingUp } from "lucide-react";
import { Link } from "wouter";

interface Stats {
  totalStudents: number;
  totalChildren: number;
  activeAdmins: number;
}

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to the Student Profile Information System</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2" data-testid="text-page-title">
          Dashboard
        </h1>
        <p className="text-gray-600">Welcome to the Student Profile Information System</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-semibold text-gray-800" data-testid="stat-total-students">
                  {stats?.totalStudents || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="text-primary text-xl" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="text-green-600 mr-1" size={16} />
              <span className="text-green-600 font-medium">Active records</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Children Records</p>
                <p className="text-3xl font-semibold text-gray-800" data-testid="stat-total-children">
                  {stats?.totalChildren || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Baby className="text-success text-xl" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="text-green-600 mr-1" size={16} />
              <span className="text-green-600 font-medium">Linked to students</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Admins</p>
                <p className="text-3xl font-semibold text-gray-800" data-testid="stat-active-admins">
                  {stats?.activeAdmins || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="text-purple-600 text-xl" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">System administrators</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-3xl font-semibold text-success">100%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="text-success text-xl" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">All systems operational</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <Users size={32} className="mx-auto mb-2 opacity-50" />
              <p>No recent student registrations to display</p>
              <p className="text-sm">New registrations will appear here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/students">
              <Button
                variant="outline"
                className="w-full flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 border-blue-200 h-auto"
                data-testid="button-add-student"
              >
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <UserPlus className="text-white" size={20} />
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-800">Add New Student</p>
                  <p className="text-sm text-gray-600">Register a new student profile</p>
                </div>
              </Button>
            </Link>

            <Link href="/children">
              <Button
                variant="outline"
                className="w-full flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 border-green-200 h-auto"
                data-testid="button-add-child"
              >
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                  <Plus className="text-white" size={20} />
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-800">Add Child Record</p>
                  <p className="text-sm text-gray-600">Link child information to student</p>
                </div>
              </Button>
            </Link>

            <Link href="/reports">
              <Button
                variant="outline"
                className="w-full flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 border-orange-200 h-auto"
                data-testid="button-export-data"
              >
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Download className="text-white" size={20} />
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-800">Export Data</p>
                  <p className="text-sm text-gray-600">Download student records as CSV</p>
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
