import React, { ReactElement, ReactNode } from "react";
import { Link as WouterLink, useRoute } from "wouter";
import classnames from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
  classNameInactive?: string;
  classNameActive?: string;
  onLinkHover?: () => void;
  pattern?: string;
  href: string;
};

export default function LinkText(props: Props): ReactElement<Props> {
  const {
    children,
    className = "",
    classNameActive,
    classNameInactive,
    onLinkHover,
    pattern,
    href,
  } = props;
  const [isActive] = useRoute(pattern || props.href);
  const linkClassName = classnames(
    className,
    isActive ? classNameActive : classNameInactive,
  );

  const onMouseOver = (): void => {
    if (onLinkHover) {
      onLinkHover();
    }
  };

  return (
    <WouterLink href={href}>
      <a onMouseOver={onMouseOver} className={linkClassName}>
        {children}
      </a>
    </WouterLink>
  );
}
