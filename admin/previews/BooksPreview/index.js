import React from "react";

import CardBookList from "../../../web/components/CardBookList";

export default function BooksPreview(props) {
  const { entry } = props;
  const books = (entry.toJS().data.books || []).filter(
    ({ book }) => book != null,
  );

  return (
    <div>
      <CardBookList books={books} />
    </div>
  );
}
