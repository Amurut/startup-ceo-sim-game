import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useGameState = create(
  persist(
    (set, get) => ({
      // --- RESOURCES ---
      cash: 50000,
      researchPoints: 0,
      users: 0,
      hype: 10,
      buildPoints: 0,
      currentVersion: "1.0",
      employees: { devs: 0, marketers: 0, scientists: 0 },
      unlockedTech: [],
      history: [],

      // --- ACTIONS ---
      addCash: (amount) => set((state) => ({ cash: state.cash + amount })),
      
      generateBuild: () => set((state) => ({ 
        buildPoints: Math.min(100, state.buildPoints + 2 + (state.employees.devs * 3)) 
      })),

      launchProduct: (notify) => set((state) => {
        const quality = state.buildPoints / 100;
        const hypeBonus = quality > 0.8 ? 40 : 10;
        const newUsers = Math.floor(state.buildPoints * (state.hype * 0.5));
        const launchBonus = quality * 10000;

        if (notify) notify("Launch Success!", `v${state.currentVersion} live! +${newUsers} users.`);

        return {
          buildPoints: 0,
          users: state.users + newUsers,
          hype: state.hype + hypeBonus,
          cash: state.cash + launchBonus,
          currentVersion: `1.${parseInt(state.currentVersion.split('.')[1]) + 1}`
        };
      }),

      hireEmployee: (role) => set((state) => {
        const costs = { devs: 1500, marketers: 1000, scientists: 2000 };
        if (state.cash >= costs[role]) {
          return {
            cash: state.cash - costs[role],
            employees: { ...state.employees, [role]: state.employees[role] + 1 }
          };
        }
        return state;
      }),

      unlockTech: (techId, cost) => set((state) => {
        if (state.researchPoints >= cost) {
          return {
            researchPoints: state.researchPoints - cost,
            unlockedTech: [...state.unlockedTech, techId]
          };
        }
        return state;
      }),

      // --- THE TICK ---
      tick: (notify) => set((state) => {
        // Burn Calculations
        let monthlyBurn = 800 + (state.employees.devs * 200) + (state.employees.marketers * 150);
        if (state.unlockedTech.includes('cloud_infra')) monthlyBurn *= 0.8;
        const tickBurn = monthlyBurn / 30;

        // Gains
        let rpGain = state.employees.scientists * 0.8;
        if (state.unlockedTech.includes('open_source')) rpGain *= 1.25;
        
        const revMultiplier = state.unlockedTech.includes('platform_ecosystem') ? 0.15 : 0.10;
        const revenue = state.users * revMultiplier;

        // Valuation Snapshot
        const currentVal = state.cash + (state.users * 15);
        let newHistory = state.history;
        if (Math.floor(Date.now() / 1000) % 5 === 0) {
            newHistory = [...state.history, { time: new Date().toLocaleTimeString([], {minute:'2-digit', second:'2-digit'}), valuation: currentVal }].slice(-20);
        }

        // Random Events
        if (Math.random() > 0.98 && notify) {
            notify("Market Shift", "Investors are watching. +20 RP");
            return { ...state, researchPoints: state.researchPoints + 20 };
        }

        return {
          cash: state.cash + revenue - tickBurn,
          researchPoints: state.researchPoints + rpGain,
          history: newHistory
        };
      }),

      reset: () => {
          sessionStorage.clear();
          window.location.reload();
      }
    }),
    {
      name: 'ceo-sim-v2',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);