// src/components/RabbitHoleRAM.jsx
import React from 'react';
import { useCacheStore } from '../store/cacheStore';

const RabbitHoleRAM = () => {
  const { mainMemory } = useCacheStore();

  return (
    <div className="ram-container">
      <h3>Alice's Brain (Main Memory)</h3>
      <div className="ram-data">{mainMemory.data}</div>
      <div className="ram-address">Address: {mainMemory.address}</div>
    </div>
  );
};

export default RabbitHoleRAM;