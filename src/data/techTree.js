export const TECH_TREE = [
  // TIER 1: FOUNDATIONS
  {
    id: 'agile_sprints',
    name: 'Agile Sprints',
    cost: 50,
    description: 'Increases Build Point generation by 20%.',
    icon: 'timer',
    tier: 1
  },
  {
    id: 'open_source',
    name: 'Open Source Contribution',
    cost: 100,
    description: 'Boosts RP generation by 25% but adds $100 to monthly burn.',
    icon: 'github',
    tier: 1
  },
  {
    id: 'cloud_infra',
    name: 'Cloud Infrastructure',
    cost: 150,
    description: 'Optimize servers to reduce monthly burn rate by 20%.',
    icon: 'server',
    tier: 1
  },
  
  // TIER 2: SCALING
  {
    id: 'viral_hooks',
    name: 'Viral Hooks',
    cost: 300,
    description: 'Implement referral loops. +15 Hype permanently.',
    icon: 'zap',
    tier: 2
  },
  {
    id: 'dark_mode',
    name: 'Dark Mode UI',
    cost: 400,
    description: 'A fan favorite. +10 Hype and +5% Launch Quality.',
    icon: 'moon',
    tier: 2
  },
  {
    id: 'automated_qa',
    name: 'Automated QA',
    cost: 600,
    description: 'Reduces "Server Crash" penalty and frequency by 60%.',
    icon: 'shield',
    tier: 2
  },

  // TIER 3: ENTERPRISE
  {
    id: 'ml_alpha',
    name: 'Machine Learning Alpha',
    cost: 1200,
    description: 'Users generate +0.1 RP per second per 1k users.',
    icon: 'brain',
    tier: 3
  },
  {
    id: 'platform_ecosystem',
    name: 'Platform Ecosystem',
    cost: 2500,
    description: 'Unlocks 3rd party fees. +50% Revenue per user.',
    icon: 'network',
    tier: 3
  }
];