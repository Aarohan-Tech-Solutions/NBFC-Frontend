import React, { useState } from "react";
import { Button, Badge, Select } from "@nbfc/ui";
import { getRequiredDocuments, LoanType, EmploymentType } from "@nbfc/shared-types";
import { UploadCloud, CheckCircle2, FileText, AlertCircle } from "lucide-react";

export const DocumentUploadFeature: React.FC = () => {
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType>(LoanType.PERSONAL);
  const [employmentType, setEmploymentType] = useState<EmploymentType>("salaried");
  const [uploadedDocIds, setUploadedDocIds] = useState<string[]>([
    "p_aadhaar",
    "p_pan",
    "m_kyc",
    "c_applicant_kyc",
  ]);

  const requirements = getRequiredDocuments(selectedLoanType, {
    employmentType,
    hasCoApplicant: true,
  });

  const toggleUpload = (id: string) => {
    setUploadedDocIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const mandatoryCount = requirements.filter((d) => d.isMandatory).length;
  const completedMandatoryCount = requirements.filter(
    (d) => d.isMandatory && uploadedDocIds.includes(d.id)
  ).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Document Upload Center
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Dynamic document checklist tailored to your loan product and employment category.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <Select
          label="Select Loan Product Category"
          value={selectedLoanType}
          onChange={(e) => setSelectedLoanType(e.target.value as LoanType)}
          options={[
            { label: "Personal Loan", value: LoanType.PERSONAL },
            { label: "Mortgage Loan / LAP", value: LoanType.MORTGAGE },
            { label: "Car / Auto Loan", value: LoanType.CAR },
            { label: "Home Loan", value: LoanType.HOME },
            { label: "Business Loan", value: LoanType.BUSINESS },
            { label: "Education Loan", value: LoanType.EDUCATION },
            { label: "Gold Loan", value: LoanType.GOLD },
          ]}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Applicant Employment Category
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setEmploymentType("salaried")}
              className={`py-2 px-3 rounded-xl font-bold text-xs transition-all border ${
                employmentType === "salaried"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              Salaried
            </button>
            <button
              type="button"
              onClick={() => setEmploymentType("self_employed")}
              className={`py-2 px-3 rounded-xl font-bold text-xs transition-all border ${
                employmentType === "self_employed"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              Self-Employed / Business
            </button>
          </div>
        </div>
      </div>

      {/* Progress Status Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between shadow-lg">
        <div className="space-y-1">
          <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
            Verification Readiness
          </span>
          <p className="text-sm font-semibold">
            {completedMandatoryCount} of {mandatoryCount} mandatory documents uploaded
          </p>
        </div>
        <div className="w-32 bg-white/20 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#00d2b4] h-full transition-all duration-300"
            style={{
              width: `${(completedMandatoryCount / Math.max(mandatoryCount, 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Dynamic Document Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {requirements.map((doc) => {
          const isUploaded = uploadedDocIds.includes(doc.id);

          return (
            <div
              key={doc.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                isUploaded
                  ? "bg-white dark:bg-slate-900 border-emerald-500/50 shadow-sm"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              }`}
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-start gap-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isUploaded
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40"
                          : "bg-blue-50 text-blue-600 dark:bg-blue-950/40"
                      }`}
                    >
                      {isUploaded ? <CheckCircle2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-snug">
                        {doc.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1">{doc.description}</p>
                    </div>
                  </div>

                  <Badge variant={isUploaded ? "success" : doc.isMandatory ? "warning" : "neutral"}>
                    {isUploaded ? "Uploaded" : doc.isMandatory ? "Required" : "Optional"}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 mt-3 text-[10px] text-slate-500">
                  <span className="font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                    Category: {doc.category}
                  </span>
                  {doc.conditionalNote && (
                    <span className="text-amber-600 dark:text-amber-400 truncate max-w-[200px]">
                      • {doc.conditionalNote}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  Formats: {doc.acceptableFormats?.join(", ") || "PDF, JPG"}
                </span>

                <Button
                  variant={isUploaded ? "outline" : "primary"}
                  size="sm"
                  onClick={() => toggleUpload(doc.id)}
                  className="text-xs"
                >
                  <UploadCloud className="w-3.5 h-3.5 mr-1" />
                  {isUploaded ? "Replace File" : "Upload Document"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentUploadFeature;
