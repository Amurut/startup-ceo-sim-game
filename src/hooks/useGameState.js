import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { playSound } from '../engine/sfx';

export const useGameState = create(
  persist(
    (set, get) => ({
      cash: 50000,
      officeCapacity: 10,
      researchPoints: 0,
      unlockedTech: [],
      history: [],
      isBankrupt: false,
      burnPausedUntil: 0,
      forgedProducts: [],
      products: [
        { id: 'p-initial', name: 'Legacy Core', build: 0, version: 1.0, staff: { devs: 1, scientists: 0 }, users: 100 }
      ],

      // --- HR & STAFFING ---
      adjustStaff: (productId, role, delta) => set((state) => {
        const totalStaff = state.products.reduce((acc, p) => acc + p.staff.devs + p.staff.scientists, 0);
        
        const updatedProducts = state.products.map(p => {
          if (p.id === productId) {
            const newCount = Math.max(0, p.staff[role] + delta);
            if (delta > 0 && totalStaff >= state.officeCapacity) return p; 
            if (delta !== 0) playSound('click');
            return { ...p, staff: { ...p.staff, [role]: newCount } };
          }
          return p;
        });
        return { products: updatedProducts };
      }),

      // --- FORGE & TECH ---
      unlockTech: (techId, cost) => set((state) => {
        if (state.researchPoints >= cost) {
          playSound('launch');
          return { researchPoints: state.researchPoints - cost, unlockedTech: [...state.unlockedTech, techId] };
        }
        return state;
      }),

      forgeNewProduct: () => set((state) => {
        const prefixes = ["Quantum", "Neo", "Cloud", "Apex", "Bio"];
        const suffixes = ["Health", "Pay", "Logic", "Bot", "Link"];
        const randomName = `${prefixes[Math.floor(Math.random()*prefixes.length)]}${suffixes[Math.floor(Math.random()*suffixes.length)]}`;
        
        const newProduct = {
          id: `p-${Date.now()}`,
          name: randomName,
          build: 0,
          version: 1.0,
          staff: { devs: 0, scientists: 0 },
          users: 0
        };
        playSound('launch');
        return { products: [...state.products, newProduct], forgedProducts: [...state.forgedProducts, newProduct], cash: state.cash - 10000 };
      }),

      // --- INFRASTRUCTURE ---
      buyOffice: () => set((state) => {
        const cost = state.officeCapacity * 2000;
        if (state.cash >= cost) {
          playSound('launch');
          return { cash: state.cash - cost, officeCapacity: state.officeCapacity + 10 };
        }
        return state;
      }),

      runMarketing: () => set((state) => {
        if (state.cash >= 5000) {
          playSound('click');

          const userPercent = Math.random() * 2.05 - 0.05; // range [-0.05, 2.00]
          const totalUsers = state.products.reduce((acc, p) => acc + p.users, 0);
          const userDelta = Math.floor(totalUsers * userPercent);

          // Spread the user change across products proportionally
          let remainingDelta = userDelta;
          const updatedProducts = state.products.map((p, idx) => {
            const share = totalUsers ? p.users / totalUsers : 1 / state.products.length;
            const change = Math.floor(userDelta * share);
            remainingDelta -= change;
            return { ...p, users: Math.max(0, p.users + change) };
          }).map((p, idx) => {
            // apply any rounding remaining to first product(s)
            if (idx === 0 && remainingDelta !== 0) {
              return { ...p, users: Math.max(0, p.users + remainingDelta) };
            }
            return p;
          });

          return {
            cash: state.cash - 5000,
            products: updatedProducts
          };
        }
        return state;
      }),

      founderHustle: () => set((state) => {
        playSound('click');
        return {
          cash: state.cash + 50,
          burnPausedUntil: Date.now() + 1000
        };
      }),

      // --- CORE TICK ---
      tick: () => set((state) => {
        if (state.isBankrupt) return state;

        const now = Date.now();
        const productMultiplier = 1 + (state.forgedProducts.length * 0.2);
        const ARPU = 0.25 * productMultiplier;
        const efficiencyBonus = state.unlockedTech.includes('remote_work_policy') ? 0.75 : 1.0;

        let totalRevenue = 0;
        let totalBurn = 300;
        let totalSci = 0;
        let seedInjection = 0;

        const burnPaused = now < state.burnPausedUntil;

        const updatedProducts = state.products.map(p => {
          const buildGain = (p.staff.devs * 0.8) + 0.1;
          let newBuild = p.build + buildGain;
          let newVersion = p.version;
          let newUsers = p.users;

          if (newBuild >= 100) {
            newBuild = 0;
            newVersion = parseFloat((p.version + 0.1).toFixed(1));
            newUsers += Math.floor(newUsers * 0.2) + 50;
            seedInjection += 500;
          }

          totalRevenue += (newUsers * ARPU);
          totalBurn += (p.staff.devs * 150 + p.staff.scientists * 200) * efficiencyBonus / 30;
          totalSci += p.staff.scientists;

          return { ...p, build: newBuild, version: newVersion, users: newUsers };
        });

        const effectiveBurn = burnPaused ? 0 : totalBurn;
        const newCash = state.cash + totalRevenue + seedInjection - effectiveBurn;

        if (newCash <= 0) {
          playSound('launch');
          return {
            ...state,
            cash: 0,
            isBankrupt: true,
            history: [...state.history, { time: new Date().toLocaleTimeString([], {second:'2-digit'}), valuation: 0 }].slice(-20)
          };
        }

        const curVal = newCash + updatedProducts.reduce((acc, p) => acc + (p.users * 15), 0);
        const newHist = [...state.history, { time: new Date().toLocaleTimeString([], {second:'2-digit'}), valuation: curVal }].slice(-20);

        return {
          ...state,
          products: updatedProducts,
          cash: newCash,
          researchPoints: state.researchPoints + (totalSci * 0.15),
          history: newHist
        };
      }),

      dissolve: () => { sessionStorage.clear(); window.location.reload(); }
    }),
    { name: 'conglomerate-final-v1', storage: createJSONStorage(() => sessionStorage) }
  )
);