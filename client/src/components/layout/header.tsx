import { useLocation } from "wouter";
import { useAuthContext } from "@/lib/auth";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();
  const { user } = useAuthContext();

  const getBreadcrumb = (path: string) => {
    switch (path) {
      case "/":
      case "/dashboard":
        return "Dashboard";
      case "/students":
        return "Students > Management";
      case "/children":
        return "Children > Records";
      case "/admins":
        return "Admin > Management";
      case "/reports":
        return "Reports > Analytics";
      default:
        return "Dashboard";
    }
  };

  const formatLastLogin = () => {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <nav className="hidden sm:flex space-x-2 text-sm text-gray-500">
            <span data-testid="text-breadcrumb">{getBreadcrumb(location)}</span>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-800 relative"
            data-testid="button-notifications"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </Button>

          <div className="hidden sm:flex items-center space-x-2 text-sm">
            <span className="text-gray-600">Last login:</span>
            <span className="font-medium text-gray-800" data-testid="text-last-login">
              {formatLastLogin()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
