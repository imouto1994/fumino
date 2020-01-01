import styles from "./styles.css";

import React, { ReactElement, useState } from "react";
import classnames from "classnames";
import { Link } from "wouter";

import Image from "../Image";

export default function PageHome(): ReactElement<void> {
  return (
    <div className={styles.container}>
      <HomeThumbnail href="/d" imageURL="https://i.imgur.com/PokpzRQ.jpg" />
      <HomeThumbnail href="/h" imageURL="https://i.imgur.com/fuiPd7R.jpg" />
      <HomeThumbnail href="/m" imageURL="https://i.imgur.com/2s733RQ.jpg" />
      <HomeThumbnail href="/di" imageURL="https://i.imgur.com/ociyY1L.jpg" />
    </div>
  );
}

type HomeThumbnailProps = {
  href: string;
  imageURL: string;
};

function HomeThumbnail(
  props: HomeThumbnailProps,
): ReactElement<HomeThumbnailProps> {
  const { href, imageURL } = props;
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const overlayClassName = classnames(styles.linkOverlay, {
    [styles.linkOverlayHidden]: !isBackgroundLoaded,
  });

  return (
    <Link href={href}>
      <a className={styles.link}>
        <div className={styles.linkBackgroundContainer}>
          <Image
            className={styles.linkBackground}
            src={imageURL}
            onLoad={(): void => setIsBackgroundLoaded(true)}
          />
        </div>
        <div className={overlayClassName} />
        <span className={styles.linkText}>{href}</span>
      </a>
    </Link>
  );
}
