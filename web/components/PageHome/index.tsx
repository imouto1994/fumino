import styles from "./styles.css";

import React, { ReactElement, useState } from "react";
import classnames from "classnames";
import { Link } from "wouter";

import Image from "../Image";
import PageDLoadable from "../PageDLoadable";
import PageHLoadable from "../PageHLoadable";
import PageMLoadable from "../PageMLoadable";
import PageDiLoadable from "../PageDiLoadable";

export default function PageHome(): ReactElement<void> {
  return (
    <div className={styles.container}>
      <HomeThumbnail href="/d" imageURL="/coverD.jpg" />
      <HomeThumbnail href="/h" imageURL="/coverH.jpg" />
      <HomeThumbnail href="/m" imageURL="/coverM.jpg" />
      <HomeThumbnail href="/di" imageURL="/coverDi.jpg" />
    </div>
  );
}

type HomeThumbnailProps = {
  href: "/d" | "/h" | "/m" | "/di";
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

  const onLinkHover = (): void => {
    if (href === "/d") {
      PageDLoadable.preload();
    } else if (href === "/h") {
      PageHLoadable.preload();
    } else if (href === "/m") {
      PageMLoadable.preload();
    } else {
      PageDiLoadable.preload();
    }
  };

  return (
    <Link href={`${href}/wanted`}>
      <a onMouseOver={onLinkHover} className={styles.link}>
        <div className={styles.linkBackgroundContainer}>
          <Image
            className={styles.linkBackground}
            crossOrigin
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
