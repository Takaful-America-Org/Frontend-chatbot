import React from "react";

import {
  files,
  identityFields,
  propertyFields,
  financialFields,
  logs,
} from "../../data/quoteDocumentsData";
import DynamicFields from "./DynamicFields";
import FileList from "./FileList";
import AuditLog from "./AuditLog";

const FileManager: React.FC = () => {
  return (
    <div className="flex-1 p-8 space-y-8">
      {/* Config Selector */}
      <div className="bg-white rounded-2xl p-8 shadow border border-[var(--primary-gold)]/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property State */}
          <div>
            <label className="font-semibold text-lg text-[var(--text-dark)]">
              Property State
            </label>
            <select className="w-full mt-3 border-2 border-[var(--primary-gold)]/30 rounded-lg px-4 py-3 text-base">
              <option>Texas</option>
              <option>California</option>
              <option>New York</option>
              <option>Florida</option>
              <option>Washington</option>
              <option>Illinois</option>
            </select>
          </div>

          {/* Quote ID */}
          <div>
            <label className="font-semibold text-lg text-[var(--text-dark)]">
              Quote ID
            </label>
            <input
              type="text"
              value="QT-2024-0847"
              readOnly
              className="w-full mt-3 border-2 border-[var(--primary-gold)]/30 rounded-lg px-4 py-3 bg-[var(--pearl)] text-[var(--text-light)] text-base"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Fields */}
      <DynamicFields title="Identity Documents" fields={identityFields} />
      <DynamicFields title="Property Documents" fields={propertyFields} />
      <DynamicFields title="Financial Records" fields={financialFields} />

      {/* File List */}
      <FileList files={files} />

      {/* Audit Log */}
      <AuditLog logs={logs} />
    </div>
  );
};

export default FileManager;
