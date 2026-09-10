import { AxiosInstance } from "axios";
import { ApiMode } from "@nbfc/shared-types";
import { mockDatabase, MockAuditLog } from "../mock/mockDatabase";
import { simulateDelay } from "../mock/mockAdapter";

export function createSettingsApi(client: AxiosInstance, mode: ApiMode = "mock") {
  return {
    getCompanyProfile: async (): Promise<any> => {
      if (mode === "mock") {
        return simulateDelay({
          companyName: "Arohon Financial Services Private Limited",
          legalEntity: "NBFC-ICC (Investment & Credit Company - RBI Registered)",
          registrationNo: "RBI-NBFC-WB-10948",
          cin: "U65990WB2020PTC239841",
          corporateOffice: "Arohon Heights, 4th Floor, Sector V, Salt Lake, Kolkata 700091",
          nodalOfficerName: "Rajesh Khurana",
          nodalOfficerEmail: "nodal.officer@arohonloans.com",
          escrowBankName: "HDFC Bank Ltd. (Corporate Escrow A/C)",
        });
      }
      const { data } = await client.get("/company/profile");
      return data;
    },

    getCompanySettings: async (): Promise<any> => {
      if (mode === "mock") {
        return simulateDelay({
          currency: "INR",
          timezone: "Asia/Kolkata",
          defaultSlaHours: 48,
          autoEscalationEnabled: true,
          smsGateway: "Twilio / Gupshup Active",
          emailSmtp: "Amazon SES Configured",
        });
      }
      const { data } = await client.get("/settings");
      return data;
    },

    getRolesAndPermissions: async (): Promise<any> => {
      if (mode === "mock") {
        return simulateDelay({
          rolesCount: 10,
          modulesCount: 22,
          permissionsMatrix: [
            { module: "Loan Origination", superAdmin: true, creditOfficer: true, branchManager: true, customer: false },
            { module: "Sanction Authority", superAdmin: true, creditOfficer: true, branchManager: false, customer: false },
            { module: "Disbursement Release", superAdmin: true, creditOfficer: false, branchManager: false, customer: false },
          ],
        });
      }
      const { data } = await client.get("/roles-permissions");
      return data;
    },

    getAuditLogs: async (): Promise<MockAuditLog[]> => {
      if (mode === "mock") {
        return simulateDelay(mockDatabase.auditLogs);
      }
      const { data } = await client.get<MockAuditLog[]>("/security/audit-logs");
      return data;
    },

    getCMSContent: async (): Promise<any> => {
      if (mode === "mock") {
        return simulateDelay({
          banners: [{ id: "b1", title: "Instant Business Loans up to ₹50 Lakhs", active: true }],
          faqs: [{ q: "What are the required documents for LAP?", a: "Property deed, 3-yr ITR, 6-mo bank statement." }],
        });
      }
      const { data } = await client.get("/cms/content");
      return data;
    },
  };
}
