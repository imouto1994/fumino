import styles from "./styles.css";

import React, { ReactElement, useState } from "react";

import Lazy from "../Lazy";
import CardBook from "../CardBook";
import BookPreview from "../BookPreview";
import { Book } from "../../data/book";

type Props = {
  books: { book: Book }[];
  cardThumbnailRatio?: number;
};

export default function CardBookList(props: Props): ReactElement<Props> {
  const { books, cardThumbnailRatio = 1.4 } = props;
  const [previewedBook, setPreviewedBook] = useState<Book | null>(null);

  const onBookPreview = (book: Book): void => {
    setPreviewedBook(book);
  };

  const onBookPreviewCancel = (): void => {
    setPreviewedBook(null);
  };

  return (
    <div className={styles.list}>
      {books.map(({ book }, index) => {
        const cardBookElement = (
          <CardBook
            className={styles.item}
            book={book}
            thumbnailRatio={cardThumbnailRatio}
            onBookPreview={onBookPreview}
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
      {previewedBook != null ? (
        <BookPreview
          book={previewedBook}
          onPreviewCancel={onBookPreviewCancel}
        />
      ) : null}
    </div>
  );
}
