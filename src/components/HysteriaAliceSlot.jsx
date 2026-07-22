// src/components/HysteriaAliceSlot.jsx
import React from 'react';

const HysteriaAliceSlot = ({ slot, index, isSelected, onSelect }) => {
  // SAFETY CHECK: If slot is undefined or null, use defaults
  const safeSlot = slot || { state: 'empty', data: null, address: null };
  
  // HARDCODED FALLBACK
  const hysteriaMemories = ['Ruin', 'Void', 'Dollhouse'];
  const fallbackData = hysteriaMemories[index] || '—';
  
  // SAFE: Check if data exists before accessing
  const displayData = (safeSlot.state === 'empty' || safeSlot.data === null || safeSlot.data === undefined) 
    ? fallbackData 
    : safeSlot.data;

  // SAFE: Check state exists
  const stateClass = (safeSlot.state === 'empty' || safeSlot.state === null || safeSlot.state === undefined)
    ? 'state-empty'
    : `state-${safeSlot.state}`;

  const stateLabel = (safeSlot.state === 'empty' || safeSlot.state === null || safeSlot.state === undefined)
    ? 'EMPTY'
    : safeSlot.state.toUpperCase();

  return (
    <div
      className={`memory-slot ${stateClass} ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="slot-content">
        <div className="slot-address">{safeSlot.address || `0x0${index + 3}`}</div>
        <div className="slot-data">{displayData}</div>
        <div className="slot-state">[{stateLabel}]</div>
      </div>
    </div>
  );
};

export default HysteriaAliceSlot;
