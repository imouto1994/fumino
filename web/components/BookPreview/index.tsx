import styles from "./styles.css";

import React, {
  ReactElement,
  MouseEvent,
  useLayoutEffect,
  useEffect,
} from "react";

import { Book } from "../../data/book";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  book: Book;
  onPreviewCancel: () => void;
};

export default function BookPreview(props: Props): ReactElement<Props> {
  const { book, onPreviewCancel } = props;

  useIsomorphicLayoutEffect((): (() => void) => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const handler = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onPreviewCancel();
      }
    };

    window.addEventListener("keydown", handler);

    return (): void => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  const onOverlayClick = (): void => {
    onPreviewCancel();
  };

  const onPreviewClick = (e: MouseEvent<HTMLImageElement>): void => {
    e.stopPropagation();
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay} />
      <div className={styles.previews} onClick={onOverlayClick}>
        {book.imageURLs.map((imageURL, index) => {
          return (
            <img
              src={imageURL}
              className={styles.preview}
              key={index}
              onClick={onPreviewClick}
            />
          );
        })}
      </div>
    </div>
  );
}
