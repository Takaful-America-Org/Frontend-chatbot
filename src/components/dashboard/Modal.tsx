import React from "react";

interface ModalProps {
  isOpen: boolean;
  documentName?: string;
  onClose: () => void;
  onSubmit?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  documentName,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-[90%] shadow-lg">
        {/* Title */}
        <h3 className="font-amiri text-2xl text-[var(--deep-blue)] mb-4">
          Request Document Access
        </h3>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Document Name */}
          <div>
            <label className="font-semibold text-[var(--text-dark)] text-sm">
              Document Name
            </label>
            <input
              type="text"
              value={documentName}
              readOnly
              className="w-full mt-2 border-2 border-[var(--primary-gold)]/30 rounded-lg px-3 py-2 bg-[var(--pearl)] text-[var(--text-light)]"
            />
          </div>

          {/* Business Justification */}
          <div>
            <label className="font-semibold text-[var(--text-dark)] text-sm">
              Business Justification
            </label>
            <select className="w-full mt-2 border-2 border-[var(--primary-gold)]/30 rounded-lg px-3 py-2">
              <option>Select justification</option>
              <option>Claims Processing</option>
              <option>Risk Assessment</option>
              <option>Customer Verification</option>
            </select>
          </div>

          {/* Additional Details */}
          <div>
            <label className="font-semibold text-[var(--text-dark)] text-sm">
              Additional Details
            </label>
            <textarea
              rows={3}
              className="w-full mt-2 border-2 border-[var(--primary-gold)]/30 rounded-lg px-3 py-2"
              placeholder="Provide any additional context..."
            />
          </div>

          {/* Duration */}
          <div>
            <label className="font-semibold text-[var(--text-dark)] text-sm">
              Access Duration
            </label>
            <select className="w-full mt-2 border-2 border-[var(--primary-gold)]/30 rounded-lg px-3 py-2">
              <option>24 hours</option>
              <option>48 hours</option>
              <option>7 days</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 rounded-full bg-[var(--pearl)] text-[var(--text-dark)] hover:bg-[var(--light-gold)]/30 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          {onSubmit && (
            <button
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[var(--primary-gold)] to-[var(--emerald)] text-white shadow hover:opacity-90 transition"
              onClick={onSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
