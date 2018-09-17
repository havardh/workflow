// @flow
import * as React from 'react';

type Props = { children: React.Node };

export const SubTitle = ({ children }: Props) => (
  <div className="subTitleWrapper">
    <h2 className="subTitle">{children}</h2>
  </div>
);
