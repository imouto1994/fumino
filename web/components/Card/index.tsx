import styles from "./styles.css";

import React, { ReactElement, ReactNode } from "react";
import classnames from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card(props: Props): ReactElement<Props> {
  const { children, className = "" } = props;

  const cardClassName = classnames(styles.card, className);

  return <div className={cardClassName}>{children}</div>;
}
