import React, { useState } from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { DataTableWrapper } from "../../components/data-table/DataTableWrapper";
import { Badge, Button, Tabs, Modal, Input, Select } from "@nbfc/ui";
import { exportToExcel, exportToCSV } from "../../lib/exportUtils";

interface DocumentItem {
  id: string;
  appNo: string;
  customerName: string;
  category: "KYC" | "Financial" | "Property" | "Vehicle";
  docType: string;
  fileName: string;
  fileSize: string;
  ocrStatus: "Extracted (100%)" | "Extracted (95%)" | "Manual Review";
  extractedData: Record<string, string>;
  status: "Verified" | "Pending" | "Rejected";
  uploadedAt: string;
}

const initialDocuments: DocumentItem[] = [
  // KYC
  { id: "1", appNo: "LA-9485", customerName: "Rahul Kapoor", category: "KYC", docType: "Aadhaar Card", fileName: "aadhaar_rahul_kapoor.pdf", fileSize: "1.4 MB", ocrStatus: "Extracted (100%)", extractedData: { "UID Number": "XXXX-XXXX-9012", "Name on ID": "Rahul Kapoor", "DOB": "14/08/1988", "Gender": "Male", "Address Match": "100% Match" }, status: "Verified", uploadedAt: "12 Aug 2026" },
  { id: "2", appNo: "LA-9485", customerName: "Rahul Kapoor", category: "KYC", docType: "PAN Card", fileName: "pan_rahul_kapoor.jpg", fileSize: "850 KB", ocrStatus: "Extracted (100%)", extractedData: { "PAN Number": "ABCDE1234F", "Father's Name": "Suresh Kapoor", "NSDL Status": "Valid & Active" }, status: "Verified", uploadedAt: "12 Aug 2026" },
  { id: "3", appNo: "LA-9485", customerName: "Rahul Kapoor", category: "KYC", docType: "Live Selfie with ID", fileName: "selfie_biometric_rahul.png", fileSize: "1.2 MB", ocrStatus: "Extracted (95%)", extractedData: { "Facial Liveness": "Passed (99.2%)", "Photo ID Match": "98.4% Confidence" }, status: "Verified", uploadedAt: "12 Aug 2026" },
  { id: "4", appNo: "LA-9486", customerName: "Priya Sundaram", category: "KYC", docType: "Passport Photo", fileName: "priya_passport_photo.jpg", fileSize: "420 KB", ocrStatus: "Extracted (100%)", extractedData: { "Resolution": "300 DPI", "Background": "White" }, status: "Verified", uploadedAt: "13 Aug 2026" },
  { id: "5", appNo: "LA-9486", customerName: "Priya Sundaram", category: "KYC", docType: "Address Proof (Utility Bill)", fileName: "electricity_bill_priya.pdf", fileSize: "980 KB", ocrStatus: "Extracted (95%)", extractedData: { "Consumer No": "BESCOM-948201", "Billing Address": "Whitefield, Bengaluru" }, status: "Pending", uploadedAt: "13 Aug 2026" },

  // Financial
  { id: "6", appNo: "LA-9485", customerName: "Rahul Kapoor", category: "Financial", docType: "Bank Statement (6 Months)", fileName: "hdfc_bank_statement_6m.pdf", fileSize: "3.8 MB", ocrStatus: "Extracted (100%)", extractedData: { "Bank": "HDFC Bank Ltd.", "Avg Monthly Balance": "₹ 84,500", "Monthly Salary Inflow": "₹ 1,45,000", "Cheque Returns": "0" }, status: "Verified", uploadedAt: "12 Aug 2026" },
  { id: "7", appNo: "LA-9485", customerName: "Rahul Kapoor", category: "Financial", docType: "Salary Slips (3 Months)", fileName: "salary_slips_q1_tcs.pdf", fileSize: "1.6 MB", ocrStatus: "Extracted (100%)", extractedData: { "Employer": "Tata Consultancy Services", "Net Pay": "₹ 1,45,210", "PF Deduction": "₹ 12,000" }, status: "Verified", uploadedAt: "12 Aug 2026" },
  { id: "8", appNo: "LA-9487", customerName: "Rajeshwar Patel", category: "Financial", docType: "GST Return (GSTR-3B 12M)", fileName: "gstr3b_patel_precision.pdf", fileSize: "4.2 MB", ocrStatus: "Extracted (100%)", extractedData: { "GSTIN": "24LKJHG9876M1Z4", "Annual Turnover": "₹ 4,85,00,000", "Filing Status": "Regular" }, status: "Verified", uploadedAt: "14 Aug 2026" },
  { id: "9", appNo: "LA-9487", customerName: "Rajeshwar Patel", category: "Financial", docType: "MSME Udyam Certificate", fileName: "udyam_registration.pdf", fileSize: "650 KB", ocrStatus: "Extracted (100%)", extractedData: { "Udyam Reg No": "UDYAM-GJ-01-0084920", "Enterprise Type": "Small Manufacturing" }, status: "Verified", uploadedAt: "14 Aug 2026" },
  { id: "10", appNo: "LA-9487", customerName: "Rajeshwar Patel", category: "Financial", docType: "ITR Acknowledgement (3 Years)", fileName: "itr_v_3years_patel.pdf", fileSize: "2.4 MB", ocrStatus: "Extracted (100%)", extractedData: { "AY 2025-26 Taxable Income": "₹ 42,00,000", "AY 2024-25 Taxable Income": "₹ 36,50,000" }, status: "Verified", uploadedAt: "14 Aug 2026" },
  { id: "11", appNo: "LA-9487", customerName: "Rajeshwar Patel", category: "Financial", docType: "Municipal Trade License", fileName: "trade_license_ahmedabad.pdf", fileSize: "820 KB", ocrStatus: "Extracted (95%)", extractedData: { "License No": "AMC-TL-84920", "Validity": "31-03-2027" }, status: "Verified", uploadedAt: "14 Aug 2026" },

  // Property
  { id: "12", appNo: "LA-9485", customerName: "Rahul Kapoor", category: "Property", docType: "Property Registry (Sale Deed)", fileName: "registered_sale_deed_flat4b.pdf", fileSize: "6.5 MB", ocrStatus: "Manual Review", extractedData: { "Deed No": "DEED-2021-8849", "Property Type": "Residential Flat", "Super Built Area": "1650 Sq.Ft.", "Title Holder": "Rahul Kapoor" }, status: "Verified", uploadedAt: "13 Aug 2026" },
  { id: "13", appNo: "LA-9485", customerName: "Rahul Kapoor", category: "Property", docType: "Mutation Certificate Extract", fileName: "mutation_khatian_record.pdf", fileSize: "1.8 MB", ocrStatus: "Extracted (100%)", extractedData: { "Mutation Case No": "MUT-2022-901", "Holding No": "492/B" }, status: "Verified", uploadedAt: "13 Aug 2026" },
  { id: "14", appNo: "LA-9485", customerName: "Rahul Kapoor", category: "Property", docType: "Property Tax Paid Receipt", fileName: "kmc_tax_receipt_2026.pdf", fileSize: "720 KB", ocrStatus: "Extracted (100%)", extractedData: { "Receipt No": "KMC-TAX-2026-884", "Paid Till": "Q4 FY 2025-26" }, status: "Verified", uploadedAt: "13 Aug 2026" },
  { id: "15", appNo: "LA-9485", customerName: "Rahul Kapoor", category: "Property", docType: "Property Valuation & Estimate Report", fileName: "technical_valuation_report.pdf", fileSize: "3.1 MB", ocrStatus: "Extracted (100%)", extractedData: { "Valuer Name": "M. Kulkarni & Associates", "Fair Market Value": "₹ 65,00,000", "Distress Sale Value": "₹ 52,00,000" }, status: "Verified", uploadedAt: "14 Aug 2026" },

  // Vehicle
  { id: "16", appNo: "LA-9489", customerName: "Arun Nair", category: "Vehicle", docType: "Vehicle RC Book", fileName: "rc_book_hyundai_creta.pdf", fileSize: "1.5 MB", ocrStatus: "Extracted (100%)", extractedData: { "Reg No": "TS-09-EA-8849", "Chassis No": "MALC8492019482", "Engine No": "ENG9849201", "Model": "Hyundai Creta SX(O)" }, status: "Verified", uploadedAt: "15 Aug 2026" },
  { id: "17", appNo: "LA-9489", customerName: "Arun Nair", category: "Vehicle", docType: "Vehicle Comprehensive Insurance", fileName: "motor_insurance_policy.pdf", fileSize: "1.1 MB", ocrStatus: "Extracted (100%)", extractedData: { "Policy No": "HDFC-ERGO-98492", "IDV Value": "₹ 14,80,000", "Valid Till": "14-08-2027" }, status: "Verified", uploadedAt: "15 Aug 2026" },
  { id: "18", appNo: "LA-9489", customerName: "Arun Nair", category: "Vehicle", docType: "Road Tax Token", fileName: "rto_tax_token.pdf", fileSize: "550 KB", ocrStatus: "Extracted (100%)", extractedData: { "Tax Type": "One Time Life Tax (LTT)", "Paid Amount": "₹ 1,48,000" }, status: "Verified", uploadedAt: "15 Aug 2026" },
  { id: "19", appNo: "LA-9489", customerName: "Arun Nair", category: "Vehicle", docType: "Driving Licence", fileName: "driving_licence_arun.jpg", fileSize: "780 KB", ocrStatus: "Extracted (100%)", extractedData: { "DL Number": "TS092014008492", "Authorisation": "LMV / MCWG", "Valid Till": "10-09-2038" }, status: "Verified", uploadedAt: "15 Aug 2026" },
];

