import React from "react";
import { PageHeader } from "../../components/layout/PageHeader";
import { Button } from "@nbfc/ui";

export const CMSFeature: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="CMS & Customer Portal Content"
        description="Manage promotional banners, blogs, FAQs, customer testimonials, and legal disclosures."
        action={<Button size="sm">+ Create Banner</Button>}
      />
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h4 className="font-bold text-slate-900 dark:text-slate-100">Customer Portal Hero Banners</h4>
        <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-lg text-xs text-slate-500">
          Banner 1: "Instant Personal Loans up to ₹25 Lakhs @ 10.5% p.a." [Active]
        </div>
      </div>
    </div>
  );
};

export default CMSFeature;
