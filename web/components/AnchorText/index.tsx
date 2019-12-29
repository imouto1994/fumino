import styles from "./styles.css";

import React, { ReactElement, ReactNode } from "react";
import classnames from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
  href: string;
};

export default function AnchorText(props: Props): ReactElement<Props> {
  const { children, className, href } = props;
  const anchorClassName = classnames(styles.link, className);

  return (
    <a className={anchorClassName} href={href} target="__blank">
      {children}
    </a>
  );
}
