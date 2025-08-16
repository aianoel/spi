import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, ProtectedRoute } from "@/lib/auth";

import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Students from "@/pages/students";
import Children from "@/pages/children";
import Admins from "@/pages/admins";
import Reports from "@/pages/reports";
import EnrollmentForm from "@/pages/enrollment-form";
import PrintableForm from "@/pages/printable-form";
import NotFound from "@/pages/not-found";

import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 lg:ml-64 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={EnrollmentForm} />
      <Route path="/enrollment" component={EnrollmentForm} />
      <Route path="/print-form" component={PrintableForm} />
      <Route path="/admin">
        <ProtectedRoute>
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/dashboard">
        <ProtectedRoute>
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/students">
        <ProtectedRoute>
          <AppLayout>
            <Students />
          </AppLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/children">
        <ProtectedRoute>
          <AppLayout>
            <Children />
          </AppLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/admins">
        <ProtectedRoute>
          <AppLayout>
            <Admins />
          </AppLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/admin/reports">
        <ProtectedRoute>
          <AppLayout>
            <Reports />
          </AppLayout>
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
