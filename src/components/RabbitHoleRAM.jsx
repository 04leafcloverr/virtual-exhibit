// src/components/RabbitHoleRAM.jsx
import React from 'react';
import { useCacheStore } from '../store/cacheStore';

const RabbitHoleRAM = () => {
  const { mainMemory } = useCacheStore();
  
  // SAFETY: Use defaults if mainMemory is undefined
  const safeMemory = mainMemory || { address: '0x00', data: 'Teacup' };

  return (
    <div className="ram-container">
      <h3>Rabbit Hole (RAM)</h3>
      <div className="ram-data">{safeMemory.data || 'Teacup'}</div>
      <div className="ram-address">Address: {safeMemory.address || '0x00'}</div>
    </div>
  );
};

export default RabbitHoleRAM;
