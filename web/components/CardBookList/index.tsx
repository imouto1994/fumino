import styles from "./styles.css";

import React, { ReactElement } from "react";

import Lazy from "../Lazy";
import CardBook from "../CardBook";
import { Book } from "../../data/book";

type Props = {
  books: { book: Book }[];
  cardThumbnailRatio?: number;
};

export default function CardBookList(props: Props): ReactElement<Props> {
  const { books, cardThumbnailRatio = 1.4 } = props;

  return (
    <div className={styles.list}>
      {books.map(({ book }, index) => {
        const cardBookElement = (
          <CardBook
            className={styles.item}
            book={book}
            thumbnailRatio={cardThumbnailRatio}
          />
        );

        if (index < 8) {
          return (
            <div className={styles.itemWrapper} key={index}>
              {cardBookElement}
            </div>
          );
        } else {
          return (
            <Lazy className={styles.itemWrapper} key={index}>
              {cardBookElement}
            </Lazy>
          );
        }
      })}
    </div>
  );
}
