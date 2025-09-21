import React from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`w-[320px] h-screen fixed lg:static left-0 top-0 z-100 overflow-y-auto shadow-[5px_0_25px_rgba(0,0,0,0.1)]
        bg-gradient-to-b from-[var(--deep-blue)] to-[var(--navy)] text-white
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-10 border-b border-white/10 text-center">
          <h1 className="text-3xl font-bold font-amiri bg-gradient-to-r from-[var(--primary-gold)] to-[var(--light-gold)] bg-clip-text text-transparent flex items-center justify-center gap-2 mb-3">
            📁 Takaful DMS
          </h1>
          <p className="text-sm md:text-base text-white/70 tracking-widest">
            DOCUMENT MANAGEMENT
          </p>
        </div>

        {/* User Info */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[var(--primary-gold)] to-[var(--emerald)] flex items-center justify-center font-bold text-xl">
              S
            </div>
            <div>
              <h4 className="font-semibold text-lg text-white">
                Sarah Al-Mansouri
              </h4>
              <p className="text-sm md:text-base text-white/70">
                Case Manager - TX Region
              </p>
            </div>
          </div>

          {/* Permissions */}
          <div className="bg-white/10 rounded-lg p-5 text-base">
            <h5 className="mb-4 text-white/80 font-semibold text-sm uppercase tracking-wide">
              Current Permissions
            </h5>
            <div className="flex justify-between items-center mb-3">
              <span>Customer Documents</span>
              <span className="px-3 py-1 rounded-md text-sm font-semibold bg-emerald-600/30 text-[var(--emerald)]">
                Granted
              </span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span>Financial Records</span>
              <span className="px-3 py-1 rounded-md text-sm font-semibold bg-yellow-500/30 text-[#ffc107]">
                Pending
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Medical Reports</span>
              <span className="px-3 py-1 rounded-md text-sm font-semibold bg-red-500/30 text-[#dc3545]">
                Denied
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 text-base font-medium">
          {/* Document Categories */}
          <div className="mb-8">
            <h5 className="px-8 mb-4 text-sm uppercase tracking-wide opacity-60">
              Document Categories
            </h5>
            <a
              href="#"
              className="flex items-center gap-4 px-8 py-4 border-l-4 border-transparent hover:bg-white/10 hover:border-[--primary-gold] transition"
            >
              <span className="text-xl">📋</span>
              <span>All Documents</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-8 py-4 border-l-4 border-transparent hover:bg-white/10 hover:border-[--primary-gold] transition"
            >
              <span className="text-xl">🆔</span>
              <span>Identity Documents</span>
              <span className="ml-auto bg-[--primary-gold] text-[--deep-blue] text-sm font-semibold px-3 py-1 rounded-lg">
                12
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-8 py-4 border-l-4 border-transparent hover:bg-white/10 hover:border-[--primary-gold] transition"
            >
              <span className="text-xl">🏠</span>
              <span>Property Documents</span>
              <span className="ml-auto bg-[--primary-gold] text-[--deep-blue] text-sm font-semibold px-3 py-1 rounded-lg">
                8
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-8 py-4 border-l-4 border-transparent hover:bg-white/10 hover:border-[--primary-gold] transition"
            >
              <span className="text-xl">💰</span>
              <span>Financial Records</span>
              <span className="ml-auto bg-[--primary-gold] text-[--deep-blue] text-sm font-semibold px-3 py-1 rounded-lg">
                5
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-8 py-4 border-l-4 border-transparent hover:bg-white/10 hover:border-[--primary-gold] transition"
            >
              <span className="text-xl">🏥</span>
              <span>Medical Reports</span>
              <span className="ml-auto bg-[--primary-gold] text-[--deep-blue] text-sm font-semibold px-3 py-1 rounded-lg">
                3
              </span>
            </a>
          </div>

          {/* Workflow */}
          <div className="mb-8">
            <h5 className="px-8 mb-4 text-sm uppercase tracking-wide opacity-60">
              Workflow
            </h5>
            <a
              href="#"
              className="flex items-center gap-4 px-8 py-4 border-l-4 border-transparent hover:bg-white/10 hover:border-[--primary-gold] transition"
            >
              <span className="text-xl">📤</span>
              <span>Upload Documents</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-8 py-4 border-l-4 border-transparent hover:bg-white/10 hover:border-[--primary-gold] transition"
            >
              <span className="text-xl">🔍</span>
              <span>Review Queue</span>
              <span className="ml-auto bg-[--primary-gold] text-[--deep-blue] text-sm font-semibold px-3 py-1 rounded-lg">
                7
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-8 py-4 border-l-4 border-transparent hover:bg-white/10 hover:border-[--primary-gold] transition"
            >
              <span className="text-xl">✅</span>
              <span>Approved</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-8 py-4 border-l-4 border-transparent hover:bg-white/10 hover:border-[--primary-gold] transition"
            >
              <span className="text-xl">🔒</span>
              <span>Access Requests</span>
              <span className="ml-auto bg-[--primary-gold] text-[--deep-blue] text-sm font-semibold px-3 py-1 rounded-lg">
                2
              </span>
            </a>
          </div>

          {/* System */}
          <div>
            <h5 className="px-8 mb-4 text-sm uppercase tracking-wide opacity-60">
              System
            </h5>
            <a
              href="#"
              className="flex items-center gap-4 px-8 py-4 border-l-4 border-transparent hover:bg-white/10 hover:border-[--primary-gold] transition"
            >
              <span className="text-xl">📊</span>
              <span>Audit Log</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-4 px-8 py-4 border-l-4 border-transparent hover:bg-white/10 hover:border-[--primary-gold] transition"
            >
              <span className="text-xl">⚙️</span>
              <span>Settings</span>
            </a>
          </div>
        </nav>
      </aside>

      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
