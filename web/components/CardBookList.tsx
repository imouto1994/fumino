import React, { ReactElement } from "react";

import CardBook from "./CardBook";
import { Book } from "../data/book";

type Props = {
  books: { book: Book }[];
};

export default function CardBookList(props: Props): ReactElement<Props> {
  const { books } = props;

  return (
    <div className="flex flexWrap itemsStretch">
      {books.map(({ book }, index) => (
        <div className="p8 flexNone wP100 wP50Xs wP25Lg" key={index}>
          <CardBook className="hP100" book={book} />
        </div>
      ))}
    </div>
  );
}
