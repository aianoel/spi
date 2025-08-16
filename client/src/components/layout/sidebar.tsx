import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLogout } from "@/hooks/use-auth";
import { useAuthContext } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  BarChart3, 
  Users, 
  Baby, 
  Shield, 
  FileText, 
  LogOut,
  User,
  Menu,
  X
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuthContext();
  const logoutMutation = useLogout();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { href: "/admin/dashboard", icon: BarChart3, label: "Dashboard" },
    { href: "/admin/students", icon: Users, label: "Students" },
    { href: "/admin/children", icon: Baby, label: "Children Records" },
    { href: "/admin/admins", icon: Shield, label: "Admin Users" },
    { href: "/admin/reports", icon: FileText, label: "Reports" },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50"
        data-testid="button-mobile-menu"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleMobile}
          data-testid="overlay-mobile-menu"
        />
      )}

      {/* Sidebar */}
      <div className={`w-64 bg-white shadow-lg fixed h-full z-30 transform transition-transform duration-300 ease-in-out ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">SPI Admin</h2>
              <p className="text-sm text-gray-500">v2.0</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href === "/admin/dashboard" && location === "/admin");
            const Icon = item.icon;
            
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "bg-blue-50 text-primary font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800" data-testid="text-user-name">
                {user?.full_name || "System Admin"}
              </p>
              <p className="text-xs text-gray-500" data-testid="text-user-role">
                {user?.role || "Administrator"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="w-full justify-start text-gray-600 hover:text-gray-800"
            data-testid="button-logout"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );
}
