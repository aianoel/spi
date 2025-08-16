import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import StudentInventoryForm from '../components/StudentInventoryForm';

export default function StudentInventoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return (
      <div className="text-center text-red-600 p-8">
        Invalid student ID
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation - Hidden when printing */}
      <div className="print:hidden bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/students')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Students
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              Student Personal Inventory
            </h1>
            <div></div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <StudentInventoryForm studentId={parseInt(id)} />
    </div>
  );
}
