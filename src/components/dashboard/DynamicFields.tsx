import React, { useState } from "react";

interface Field {
  label: string;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
  status: {
    status: "required" | "optional" | "uploaded";
    message: string;
  };
}

interface DynamicFieldsProps {
  title: string;
  fields: Field[];
}

const FieldStatus: React.FC<{ status: string; message: string }> = ({
  status,
  message,
}) => {
  const colorMap: Record<string, string> = {
    required: "text-red-600",
    optional: "text-[var(--text-light)]",
    uploaded: "text-[var(--emerald)]",
  };
  return <div className={`text-base mt-2 ${colorMap[status]}`}>{message}</div>;
};

const DynamicFields: React.FC<DynamicFieldsProps> = ({ title, fields }) => {
  const [uploadedFiles, setUploadedFiles] = useState<Record<number, string[]>>(
    {}
  );

  const handleFileChange = (idx: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map((f) => f.name);
      setUploadedFiles((prev) => ({ ...prev, [idx]: fileNames }));
      console.log("Uploaded:", fileNames);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow border border-[var(--primary-gold)]/30 mb-6">
      {/* Title */}
      <h3 className="font-amiri text-2xl text-[var(--deep-blue)] mb-6">
        {title}
      </h3>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {fields.map((field, idx) => (
          <div key={idx} className="field-item">
            {/* Label */}
            <label className="font-semibold mb-3 flex gap-1 text-base md:text-lg">
              {field.label}
              {field.required && <span className="text-red-600">*</span>}
            </label>

            {/* Hidden File Input */}
            <input
              type="file"
              className="hidden"
              accept={field.accept}
              multiple={field.multiple}
              id={`upload-${idx}`}
              onChange={(e) => handleFileChange(idx, e)}
            />

            {/* Upload Zone */}
            <label
              htmlFor={`upload-${idx}`}
              className="upload-zone block rounded-lg cursor-pointer text-sm md:text-base p-4"
            >
              <p className="font-medium">📤 Drop files here or click to upload</p>
              <small className="text-[var(--text-light)] block mt-2 text-sm">
                Accepted formats: {field.accept || "All"}
              </small>
              {uploadedFiles[idx] && (
                <ul className="mt-3 text-[var(--emerald)] text-sm md:text-base">
                  {uploadedFiles[idx].map((file, i) => (
                    <li key={i}>✅ {file}</li>
                  ))}
                </ul>
              )}
            </label>

            {/* Status */}
            <FieldStatus
              status={field.status.status}
              message={field.status.message}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicFields;
