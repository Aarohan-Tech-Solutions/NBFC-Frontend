/**
 * Utility functions for exporting data to CSV, Excel, and PDF formats.
 */

export function exportToCSV(filename: string, rows: Record<string, any>[], headers?: string[]) {
  if (!rows || !rows.length) {
    alert("No data available to export.");
    return;
  }

  const keys = headers || Object.keys(rows[0]);
  const csvContent = [
    keys.join(","),
    ...rows.map((row) =>
      keys
        .map((k) => {
          let val = row[k] ?? "";
          if (typeof val === "object") val = JSON.stringify(val);
          const escaped = String(val).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename.endsWith(".csv") ? filename : `${filename}.csv`}`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToExcel(filename: string, sheetName: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) {
    alert("No data available to export.");
    return;
  }

  const keys = Object.keys(rows[0]);
  let tableHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
  tableHtml += `<head><meta charset="utf-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${sheetName}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>`;
  tableHtml += `<table border="1" style="border-collapse:collapse;font-family:sans-serif;font-size:12px;">`;
  tableHtml += `<thead><tr style="background-color:#1e293b;color:#ffffff;">`;
  keys.forEach((k) => {
    tableHtml += `<th style="padding:8px 12px;">${k.replace(/([A-Z])/g, " $1").toUpperCase()}</th>`;
  });
  tableHtml += `</tr></thead><tbody>`;

  rows.forEach((row, idx) => {
    const bg = idx % 2 === 0 ? "#ffffff" : "#f8fafc";
    tableHtml += `<tr style="background-color:${bg};">`;
    keys.forEach((k) => {
      let val = row[k] ?? "";
      if (typeof val === "object") val = JSON.stringify(val);
      tableHtml += `<td style="padding:6px 10px;">${String(val)}</td>`;
    });
    tableHtml += `</tr>`;
  });

  tableHtml += `</tbody></table></body></html>`;

  const blob = new Blob([tableHtml], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename.endsWith(".xls") ? filename : `${filename}.xls`}`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToPDF(filename: string, title: string, headers: string[], rows: any[][]) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to generate the printable PDF report.");
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 24px; color: #0f172a; }
          .header { border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
          .title { font-size: 20px; font-weight: bold; color: #1e293b; }
          .meta { font-size: 11px; color: #64748b; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 11px; }
          th { background-color: #f1f5f9; text-align: left; padding: 8px 10px; font-weight: 600; color: #334155; border-bottom: 1px solid #cbd5e1; }
          td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }
          tr:nth-child(even) { background-color: #f8fafc; }
          .footer { margin-top: 24px; font-size: 10px; color: #94a3b8; text-align: right; }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">${title}</div>
            <div class="meta">NBFC DSA Loan Management System | Generated on: ${new Date().toLocaleString()}</div>
          </div>
          <button onclick="window.print()" style="padding: 6px 14px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Print / Save as PDF</button>
        </div>
        <table>
          <thead>
            <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (r) => `<tr>${r.map((c) => `<td>${c !== undefined && c !== null ? c : ""}</td>`).join("")}</tr>`
              )
              .join("")}
          </tbody>
        </table>
        <div class="footer">Confidential - For Internal Super Admin Use Only</div>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
