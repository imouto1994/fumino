import styles from "./styles.css";

import React, { ReactElement } from "react";
import { Link } from "wouter";

export default function PageHome(): ReactElement<void> {
  return (
    <div className={styles.container}>
      <Link href="/d">
        <a className={`${styles.link} ${styles.linkDoujinshi}`}>
          <div className={styles.linkOverlay} />
          <span className={styles.linkText}>{"/d"}</span>
        </a>
      </Link>
      <Link href="/h">
        <a className={`${styles.link} ${styles.linkHentai}`}>
          <div className={styles.linkOverlay} />
          <span className={styles.linkText}>{"/h"}</span>
        </a>
      </Link>
      <Link href="/m">
        <a className={`${styles.link} ${styles.linkManga}`}>
          <div className={styles.linkOverlay} />
          <span className={styles.linkText}>{"/m"}</span>
        </a>
      </Link>
      <Link href="/di">
        <a className={`${styles.link} ${styles.linkDigital}`}>
          <div className={styles.linkOverlay} />
          <span className={styles.linkText}>{"/di"}</span>
        </a>
      </Link>
    </div>
  );
}
