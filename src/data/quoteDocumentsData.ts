

// 🗂️ File List Data

export const files = [
  {
    icon: "🆔",
    name: "driver_license_sarah_almansouri.pdf",
    description: "Government ID - Encrypted",
    size: "1.8 MB",
    date: "2024-12-19 14:32",
    status: "encrypted" as const,
  },
  {
    icon: "🏠",
    name: "property_deed_123_main_st.pdf",
    description: "Property Documentation - Encrypted",
    size: "3.2 MB",
    date: "2024-12-19 09:15",
    status: "encrypted" as const,
  },
  {
    icon: "💰",
    name: "income_verification_2024.pdf",
    description: "Financial Records - Restricted Access",
    size: "892 KB",
    date: "2024-12-18 16:45",
    status: "pending-approval" as const,
  },
  {
    icon: "🏥",
    name: "medical_report_claim_2024.pdf",
    description: "Medical Documentation - Access Denied",
    size: "2.1 MB",
    date: "2024-12-17 11:22",
    status: "access-denied" as const,
  },
  {
    icon: "🔒",
    name: "security_system_photos.zip",
    description: "Security Documentation - Approved Access",
    size: "15.7 MB",
    date: "2024-12-16 13:08",
    status: "approved" as const,
  },
];

// 📑 Dynamic Fields Data

export const identityFields = [
    {
      label: "Government-issued Photo ID",
      required: true,
      accept: ".jpg,.png,.pdf",
      multiple: false,
      status: {
        status: "required",
        message: "⚠️ Required - Not uploaded",
      },
    },
    {
      label: "Social Security Card",
      required: true,
      accept: ".jpg,.png,.pdf",
      multiple: false,
      status: {
        status: "uploaded",
        message: "✅ Uploaded and encrypted",
      },
    },
  ];
  
  export const propertyFields = [
    {
      label: "Property Deed/Title",
      required: true,
      accept: ".pdf",
      multiple: false,
      status: {
        status: "uploaded",
        message: "✅ Uploaded and encrypted",
      },
    },
    {
      label: "Property Photos (Exterior)",
      required: true,
      accept: ".jpg,.png,.heic",
      multiple: true,
      status: {
        status: "required",
        message: "⚠️ Required - Not uploaded",
      },
    },
    {
      label: "Fire Alarm Documentation (Texas Requirement)",
      required: false,
      accept: ".jpg,.png,.pdf",
      multiple: false,
      status: {
        status: "optional",
        message: "ℹ️ Optional for this property type",
      },
    },
  ];
  
  export const financialFields = [
    {
      label: "Income Documentation",
      required: true,
      accept: ".pdf,.jpg,.png",
      multiple: false,
      status: {
        status: "required",
        message: "⚠️ Pending approval from Account Manager",
      },
    },
  ];
  
  
  // 📜 Audit Log Data
  
  export const logs = [
    {
      action: "Document Access Granted",
      time: "2024-12-19 14:45:23 UTC",
      details:
        "Account Manager approved access to security_system_photos.zip for Sarah Al-Mansouri (Case Manager). Reason: Property assessment required for policy evaluation.",
    },
    {
      action: "Document Upload",
      time: "2024-12-19 14:32:15 UTC",
      details:
        "Sarah Al-Mansouri uploaded driver_license_sarah_almansouri.pdf. Document automatically encrypted with AES-256. Hash: 7f4a9b2c8e1d...",
    },
    {
      action: "Access Request Denied",
      time: "2024-12-19 10:18:47 UTC",
      details:
        "Request for medical_report_claim_2024.pdf denied by Account Manager. Reason: Insufficient business justification provided. User can re-request with additional context.",
    },
    {
      action: "Document View",
      time: "2024-12-19 09:52:33 UTC",
      details:
        "Sarah Al-Mansouri viewed property_deed_123_main_st.pdf. Session duration: 4 minutes 23 seconds. IP: 192.168.1.45",
    },
  ];
  
  