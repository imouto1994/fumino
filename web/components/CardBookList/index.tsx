import styles from "./styles.css";

import React, { ReactElement } from "react";

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
      {books.map(({ book }, index) => (
        <div className={styles.itemWrapper} key={index}>
          <CardBook
            className={styles.item}
            book={book}
            thumbnailRatio={cardThumbnailRatio}
          />
        </div>
      ))}
    </div>
  );
}
