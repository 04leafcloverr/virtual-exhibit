// src/components/StatusLog.jsx
import React, { useRef, useEffect } from 'react';
import { useCacheStore } from '../store/cacheStore';

const StatusLog = () => {
  const { log } = useCacheStore();
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  return (
    <div className="log-container">
      <h4>Cheshire Cat's Log</h4>
      {log.map((entry, index) => (
        <div key={index} className="log-entry">
          {entry}
        </div>
      ))}
      <div ref={logEndRef} />
    </div>
  );
};

export default StatusLog;