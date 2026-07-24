// src/components/RabbitHoleRAM.jsx
import React from 'react';
import { useCacheStore } from '../store/cacheStore';

const memoryImages = {
  'Teacup': '/virtual-exhibit-template/Teacup.png',
  'Knife': '/virtual-exhibit-template/Knife.png',
  'Broken Knife': '/virtual-exhibit-template/Broken-Knife.png',
  'Top Hat': '/virtual-exhibit-template/Top-Hat.png',
  'Broken Top-Hat': '/virtual-exhibit-template/Broken-Top-Hat.png',
  'Clock': '/virtual-exhibit-template/Clock.png',
  'Broken Clock': '/virtual-exhibit-template/Broken-Clock.png',
  'Key': '/virtual-exhibit-template/Key.png',
  'Broken Key': '/virtual-exhibit-template/Broken-Key.png',
  'Broken Mirror': '/virtual-exhibit-template/Broken-Mirror.png',
  'Broken Teacup': '/virtual-exhibit-template/Broken-Teacup.png',
};

const getImageForData = (data) => {
  if (!data) return null;
  return memoryImages[data] || null;
};

const RabbitHoleRAM = () => {
  const { ram, selectedRamAddress, selectRamAddress, handleGlobalWriteback } = useCacheStore();
  const ramAddresses = ['0x00', '0x01', '0x02', '0x03', '0x04'];

  return (
    <div className="ram-container">
      <h3>Rabbit Hole (RAM)</h3>
      <div className="ram-slots">
        {ramAddresses.map((address) => {
          const itemData = ram[address]?.data;
          const imageSrc = getImageForData(itemData);

          return (
            <div 
              key={address} 
              className={`ram-slot ${selectedRamAddress === address ? 'selected' : ''}`}
              onClick={() => selectRamAddress(address)}
              style={{ cursor: 'pointer' }}
            >
              {imageSrc ? (
                <img src={imageSrc} alt={itemData || 'Empty'} className="ram-image" />
              ) : (
                <div className="ram-empty-text">?</div>
              )}
            </div>
          );
        })}
      </div>
      
      <div style={{ marginTop: '20px' }}>
         <button className="btn-writeback" onClick={handleGlobalWriteback}>
            Embrace Sanity
         </button>
      </div>
    </div>
  );
};

export default RabbitHoleRAM;