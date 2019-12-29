import styles from "./styles.css";

import React, { ReactElement } from "react";

import CardBook from "../CardBook";
import { Book } from "../../data/book";

type Props = {
  books: { book: Book }[];
};

export default function CardBookList(props: Props): ReactElement<Props> {
  const { books } = props;

  return (
    <div className={styles.list}>
      {books.map(({ book }, index) => (
        <div className={styles.itemWrapper} key={index}>
          <CardBook className={styles.item} book={book} />
        </div>
      ))}
    </div>
  );
}
