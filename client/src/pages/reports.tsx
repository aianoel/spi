import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileSpreadsheet, FileText, BarChart3, Download, Loader2 } from "lucide-react";

export default function Reports() {
  const [loadingReports, setLoadingReports] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const handleGenerateReport = async (reportType: string) => {
    setLoadingReports(prev => ({ ...prev, [reportType]: true }));
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success",
        description: `${reportType} report generated successfully. Download will begin shortly.`,
      });
      
      // In a real app, this would trigger a file download
      // const response = await fetch(`/api/reports/${reportType}`, { 
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `${reportType}-report.csv`;
      // document.body.appendChild(a);
      // a.click();
      // window.URL.revokeObjectURL(url);
      // document.body.removeChild(a);
      
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to generate ${reportType} report. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoadingReports(prev => ({ ...prev, [reportType]: false }));
    }
  };

  const reports = [
    {
      id: "student",
      title: "Student Report",
      description: "Export all student data",
      icon: FileSpreadsheet,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      buttonColor: "bg-primary hover:bg-blue-700",
    },
    {
      id: "children",
      title: "Children Report", 
      description: "Export children data",
      icon: FileText,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      buttonColor: "bg-success hover:bg-green-600",
    },
    {
      id: "analytics",
      title: "Analytics Report",
      description: "System usage analytics",
      icon: BarChart3,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2" data-testid="text-page-title">
          Reports & Analytics
        </h1>
        <p className="text-gray-600">Generate and view comprehensive reports</p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          const isLoading = loadingReports[report.id];
          
          return (
            <Card key={report.id} className="border border-gray-200" data-testid={`card-report-${report.id}`}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 ${report.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`${report.iconColor} text-xl`} size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800" data-testid={`text-report-title-${report.id}`}>
                      {report.title}
                    </h3>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                </div>
                
                <Button
                  onClick={() => handleGenerateReport(report.id)}
                  disabled={isLoading}
                  className={`w-full text-white ${report.buttonColor} transition-colors duration-200`}
                  data-testid={`button-generate-${report.id}`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2" size={16} />
                      Generate Report
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Information */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Report Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Student Report</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Complete student profiles</li>
                <li>• Contact information</li>
                <li>• Parent/guardian details</li>
                <li>• Academic information</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Children Report</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Child records linked to students</li>
                <li>• Age and status information</li>
                <li>• School enrollment data</li>
                <li>• Occupation details</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Analytics Report</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• System usage statistics</li>
                <li>• User activity logs</li>
                <li>• Data growth trends</li>
                <li>• Performance metrics</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> All reports are exported in CSV format for easy data processing. 
              Large reports may take a few minutes to generate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
