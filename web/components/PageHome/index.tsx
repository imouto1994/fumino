import styles from "./styles.css";

import React, { ReactElement, useState } from "react";
import classnames from "classnames";
import { Link } from "wouter";

import Image from "../Image";
import PageDoujinshiLoadable from "../PageDoujinshiLoadable";
import PageHentaiLoadable from "../PageHentaiLoadable";
import PageMangaLoadable from "../PageMangaLoadable";
import PageDigitalLoadable from "../PageDigitalLoadable";

export default function PageHome(): ReactElement<void> {
  return (
    <div className={styles.container}>
      <HomeThumbnail href="/d" imageURL="/coverDoujinshi.jpg" />
      <HomeThumbnail href="/h" imageURL="/coverHentai.jpg" />
      <HomeThumbnail href="/m" imageURL="/coverManga.jpg" />
      <HomeThumbnail href="/di" imageURL="/coverDigital.jpg" />
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
      PageDoujinshiLoadable.preload();
    } else if (href === "/h") {
      PageHentaiLoadable.preload();
    } else if (href === "/m") {
      PageMangaLoadable.preload();
    } else {
      PageDigitalLoadable.preload();
    }
  };

  return (
    <Link href={href}>
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
