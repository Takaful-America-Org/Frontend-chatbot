import React, { useRef } from "react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleExport = () => {
    console.log("📊 Exporting report...");
    alert("Report exported successfully!");
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      alert(`📤 Uploaded: ${event.target.files[0].name}`);
    }
  };

  return (
    <header className="font-poppins bg-[rgba(255,255,255,0.95)] backdrop-blur-[20px] border-b border-[rgba(212,175,55,0.1)] px-4 md:px-10 py-5 md:py-7 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50">
      {/* Hamburger (mobile only) */}
      <button
        className="lg:hidden text-2xl text-[var(--deep-blue)] mr-2"
        onClick={onToggleSidebar}
      >
        ☰
      </button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[var(--text-light)] text-base md:text-lg truncate max-w-[60%] md:max-w-none">
        <span className="hidden sm:inline">Document Management</span>
        <span className="hidden sm:inline">/</span>
        <span className="text-[var(--text-dark)] font-semibold truncate">
          Quote Application #QT-2024-0847
        </span>
      </div>

      {/* Search */}
      <div className="w-full md:flex-1 md:max-w-xl md:mx-8 relative order-3 md:order-none">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)] text-lg">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search documents, policy numbers, customers..."
          className="w-full pl-12 pr-5 py-3 rounded-full border-2 border-transparent bg-[var(--pearl)] text-base md:text-lg text-[var(--text-dark)] transition focus:outline-none focus:border-[var(--primary-gold)] focus:bg-white focus:shadow-[0_5px_20px_rgba(212,175,55,0.2)]"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 md:gap-5">
        {/* Export Button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-3 px-5 md:px-7 py-3 rounded-full font-semibold text-base md:text-lg border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.1)] text-[var(--primary-gold)] hover:shadow-md transition"
        >
          <span className="hidden sm:inline">📊 Export Report</span>
          <span className="sm:hidden text-xl">📊</span>
        </button>

        {/* Upload Button */}
        <button
          onClick={handleUploadClick}
          className="flex items-center gap-3 px-5 md:px-7 py-3 rounded-full font-semibold text-base md:text-lg bg-gradient-to-r from-[var(--primary-gold)] to-[var(--emerald)] text-white hover:shadow-md transition"
        >
          <span className="hidden sm:inline">📤 Upload Document</span>
          <span className="sm:hidden text-xl">📤</span>
        </button>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </header>
  );
};

export default Header;
