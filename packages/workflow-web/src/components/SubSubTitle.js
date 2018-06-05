// @flow
import * as React from "react";

type Props = { children: React.Node };

const SubSubTitle = ({children}: Props) => (
  <div className="subSubTitleWrapper">
    <h3 className="subSubTitle">{children}</h3>
  </div>
)

export default SubSubTitle;
