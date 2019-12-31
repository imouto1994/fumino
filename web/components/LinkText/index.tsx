import styles from "./styles.css";

import React, { ReactElement, ReactNode } from "react";
import { Link as WouterLink, useRoute } from "wouter";
import classnames from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
  classNameInactive?: string;
  classNameActive?: string;
  href: string;
};

export default function LinkText(props: Props): ReactElement<Props> {
  const {
    children,
    className = "",
    classNameActive,
    classNameInactive,
    href,
  } = props;
  const [isActive] = useRoute(props.href);
  const linkClassName = classnames(
    className,
    styles.link,
    isActive ? classNameActive : classNameInactive,
  );

  return (
    <WouterLink className={linkClassName} href={href}>
      {children}
    </WouterLink>
  );
}
