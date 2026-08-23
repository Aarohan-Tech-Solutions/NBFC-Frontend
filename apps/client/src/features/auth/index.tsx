import React, { useState } from "react";
import { Input, Button, Tabs } from "@nbfc/ui";

export const AuthFeature: React.FC = () => {
  const [activeTab, setActiveTab] = useState("otp");

  const tabs = [
    { id: "otp", label: "Mobile + OTP Login" },
    { id: "password", label: "User ID & Password" },
  ];

  return (
    <div className="max-w-md mx-auto my-12 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Welcome Back</h2>
        <p className="text-xs text-slate-500 mt-1">Access your loan applications and status tracking</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "otp" ? (
        <div className="space-y-4">
          <Input label="Mobile Number" placeholder="+91 98765 43210" />
          <Button className="w-full">Send OTP</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Input label="User ID / Email" placeholder="user@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Button className="w-full">Sign In</Button>
        </div>
      )}
    </div>
  );
};

export default AuthFeature;
