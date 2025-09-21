import React from "react";

interface AuditItem {
  action: string;
  time: string;
  details: string;
}

interface AuditLogProps {
  logs: AuditItem[];
}

const AuditLog: React.FC<AuditLogProps> = ({ logs }) => {
  return (
    <div className="bg-white rounded-2xl shadow border border-[var(--primary-gold)]/30 p-8 mt-8">
      <h3 className="font-amiri text-2xl text-[var(--deep-blue)] mb-6">
        Recent Activity Log
      </h3>
      <div className="space-y-6">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className="audit-item border-l-4 border-[var(--primary-gold)] pl-4 bg-[var(--pearl)] rounded-md py-3"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="audit-action font-semibold text-lg text-[var(--text-dark)]">
                {log.action}
              </span>
              <span className="audit-time text-sm text-[var(--text-light)]">
                {log.time}
              </span>
            </div>
            <p className="audit-details text-base text-[var(--text-light)] leading-relaxed">
              {log.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLog;
