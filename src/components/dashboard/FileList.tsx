import React from "react";

interface FileItem {
  icon: string;
  name: string;
  description: string;
  size: string;
  date: string;
  status: "encrypted" | "pending-approval" | "access-denied" | "approved";
}

interface FileListProps {
  files: FileItem[];
  onRequestAccess?: (fileName: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onRequestAccess }) => {
  return (
    <div className="bg-white rounded-2xl shadow border border-[var(--primary-gold)]/30 overflow-hidden">
      {/* Header Row - Desktop only */}
      <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-4 font-semibold text-[var(--text-dark)] border-b bg-gradient-to-r from-[var(--pearl)] to-white text-base">
        <span>Document</span>
        <span>Size</span>
        <span>Upload Date</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {/* Files */}
      {files.map((file, idx) => (
        <div
          key={idx}
          className="border-b hover:bg-[var(--light-gold)]/20 transition"
        >
          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-5 gap-6 px-6 py-5">
{/* Document Info */}
<div className="flex items-start gap-3 md:col-span-2">
  {/* Icon */}
  <span className="text-2xl flex-shrink-0">{file.icon}</span>

  {/* Text Wrapper */}
  <div className="flex-1 min-w-0">
    {/* File Name */}
    <div className="font-semibold text-[var(--deep-blue)] text-sm md:text-base leading-snug mb-1 truncate md:whitespace-normal">
      {file.name}
    </div>

    {/* File Description */}
    <div className="text-xs md:text-sm text-[var(--text-light)] leading-snug truncate md:whitespace-normal">
      {file.description}
    </div>
  </div>
</div>



            {/* Size */}
            <div className="flex items-center text-base">{file.size}</div>

            {/* Date */}
            <div className="flex items-center text-base">{file.date}</div>

            {/* Status */}
            <div className="flex items-center">
              <span
                className={`status-badge ${file.status} text-sm px-3 py-1 rounded-full font-semibold`}
              >
                {file.status.replace("-", " ")}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 items-center">
              {(file.status === "encrypted" || file.status === "approved") && (
                <>
                  <button
                    title="View"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--navy)]/10 text-[var(--navy)] hover:bg-[var(--navy)]/20 transition text-lg"
                  >
                    👁️
                  </button>
                  <button
                    title="Download"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--emerald)]/10 text-[var(--emerald)] hover:bg-[var(--emerald)]/20 transition text-lg"
                  >
                    ⬇️
                  </button>
                </>
              )}

              {file.status === "pending-approval" && (
                <button
                  title="Request Access"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--light-gold)]/30 text-[var(--dark-gold)] hover:bg-[var(--light-gold)]/50 transition text-lg"
                  onClick={() => onRequestAccess?.(file.name)}
                >
                  🔓
                </button>
              )}

              {file.status === "access-denied" && (
                <button
                  disabled
                  title="Denied"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 opacity-50 cursor-not-allowed text-lg"
                >
                  🚫
                </button>
              )}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex flex-col gap-3 px-4 py-4 md:hidden">
            {/* Top: Icon + Name + Description */}
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{file.icon}</span>
              <div className="min-w-0">
                <div className="font-semibold text-[var(--deep-blue)] text-base leading-snug mb-1 break-words">
                  {file.name}
                </div>
                <div className="text-sm text-[var(--text-light)] leading-snug break-words">
                  {file.description}
                </div>
              </div>
            </div>

            {/* Bottom: Details */}
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="font-medium">
                📦 {file.size}
              </span>
              <span className="font-medium">
                📅 {file.date}
              </span>
              <span
                className={`status-badge ${file.status} text-xs px-2 py-0.5 rounded-full font-semibold`}
              >
                {file.status.replace("-", " ")}
              </span>
              <div className="flex gap-2">
                {(file.status === "encrypted" || file.status === "approved") && (
                  <>
                    <button
                      title="View"
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--navy)]/10 text-[var(--navy)] hover:bg-[var(--navy)]/20 transition text-base"
                    >
                      👁️
                    </button>
                    <button
                      title="Download"
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--emerald)]/10 text-[var(--emerald)] hover:bg-[var(--emerald)]/20 transition text-base"
                    >
                      ⬇️
                    </button>
                  </>
                )}

                {file.status === "pending-approval" && (
                  <button
                    title="Request Access"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--light-gold)]/30 text-[var(--dark-gold)] hover:bg-[var(--light-gold)]/50 transition text-base"
                    onClick={() => onRequestAccess?.(file.name)}
                  >
                    🔓
                  </button>
                )}

                {file.status === "access-denied" && (
                  <button
                    disabled
                    title="Denied"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 opacity-50 cursor-not-allowed text-base"
                  >
                    🚫
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileList;
