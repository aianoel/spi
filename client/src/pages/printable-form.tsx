export default function PrintableForm() {
  return (
    <div className="min-h-screen bg-white p-8 print:p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-black pb-4">
          <h1 className="text-3xl font-bold text-black mb-2">
            STUDENT PROFILE INFORMATION (SPI) FORM
          </h1>
          <p className="text-lg text-black">
            Please fill out all information clearly and completely
          </p>
        </div>

        {/* Personal Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4 bg-gray-100 p-2 border border-black">
            PERSONAL INFORMATION
          </h2>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="border border-black p-2">
              <label className="block text-sm font-semibold text-black mb-1">LAST NAME *</label>
              <div className="h-6 border-b border-black"></div>
            </div>
            <div className="border border-black p-2">
              <label className="block text-sm font-semibold text-black mb-1">FIRST NAME *</label>
              <div className="h-6 border-b border-black"></div>
            </div>
            <div className="border border-black p-2">
              <label className="block text-sm font-semibold text-black mb-1">MIDDLE NAME</label>
              <div className="h-6 border-b border-black"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="border border-black p-2">
              <label className="block text-sm font-semibold text-black mb-1">NICKNAME</label>
              <div className="h-6 border-b border-black"></div>
            </div>
            <div className="border border-black p-2">
              <label className="block text-sm font-semibold text-black mb-1">BIRTH DATE</label>
              <div className="h-6 border-b border-black"></div>
            </div>
            <div className="border border-black p-2">
              <label className="block text-sm font-semibold text-black mb-1">BIRTH PLACE</label>
              <div className="h-6 border-b border-black"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="border border-black p-2">
              <label className="block text-sm font-semibold text-black mb-1">GENDER</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" /> Male
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" /> Female
                </label>
              </div>
            </div>
            <div className="border border-black p-2">
              <label className="block text-sm font-semibold text-black mb-1">RELIGION</label>
              <div className="h-6 border-b border-black"></div>
            </div>
            <div className="border border-black p-2">
              <label className="block text-sm font-semibold text-black mb-1">NATIONALITY</label>
              <div className="h-6 border-b border-black"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="border border-black p-2">
              <label className="block text-sm font-semibold text-black mb-1">COMPLETE ADDRESS</label>
              <div className="h-12 border-b border-black"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-black p-2">
              <label className="block text-sm font-semibold text-black mb-1">CONTACT NUMBER</label>
              <div className="h-6 border-b border-black"></div>
            </div>
          </div>
        </div>

        {/* Academic Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4 bg-gray-100 p-2 border border-black">
            ACADEMIC INFORMATION
          </h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-black p-2">
              <label className="block text-sm font-semibold text-black mb-1">DEPARTMENT</label>
              <div className="space-y-1 mt-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" /> Elementary
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" /> Junior High School
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" /> Senior High School
                </label>
              </div>
            </div>
            <div className="border border-black p-2">
              <label className="block text-sm font-semibold text-black mb-1">YEAR/GRADE</label>
              <div className="h-6 border-b border-black"></div>
            </div>
            <div className="border border-black p-2">
              <label className="block text-sm font-semibold text-black mb-1">SECTION/STRAND</label>
              <div className="h-6 border-b border-black"></div>
            </div>
          </div>
        </div>

        {/* Family Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4 bg-gray-100 p-2 border border-black">
            FAMILY INFORMATION
          </h2>

          {/* Father's Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-black mb-3 border-b border-black pb-1">
              FATHER'S INFORMATION
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">FATHER'S NAME</label>
                <div className="h-6 border-b border-black"></div>
              </div>
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">AGE</label>
                <div className="h-6 border-b border-black"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">EDUCATION</label>
                <div className="h-6 border-b border-black"></div>
              </div>
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">OCCUPATION</label>
                <div className="h-6 border-b border-black"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">EMPLOYER</label>
                <div className="h-6 border-b border-black"></div>
              </div>
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">WORK PLACE</label>
                <div className="h-6 border-b border-black"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">CITIZENSHIP</label>
                <div className="h-6 border-b border-black"></div>
              </div>
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">CONTACT NUMBER</label>
                <div className="h-6 border-b border-black"></div>
              </div>
            </div>
          </div>

          {/* Mother's Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-black mb-3 border-b border-black pb-1">
              MOTHER'S INFORMATION
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">MOTHER'S NAME</label>
                <div className="h-6 border-b border-black"></div>
              </div>
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">AGE</label>
                <div className="h-6 border-b border-black"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">EDUCATION</label>
                <div className="h-6 border-b border-black"></div>
              </div>
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">OCCUPATION</label>
                <div className="h-6 border-b border-black"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">EMPLOYER</label>
                <div className="h-6 border-b border-black"></div>
              </div>
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">WORK PLACE</label>
                <div className="h-6 border-b border-black"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">CITIZENSHIP</label>
                <div className="h-6 border-b border-black"></div>
              </div>
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">CONTACT NUMBER</label>
                <div className="h-6 border-b border-black"></div>
              </div>
            </div>
          </div>

          {/* Guardian's Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-black mb-3 border-b border-black pb-1">
              GUARDIAN'S INFORMATION (if different from parents)
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">GUARDIAN'S NAME</label>
                <div className="h-6 border-b border-black"></div>
              </div>
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">AGE</label>
                <div className="h-6 border-b border-black"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">EDUCATION</label>
                <div className="h-6 border-b border-black"></div>
              </div>
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">OCCUPATION</label>
                <div className="h-6 border-b border-black"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">EMPLOYER</label>
                <div className="h-6 border-b border-black"></div>
              </div>
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">WORK PLACE</label>
                <div className="h-6 border-b border-black"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">CITIZENSHIP</label>
                <div className="h-6 border-b border-black"></div>
              </div>
              <div className="border border-black p-2">
                <label className="block text-sm font-semibold text-black mb-1">CONTACT NUMBER</label>
                <div className="h-6 border-b border-black"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t-2 border-black pt-4">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-black mb-4">
                I hereby certify that all information provided above is true and correct to the best of my knowledge.
              </p>
              <div className="border-b border-black mb-2"></div>
              <p className="text-xs text-black">Signature of Student/Parent/Guardian</p>
            </div>
            <div>
              <p className="text-sm text-black mb-4">Date:</p>
              <div className="border-b border-black mb-2"></div>
              <p className="text-xs text-black">Date Submitted</p>
            </div>
          </div>
        </div>

        {/* Print Instructions */}
        <div className="mt-8 p-4 bg-gray-100 border border-gray-300 print:hidden">
          <p className="text-sm text-gray-700">
            <strong>Printing Instructions:</strong> Use your browser's print function (Ctrl+P or Cmd+P) to print this form. 
            Make sure to select "More settings" and enable "Background graphics" for the best print quality.
          </p>
        </div>
      </div>

    </div>
  );
}