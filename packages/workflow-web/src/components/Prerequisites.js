// @flow
import React from "react";

type Props = {
  prerequisites: Array<string>
}

const Prerequisites = ({prerequisites}: Props) => (
  <div className="prerequisites">
    <span>Prerequisites</span>
    <ul>
      {prerequisites.map(prerequisite => (
        <li key={prerequisite}>{prerequisite}</li>
      ))}
    </ul>
  </div>
);

export default Prerequisites;
