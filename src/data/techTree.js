export const TECH_TREE = [
  // --- FINTECH (Focus: Revenue & Scaling) ---
  { id: 'ledger_v1', name: 'Digital Ledger', industry: 'fintech', cost: 50, description: 'Basic accounting. +$0.05 revenue/user.' },
  { id: 'fraud_det', name: 'Fraud Detection', industry: 'fintech', cost: 200, description: 'AI-driven security. -10% Burn Rate.' },
  { id: 'smart_contracts', name: 'Smart Contracts', industry: 'fintech', cost: 500, description: 'Automated escrow. +15% Revenue/user.' },
  { id: 'crypto_bridge', name: 'Asset Bridge', industry: 'fintech', cost: 1200, description: 'Cross-border payments. +20 Hype.' },
  { id: 'central_bank_api', name: 'CBDC Integration', industry: 'fintech', cost: 3000, description: 'National scale. +100% Revenue.' },

  // --- HEALTHTECH (Focus: Retention & Stability) ---
  { id: 'health_records', name: 'E-Health Records', industry: 'health', cost: 50, description: 'Secure storage. -5% User churn.' },
  { id: 'telemed_core', name: 'Telemed Engine', industry: 'health', cost: 250, description: 'Remote consults. +10 Hype.' },
  { id: 'bio_sensors', name: 'Wearable Sync', industry: 'health', cost: 600, description: 'Real-time monitoring. +10% Valuation.' },
  { id: 'genomic_data', name: 'Genomic Mapping', industry: 'health', cost: 1500, description: 'Personalized care. -30% Churn.' },
  { id: 'nano_repair', name: 'Nanotech Meds', industry: 'health', cost: 4000, description: 'Cellular repair. Users never leave.' },

  // --- AI & ROBOTICS (Focus: Efficiency & Build Speed) ---
  { id: 'neural_net', name: 'Neural Network', industry: 'ai', cost: 100, description: 'Pattern recognition. +10% Dev Speed.' },
  { id: 'nlp_v2', name: 'NLP v2.0', industry: 'ai', cost: 300, description: 'Advanced chatbots. -15% Marketing cost.' },
  { id: 'computer_vision', name: 'Vision API', industry: 'ai', cost: 800, description: 'Object tracking. +20% Build Speed.' },
  { id: 'auto_qa', name: 'Auto-QA Bots', industry: 'ai', cost: 2000, description: 'No bugs. Build speed +50%.' },
  { id: 'agi_core', name: 'AGI Prototype', industry: 'ai', cost: 5000, description: 'The Singularity. 5x all progress.' },

  // --- EDUTECH (Focus: Experience & Talent) ---
  { id: 'lms_platform', name: 'LMS Core', industry: 'edu', cost: 50, description: 'Course delivery. +2 RP per second.' },
  { id: 'vr_classroom', name: 'VR Training', industry: 'edu', cost: 400, description: 'Immersive learning. Scientists +20% effective.' },
  { id: 'adaptive_learning', name: 'Adaptive AI', industry: 'edu', cost: 900, description: 'Personalized paths. +15 Hype.' },
  { id: 'skill_graph', name: 'Global Skill Graph', industry: 'edu', cost: 1800, description: 'Hiring cost reduced by 50%.' },
  { id: 'neural_link_edu', name: 'Direct Download', industry: 'edu', cost: 4500, description: 'Instant learning. 2x all staff output.' },

  // --- GREENTECH (Focus: Branding & Subsidies) ---
  { id: 'carbon_track', name: 'Carbon Tracker', industry: 'green', cost: 100, description: 'Eco-metrics. +5 Hype.' },
  { id: 'solar_hosting', name: 'Solar Servers', industry: 'green', cost: 500, description: 'Zero-emission compute. -25% Burn rate.' },
  { id: 'remote_work_policy', name: 'Remote Work Policy', industry: 'green', cost: 900, description: 'Reduce all salary burn by 25%.' },
  { id: 'circular_supply', name: 'Circular Logistics', industry: 'green', cost: 1100, description: 'Waste reduction. +10% Revenue.' },
  { id: 'fusion_grid', name: 'Fusion Power', industry: 'green', cost: 2200, description: 'Infinite energy. Burn rate -80%.' },
  { id: 'planetary_regen', name: 'Terraforming AI', industry: 'green', cost: 6000, description: 'Maximum ESG score. Valuation x10.' }
];

// --- FORGE RECIPES (The Combination Mechanic) ---
export const FORGE_RECIPES = [
  { id: 'robo_surgeon', name: 'AI Robo-Surgeon', combo: ['ai', 'health'], require: ['computer_vision', 'telemed_core'], bonus: 'High Revenue / High Hype' },
  { id: 'eco_bank', name: 'Green NeoBank', combo: ['green', 'fintech'], require: ['carbon_track', 'smart_contracts'], bonus: 'Low Burn / High Retention' },
  { id: 'ai_tutor', name: 'Personal AI Tutor', combo: ['ai', 'edu'], require: ['nlp_v2', 'adaptive_learning'], bonus: 'Massive User Growth' }
];