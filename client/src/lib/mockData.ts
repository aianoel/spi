// Mock data for static deployment without backend
import type { Student, Child } from '@shared/schema';

export const mockStudents: Student[] = [
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
    birth_date: new Date('1998-04-21'),
    birth_place: 'Kawit Cavite',
    gender: 'Male',
    religion: 'Catholic',
    nationality: 'Filipino',
    address: 'San Naba Patungo Brgy 77 Cavite',
    contact_number: '09090912123',
    father_name: 'Jack Sparrow',
    father_age: 78,
    father_education: 'College Graduate',
    father_occupation: 'Engineer',
    father_employer: 'ABC Company',
    father_work_place: 'Manila',
    father_citizenship: 'Filipino',
    father_contact: '09123456789',
    mother_name: 'Neneng B',
    mother_age: 65,
    mother_education: 'High School Graduate',
    mother_occupation: 'Housewife',
    mother_employer: 'N/A',
    mother_work_place: 'N/A',
    mother_citizenship: 'Filipino',
    mother_contact: '09987654321',
    guardian_name: null,
    guardian_age: null,
    guardian_education: null,
    guardian_occupation: null,
    guardian_employer: null,
    guardian_work_place: null,
    guardian_citizenship: null,
    guardian_contact: null,
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
    birth_date: new Date('2008-11-04'),
    birth_place: 'Naic, Cavite',
    gender: 'Male',
    religion: 'Catholic',
    nationality: 'Pilipino',
    address: 'Brgy. kanluran Pilaez St. Naic, Cavite',
    contact_number: '09271327038',
    father_name: 'Ritchie N. Javier',
    father_age: 47,
    father_education: 'College Graduate',
    father_occupation: 'Business Owner',
    father_employer: 'Self-employed',
    father_work_place: 'Naic, Cavite',
    father_citizenship: 'Filipino',
    father_contact: '09123456789',
    mother_name: 'Teresita Arviola',
    mother_age: 46,
    mother_education: 'College Graduate',
    mother_occupation: 'Teacher',
    mother_employer: 'Department of Education',
    mother_work_place: 'Naic Elementary School',
    mother_citizenship: 'Filipino',
    mother_contact: '09987654321',
    guardian_name: null,
    guardian_age: null,
    guardian_education: null,
    guardian_occupation: null,
    guardian_employer: null,
    guardian_work_place: null,
    guardian_citizenship: null,
    guardian_contact: null,
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
    birth_date: new Date('2009-05-31'),
    birth_place: 'Naic, Cavite',
    gender: 'Male',
    religion: 'Catholic',
    nationality: 'Filipino',
    address: 'Precious Ville Subdivision, Blk 4 Lot 18-20, Naic, Cavite.',
    contact_number: '09757125817',
    father_name: 'Jefferson V. Misena',
    father_age: 40,
    father_education: 'College Graduate',
    father_occupation: 'OFW',
    father_employer: 'Saudi Company',
    father_work_place: 'Saudi Arabia',
    father_citizenship: 'Filipino',
    father_contact: '09123456789',
    mother_name: 'Happy B. Misena',
    mother_age: 37,
    mother_education: 'College Graduate',
    mother_occupation: 'Nurse',
    mother_employer: 'Naic Hospital',
    mother_work_place: 'Naic, Cavite',
    mother_citizenship: 'Filipino',
    mother_contact: '09987654321',
    guardian_name: null,
    guardian_age: null,
    guardian_education: null,
    guardian_occupation: null,
    guardian_employer: null,
    guardian_work_place: null,
    guardian_citizenship: null,
    guardian_contact: null,
  }
];

export const mockChildren: Child[] = [
  {
    id: 2,
    student_id: 4,
    child_name: 'Mike Baron',
    child_age: 25,
    child_status: 'Single',
    child_school: 'N/A',
    child_occupation: 'N/A',
  },
  {
    id: 3,
    student_id: 6,
    child_name: 'Maria Zabkiel A. Javier',
    child_age: 9,
    child_status: 'Single',
    child_school: 'Immaculate Conception School of Naic Inc.',
    child_occupation: 'Student',
  },
  {
    id: 4,
    student_id: 8,
    child_name: 'Yza Marie B. Misena',
    child_age: 9,
    child_status: 'Single',
    child_school: 'Naic Elem. School',
    child_occupation: 'Student',
  },
  {
    id: 5,
    student_id: 8,
    child_name: 'Samantha Marie B. Misena',
    child_age: 8,
    child_status: 'Single',
    child_school: 'Naic Elem. School',
    child_occupation: 'Student',
  },
  {
    id: 6,
    student_id: 8,
    child_name: 'Sophia Marie B. Misena',
    child_age: 8,
    child_status: 'Single',
    child_school: 'Naic Elem. School',
    child_occupation: 'Student',
  }
];

export const mockStats = {
  totalStudents: mockStudents.length,
  totalChildren: mockChildren.length,
  totalAdmins: 1,
  activeStudents: mockStudents.length,
};

// Mock API functions for static deployment
export const mockApi = {
  getStudents: (search?: string, limit = 10, offset = 0) => {
    let filteredStudents = mockStudents;
    
    if (search) {
      filteredStudents = mockStudents.filter(student => 
        `${student.first_name} ${student.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
        student.department?.toLowerCase().includes(search.toLowerCase()) ||
        student.address?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    const total = filteredStudents.length;
    const students = filteredStudents.slice(offset, offset + limit);
    
    return Promise.resolve({ students, total });
  },
  
  getStudent: (id: number) => {
    const student = mockStudents.find(s => s.id === id);
    return Promise.resolve(student);
  },
  
  getChildren: (search?: string, ageRange?: string, limit = 10, offset = 0) => {
    let filteredChildren = mockChildren;
    
    if (search) {
      filteredChildren = mockChildren.filter(child =>
        child.child_name?.toLowerCase().includes(search.toLowerCase()) ||
        child.child_school?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (ageRange) {
      const [min, max] = ageRange.split('-').map(Number);
      filteredChildren = filteredChildren.filter(child =>
        child.child_age && child.child_age >= min && child.child_age <= max
      );
    }
    
    const total = filteredChildren.length;
    const children = filteredChildren.slice(offset, offset + limit);
    
    return Promise.resolve({ children, total });
  },
  
  getChildrenByStudentId: (studentId: number) => {
    const children = mockChildren.filter(child => child.student_id === studentId);
    return Promise.resolve(children);
  },
  
  getStats: () => {
    return Promise.resolve(mockStats);
  },
  
  // Mock auth functions
  login: (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      return Promise.resolve({
        id: 1,
        username: 'admin',
        full_name: 'System Administrator',
        role: 'admin'
      });
    }
    return Promise.reject(new Error('Invalid credentials'));
  },
  
  logout: () => Promise.resolve({ message: 'Logged out successfully' }),
  
  getCurrentUser: () => Promise.resolve({
    id: 1,
    username: 'admin',
    full_name: 'System Administrator',
    role: 'admin'
  })
};
