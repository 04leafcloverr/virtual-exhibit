// src/store/cacheStore.js
import { create } from 'zustand';

export const useCacheStore = create((set, get) => ({
  // ========== MAIN MEMORY (RAM) ==========
  mainMemory: { address: '0x0F', data: 'Teacup' },

  // ========== CLASSIC ALICE (CORE 0) ==========
  core0: {
    name: 'Classic Alice',
    slots: [
      { address: null, data: null, state: 'empty' },
      { address: null, data: null, state: 'empty' },
      { address: null, data: null, state: 'empty' },
    ],
  },

  // ========== HYSTERIA ALICE (CORE 1) ==========
  core1: {
    name: 'Hysteria Alice',
    slots: [
      { address: null, data: null, state: 'empty' },
      { address: null, data: null, state: 'empty' },
      { address: null, data: null, state: 'empty' },
    ],
  },

  // ========== UI STATE ==========
  selectedSlot: { core: 0, index: 0 },
  isBusActive: false,
  busItem: null,
  busDirection: null,

  // ========== EXPLANATION PANEL ==========
  explanation: {
    alice: 'Welcome to Wonderland! Click "Remember" to start exploring.',
    hardware: 'Welcome! Click "Remember" to issue a Bus Read (PrRd).',
  },

  // ========== TRANSACTION LOG ==========
  log: ['Welcome to the Looking-Glass Bus...'],

  // ========== SELECT A SLOT ==========
  selectSlot: (core, index) => {
    set({ selectedSlot: { core, index } });
  },

  // ========== SET EXPLANATION (Combined Text) ==========
  setExplanation: (aliceText, hardwareText) => {
    set({
      explanation: {
        alice: aliceText,
        hardware: hardwareText,
      },
    });
  },

  // ========== ADD LOG ENTRY ==========
  addLog: (entry) => {
    set((state) => ({
      log: [...state.log, `Cycle ${state.log.length}: ${entry}`],
    }));
  },

  // ========== TRIGGER BUS ANIMATION ==========
  triggerBus: (item, direction) => {
    set({ isBusActive: true, busItem: item, busDirection: direction });
    setTimeout(() => {
      set({ isBusActive: false, busItem: null, busDirection: null });
    }, 800);
  },

  // ========== HANDLE READ (REMEMBER) ==========
  handleRead: (coreId, slotIndex) => {
    const state = get();
    const core = coreId === 0 ? state.core0 : state.core1;
    const coreName = core.name;
    const otherCoreId = coreId === 0 ? 1 : 0;
    const otherCore = otherCoreId === 0 ? state.core0 : state.core1;
    const address = '0x0F';
    const data = state.mainMemory.data;

    // Check if other core has this address
    const otherSlot = otherCore.slots.find((s) => s.address === address);

    if (otherSlot && otherSlot.state !== 'empty' && otherSlot.state !== 'i') {
      // Other core has it → Shared
      const otherIndex = otherCore.slots.indexOf(otherSlot);
      set((state) => {
        if (coreId === 0) {
          state.core0.slots[slotIndex] = { address, data, state: 's' };
          state.core1.slots[otherIndex] = { ...state.core1.slots[otherIndex], state: 's' };
        } else {
          state.core1.slots[slotIndex] = { address, data, state: 's' };
          state.core0.slots[otherIndex] = { ...state.core0.slots[otherIndex], state: 's' };
        }
      });

      const aliceText = `${coreName} also remembered the ${data}! Both Alices share this memory.`;
      const hardwareText = `${coreName} issued a PrRd (Bus Read). Snooped the bus and saw ${otherCore.name} already has this data. Both cache lines enter Shared (S) state.`;
      get().setExplanation(aliceText, hardwareText);
      get().addLog(`${coreName} read ${data} → Shared (S)`);
      get().triggerBus('Card', coreId === 0 ? 'right' : 'left');
      return;
    }

    // No one has it → Exclusive
    set((state) => {
      if (coreId === 0) {
        state.core0.slots[slotIndex] = { address, data, state: 'e' };
      } else {
        state.core1.slots[slotIndex] = { address, data, state: 'e' };
      }
    });

    const aliceText = `${coreName} remembered the ${data}! She is the only one with this memory.`;
    const hardwareText = `${coreName} issued a PrRd (Bus Read). Data fetched from Main Memory. No other core has this data → Exclusive (E) state.`;
    get().setExplanation(aliceText, hardwareText);
    get().addLog(`${coreName} read ${data} → Exclusive (E)`);
    get().triggerBus('Teacup', coreId === 0 ? 'right' : 'left');
  },

  // ========== HANDLE WRITE (CORRUPT) ==========
  handleWrite: (coreId, slotIndex) => {
    const state = get();
    const core = coreId === 0 ? state.core0 : state.core1;
    const coreName = core.name;
    const otherCoreId = coreId === 0 ? 1 : 0;
    const otherCore = otherCoreId === 0 ? state.core0 : state.core1;
    const otherCoreName = otherCore.name;
    const address = '0x0F';
    const newData = 'Bloody Grenade';

    // Check if the slot is empty
    if (state.core0.slots[slotIndex].state === 'empty' &&
        state.core1.slots[slotIndex].state === 'empty') {
      const aliceText = `There's no memory here to corrupt! Try "Remember" first.`;
      const hardwareText = `Cannot write to an empty cache line. Perform a Read (PrRd) first.`;
      get().setExplanation(aliceText, hardwareText);
      return;
    }

    // Invalidate other core's copy
    const otherSlot = otherCore.slots.find((s) => s.address === address);
    if (otherSlot && otherSlot.state !== 'empty' && otherSlot.state !== 'i') {
      const otherIndex = otherCore.slots.indexOf(otherSlot);
      set((state) => {
        if (otherCoreId === 0) {
          state.core0.slots[otherIndex] = { address: null, data: null, state: 'i' };
        } else {
          state.core1.slots[otherIndex] = { address: null, data: null, state: 'i' };
        }
      });
    }

    // Set writer to Modified (M)
    set((state) => {
      if (coreId === 0) {
        state.core0.slots[slotIndex] = { address, data: newData, state: 'm' };
      } else {
        state.core1.slots[slotIndex] = { address, data: newData, state: 'm' };
      }
    });

    const aliceText = `${coreName} corrupted the memory! ${otherCoreName}'s memory shattered because it's now stale!`;
    const hardwareText = `${coreName} issued a BusRdX (Read for Ownership). Broadcasted a write request on the Snooping Bus. ${otherCoreName} snooped this and transitioned to Invalid (I). ${coreName}'s line entered Modified (M). Only one core can hold M at a time!`;
    get().setExplanation(aliceText, hardwareText);
    get().addLog(`${coreName} corrupted memory → ${otherCoreName} Invalidated (I)`);
    get().triggerBus('Blade', coreId === 0 ? 'right' : 'left');
  },

  // ========== HANDLE WRITEBACK (EMBRACE SANITY) ==========
  handleWriteback: (coreId, slotIndex) => {
    const state = get();
    const core = coreId === 0 ? state.core0 : state.core1;
    const coreName = core.name;
    const slot = core.slots[slotIndex];

    if (slot.state === 'm') {
      // Update main memory
      set((state) => {
        state.mainMemory.data = slot.data;
      });

      // Transition from Modified (M) to Exclusive (E)
      set((state) => {
        if (coreId === 0) {
          state.core0.slots[slotIndex] = { ...state.core0.slots[slotIndex], state: 'e' };
        } else {
          state.core1.slots[slotIndex] = { ...state.core1.slots[slotIndex], state: 'e' };
        }
      });

      const aliceText = `${coreName} embraced sanity and saved the corrupted memory to her brain. It's now permanent!`;
      const hardwareText = `${coreName} issued a Writeback (WB). The Modified (M) data was written back to Main Memory (RAM). Cache line transitioned from M to Exclusive (E). Memory is now coherent.`;
      get().setExplanation(aliceText, hardwareText);
      get().addLog(`${coreName} Writeback to RAM → Exclusive (E)`);
      get().triggerBus('Save', 'down');
    } else {
      const aliceText = `There's nothing corrupted to save! Only Modified (M) memories can be saved.`;
      const hardwareText = `Writeback (WB) is only valid for Modified (M) cache lines. Current state: ${slot.state.toUpperCase()}`;
      get().setExplanation(aliceText, hardwareText);
    }
  },
}));