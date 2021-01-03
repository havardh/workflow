import * as React from 'react';

export const Note = ({ children }) => (
  <div className="codeWrapper">
    <strong>Note:&nbsp;</strong>
    {children}
    <br />
    <br />
  </div>
);
