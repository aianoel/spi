import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAdminSchema, insertStudentSchema, insertChildSchema, loginSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: number;
    userRole?: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || "spi-admin-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }
  }));

  // Auth middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  };

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const admin = await storage.getAdminByUsername(username);
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = admin.id;
      req.session.userRole = admin.role;

      res.json({ 
        id: admin.id, 
        username: admin.username, 
        full_name: admin.full_name, 
        role: admin.role 
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const admin = await storage.getAdmin(req.session.userId!);
      if (!admin) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ 
        id: admin.id, 
        username: admin.username, 
        full_name: admin.full_name, 
        role: admin.role 
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Stats route
  app.get("/api/stats", requireAuth, async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Could not fetch stats" });
    }
  });

  // Admin routes
  app.get("/api/admins", requireAuth, async (req, res) => {
    try {
      const admins = await storage.getAllAdmins();
      res.json(admins.map(admin => ({
        id: admin.id,
        username: admin.username,
        full_name: admin.full_name,
        role: admin.role,
        created_at: admin.created_at,
      })));
    } catch (error) {
      res.status(500).json({ message: "Could not fetch admins" });
    }
  });

  app.post("/api/admins", requireAuth, async (req, res) => {
    try {
      const adminData = insertAdminSchema.parse(req.body);
      
      // Hash password
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      const admin = await storage.createAdmin({
        ...adminData,
        password: hashedPassword,
      });

      res.status(201).json({
        id: admin.id,
        username: admin.username,
        full_name: admin.full_name,
        role: admin.role,
        created_at: admin.created_at,
      });
    } catch (error) {
      res.status(400).json({ message: "Could not create admin" });
    }
  });

  app.put("/api/admins/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const adminData = insertAdminSchema.partial().parse(req.body);
      
      if (adminData.password) {
        adminData.password = await bcrypt.hash(adminData.password, 10);
      }

      const admin = await storage.updateAdmin(id, adminData);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      res.json({
        id: admin.id,
        username: admin.username,
        full_name: admin.full_name,
        role: admin.role,
        created_at: admin.created_at,
      });
    } catch (error) {
      res.status(400).json({ message: "Could not update admin" });
    }
  });

  app.delete("/api/admins/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Prevent deleting self
      if (id === req.session.userId) {
        return res.status(400).json({ message: "Cannot delete your own account" });
      }

      const deleted = await storage.deleteAdmin(id);
      if (!deleted) {
        return res.status(404).json({ message: "Admin not found" });
      }

      res.json({ message: "Admin deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Could not delete admin" });
    }
  });

  // Student routes
  app.get("/api/students", requireAuth, async (req, res) => {
    try {
      const search = req.query.search as string;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      const result = await storage.getAllStudents(search, limit, offset);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Could not fetch students" });
    }
  });

  app.get("/api/students/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const student = await storage.getStudent(id);
      
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json(student);
    } catch (error) {
      res.status(500).json({ message: "Could not fetch student" });
    }
  });

  app.post("/api/students", requireAuth, async (req, res) => {
    try {
      const studentData = insertStudentSchema.parse(req.body);
      const student = await storage.createStudent(studentData);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ message: "Could not create student" });
    }
  });

  app.put("/api/students/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const studentData = insertStudentSchema.partial().parse(req.body);
      
      const student = await storage.updateStudent(id, studentData);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json(student);
    } catch (error) {
      res.status(400).json({ message: "Could not update student" });
    }
  });

  app.delete("/api/students/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteStudent(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Could not delete student" });
    }
  });

  // Children routes
  app.get("/api/children", requireAuth, async (req, res) => {
    try {
      const search = req.query.search as string;
      const ageRange = req.query.ageRange as string;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      const result = await storage.getAllChildren(search, ageRange, limit, offset);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Could not fetch children" });
    }
  });

  app.get("/api/students/:studentId/children", requireAuth, async (req, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      const children = await storage.getChildrenByStudentId(studentId);
      res.json(children);
    } catch (error) {
      res.status(500).json({ message: "Could not fetch children" });
    }
  });

  app.post("/api/children", requireAuth, async (req, res) => {
    try {
      const childData = insertChildSchema.parse(req.body);
      const child = await storage.createChild(childData);
      res.status(201).json(child);
    } catch (error) {
      res.status(400).json({ message: "Could not create child record" });
    }
  });

  app.put("/api/children/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const childData = insertChildSchema.partial().parse(req.body);
      
      const child = await storage.updateChild(id, childData);
      if (!child) {
        return res.status(404).json({ message: "Child record not found" });
      }

      res.json(child);
    } catch (error) {
      res.status(400).json({ message: "Could not update child record" });
    }
  });

  app.delete("/api/children/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteChild(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Child record not found" });
      }

      res.json({ message: "Child record deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Could not delete child record" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
