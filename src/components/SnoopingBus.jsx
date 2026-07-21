// src/components/SnoopingBus.jsx
import React from 'react';
import { useCacheStore } from '../store/cacheStore';

const SnoopingBus = () => {
  const { busMessage, isBusActive } = useCacheStore();
  
  // SAFETY: Use defaults if busMessage is undefined
  const safeBusMessage = busMessage || { text: 'Bus idle...', sub: 'Waiting for action', type: 'idle' };

  return (
    <div className="snooping-bus">
      <h4>Looking-Glass Bus</h4>
      <div className={`bus-icon ${isBusActive ? 'active' : ''}`}>
        {isBusActive ? '' : ''}
      </div>
      <div className="bus-message">
        <div className="message-text">{safeBusMessage.text || 'Bus idle...'}</div>
        <div className="message-sub">{safeBusMessage.sub || 'Waiting for action'}</div>
      </div>
      <div className="bus-status">
        <span className={`status-dot ${isBusActive ? 'active' : 'idle'}`} />
        <span>{isBusActive ? 'Bus Active' : 'Idle'}</span>
      </div>
    </div>
  );
};

export default SnoopingBus;
