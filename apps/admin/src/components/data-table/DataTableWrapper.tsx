import React from "react";
import { DataTable, DataTableProps, Input, Button } from "@nbfc/ui";

export interface DataTableWrapperProps<T = any> extends DataTableProps<T> {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onExport?: () => void;
}

export function DataTableWrapper<T = any>({
  data,
  columns,
  searchQuery,
  onSearchChange,
  onExport,
  emptyMessage,
}: DataTableWrapperProps<T>) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        {onSearchChange && (
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search..."
              value={searchQuery || ""}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}
        {onExport && (
          <Button variant="outline" size="sm" onClick={onExport}>
            Export Data
          </Button>
        )}
      </div>

      <DataTable data={data} columns={columns} emptyMessage={emptyMessage} />
    </div>
  );
}