export const DocumentsFeature: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("all");
  const [selectedDocForViewer, setSelectedDocForViewer] = useState<DocumentItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const categoryTabs = [
    { id: "all", label: "All Documents Vault" },
    { id: "KYC", label: "KYC Documents" },
    { id: "Financial", label: "Financial Documents" },
    { id: "Property", label: "Property Documents" },
    { id: "Vehicle", label: "Vehicle Documents" },
  ];

  const handleUpdateDocStatus = (id: string, newStatus: DocumentItem["status"]) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
    if (selectedDocForViewer && selectedDocForViewer.id === id) {
      setSelectedDocForViewer((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleExport = (format: "excel" | "csv") => {
    const exportData = documents.map((d) => ({
      "Application No": d.appNo,
      "Customer Name": d.customerName,
      Category: d.category,
      "Document Type": d.docType,
      "File Name": d.fileName,
      "File Size": d.fileSize,
      "OCR Status": d.ocrStatus,
      "Verification Status": d.status,
      "Uploaded Date": d.uploadedAt,
    }));

    if (format === "excel") {
      exportToExcel("Documents_Vault_Ledger", "Documents", exportData);
    } else {
      exportToCSV("Documents_Vault_Ledger", exportData);
    }
  };

  const filtered = documents.filter((d) => {
    const matchesSearch =
      d.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.appNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.docType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.fileName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategoryTab === "all" || d.category === activeCategoryTab;

    return matchesSearch && matchesCategory;
  });

  const columns = [
    {
      header: "Document & Application",
      accessorKey: (row: DocumentItem) => (
        <div
          className="cursor-pointer group"
          onClick={() => setSelectedDocForViewer(row)}
        >
          <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
            {row.docType}
          </div>
          <div className="text-[11px] text-slate-400">
            <span className="font-mono font-semibold text-blue-600">{row.appNo}</span> • {row.customerName}
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: (row: DocumentItem) => (
        <Badge
          variant={
            row.category === "KYC"
              ? "info"
              : row.category === "Financial"
              ? "success"
              : row.category === "Property"
              ? "warning"
              : "neutral"
          }
          className="text-[10px]"
        >
          {row.category}
        </Badge>
      ),
    },
    {
      header: "File Details",
      accessorKey: (row: DocumentItem) => (
        <div className="text-xs">
          <span className="font-medium text-slate-800 dark:text-slate-200">{row.fileName}</span>
          <div className="text-[11px] text-slate-400">{row.fileSize}</div>
        </div>
      ),
    },
    {
      header: "OCR AI Extraction",
      accessorKey: (row: DocumentItem) => (
        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          {row.ocrStatus}
        </span>
      ),
    },
    {
      header: "Verification",
      accessorKey: (row: DocumentItem) => (
        <Badge
          variant={row.status === "Verified" ? "success" : row.status === "Pending" ? "warning" : "danger"}
          className="text-[10px]"
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Uploaded",
      accessorKey: (row: DocumentItem) => (
        <span className="text-xs text-slate-500">{row.uploadedAt}</span>
      ),
    },
    {
      header: "Actions",
      accessorKey: (row: DocumentItem) => (
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-blue-600"
            onClick={() => setSelectedDocForViewer(row)}
          >
            Inspect
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => alert(`Downloading file: ${row.fileName}`)}
          >
            Download
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Document Management Vault"
        description="Central repository for borrower KYC, financial statements, property legal registries, and vehicle assets."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              Export Vault Ledger
            </Button>
            <Button size="sm" onClick={() => setIsUploadModalOpen(true)}>
              + Upload Document
            </Button>
          </div>
        }
      />

      <Tabs tabs={categoryTabs} activeTab={activeCategoryTab} onChange={setActiveCategoryTab} />

      <DataTableWrapper
        data={filtered}
        columns={columns}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExport={() => handleExport("csv")}
      />

      {/* Document Inspector / OCR Modal */}
      {selectedDocForViewer && (
        <Modal
          isOpen={!!selectedDocForViewer}
          onClose={() => setSelectedDocForViewer(null)}
          title={`Document Inspector - ${selectedDocForViewer.docType}`}
          className="max-w-2xl"
        >
          <div className="space-y-4 text-xs">
            {/* Header info */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {selectedDocForViewer.customerName}
                  </h4>
                  <span className="font-mono text-blue-600 font-semibold">{selectedDocForViewer.appNo}</span>
                </div>
                <Badge
                  variant={
                    selectedDocForViewer.status === "Verified"
                      ? "success"
                      : selectedDocForViewer.status === "Pending"
                      ? "warning"
                      : "danger"
                  }
                >
                  {selectedDocForViewer.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 text-slate-500 pt-1">
                <div>File: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedDocForViewer.fileName}</span></div>
                <div>Size: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedDocForViewer.fileSize}</span></div>
                <div>Uploaded: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedDocForViewer.uploadedAt}</span></div>
              </div>
            </div>

            {/* OCR Extracted Data Matrix */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px]">
                  AI OCR Data Extraction Insights:
                </span>
                <span className="text-emerald-600 font-semibold text-[11px]">{selectedDocForViewer.ocrStatus}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono space-y-1.5 border border-slate-800">
                {Object.entries(selectedDocForViewer.extractedData).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-slate-800 pb-1 text-[11px]">
                    <span className="text-slate-400">{key}:</span>
                    <span className="text-emerald-400 font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert(`Downloading original file: ${selectedDocForViewer.fileName}`)}
              >
                Download Original File
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-rose-600 hover:bg-rose-50"
                  onClick={() => handleUpdateDocStatus(selectedDocForViewer.id, "Rejected")}
                >
                  Mark as Rejected
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleUpdateDocStatus(selectedDocForViewer.id, "Verified")}
                >
                  Mark as Verified
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Document Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Document to Vault"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Document uploaded and queued for automated OCR indexing.");
            setIsUploadModalOpen(false);
          }}
          className="space-y-4"
        >
          <Input label="Application Number" placeholder="e.g. LA-9485" required />
          <Input label="Customer Full Name" placeholder="e.g. Rahul Kapoor" required />
          <Select
            label="Document Category"
            options={[
              { label: "KYC Documents", value: "KYC" },
              { label: "Financial Documents", value: "Financial" },
              { label: "Property Documents", value: "Property" },
              { label: "Vehicle Documents", value: "Vehicle" },
            ]}
          />
          <Input label="Document Title / Specific Type" placeholder="e.g. Aadhaar Card / Salary Slip" required />
          
          <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-2">
            <span className="text-xs text-slate-500 block">Drag & Drop PDF or Image file here (Max 15MB)</span>
            <Button size="sm" variant="outline" type="button">Browse Local Files</Button>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="outline" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Upload & Run OCR</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DocumentsFeature;
