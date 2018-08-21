// @flow
import * as React from 'react';

type Props = { children: React.Node };

const Note = ({ children }: Props) => (
  <div className="codeWrapper">
    <strong>Note:&nbsp;</strong>
    {children}
    <br />
    <br />
  </div>
);

export default Note;
