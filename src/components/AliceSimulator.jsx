// src/components/AliceSimulator.jsx
import React from 'react';
import { useCacheStore } from '../store/cacheStore';
import SnoopingBus from './SnoopingBus';
import RabbitHoleRAM from './RabbitHoleRAM';
import ExplanationPanel from './ExplanationPanel';
import StatusLog from './StatusLog';

// Helper to map data to the correct image
export const getImageForData = (data) => {
  if (!data) return null;

  switch (data) {
    case 'Teacup':
      return '/virtual-exhibit-template/Teacup.png';

    case 'Broken Teacup':
      return '/virtual-exhibit-template/Broken-Teacup.png';

    case 'Knife':
      return '/virtual-exhibit-template/Knife.png';

    case 'Broken Knife':
      return '/virtual-exhibit-template/Broken-Knife.png';

    case 'Top Hat':
      return '/virtual-exhibit-template/Top-Hat.png';

    case 'Broken Top-Hat':
      return '/virtual-exhibit-template/Broken-Top-Hat.png';

    case 'Clock':
      return '/virtual-exhibit-template/Clock.png';

    case 'Broken Clock':
      return '/virtual-exhibit-template/Broken-Clock.png';

    case 'Key':
      return '/virtual-exhibit-template/Key.png';

    case 'Broken Key':
      return '/virtual-exhibit-template/Broken-Key.png';

    case 'Broken Mirror':
      return '/virtual-exhibit-template/Broken-Mirror.png';

    default:
      return '/virtual-exhibit-template/Broken-Mirror.png';
  }
};

const AliceSimulator = () => {
  const {
    core0,
    core1,
    selectedCore,
    handleRead,
    handleWrite,
    selectCore,
  } = useCacheStore();

  const getStateClass = (state) => {
    if (state === 'empty') return 'state-empty';
    if (state === 'e') return 'state-e';
    if (state === 's') return 'state-s';
    if (state === 'm') return 'state-m';
    if (state === 'i') return 'state-i';
    return 'state-empty';
  };

  const renderCore = (core, coreId, name, className) => {
    const isSelected = selectedCore === coreId;
    const slot = core.slot;
    const stateClass = getStateClass(slot.state);
    const displayData = slot.data || 'Empty';
    const imageSrc = getImageForData(slot.data);

    return (
      <div className={`${className}`}>
        <h3>{name}</h3>
        <div className="slot-row">
          <div
              className={`memory-slot ${stateClass} ${isSelected ? 'selected' : ''}`}
              onClick={() => selectCore(coreId)}
          >
              <div className="slot-content">
                  {imageSrc && (
                    <img src={imageSrc} alt={displayData} className="memory-image" />
                  )}
                  <div className="memory-label">{displayData}</div>
              </div>
          </div>

          <div className="button-group">
              <button
                  className="btn-remember"
                  onClick={() => handleRead(coreId)}
                  disabled={!isSelected}
              >
                  Remember
              </button>

              <button
                  className="btn-corrupt"
                  onClick={() => handleWrite(coreId)}
                  disabled={!isSelected}
              >
                  Corrupt
              </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="exhibit-container">
      <h1 className="exhibit-title">Alice Through the Snooping Bus</h1>

      <RabbitHoleRAM />
      <div className="split-container">
        {renderCore(core0, 0, 'Classic Alice (Core 0)', 'classic-alice')}
        {renderCore(core1, 1, 'Hysteria Alice (Core 1)', 'hysteria-alice')}
      </div>

      <SnoopingBus />
      <ExplanationPanel />
      <StatusLog />
    </div>
  );
};

export default AliceSimulator;