// src/store/cacheStore.js
import { create } from 'zustand';

// All available memories
const ALL_MEMORIES = ['Teacup', 'Knife', 'Cheshire Cat', 'Wonderland', 'Tea Party', 'Caterpillar', 'Mad Hatter', 'White Rabbit', 'Queen of Hearts', 'Dollhouse'];

// Create empty slots
const createEmptySlots = () => [
  { address: null, data: null, state: 'empty' },
  { address: null, data: null, state: 'empty' },
  { address: null, data: null, state: 'empty' },
];

export const useCacheStore = create((set, get) => ({
  // ========== CORE 0 ==========
  core0: {
    name: 'Classic Alice',
    slots: createEmptySlots(),
  },

  // ========== CORE 1 ==========
  core1: {
    name: 'Hysteria Alice',
    slots: createEmptySlots(),
  },

  // ========== UI STATE ==========
  selectedSlot: { core: 0, index: 0 },
  isBusActive: false,
  busItem: null,
  busDirection: null,
  busMessage: {
    text: 'Bus idle... Waiting for action',
    sub: 'Snooping for memory operations',
    type: 'idle'
  },
  explanation: {
    alice: 'Click a slot, then "Remember" to load a memory.',
    hardware: 'All cache lines are Invalid (I). Click "Remember" to issue a Bus Read.',
  },
  log: ['Ready for operations...'],

  // ========== SELECT SLOT - FIXED ==========
  selectSlot: (core, index) => {
    console.log('selectSlot called:', { core, index });
    // Return a NEW state object with updated selectedSlot
    set({ 
      selectedSlot: { core, index } 
    });
    // Verify it was set
    console.log('After set, selectedSlot:', get().selectedSlot);
  },

  // ========== SET EXPLANATION ==========
  setExplanation: (aliceText, hardwareText) => {
    set({
      explanation: {
        alice: aliceText,
        hardware: hardwareText,
      },
    });
  },

  // ========== ADD LOG ==========
  addLog: (entry) => {
    set((state) => ({
      log: [`[${new Date().toLocaleTimeString()}] ${entry}`, ...state.log.slice(0, 9)],
    }));
  },

  // ========== TRIGGER BUS ==========
  triggerBus: (message, subMessage) => {
    set({
      isBusActive: true,
      busMessage: {
        text: message,
        sub: subMessage,
        type: 'read'
      }
    });
    setTimeout(() => {
      set({
        isBusActive: false,
        busMessage: {
          text: 'Bus idle...',
          sub: 'Waiting for next action',
          type: 'idle'
        }
      });
    }, 2000);
  },

  // ========== GET NEXT AVAILABLE MEMORY ==========
  getNextMemory: () => {
    const state = get();
    
    // Get all used data from both cores
    const usedData = [];
    state.core0.slots.forEach(s => {
      if (s.data !== null && s.data !== undefined) usedData.push(s.data);
    });
    state.core1.slots.forEach(s => {
      if (s.data !== null && s.data !== undefined) usedData.push(s.data);
    });
    
    // Find first unused memory
    for (const mem of ALL_MEMORIES) {
      if (!usedData.includes(mem)) {
        return mem;
      }
    }
    
    // If all used, return first
    return ALL_MEMORIES[0];
  },

  // ========== HANDLE READ (REMEMBER) - FIXED ==========
  handleRead: (coreId, slotIndex) => {
    console.log('=== handleRead called ===');
    console.log('coreId:', coreId, 'slotIndex:', slotIndex);
    
    const state = get();
    
    // Validate slot
    if (slotIndex === undefined || slotIndex === null || slotIndex < 0) {
      state.setExplanation(
        'Please select a memory slot first!',
        'No slot selected.'
      );
      return;
    }

    const coreKey = coreId === 0 ? 'core0' : 'core1';
    const core = state[coreKey];
    const coreName = core.name;
    
    // Check if slot already has data
    const currentSlot = core.slots[slotIndex];
    console.log('Current slot:', currentSlot);
    
    if (currentSlot.data !== null && currentSlot.data !== undefined) {
      state.setExplanation(
        `"${currentSlot.data}" is already in ${coreName}'s Memory Pocket!`,
        'Cache hit! No bus transaction needed.'
      );
      state.addLog(`${coreName} cache hit: "${currentSlot.data}"`);
      state.triggerBus(
        `BUS: ${coreName} READ "${currentSlot.data}" (Cache Hit)`,
        'Data already in cache.'
      );
      return;
    }

    // ===== CACHE MISS - Load new data =====
    const newData = state.getNextMemory();
    console.log('Loading new data:', newData);
    
    // Create NEW slots array (don't mutate!)
    const newSlots = [...core.slots];
    newSlots[slotIndex] = {
      address: `0x0${slotIndex + (coreId === 0 ? 0 : 3)}`,
      data: newData,
      state: 'e'  // Exclusive
    };
    
    console.log('New slots:', newSlots);
    
    // UPDATE THE STORE - Return NEW state object
    set({
      [coreKey]: {
        ...core,  // Spread existing core properties
        slots: newSlots  // Replace slots with new array
      }
    });
    
    // Verify update
    const updated = get();
    console.log('Updated slots:', updated[coreKey].slots);
    console.log('Updated slot data:', updated[coreKey].slots[slotIndex]);
    
    // Update explanation
    state.setExplanation(
      `${coreName} remembered the "${newData}" from the subconscious!`,
      `Data fetched from Main Memory. No other core has this data → Exclusive (E) state.`
    );
    state.addLog(`${coreName} read "${newData}" from RAM → Exclusive (E)`);
    state.triggerBus(
      `BUS: ${coreName} READ "${newData}" from RAM`,
      'No other core has this memory. State: Exclusive (E).'
    );
  },

  // ========== HANDLE WRITE (CORRUPT) - FIXED ==========
  handleWrite: (coreId, slotIndex) => {
    const state = get();
    
    if (slotIndex === undefined || slotIndex === null || slotIndex < 0) {
      state.setExplanation(
        'Please select a memory slot first!',
        'No slot selected.'
      );
      return;
    }

    const coreKey = coreId === 0 ? 'core0' : 'core1';
    const core = state[coreKey];
    const coreName = core.name;
    const otherCoreKey = coreId === 0 ? 'core1' : 'core0';
    const otherCore = state[otherCoreKey];
    const otherCoreName = otherCore.name;
    
    const corrupted = ['Bloody Grenade', 'Ruin', 'Void', 'Shattered Glass', 'Twisted Memory', 'Broken Mirror'];
    const randomCorrupt = corrupted[Math.floor(Math.random() * corrupted.length)];

    const currentSlot = core.slots[slotIndex];
    if (currentSlot.state === 'empty' || currentSlot.address === null) {
      state.setExplanation(
        `There's no memory here to corrupt! Try "Remember" first.`,
        `Cannot write to an empty cache line.`
      );
      return;
    }

    const address = currentSlot.address;
    const dataToCorrupt = currentSlot.data;

    // Invalidate other core if it has this data
    let invalidatedOther = false;
    const otherSlotIndex = otherCore.slots.findIndex(s => s.address === address);
    
    if (otherSlotIndex !== -1) {
      const otherSlot = otherCore.slots[otherSlotIndex];
      if (otherSlot.state !== 'empty' && otherSlot.state !== 'i') {
        // Create NEW slots array for other core
        const otherNewSlots = [...otherCore.slots];
        otherNewSlots[otherSlotIndex] = { address: null, data: null, state: 'i' };
        
        // Update other core with NEW state
        set({
          [otherCoreKey]: {
            ...otherCore,
            slots: otherNewSlots
          }
        });
        invalidatedOther = true;
      }
    }

    // Set writer to Modified - Create NEW slots array
    const newSlots = [...core.slots];
    newSlots[slotIndex] = { address, data: randomCorrupt, state: 'm' };
    
    // Update current core with NEW state
    set({
      [coreKey]: {
        ...core,
        slots: newSlots
      }
    });

    state.setExplanation(
      invalidatedOther
        ? `${coreName} corrupted "${dataToCorrupt}" into "${randomCorrupt}"! ${otherCoreName}'s memory shattered!`
        : `${coreName} corrupted "${dataToCorrupt}" into "${randomCorrupt}"!`,
      invalidatedOther
        ? `${otherCoreName} transitioned to Invalid (I). ${coreName}'s line entered Modified (M).`
        : `Cache line entered Modified (M).`
    );
    state.addLog(`${coreName} corrupted "${dataToCorrupt}" → "${randomCorrupt}" (M)`);
    state.triggerBus(
      `BUS: ${coreName} MODIFIED "${dataToCorrupt}" → "${randomCorrupt}"`,
      invalidatedOther ? `${otherCoreName}'s copy invalidated!` : 'No other core has this data.'
    );
  },

  // ========== HANDLE WRITEBACK - FIXED ==========
  handleWriteback: (coreId, slotIndex) => {
    const state = get();
    
    if (slotIndex === undefined || slotIndex === null || slotIndex < 0) {
      state.setExplanation(
        'Please select a memory slot first!',
        'No slot selected.'
      );
      return;
    }

    const coreKey = coreId === 0 ? 'core0' : 'core1';
    const core = state[coreKey];
    const coreName = core.name;
    const slot = core.slots[slotIndex];

    if (slot.state === 'empty' || slot.address === null) {
      state.setExplanation(
        `There's no memory here to save!`,
        `Cannot writeback an empty cache line.`
      );
      return;
    }

    if (slot.state === 'm') {
      // Create NEW slots array
      const newSlots = [...core.slots];
      newSlots[slotIndex] = { ...newSlots[slotIndex], state: 's' };
      
      // Update core with NEW state
      set({
        [coreKey]: {
          ...core,
          slots: newSlots
        }
      });

      state.setExplanation(
        `${coreName} embraced sanity! "${slot.data}" is now purified.`,
        `Writeback (WB) operation. Modified (M) data flushed to Main Memory. Cache line transitioned to Shared (S).`
      );
      state.addLog(`${coreName} Writeback to RAM → Shared (S)`);
      state.triggerBus(
        `BUS: ${coreName} WRITEBACK "${slot.data}" to RAM`,
        'Memory purified! RAM updated.'
      );
    } else {
      state.setExplanation(
        `"${slot.data}" isn't corrupted! Only Modified memories need to be purified.`,
        `Current state: ${slot.state.toUpperCase()}. Writeback only valid for Modified (M).`
      );
    }
  },

  // ========== RESET - FIXED ==========
  resetAll: () => {
    set({
      core0: {
        name: 'Classic Alice',
        slots: createEmptySlots(),
      },
      core1: {
        name: 'Hysteria Alice',
        slots: createEmptySlots(),
      },
      selectedSlot: { core: 0, index: 0 },
      isBusActive: false,
      busItem: null,
      busDirection: null,
      busMessage: {
        text: 'Bus idle... Waiting for action',
        sub: 'Snooping for memory operations',
        type: 'idle'
      },
      explanation: {
        alice: 'All slots reset. Click a slot, then "Remember" to load a memory.',
        hardware: 'All cache lines are Invalid (I).',
      },
      log: ['System reset. All cache lines empty.'],
    });
  },
}));
