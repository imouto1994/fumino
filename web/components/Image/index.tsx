import styles from "./styles.css";

import React, { ReactElement, useState, useCallback } from "react";
import classnames from "classnames";

type Props = {
  className?: string;
  src: string;
  objectFit?: "cover" | "contain";
};

function isImageLoaded(imageElement: HTMLImageElement): boolean {
  // During the onload event, IE correctly identifies any images that
  // weren't downloaded as not complete. Others should too. Gecko-based
  // browsers act like NS4 in that they report this incorrectly.
  if (!imageElement.complete) {
    return false;
  }

  // However, they do have two very useful properties: naturalWidth and
  // naturalHeight. These give the true size of the image. If it failed
  // to load, either of these should be zero.
  if (
    typeof imageElement.naturalWidth != "undefined" &&
    imageElement.naturalWidth == 0
  ) {
    return false;
  }

  // No other way of checking: assume it's ok.
  return true;
}

export default function Image(props: Props): ReactElement<Props> {
  const { className, src, objectFit } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const onImageRef = useCallback(
    (imageElement: HTMLImageElement): void => {
      if (imageElement != null) {
        setIsLoaded(isImageLoaded(imageElement));
      }
    },
    [setIsLoaded],
  );
  const onImageLoad = useCallback((): void => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  const imageClassName = classnames(className, {
    [styles.hidden]: !isLoaded,
    [styles.fitCover]: objectFit === "cover",
    [styles.fitContain]: objectFit === "contain",
  });

  return (
    <img
      className={imageClassName}
      onLoad={onImageLoad}
      ref={onImageRef}
      src={src}
    />
  );
}
