// @flow
import * as React from 'react';

type Props = { children: React.Node };

export const Code = ({ children }: Props) => (
  <div className="codeWrapper">
    <pre className="code">
      <code className="language-jsx">{children}</code>
    </pre>
  </div>
);
