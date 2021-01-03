import React from 'react';

export const Prerequisites = ({ prerequisites }) => (
  <div className="prerequisites">
    <span>Prerequisites</span>
    <ul>
      {prerequisites.map(prerequisite => (
        <li key={prerequisite}>{prerequisite}</li>
      ))}
    </ul>
  </div>
);
