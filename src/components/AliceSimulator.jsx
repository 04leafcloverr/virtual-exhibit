// src/components/AliceSimulator.jsx
import React from 'react';
import { useCacheStore } from '../store/cacheStore';
import ClassicAliceSlot from './ClassicAliceSlot';
import HysteriaAliceSlot from './HysteriaAliceSlot';
import SnoopingBus from './SnoopingBus';
import RabbitHoleRAM from './RabbitHoleRAM';
import ExplanationPanel from './ExplanationPanel';
import StatusLog from './StatusLog';

const AliceSimulator = () => {
  const {
    core0,
    core1,
    selectedSlot,
    handleRead,
    handleWrite,
    handleWriteback,
    selectSlot,
  } = useCacheStore();

  return (
    <div className="exhibit-container">
      {/* Split Screen */}
      <div className="split-container">
        {/* Classic Alice (Core 0) */}
        <div className="classic-alice">
          <h3>Classic Alice (Core 0)</h3>
          {core0.slots.map((slot, index) => (
            <ClassicAliceSlot
              key={index}
              slot={slot}
              index={index}
              isSelected={selectedSlot.core === 0 && selectedSlot.index === index}
              onSelect={() => selectSlot(0, index)}
            />
          ))}
          <div className="button-group">
            <button
              className="btn-remember"
              onClick={() => handleRead(0, selectedSlot.index)}
              disabled={selectedSlot.core !== 0}
            >
              Remember
            </button>
            <button
              className="btn-corrupt"
              onClick={() => handleWrite(0, selectedSlot.index)}
              disabled={selectedSlot.core !== 0}
            >
              Corrupt
            </button>
            <button
              className="btn-writeback"
              onClick={() => handleWriteback(0, selectedSlot.index)}
              disabled={selectedSlot.core !== 0}
            >
              Embrace Sanity
            </button>
          </div>
        </div>

        {/* Snooping Bus */}
        <SnoopingBus />

        {/* Hysteria Alice (Core 1) */}
        <div className="hysteria-alice">
          <h3>Hysteria Alice (Core 1)</h3>
          {core1.slots.map((slot, index) => (
            <HysteriaAliceSlot
              key={index}
              slot={slot}
              index={index}
              isSelected={selectedSlot.core === 1 && selectedSlot.index === index}
              onSelect={() => selectSlot(1, index)}
            />
          ))}
          <div className="button-group">
            <button
              className="btn-remember"
              onClick={() => handleRead(1, selectedSlot.index)}
              disabled={selectedSlot.core !== 1}
            >
              Remember
            </button>
            <button
              className="btn-corrupt"
              onClick={() => handleWrite(1, selectedSlot.index)}
              disabled={selectedSlot.core !== 1}
            >
              Corrupt
            </button>
            <button
              className="btn-writeback"
              onClick={() => handleWriteback(1, selectedSlot.index)}
              disabled={selectedSlot.core !== 1}
            >
              Embrace Sanity
            </button>
          </div>
        </div>
      </div>

      {/* RAM */}
      <RabbitHoleRAM />

      {/* Explanation Panel */}
      <ExplanationPanel />

      {/* Status Log */}
      <StatusLog />
    </div>
  );
};

export default AliceSimulator;