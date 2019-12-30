import styles from "./styles.css";

import React, { ReactElement } from "react";

import Card from "../Card";
import Lazy from "../Lazy";
import Text from "../Text";
import AnchorText from "../AnchorText";
import { Book } from "../../data/book";

type Props = {
  className?: string;
  book: Book;
};

export default function CardBook(props: Props): ReactElement<Props> {
  const { className = "", book } = props;

  return (
    <Card className={className}>
      <div className={styles.container}>
        <div className={styles.thumbnail}>
          <div className={styles.imageContainer}>
            <Lazy className={styles.imageLazy}>
              <img
                className={styles.image}
                src={book.imageURLs[0]}
                style={{
                  objectFit:
                    book.imageWidth / book.imageHeight > 1.25
                      ? "contain"
                      : "cover",
                }}
              />
            </Lazy>
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
