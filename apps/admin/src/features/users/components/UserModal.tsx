import React, { useState } from "react";
import { Modal, Button, Input, Select } from "@nbfc/ui";
import { Role } from "@nbfc/shared-types";

export interface UserFormData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  branch: string;
  area: string;
  status: "Active" | "Inactive" | "Suspended";
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: UserFormData) => void;
  initialData?: UserFormData | null;
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<UserFormData>(
    initialData || {
      name: "",
      email: "",
      phone: "",
      role: Role.STAFF,
      branch: "Kolkata Central",
      area: "West Bengal East",
      status: "Active",
    }
  );

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: Role.STAFF,
        branch: "Kolkata Central",
        area: "West Bengal East",
        status: "Active",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Name and email are required.");
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit System User" : "Add New System User"}
      className="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="e.g. Ramesh Chandra"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="ramesh@nbfc.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Mobile Number"
            placeholder="+91 9876543210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Select
            label="System Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
            options={[
              { label: "Super Admin", value: Role.SUPER_ADMIN },
              { label: "Company Admin", value: Role.COMPANY_ADMIN },
              { label: "Area Manager", value: Role.AREA_MANAGER },
              { label: "Branch Manager", value: Role.BRANCH_MANAGER },
              { label: "DSA Partner", value: Role.DSA },
              { label: "Connector", value: Role.CONNECTOR },
              { label: "Operations Staff", value: Role.STAFF },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Assigned Branch"
            value={formData.branch}
            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            options={[
              { label: "Kolkata Central", value: "Kolkata Central" },
              { label: "Mumbai Nariman Point", value: "Mumbai Nariman Point" },
              { label: "Delhi Connaught Place", value: "Delhi Connaught Place" },
              { label: "Bengaluru Koramangala", value: "Bengaluru Koramangala" },
              { label: "Hyderabad Hitech City", value: "Hyderabad Hitech City" },
            ]}
          />
          <Select
            label="Account Status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value as UserFormData["status"] })
            }
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
              { label: "Suspended", value: "Suspended" },
            ]}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update User" : "Create User"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
