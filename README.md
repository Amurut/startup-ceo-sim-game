🚀 Startup-CEO-Sim: The Conglomerate Simulator

Startup-CEO-Sim is a high-fidelity, data-driven business simulation built to explore the complexities of scaling a multi-product tech company. Unlike simple idle games, this project focuses on Product-Led Growth, Unit Economics, and Cross-Industry Innovation.

🎮 Key Features
🛠️ Multi-Product "Forge" Engine
Forge unique product lines by researching specific industry branches. Each product exists as an independent entity with its own:

- Auto-Development Loop: Progress bars move based on assigned Engineer headcount.
- Version Control: Products automatically iterate (v1.0 → v1.1) upon completion, triggering user growth spikes.
- Local Team Management: Hire, fire, or move staff between products to optimize for the fastest-growing segments.

🔬 Multi-Track Industry Tech Tree
Explore five distinct industry verticals, each with 5 tiers of research:

- FinTech: Focus on ARPU (Average Revenue Per User) and transaction scaling.
- HealthTech: Focus on User Retention and lowering churn.
- AI & Robotics: Focus on Development Velocity and automation.
- EduTech: Focus on Talent Efficiency and Research Point (RP) generation.
- GreenTech: Focus on ESG scores and radical Burn Rate reduction.

📊 Real-Time Financial Analytics
- Live Valuation Chart: Built with Recharts, tracking your company's net worth based on cash-on-hand and user equity.
- Probabilistic Marketing: Launch campaigns with a 60% success factor—simulating the volatility of CAC (Customer Acquisition Cost).
- Bankruptcy Logic: A hard "Game Over" state triggered if the Treasury hits $0.

💻 Technical Stack
- Framework: React + Vite (Lightning-fast HMR and build times).
- State Management: Zustand with Persistence (Game state survives browser refreshes).
- UI/UX: Mantine UI with a custom Glassmorphism theme for a "Command Center" feel.
- Icons: Lucide React.
- Audio: Custom Web Audio API synthesizer (No external assets required).

🏗️ Project Architecture
src/
├── components/       # Reusable UI (EmployeeCard, ValuationChart)
├── data/             # Business Logic (Tech Tree, Industry Verticals)
├── engine/           # SFX Synthesizer & Physics
├── hooks/            # useGameState.js (The Central "Brain")
└── App.jsx           # The "Conglomerate" Dashboard

📈 Optimization & Unit Economics
The game's engine is balanced using a daily-burn-divided-by-30 model.

Revenue Calculation: (Total Users * ARPU) - ((Salaries + Rent) / 30)

ARPU: Base $0.25, scaling with product complexity.

🛠️ Local Development
Clone the Repo:

```bash
git clone https://github.com/Amurut/startup-ceo-sim-game.git
```
Install Dependencies:

```bash
npm install
```
Start the Engine:

```bash
npm run dev
```
