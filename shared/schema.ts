import { sql } from "drizzle-orm";
import { mysqlTable, varchar, int, date, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const admins = mysqlTable("admins", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  full_name: varchar("full_name", { length: 100 }).notNull(),
  role: varchar("role", { length: 10 }).notNull().default("admin"), // 'admin' or 'staff'
  created_at: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const student_inventory = mysqlTable("student_inventory", {
  id: int("id").primaryKey().autoincrement(),
  department: varchar("department", { length: 100 }),
  year: varchar("year", { length: 50 }),
  level: varchar("level", { length: 100 }),
  last_name: varchar("last_name", { length: 100 }),
  first_name: varchar("first_name", { length: 100 }),
  middle_name: varchar("middle_name", { length: 100 }),
  photo_path: varchar("photo_path", { length: 255 }),
  nickname: varchar("nickname", { length: 100 }),
  birth_date: date("birth_date"),
  birth_place: varchar("birth_place", { length: 150 }),
  gender: varchar("gender", { length: 20 }),
  religion: varchar("religion", { length: 100 }),
  nationality: varchar("nationality", { length: 100 }),
  address: varchar("address", { length: 255 }),
  contact_number: varchar("contact_number", { length: 50 }),
  father_name: varchar("father_name", { length: 150 }),
  father_age: int("father_age"),
  father_education: varchar("father_education", { length: 150 }),
  father_occupation: varchar("father_occupation", { length: 150 }),
  father_employer: varchar("father_employer", { length: 150 }),
  father_work_place: varchar("father_work_place", { length: 150 }),
  father_citizenship: varchar("father_citizenship", { length: 100 }),
  father_contact: varchar("father_contact", { length: 100 }),
  mother_name: varchar("mother_name", { length: 150 }),
  mother_age: int("mother_age"),
  mother_education: varchar("mother_education", { length: 150 }),
  mother_occupation: varchar("mother_occupation", { length: 150 }),
  mother_employer: varchar("mother_employer", { length: 150 }),
  mother_work_place: varchar("mother_work_place", { length: 150 }),
  mother_citizenship: varchar("mother_citizenship", { length: 100 }),
  mother_contact: varchar("mother_contact", { length: 100 }),
  guardian_name: varchar("guardian_name", { length: 150 }),
  guardian_age: int("guardian_age"),
  guardian_education: varchar("guardian_education", { length: 150 }),
  guardian_occupation: varchar("guardian_occupation", { length: 150 }),
  guardian_employer: varchar("guardian_employer", { length: 150 }),
  guardian_work_place: varchar("guardian_work_place", { length: 150 }),
  guardian_citizenship: varchar("guardian_citizenship", { length: 100 }),
  guardian_contact: varchar("guardian_contact", { length: 100 }),
});

export const student_children = mysqlTable("student_children", {
  id: int("id").primaryKey().autoincrement(),
  student_id: int("student_id").notNull(),
  child_name: varchar("child_name", { length: 150 }),
  child_age: int("child_age"),
  child_status: varchar("child_status", { length: 50 }),
  child_school: varchar("child_school", { length: 150 }),
  child_occupation: varchar("child_occupation", { length: 150 }),
});

// Insert schemas
export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
  created_at: true,
});

export const insertStudentSchema = createInsertSchema(student_inventory).omit({
  id: true,
});

export const insertChildSchema = createInsertSchema(student_children).omit({
  id: true,
});

// Login schema
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Types
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof admins.$inferSelect;

export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof student_inventory.$inferSelect;

export type InsertChild = z.infer<typeof insertChildSchema>;
export type Child = typeof student_children.$inferSelect;

export type LoginRequest = z.infer<typeof loginSchema>;
