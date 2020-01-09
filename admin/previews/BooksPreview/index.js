import React from "react";

import CardBookList from "../../../web/components/CardBookList";

export default function BooksPreview(props) {
  const { entry } = props;
  const { wanted = [], purchased = [] } = entry.toJS().data.books || [];
  const wantedBooks = wanted.filter(book => book != null);
  const purchasedBooks = purchased.filter(book => book != null);

  return (
    <div>
      <CardBookList books={wantedBooks} />
      <CardBookList books={purchasedBooks} />
    </div>
  );
}
