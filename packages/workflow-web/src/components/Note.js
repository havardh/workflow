// @flow
import * as React from 'react';

type Props = { children: React.Node };

export const Note = ({ children }: Props) => (
  <div className="codeWrapper">
    <strong>Note:&nbsp;</strong>
    {children}
    <br />
    <br />
  </div>
);
