// src/components/SnoopingBus.jsx
import React from 'react';
import { useCacheStore } from '../store/cacheStore';

const SnoopingBus = () => {
  const { isBusActive, busItem, busDirection } = useCacheStore();

  return (
    <div className="snooping-bus">
      <h4>Looking-Glass Bus</h4>
      <div className={`bus-icon ${isBusActive ? 'active' : ''}`}>
        {isBusActive ? (busItem || '---') : '...'}
      </div>
      <div className="bus-idle-text">
        {isBusActive
          ? busDirection === 'down'
            ? 'Writing to RAM...'
            : 'Broadcasting...'
          : 'The mirror is quiet...'}
      </div>
    </div>
  );
};

export default SnoopingBus;