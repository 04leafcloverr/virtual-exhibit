// src/components/ClassicAliceSlot.jsx
import React from 'react';

const stateClassMap = {
  e: 'state-e',
  s: 'state-s',
  m: 'state-m',
  i: 'state-i',
  empty: 'state-empty',
};

const stateLabelMap = {
  e: 'E',
  s: 'S',
  m: 'M',
  i: 'I',
  empty: '—',
};

const ClassicAliceSlot = ({ slot, index, isSelected, onSelect }) => {
  const stateClass = stateClassMap[slot.state] || 'state-empty';
  const stateLabel = stateLabelMap[slot.state] || '—';

  return (
    <div
      className={`memory-slot ${stateClass} ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="slot-content">
        <div className="slot-data">{slot.state !== 'empty' ? slot.data : '—'}</div>
        <div className="slot-state">[{stateLabel}]</div>
      </div>
    </div>
  );
};

export default ClassicAliceSlot;