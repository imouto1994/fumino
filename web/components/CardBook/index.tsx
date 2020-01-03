import styles from "./styles.css";

import React, { ReactElement } from "react";

import AnchorText from "../AnchorText";
import Card from "../Card";
import Image from "../Image";
import Text from "../Text";
import { Book } from "../../data/book";

type Props = {
  className?: string;
  book: Book;
  thumbnailRatio: number;
};

export default function CardBook(props: Props): ReactElement<Props> {
  const { className = "", book, thumbnailRatio } = props;
  const isPortraitThumbnail = book.imageWidth / book.imageHeight > 1.25;
  const shouldDisplayPortrait = thumbnailRatio >= 1;

  return (
    <Card className={className}>
      <div className={styles.container}>
        <div className={styles.thumbnail}>
          <div
            className={styles.imageContainer}
            style={{ paddingTop: `${thumbnailRatio * 100}%` }}
          >
            <div className={styles.imageLazy}>
              <Image
                className={styles.image}
                src={book.imageURLs[0]}
                objectFit={
                  isPortraitThumbnail
                    ? shouldDisplayPortrait
                      ? "contain"
                      : "cover"
                    : shouldDisplayPortrait
                    ? "cover"
                    : "contain"
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <AnchorText href={book.url}>
            <Text size={18} weight={600} singleline className={styles.text}>
              {book.title}
            </Text>
          </AnchorText>
          <Text
            size={12}
            weight={500}
            singleline
            className={`${styles.text} ${styles.textCaption}`}
          >
            {book.caption}
          </Text>
        </div>
      </div>
    </Card>
  );
}
