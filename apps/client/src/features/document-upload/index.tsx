import React from "react";
import { Button, Badge } from "@nbfc/ui";

export const DocumentUploadFeature: React.FC = () => {
  const documentSlots = [
    { title: "Aadhaar Card (Front & Back)", type: "KYC", status: "Uploaded" },
    { title: "PAN Card", type: "KYC", status: "Uploaded" },
    { title: "Bank Statement (Last 6 Months)", type: "Financial", status: "Pending Upload" },
    { title: "Salary Slip / ITR", type: "Income", status: "Pending Upload" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Document Upload Center</h2>
        <p className="text-sm text-slate-500 mt-1">Upload verified PDF / Images for instant AI document verification.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {documentSlots.map((doc, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{doc.title}</h4>
                <Badge variant={doc.status === "Uploaded" ? "success" : "warning"}>{doc.status}</Badge>
              </div>
              <p className="text-xs text-slate-400 mt-1">Category: {doc.type}</p>
            </div>
            <Button variant="outline" size="sm">
              {doc.status === "Uploaded" ? "Replace File" : "Upload Document"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentUploadFeature;
