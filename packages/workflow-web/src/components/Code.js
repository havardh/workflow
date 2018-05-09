// @flow
import * as React from "react";

type Props = { children: React.Node };

const Code = ({children}: Props) => (
  <div className="codeWrapper">
    <pre className="code"><code className="language-jsx">{children}</code></pre>
  </div>
);

export default Code;
