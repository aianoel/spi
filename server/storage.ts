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
      password: "$2b$10$ApDcLlayp0Vw2imr5SPat.QtvXC4BMpTKuxKKtqVuVknMsJh85N/i", // password: "password"
      full_name: "System Administrator",
      role: "admin",
      created_at: new Date("2025-08-10T14:50:26.000Z"),
    });
    this.nextAdminId = 2;

    // Load sample student data from database dump
    this.loadSampleData();
  }

  private loadSampleData() {
    // Add students from database dump
    const studentsData = [
      {
        id: 4,
        department: 'Elementary',
        year: 'Grade 1',
        level: 'San Antonio',
        last_name: 'Baron',
        first_name: 'Norman',
        middle_name: 'Morallos',
        photo_path: '6770c9791558f820.png',
        nickname: 'Mike',
        birth_date: '1998-04-21',
        birth_place: 'Kawit Cavite',
        gender: 'Male',
        religion: 'Catholic',
        nationality: 'Filipino',
        address: 'San Naba Patungo Brgy 77 Cavite',
        contact_number: '09090912123',
        father_name: 'Jack Sparrow',
        father_age: 78,
        mother_name: 'Neneng B',
        mother_age: 65,
        archived: false
      },
      {
        id: 6,
        department: 'Senior High School',
        year: 'Grade 11',
        level: 'Saint Lucia, STEM',
        last_name: 'Javier',
        first_name: 'Allen',
        middle_name: 'Arviola',
        photo_path: '4c569d00eba107ba.jpg',
        nickname: 'Allen',
        birth_date: '2008-11-04',
        birth_place: 'Naic, Cavite',
        gender: 'Male',
        religion: 'Catholic',
        nationality: 'Pilipino',
        address: 'Brgy. kanluran Pilaez St. Naic, Cavite',
        contact_number: '09271327038',
        father_name: 'Ritchie N. Javier',
        father_age: 47,
        mother_name: 'Teresita Arviola',
        mother_age: 46,
        archived: false
      },
      {
        id: 8,
        department: 'Senior High School',
        year: 'Grade 11',
        level: 'St. Lucia, STEM',
        last_name: 'Misena',
        first_name: 'Uno Miguel',
        middle_name: 'Buendia',
        photo_path: '7c56d5472d294518.jpg',
        nickname: 'Uno',
        birth_date: '2009-05-31',
        birth_place: 'Naic, Cavite',
        gender: 'Male',
        religion: 'Catholic',
        nationality: 'Filipino',
        address: 'Precious Ville Subdivision, Blk 4 Lot 18-20, Naic, Cavite.',
        contact_number: '09757125817',
        father_name: 'Jefferson V. Misena',
        father_age: 40,
        mother_name: 'Happy B. Misena',
        mother_age: 37,
        archived: false
      },
      {
        id: 11,
        department: 'Senior High School',
        year: 'Grade 11',
        level: 'Saint Lucia',
        last_name: 'Credito',
        first_name: 'Clarisse',
        middle_name: 'Maraan',
        photo_path: '923c42cbc8e5a74f.jpg',
        nickname: 'Risse',
        birth_date: '2009-06-11',
        birth_place: 'Trece martires',
        gender: 'Female',
        religion: 'Catholic',
        nationality: 'Filipino',
        address: '141 sapa',
        contact_number: '09156022429',
        father_name: 'Sonny Credito',
        father_age: 51,
        mother_name: 'Hersey',
        mother_age: 38,
        archived: false
      },
      {
        id: 17,
        department: 'Senior High School',
        year: 'Grade 12',
        level: 'Section Lady of Guadalupe, STEM Strand',
        last_name: 'Rosendo',
        first_name: 'Izy Neah',
        middle_name: 'Gruta',
        photo_path: 'bc61e6fe6a06ebfe.jpeg',
        nickname: 'Izy',
        birth_date: '2008-05-12',
        birth_place: 'Mandaluyong',
        gender: 'Female',
        religion: 'Catholic',
        nationality: 'Filipino',
        address: 'Phase 2, Block 17, Lot 25, Wellington Residences, Tanza, Cavite',
        contact_number: '09277763960',
        father_name: 'Iverson Rosendo',
        father_age: null,
        mother_name: 'Sharon Gruta',
        mother_age: null,
        archived: false
      },
      {
        id: 19,
        department: 'Senior High School',
        year: '12',
        level: 'Lady of Guadalupe, STEM Strand',
        last_name: 'Quemuel',
        first_name: 'Tyrese Gibson',
        middle_name: 'Mendoza',
        photo_path: '372889d2f722984b.jfif',
        nickname: null,
        birth_date: '2008-02-27',
        birth_place: 'San Lorenzo Hospital',
        gender: 'Male',
        religion: 'Catholicism',
        nationality: 'Filipino',
        address: '0264 Ibayo Silangan, Naic, Cavite',
        contact_number: '0998-351-4746',
        father_name: 'Lawrence',
        father_age: 49,
        mother_name: 'Celeste M. Quemuel',
        mother_age: 48,
        archived: false
      },
      {
        id: 20,
        department: 'Elementary',
        year: 'Grade 2',
        level: 'St felicity',
        last_name: 'Carta',
        first_name: 'Annieka Liza',
        middle_name: 'Roxas',
        photo_path: '4d3c2316a3387d4d.jpeg',
        nickname: 'Kitty',
        birth_date: '2017-11-14',
        birth_place: 'Naic cavite',
        gender: 'Female',
        religion: 'Catholic',
        nationality: 'Filipino',
        address: 'Bayside st. Bancaan naic cavite',
        contact_number: '09056235706',
        father_name: 'Emmanuel M. Carta III',
        father_age: 33,
        mother_name: 'Katrina May R. Carta',
        mother_age: 29,
        archived: false
      },
      {
        id: 21,
        department: 'Elementary',
        year: 'Grade 2',
        level: 'St. Felicity',
        last_name: 'Bachar',
        first_name: 'Kourtney Shanelle',
        middle_name: 'Grepo',
        photo_path: 'd238bb1ae39d9f7a.jpeg',
        nickname: 'Shanelle',
        birth_date: '2018-08-23',
        birth_place: 'Naic, Cavite',
        gender: 'Female',
        religion: 'Roman Catholic',
        nationality: 'Filipino',
        address: 'Northdale Villas Blk 41 Lot 13 Timalan Balsahan, Naic, Cavite',
        contact_number: '09453428492',
        father_name: 'Jimel Bachar',
        father_age: 30,
        mother_name: 'Maryjoe Bachar',
        mother_age: 26,
        archived: false
      },
      {
        id: 23,
        department: 'Elementary',
        year: 'Grade 6',
        level: 'St. Mary',
        last_name: 'Abad',
        first_name: 'Isabella Samantha',
        middle_name: 'Villa',
        photo_path: '0b61f7ecb7de00c5.jpg',
        nickname: 'Bella',
        birth_date: '2014-05-19',
        birth_place: 'Naic cavite',
        gender: 'Female',
        religion: 'Catholic',
        nationality: 'Filipino',
        address: '009 Brgy. Calubcob Naic Cavite',
        contact_number: '09555638655',
        father_name: 'Earl Bryan Abad',
        father_age: 40,
        mother_name: 'Arabelle Abad',
        mother_age: 36,
        archived: false
      },
      {
        id: 31,
        department: 'Elementary',
        year: 'Grade 2',
        level: 'St. Felicity',
        last_name: 'Velasco',
        first_name: 'Javen',
        middle_name: 'Tolentino',
        photo_path: '1105629ea099bbed.jpg',
        nickname: 'Javen',
        birth_date: '2017-12-05',
        birth_place: 'Texas, USA',
        gender: 'Male',
        religion: '(Born Again) Christian',
        nationality: 'US/Filipino',
        address: '21 J.P Rizal St. Kanluran Naic Cavite 4110',
        contact_number: '0945-560-3856',
        father_name: 'Jerome Piol Velasco',
        father_age: 52,
        mother_name: 'Honeylet Tolentino Velasco',
        mother_age: 45,
        archived: false
      }
    ];

    const childrenData = [
      { id: 2, student_id: 4, child_name: 'Mike Baron', child_age: 25, child_status: 'Single', child_school: 'N', child_occupation: 'N/A' },
      { id: 3, student_id: 6, child_name: 'Maria Zabkiel A. Javier', child_age: 9, child_status: 'Single', child_school: 'Immaculate Conception School of Naic Inc.', child_occupation: 'Student' },
      { id: 4, student_id: 8, child_name: 'Yza Marie B. Misena', child_age: 9, child_status: 'Single', child_school: 'Naic Elem. School', child_occupation: 'Student' },
      { id: 5, student_id: 8, child_name: 'Samantha Marie B. Misena', child_age: 8, child_status: 'Single', child_school: 'Naic Elem. School', child_occupation: 'Student' },
      { id: 6, student_id: 8, child_name: 'Sophia Marie B. Misena', child_age: 8, child_status: 'Single', child_school: 'Naic Elem. School', child_occupation: 'Student' },
      { id: 7, student_id: 11, child_name: 'Herson Credito', child_age: 13, child_status: 'Single', child_school: 'Centro de naic', child_occupation: 'None' },
      { id: 8, student_id: 11, child_name: 'Sonny Credito', child_age: 51, child_status: 'Married', child_school: 'N/A', child_occupation: 'Tricycle driver' },
      { id: 9, student_id: 11, child_name: 'Anicia Credito', child_age: 70, child_status: 'Married', child_school: 'N/A', child_occupation: 'None' },
      { id: 19, student_id: 17, child_name: 'Izy Neah Rosendo', child_age: 17, child_status: 'Single', child_school: 'Immaculate Conception School of Naic Inc.', child_occupation: 'Student' },
      { id: 20, student_id: 17, child_name: 'Izen Rosendo', child_age: 9, child_status: 'Single', child_school: 'ABC School', child_occupation: 'Student' },
      { id: 21, student_id: 19, child_name: 'Corallie Daphne M. Quemuel', child_age: 22, child_status: 'Single', child_school: 'Philippine College of Health Sciences', child_occupation: 'Intern' },
      { id: 22, student_id: 20, child_name: 'Emmanuel R. Carta VII', child_age: 6, child_status: 'Single', child_school: 'ICS', child_occupation: 'N/A' },
      { id: 23, student_id: 21, child_name: 'Atasha Avonnie', child_age: 4, child_status: 'Single', child_school: 'Sacred of Heart Montessori School', child_occupation: 'N/A' },
      { id: 30, student_id: 31, child_name: 'Janella Velasco', child_age: 10, child_status: 'Single', child_school: 'ICSNI', child_occupation: 'Student' },
      { id: 31, student_id: 31, child_name: 'Julianne Velasco', child_age: 17, child_status: 'Single', child_school: 'ISCNI', child_occupation: 'Student' },
      { id: 32, student_id: 31, child_name: 'Levy Tolentino', child_age: 78, child_status: 'Married', child_school: 'N/A', child_occupation: 'None' },
      { id: 33, student_id: 31, child_name: 'Luz Tolentino', child_age: 81, child_status: 'Married', child_school: 'N/A', child_occupation: 'None' }
    ];

    // Add students to storage
    studentsData.forEach(studentData => {
      this.students.set(studentData.id, {
        ...studentData,
        father_education: null,
        father_occupation: null,
        father_employer: null,
        father_work_place: null,
        father_citizenship: null,
        father_contact: null,
        mother_education: null,
        mother_occupation: null,
        mother_employer: null,
        mother_work_place: null,
        mother_citizenship: null,
        mother_contact: null,
        guardian_name: null,
        guardian_age: null,
        guardian_education: null,
        guardian_occupation: null,
        guardian_employer: null,
        guardian_work_place: null,
        guardian_citizenship: null,
        guardian_contact: null
      });
    });

    // Add children to storage
    childrenData.forEach(childData => {
      this.children.set(childData.id, childData);
    });

    // Update next IDs
    this.nextStudentId = Math.max(...studentsData.map(s => s.id)) + 1;
    this.nextChildId = Math.max(...childrenData.map(c => c.id)) + 1;
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
      role: insertAdmin.role || "admin",
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
      // Ensure all required fields are properly typed
      address: insertStudent.address ?? null,
      department: insertStudent.department ?? null,
      year: insertStudent.year ?? null,
      level: insertStudent.level ?? null,
      last_name: insertStudent.last_name ?? null,
      first_name: insertStudent.first_name ?? null,
      middle_name: insertStudent.middle_name ?? null,
      photo_path: insertStudent.photo_path ?? null,
      nickname: insertStudent.nickname ?? null,
      birth_date: insertStudent.birth_date ?? null,
      birth_place: insertStudent.birth_place ?? null,
      gender: insertStudent.gender ?? null,
      religion: insertStudent.religion ?? null,
      nationality: insertStudent.nationality ?? null,
      contact_number: insertStudent.contact_number ?? null,
      father_name: insertStudent.father_name ?? null,
      father_age: insertStudent.father_age ?? null,
      father_education: insertStudent.father_education ?? null,
      father_occupation: insertStudent.father_occupation ?? null,
      father_employer: insertStudent.father_employer ?? null,
      father_work_place: insertStudent.father_work_place ?? null,
      father_citizenship: insertStudent.father_citizenship ?? null,
      father_contact: insertStudent.father_contact ?? null,
      mother_name: insertStudent.mother_name ?? null,
      mother_age: insertStudent.mother_age ?? null,
      mother_education: insertStudent.mother_education ?? null,
      mother_occupation: insertStudent.mother_occupation ?? null,
      mother_employer: insertStudent.mother_employer ?? null,
      mother_work_place: insertStudent.mother_work_place ?? null,
      mother_citizenship: insertStudent.mother_citizenship ?? null,
      mother_contact: insertStudent.mother_contact ?? null,
      guardian_name: insertStudent.guardian_name ?? null,
      guardian_age: insertStudent.guardian_age ?? null,
      guardian_education: insertStudent.guardian_education ?? null,
      guardian_occupation: insertStudent.guardian_occupation ?? null,
      guardian_employer: insertStudent.guardian_employer ?? null,
      guardian_work_place: insertStudent.guardian_work_place ?? null,
      guardian_citizenship: insertStudent.guardian_citizenship ?? null,
      guardian_contact: insertStudent.guardian_contact ?? null,
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
      child_name: insertChild.child_name ?? null,
      child_age: insertChild.child_age ?? null,
      child_status: insertChild.child_status ?? null,
      child_school: insertChild.child_school ?? null,
      child_occupation: insertChild.child_occupation ?? null,
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
