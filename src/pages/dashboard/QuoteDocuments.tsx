import React, { useState } from "react";

import {
  files,
  identityFields,
  propertyFields,
  financialFields,
  logs,
} from "../../data/quoteDocumentsData";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import DynamicFields from "../../components/dashboard/DynamicFields";
import FileList from "../../components/dashboard/FileList";
import AuditLog from "../../components/dashboard/AuditLog";
import Modal from "../../components/dashboard/Modal";

const QuoteDocuments: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleRequestAccess = (docName: string) => {
    setSelectedDoc(docName);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[var(--cream)] relative">
      {/* Islamic Pattern Background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none animate-spin-slow 
                   bg-[conic-gradient(var(--primary-gold)_0deg,transparent_60deg,var(--primary-gold)_120deg,transparent_180deg,var(--primary-gold)_240deg,transparent_300deg,var(--primary-gold)_360deg)] 
                   bg-[length:80px_80px]"
      />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 
        ${sidebarOpen ? "lg:ml-[320px]" : "ml-0"}`}
      >
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="p-6 space-y-6">
          {/* Config Selector */}
          <div className="bg-white rounded-2xl shadow p-6 border border-[var(--primary-gold)]/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Property State */}
              <div>
                <label className="font-semibold text-[var(--text-dark)]">
                  Property State
                </label>
                <select className="w-full mt-2 border-2 border-[var(--primary-gold)]/30 rounded-lg px-3 py-2">
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
                <label className="font-semibold text-[var(--text-dark)]">
                  Quote ID
                </label>
                <input
                  type="text"
                  value="QT-2024-0847"
                  readOnly
                  className="w-full mt-2 border-2 border-[var(--primary-gold)]/30 rounded-lg px-3 py-2 bg-[var(--pearl)] text-[var(--text-light)]"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Fields */}
          <DynamicFields title="Identity Documents" fields={identityFields} />
          <DynamicFields title="Property Documents" fields={propertyFields} />
          <DynamicFields title="Financial Records" fields={financialFields} />

          {/* File List */}
          <FileList files={files} onRequestAccess={handleRequestAccess} />

          {/* Audit Log */}
          <AuditLog logs={logs} />
        </div>
      </main>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        documentName={selectedDoc || ""}
        onSubmit={() => {
          alert(`Access request submitted for ${selectedDoc}`);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default QuoteDocuments;
