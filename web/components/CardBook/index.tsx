import styles from "./styles.css";

import React, { ReactElement } from "react";

import AnchorText from "../AnchorText";
import Card from "../Card";
import Image from "../Image";
import Text from "../Text";
import { Book } from "../../data/book";

type Props = {
  book: Book;
  className?: string;
  onBookPreview?: (book: Book) => void;
};

export default function CardBook(props: Props): ReactElement<Props> {
  const { className = "", book, onBookPreview } = props;

  const onThumbnailClick = (): void => {
    if (onBookPreview != null) {
      onBookPreview(book);
    }
  };

  return (
    <Card className={className}>
      <div className={styles.container}>
        <div className={styles.thumbnail}>
          <div
            className={styles.imageContainer}
            style={{
              paddingTop: `${(book.imageHeight / book.imageWidth) * 100}%`,
            }}
            onClick={onThumbnailClick}
          >
            <div className={styles.imageLazy}>
              <Image
                className={styles.image}
                src={book.imageURLs[0]}
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <AnchorText className={styles.textTitleAnchor} href={book.url}>
            <Text
              size={18}
              weight={600}
              singleline
              className={`${styles.text} ${styles.textTitle}`}
              inline
            >
              {book.title}
            </Text>
          </AnchorText>
          <Text
            size={12}
            weight={500}
            singleline
            inline
            className={`${styles.text} ${styles.textCaption}`}
          >
            {book.caption}
          </Text>
        </div>
      </div>
    </Card>
  );
}
