import React, { ReactElement, ReactNode } from "react";
import classnames from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card(props: Props): ReactElement<Props> {
  const { children, className = "" } = props;

  const cardClassName = classnames(
    "bgGray90 p12 borderRoundedSmall overflowHidden",
    className,
  );

  return <div className={cardClassName}>{children}</div>;
}
