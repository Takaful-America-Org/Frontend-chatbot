export const conversationFlow = [
  {
    id: 'check_registration',
    sender: 'assistant',
    message: "Hi! I'm Aisha, your Takaful assistant. 😊\n\nBefore we begin, are you already a Takaful customer or do you have an account with us?",
    type: 'options',
    options: [
      { text: "Yes, I'm already a customer", value: 'existing_customer', icon: '👤', desc: 'I have a Takaful account' },
      { text: "No, I'm new to Takaful", value: 'new_customer', icon: '✨', desc: 'First time getting a quote' }
    ],
    field: 'user_type'
  },
  {
    id: 'existing_login',
    sender: 'assistant',
    message: "Perfect! Let's get you logged in quickly.\n\nWhat's the email address associated with your Takaful account?",
    type: 'input',
    inputType: 'email',
    placeholder: 'your.email@example.com',
    field: 'email',
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  },
  {
    id: 'new_customer_welcome',
    sender: 'assistant',
    message: "Wonderful! Welcome to the Takaful family! 🌟\n\nI'm excited to help you find the perfect Shariah-compliant home insurance. This will only take a few minutes.\n\nLet's start with your name - what should I call you?",
    type: 'input',
    inputType: 'text',
    placeholder: 'Enter your full name',
    field: 'full_name',
    validation: (value) => value.trim().length >= 2
  },
  {
    id: 'new_customer_email',
    sender: 'assistant',
    message: (name) => `Nice to meet you, ${name}! 😊\n\nWhat's your email address? I'll use this to send you your quote details.`,
    type: 'input',
    inputType: 'email',
    placeholder: 'your.email@example.com',
    field: 'email',
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  },
  {
    id: 'phone_number',
    sender: 'assistant',
    message: "Great! Now I'll need your phone number in case we need to reach you about your coverage.",
    type: 'input',
    inputType: 'tel',
    placeholder: '+1 (555) 123-4567',
    field: 'phone_number',
    validation: (value) => value.replace(/\D/g, '').length >= 10
  },
  {
    id: 'street_address',
    sender: 'assistant',
    message: "Now let's talk about your home! 🏠\n\nWhat's the street address of the property you'd like to insure?",
    type: 'input',
    inputType: 'text',
    placeholder: '123 Main Street',
    field: 'street_address',
    validation: (value) => value.trim().length >= 5
  },
  {
    id: 'city',
    sender: 'assistant',
    message: "What city is your home located in?",
    type: 'input',
    inputType: 'text',
    placeholder: 'Enter city name',
    field: 'city',
    validation: (value) => value.trim().length >= 2
  },
  {
    id: 'state',
    sender: 'assistant',
    message: "Which state is your property in?",
    type: 'input',
    inputType: 'text',
    placeholder: 'CA, NY, TX, etc.',
    field: 'state',
    validation: (value) => value.trim().length >= 2
  },
  {
    id: 'zip_code',
    sender: 'assistant',
    message: "What's the ZIP code for your property?",
    type: 'input',
    inputType: 'text',
    placeholder: '12345 or 12345-6789',
    field: 'zip_code',
    validation: (value) => /^\d{5}(-\d{4})?$/.test(value.trim())
  },
  {
    id: 'property_type',
    sender: 'assistant',
    message: "Perfect! What type of property is this?",
    type: 'options',
    options: [
      { text: "Single Family Home", value: 'single_family', icon: '🏠', desc: 'Detached single-family house' },
      { text: "Apartment/Condo", value: 'apartment', icon: '🏢', desc: 'Unit in a building or complex' },
      { text: "Townhouse", value: 'townhouse', icon: '🏘️', desc: 'Attached home in a row' },
      { text: "Duplex", value: 'duplex', icon: '🏡', desc: 'Two-unit residential building' }
    ],
    field: 'property_type'
  },
  {
    id: 'construction_year',
    sender: 'assistant',
    message: "When was your home built? (Enter the year)",
    type: 'input',
    inputType: 'number',
    placeholder: '1995',
    field: 'construction_year',
    validation: (value) => {
      const year = parseInt(value);
      return year >= 1800 && year <= new Date().getFullYear() + 1;
    }
  },
  {
    id: 'home_value',
    sender: 'assistant',
    message: "What's the estimated value of your home? (Enter amount in dollars)",
    type: 'input',
    inputType: 'number',
    placeholder: '350000',
    field: 'home_value',
    validation: (value) => parseInt(value) >= 50000
  },
  {
    id: 'square_footage',
    sender: 'assistant',
    message: "How many square feet is your home? (approximate is fine)",
    type: 'input',
    inputType: 'number',
    placeholder: '2000',
    field: 'square_footage',
    validation: (value) => parseInt(value) >= 400
  },
  {
    id: 'construction_material',
    sender: 'assistant',
    message: "What is your home primarily made of?",
    type: 'options',
    options: [
      { text: "Frame (Wood)", value: 'frame', icon: '🌲', desc: 'Traditional wood frame construction' },
      { text: "Masonry (Brick/Stone)", value: 'masonry', icon: '🧱', desc: 'Brick, stone, or block construction' },
      { text: "Steel", value: 'steel', icon: '🏗️', desc: 'Steel frame construction' },
      { text: "Mixed/Other", value: 'mixed', icon: '🏠', desc: 'Combination or other materials' }
    ],
    field: 'construction_material'
  },
  {
    id: 'roof_type',
    sender: 'assistant',
    message: "What type of roof does your home have?",
    type: 'options',
    options: [
      { text: "Composition Shingle", value: 'composition_shingle', icon: '🏠', desc: 'Standard asphalt shingles' },
      { text: "Tile", value: 'tile', icon: '🏛️', desc: 'Clay or concrete tiles' },
      { text: "Metal", value: 'metal', icon: '⚡', desc: 'Metal roofing' },
      { text: "Slate", value: 'slate', icon: '🪨', desc: 'Natural slate roofing' },
      { text: "Other", value: 'other', icon: '🏠', desc: 'Different roofing material' }
    ],
    field: 'roof_type'
  },
  {
    id: 'foundation_type',
    sender: 'assistant',
    message: "What type of foundation does your home have?",
    type: 'options',
    options: [
      { text: "Slab", value: 'slab', icon: '⬜', desc: 'Concrete slab foundation' },
      { text: "Crawl Space", value: 'crawl_space', icon: '🏠', desc: 'Raised foundation with crawl space' },
      { text: "Basement", value: 'basement', icon: '🏘️', desc: 'Full or partial basement' },
      { text: "Pier/Post", value: 'pier_post', icon: '🏗️', desc: 'Raised on piers or posts' }
    ],
    field: 'foundation_type'
  },
  {
    id: 'stories',
    sender: 'assistant',
    message: "How many stories is your home?",
    type: 'options',
    options: [
      { text: "1 Story", value: '1', icon: '🏠', desc: 'Single-story home' },
      { text: "2 Stories", value: '2', icon: '🏢', desc: 'Two-story home' },
      { text: "3+ Stories", value: '3', icon: '🏗️', desc: 'Three or more stories' }
    ],
    field: 'stories'
  },
  {
    id: 'bedrooms',
    sender: 'assistant',
    message: "How many bedrooms does your home have?",
    type: 'input',
    inputType: 'number',
    placeholder: '3',
    field: 'bedrooms',
    validation: (value) => parseInt(value) >= 1 && parseInt(value) <= 20
  },
  {
    id: 'bathrooms',
    sender: 'assistant',
    message: "How many bathrooms does your home have? (include half baths)",
    type: 'input',
    inputType: 'number',
    placeholder: '2',
    field: 'bathrooms',
    validation: (value) => parseInt(value) >= 1 && parseInt(value) <= 20
  },
  {
    id: 'garage',
    sender: 'assistant',
    message: "Does your home have a garage?",
    type: 'options',
    options: [
      { text: "Yes, attached garage", value: 'attached', icon: '🚗', desc: 'Garage attached to house' },
      { text: "Yes, detached garage", value: 'detached', icon: '🏠', desc: 'Separate garage building' },
      { text: "No garage", value: 'none', icon: '🚫', desc: 'No garage on property' }
    ],
    field: 'garage'
  },
  {
    id: 'pool',
    sender: 'assistant',
    message: "Do you have a swimming pool on your property?",
    type: 'options',
    options: [
      { text: "Yes, in-ground pool", value: 'inground', icon: '🏊‍♀️', desc: 'Permanent in-ground swimming pool' },
      { text: "Yes, above-ground pool", value: 'aboveground', icon: '🏊‍♂️', desc: 'Above-ground pool' },
      { text: "No pool", value: 'none', icon: '🚫', desc: 'No swimming pool' }
    ],
    field: 'pool'
  },
  {
    id: 'smoke_detectors',
    sender: 'assistant',
    message: "Great! Now let's talk about safety features. 🛡️\n\nDoes your home have working smoke detectors?",
    type: 'options',
    options: [
      { text: "Yes, hardwired", value: 'hardwired', icon: '🔥', desc: 'Permanent hardwired smoke detectors' },
      { text: "Yes, battery powered", value: 'battery', icon: '🔋', desc: 'Battery-powered smoke detectors' },
      { text: "No", value: 'none', icon: '🚫', desc: 'No smoke detectors installed' }
    ],
    field: 'smoke_detectors'
  },
  {
    id: 'security_system',
    sender: 'assistant',
    message: "Do you have a security/alarm system?",
    type: 'options',
    options: [
      { text: "Yes, monitored system", value: 'monitored', icon: '🔒', desc: 'Professional monitoring service' },
      { text: "Yes, self-monitored", value: 'self_monitored', icon: '📱', desc: 'DIY/self-monitored system' },
      { text: "No security system", value: 'none', icon: '🚫', desc: 'No alarm system installed' }
    ],
    field: 'security_system'
  },
  {
    id: 'previous_claims',
    sender: 'assistant',
    message: "Have you filed any home insurance claims in the past 5 years?",
    type: 'options',
    options: [
      { text: "No claims", value: 'none', icon: '✅', desc: 'Clean insurance history' },
      { text: "1-2 small claims", value: 'few', icon: '📋', desc: 'Minor claims under $5,000' },
      { text: "Multiple or large claims", value: 'many', icon: '📄', desc: 'Several claims or major damage' }
    ],
    field: 'claims_history'
  },
  {
    id: 'coverage_preference',
    sender: 'assistant',
    message: "What level of protection are you looking for?",
    type: 'options',
    options: [
      { text: "Essential Coverage", value: 'basic', icon: '🛡️', desc: 'Fire, theft, basic protection' },
      { text: "Comprehensive Coverage", value: 'standard', icon: '🏠', desc: 'Full protection + weather events' },
      { text: "Premium Coverage", value: 'premium', icon: '💎', desc: 'Maximum protection + high-value items' }
    ],
    field: 'coverage_preference'
  },
  {
    id: 'deductible_preference',
    sender: 'assistant',
    message: "What deductible amount would you prefer? (Higher deductible = lower premium)",
    type: 'options',
    options: [
      { text: "$500 Deductible", value: '500', icon: '💰', desc: 'Lower deductible, higher premium' },
      { text: "$1,000 Deductible", value: '1000', icon: '💳', desc: 'Balanced option' },
      { text: "$2,500 Deductible", value: '2500', icon: '💎', desc: 'Higher deductible, lower premium' },
      { text: "$5,000 Deductible", value: '5000', icon: '🏦', desc: 'Highest deductible, lowest premium' }
    ],
    field: 'deductible'
  },
  {
    id: 'generate_quote',
    sender: 'assistant',
    message: "Alhamdulillah! I have everything I need to calculate your personalized Shariah-compliant home insurance quote.\n\nLet me work on this for you...",
    type: 'loading'
  }
];

export const progressTexts = [
  'Getting Started',
  'Account Check',
  'Personal Info',
  'Contact Details',
  'Phone Number',
  'Home Address',
  'Location Details',
  'State & ZIP',
  'Property Type',
  'Construction Details',
  'Home Value',
  'Square Footage',
  'Building Materials',
  'Roof & Foundation',
  'Home Features',
  'Safety Features',
  'Claims History',
  'Coverage Options',
  'Deductible',
  'Calculating Quote'
];

export const finalOptions = [
  { text: "Purchase This Policy", icon: '✅', desc: 'Proceed with this coverage', action: 'proceed' },
  { text: "Customize Coverage", icon: '⚙️', desc: 'Adjust limits and options', action: 'customize' },
  { text: "Speak with Agent", icon: '📞', desc: 'Talk to a specialist', action: 'agent' },
  { text: "Email Quote Details", icon: '📧', desc: 'Send complete quote to email', action: 'email' }
];
