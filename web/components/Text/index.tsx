import styles from "./styles.css";

import React, { ReactElement, ReactNode } from "react";
import classnames from "classnames";

type Props = {
  children: ReactNode;
  className?: string;
  weight?: 400 | 500 | 600 | 700 | 800;
  size?: 12 | 14 | 16 | 18 | 24;
  singleline?: boolean;
};

export default function Text(props: Props): ReactElement<Props> {
  const { children, className, weight = 400, size = 16, singleline } = props;
  const textClassName = classnames(className, styles.text, {
    [styles.weightMedium]: weight === 500,
    [styles.weightSemibold]: weight === 600,
    [styles.weightBold]: weight === 700,
    [styles.weightBlack]: weight === 800,
    [styles.size12]: size === 12,
    [styles.size14]: size === 14,
    [styles.size18]: size === 18,
    [styles.size24]: size === 24,
    [styles.singleline]: !!singleline,
  });

  return <p className={textClassName}>{children}</p>;
}
