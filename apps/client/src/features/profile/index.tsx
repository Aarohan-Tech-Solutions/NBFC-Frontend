import React from "react";
import { useCustomerAuth } from "../../hooks/useAuth";
import { Input, Button, Badge } from "@nbfc/ui";

export const ProfileFeature: React.FC = () => {
  const { customer } = useCustomerAuth();

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
      <div className="flex justify-between items-center border-b pb-4 border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Customer Profile & KYC</h2>
          <p className="text-xs text-slate-500">Your verified borrower information</p>
        </div>
        <Badge variant={customer?.kycVerified ? "success" : "warning"}>
          {customer?.kycVerified ? "KYC Verified" : "KYC Pending"}
        </Badge>
      </div>

      <div className="space-y-4">
        <Input label="Full Name" defaultValue={customer?.fullName || "Rahul Kapoor"} readOnly />
        <Input label="Mobile Number" defaultValue={customer?.phone || "+91 9988776655"} readOnly />
        <Input label="Email Address" defaultValue={customer?.email || "rahul.kapoor@example.com"} />
        <Input label="PAN Number" defaultValue="ABCDE1234F" readOnly />
        <Button size="md">Update Profile</Button>
      </div>
    </div>
  );
};

export default ProfileFeature;
