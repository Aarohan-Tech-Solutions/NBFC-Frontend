import React from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { Input, Button } from "@nbfc/ui";

export const SettingsFeature: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="System Settings"
        description="General application configuration, Email Gateway, SMS API, WhatsApp Gateway, and Automated Backup."
      />
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 max-w-2xl">
        <Input label="SMS Gateway Provider (e.g., Twilio / Fast2SMS)" defaultValue="Fast2SMS API v2" />
        <Input label="WhatsApp Business API Token" defaultValue="************************" type="password" />
        <Input label="SMTP Server Host" defaultValue="smtp.sendgrid.net" />
        <Button size="md">Save Integration Config</Button>
      </div>
    </div>
  );
};

export default SettingsFeature;
