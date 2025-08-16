import { useEffect, useState } from 'react';
import { Student, Child } from '@shared/schema';

interface StudentInventoryFormProps {
  studentId?: number;
  student?: Student;
}

export default function StudentInventoryForm({ studentId, student: propStudent }: StudentInventoryFormProps) {
  const [student, setStudent] = useState<Student | null>(propStudent || null);
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(!propStudent && !!studentId);

  useEffect(() => {
    if (studentId && !propStudent) {
      fetchStudentData();
    }
  }, [studentId, propStudent]);

  const fetchStudentData = async () => {
    try {
      const [studentRes, childrenRes] = await Promise.all([
        fetch(`/api/students/${studentId}`),
        fetch(`/api/students/${studentId}/children`)
      ]);

      if (studentRes.ok) {
        const studentData = await studentRes.json();
        setStudent(studentData);
      }

      if (childrenRes.ok) {
        const childrenData = await childrenRes.json();
        setChildren(childrenData);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!student) {
    return <div className="text-center text-red-600">Student not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Print Button - Hidden when printing */}
      <div className="print:hidden p-4 bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Student Personal Inventory</h1>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Print Form
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto p-8 print:p-4">
        {/* Header with Logo and School Info */}
        <div className="text-center mb-6 border-b-2 border-black pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-600 font-bold text-lg">ICS</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black">
                IMMACULATE CONCEPTION SCHOOL OF NAIC INC.
              </h1>
              <p className="text-sm text-black">Naic, Cavite • Philippines</p>
              <p className="text-lg font-semibold text-black mt-2">
                STUDENT'S PERSONAL INVENTORY
              </p>
            </div>
            {/* Student Photo Placeholder */}
            <div className="w-24 h-32 border-2 border-black ml-4 flex items-center justify-center bg-gray-50">
              {student.photo_path ? (
                <img 
                  src={`/uploads/${student.photo_path}`} 
                  alt="Student Photo" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-500 text-center">Student Photo</span>
              )}
            </div>
          </div>
        </div>

        {/* I. Student Department & History */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black mb-3 bg-gray-200 p-2 border border-black">
            I. Student Department & History
          </h2>
          <table className="w-full border-collapse border border-black text-sm">
            <thead>
              <tr>
                <th className="border border-black p-2 bg-gray-100">Department</th>
                <th className="border border-black p-2 bg-gray-100">Year</th>
                <th className="border border-black p-2 bg-gray-100">Level</th>
                <th className="border border-black p-2 bg-gray-100">Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2 h-8">{student.department || ''}</td>
                <td className="border border-black p-2 h-8">{student.year || ''}</td>
                <td className="border border-black p-2 h-8">{student.level || ''}</td>
                <td className="border border-black p-2 h-8"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* II. Personal Information */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black mb-3 bg-gray-200 p-2 border border-black">
            II. Personal Information
          </h2>
          
          <table className="w-full border-collapse border border-black text-sm mb-4">
            <tbody>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100 w-32">Full Name</td>
                <td className="border border-black p-2">{`${student.first_name || ''} ${student.middle_name || ''} ${student.last_name || ''}`}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100 w-32">Nickname</td>
                <td className="border border-black p-2">{student.nickname || ''}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Date of Birth</td>
                <td className="border border-black p-2">{student.birth_date || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100">Place of Birth</td>
                <td className="border border-black p-2">{student.birth_place || ''}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Gender</td>
                <td className="border border-black p-2">{student.gender || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100">Religion</td>
                <td className="border border-black p-2">{student.religion || ''}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Nationality</td>
                <td className="border border-black p-2">{student.nationality || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100">Contact Number</td>
                <td className="border border-black p-2">{student.contact_number || ''}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Present Address</td>
                <td className="border border-black p-2" colSpan={3}>{student.address || ''}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* III. Father's Information */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black mb-3 bg-gray-200 p-2 border border-black">
            III. Father's Information
          </h2>
          
          <table className="w-full border-collapse border border-black text-sm">
            <tbody>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100 w-32">Name</td>
                <td className="border border-black p-2">{student.father_name || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100 w-24">Age</td>
                <td className="border border-black p-2 w-24">{student.father_age || ''}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Education</td>
                <td className="border border-black p-2">{student.father_education || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100">Occupation</td>
                <td className="border border-black p-2">{student.father_occupation || ''}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Employer</td>
                <td className="border border-black p-2">{student.father_employer || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100">Place of Work</td>
                <td className="border border-black p-2">{student.father_work_place || ''}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Citizenship</td>
                <td className="border border-black p-2">{student.father_citizenship || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100">Contact</td>
                <td className="border border-black p-2">{student.father_contact || ''}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* IV. Mother's Information */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black mb-3 bg-gray-200 p-2 border border-black">
            IV. Mother's Information
          </h2>
          
          <table className="w-full border-collapse border border-black text-sm">
            <tbody>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100 w-32">Name</td>
                <td className="border border-black p-2">{student.mother_name || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100 w-24">Age</td>
                <td className="border border-black p-2 w-24">{student.mother_age || ''}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Education</td>
                <td className="border border-black p-2">{student.mother_education || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100">Occupation</td>
                <td className="border border-black p-2">{student.mother_occupation || ''}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Employer</td>
                <td className="border border-black p-2">{student.mother_employer || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100">Place of Work</td>
                <td className="border border-black p-2">{student.mother_work_place || ''}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Citizenship</td>
                <td className="border border-black p-2">{student.mother_citizenship || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100">Contact</td>
                <td className="border border-black p-2">{student.mother_contact || ''}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* V. Guardian */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-black mb-3 bg-gray-200 p-2 border border-black">
            V. Guardian
          </h2>
          
          <table className="w-full border-collapse border border-black text-sm">
            <tbody>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100 w-32">Name</td>
                <td className="border border-black p-2">{student.guardian_name || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100 w-24">Age</td>
                <td className="border border-black p-2 w-24">{student.guardian_age || ''}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Education</td>
                <td className="border border-black p-2">{student.guardian_education || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100">Occupation</td>
                <td className="border border-black p-2">{student.guardian_occupation || ''}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Employer</td>
                <td className="border border-black p-2">{student.guardian_employer || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100">Place of Work</td>
                <td className="border border-black p-2">{student.guardian_work_place || ''}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-semibold bg-gray-100">Citizenship</td>
                <td className="border border-black p-2">{student.guardian_citizenship || ''}</td>
                <td className="border border-black p-2 font-semibold bg-gray-100">Contact</td>
                <td className="border border-black p-2">{student.guardian_contact || ''}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* VI. Family Composition */}
        {children.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-black mb-3 bg-gray-200 p-2 border border-black">
              VI. Family Composition (Living at Home)
            </h2>
            
            <table className="w-full border-collapse border border-black text-sm">
              <thead>
                <tr>
                  <th className="border border-black p-2 bg-gray-100">Name</th>
                  <th className="border border-black p-2 bg-gray-100">Age</th>
                  <th className="border border-black p-2 bg-gray-100">Status</th>
                  <th className="border border-black p-2 bg-gray-100">School</th>
                  <th className="border border-black p-2 bg-gray-100">Occupation</th>
                </tr>
              </thead>
              <tbody>
                {children.map((child, index) => (
                  <tr key={index}>
                    <td className="border border-black p-2">{child.child_name || ''}</td>
                    <td className="border border-black p-2">{child.child_age || ''}</td>
                    <td className="border border-black p-2">{child.child_status || ''}</td>
                    <td className="border border-black p-2">{child.child_school || ''}</td>
                    <td className="border border-black p-2">{child.child_occupation || ''}</td>
                  </tr>
                ))}
                {/* Add empty rows if needed */}
                {Array.from({ length: Math.max(0, 3 - children.length) }).map((_, index) => (
                  <tr key={`empty-${index}`}>
                    <td className="border border-black p-2 h-8"></td>
                    <td className="border border-black p-2 h-8"></td>
                    <td className="border border-black p-2 h-8"></td>
                    <td className="border border-black p-2 h-8"></td>
                    <td className="border border-black p-2 h-8"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-xs text-center">
          <p>This document was generated electronically by the Student Information System</p>
          <p>Printed on: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { margin: 0; }
          .print\\:hidden { display: none !important; }
          .print\\:p-4 { padding: 1rem !important; }
          @page { 
            margin: 0.5in; 
            size: A4;
          }
        }
      `}</style>
    </div>
  );
}
