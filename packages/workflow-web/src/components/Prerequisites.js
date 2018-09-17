// @flow
import React from 'react';

type Props = {
  prerequisites: Array<string>,
};

export const Prerequisites = ({ prerequisites }: Props) => (
  <div className="prerequisites">
    <span>Prerequisites</span>
    <ul>
      {prerequisites.map(prerequisite => (
        <li key={prerequisite}>{prerequisite}</li>
      ))}
    </ul>
  </div>
);
