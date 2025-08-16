import { type Admin, type InsertAdmin, type Student, type InsertStudent, type Child, type InsertChild } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Admin methods
  getAdmin(id: number): Promise<Admin | undefined>;
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  updateAdmin(id: number, admin: Partial<InsertAdmin>): Promise<Admin | undefined>;
  deleteAdmin(id: number): Promise<boolean>;
  getAllAdmins(): Promise<Admin[]>;

  // Student methods
  getStudent(id: number): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student | undefined>;
  deleteStudent(id: number): Promise<boolean>;
  getAllStudents(search?: string, limit?: number, offset?: number): Promise<{ students: Student[]; total: number }>;

  // Child methods
  getChild(id: number): Promise<Child | undefined>;
  createChild(child: InsertChild): Promise<Child>;
  updateChild(id: number, child: Partial<InsertChild>): Promise<Child | undefined>;
  deleteChild(id: number): Promise<boolean>;
  getAllChildren(search?: string, ageRange?: string, limit?: number, offset?: number): Promise<{ children: Child[]; total: number }>;
  getChildrenByStudentId(studentId: number): Promise<Child[]>;

  // Stats methods
  getStats(): Promise<{
    totalStudents: number;
    totalChildren: number;
    activeAdmins: number;
  }>;
}

export class MemStorage implements IStorage {
  private admins: Map<number, Admin>;
  private students: Map<number, Student>;
  private children: Map<number, Child>;
  private nextAdminId = 1;
  private nextStudentId = 1;
  private nextChildId = 1;

  constructor() {
    this.admins = new Map();
    this.students = new Map();
    this.children = new Map();

    // Add default admin
    this.admins.set(1, {
      id: 1,
      username: "admin",
      password: "$2y$10$L6lO2PskLTF5wTstla7/HedUMtXp1lNaMYNhJpPZXKFZxc5O2tSOO", // password: "password"
      full_name: "System Administrator",
      role: "admin",
      created_at: new Date("2025-08-10T14:50:26.000Z"),
    });
    this.nextAdminId = 2;
  }

  // Admin methods
  async getAdmin(id: number): Promise<Admin | undefined> {
    return this.admins.get(id);
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(admin => admin.username === username);
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = this.nextAdminId++;
    const admin: Admin = {
      ...insertAdmin,
      id,
      created_at: new Date(),
    };
    this.admins.set(id, admin);
    return admin;
  }

  async updateAdmin(id: number, adminUpdate: Partial<InsertAdmin>): Promise<Admin | undefined> {
    const existing = this.admins.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...adminUpdate };
    this.admins.set(id, updated);
    return updated;
  }

  async deleteAdmin(id: number): Promise<boolean> {
    return this.admins.delete(id);
  }

  async getAllAdmins(): Promise<Admin[]> {
    return Array.from(this.admins.values());
  }

  // Student methods
  async getStudent(id: number): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = this.nextStudentId++;
    const student: Student = {
      ...insertStudent,
      id,
    };
    this.students.set(id, student);
    return student;
  }

  async updateStudent(id: number, studentUpdate: Partial<InsertStudent>): Promise<Student | undefined> {
    const existing = this.students.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...studentUpdate };
    this.students.set(id, updated);
    return updated;
  }

  async deleteStudent(id: number): Promise<boolean> {
    // Also delete associated children
    const childrenToDelete = Array.from(this.children.values())
      .filter(child => child.student_id === id)
      .map(child => child.id);
    
    childrenToDelete.forEach(childId => this.children.delete(childId));
    
    return this.students.delete(id);
  }

  async getAllStudents(search?: string, limit = 10, offset = 0): Promise<{ students: Student[]; total: number }> {
    let students = Array.from(this.students.values());

    if (search) {
      const searchLower = search.toLowerCase();
      students = students.filter(student => 
        student.first_name?.toLowerCase().includes(searchLower) ||
        student.last_name?.toLowerCase().includes(searchLower) ||
        student.contact_number?.toLowerCase().includes(searchLower) ||
        student.address?.toLowerCase().includes(searchLower)
      );
    }

    const total = students.length;
    const paginatedStudents = students.slice(offset, offset + limit);

    return { students: paginatedStudents, total };
  }

  // Child methods
  async getChild(id: number): Promise<Child | undefined> {
    return this.children.get(id);
  }

  async createChild(insertChild: InsertChild): Promise<Child> {
    const id = this.nextChildId++;
    const child: Child = {
      ...insertChild,
      id,
    };
    this.children.set(id, child);
    return child;
  }

  async updateChild(id: number, childUpdate: Partial<InsertChild>): Promise<Child | undefined> {
    const existing = this.children.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...childUpdate };
    this.children.set(id, updated);
    return updated;
  }

  async deleteChild(id: number): Promise<boolean> {
    return this.children.delete(id);
  }

  async getAllChildren(search?: string, ageRange?: string, limit = 10, offset = 0): Promise<{ children: Child[]; total: number }> {
    let children = Array.from(this.children.values());

    if (search) {
      const searchLower = search.toLowerCase();
      children = children.filter(child => 
        child.child_name?.toLowerCase().includes(searchLower) ||
        child.child_school?.toLowerCase().includes(searchLower) ||
        child.child_occupation?.toLowerCase().includes(searchLower)
      );
    }

    if (ageRange) {
      children = children.filter(child => {
        if (!child.child_age) return false;
        const age = child.child_age;
        
        switch (ageRange) {
          case "0-5":
            return age >= 0 && age <= 5;
          case "6-12":
            return age >= 6 && age <= 12;
          case "13-18":
            return age >= 13 && age <= 18;
          case "18+":
            return age > 18;
          default:
            return true;
        }
      });
    }

    const total = children.length;
    const paginatedChildren = children.slice(offset, offset + limit);

    return { children: paginatedChildren, total };
  }

  async getChildrenByStudentId(studentId: number): Promise<Child[]> {
    return Array.from(this.children.values()).filter(child => child.student_id === studentId);
  }

  async getStats(): Promise<{ totalStudents: number; totalChildren: number; activeAdmins: number }> {
    return {
      totalStudents: this.students.size,
      totalChildren: this.children.size,
      activeAdmins: this.admins.size,
    };
  }
}

export const storage = new MemStorage();
