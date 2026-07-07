// src/components/ExplanationPanel.jsx
import React from 'react';
import { useCacheStore } from '../store/cacheStore';

const ExplanationPanel = () => {
  const { explanation } = useCacheStore();

  return (
    <div className="explanation-panel">
      <h4>What Just Happened?</h4>
      <div className="explanation-content">
        <p><strong>Alice says:</strong> {explanation.alice}</p>
        <p><strong>In Hardware:</strong> {explanation.hardware}</p>
      </div>
    </div>
  );
};

export default ExplanationPanel;