import * as React from 'react';

export const Code = ({ children }) => (
  <div className="codeWrapper">
    <pre className="code">
      <code className="language-jsx">{children}</code>
    </pre>
  </div>
);
