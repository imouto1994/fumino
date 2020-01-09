import React from "react";

import CardBookList from "../../../web/components/CardBookList";

export default function BooksPreview(props) {
  const { entry } = props;
  const { wishlist = [], purchased = [] } = entry.toJS().data.books || [];
  const wishlistBooks = wishlist.filter(book => book != null);
  const purchasedBooks = purchased.filter(book => book != null);

  return (
    <div>
      <CardBookList books={wishlistBooks} />
      <CardBookList books={purchasedBooks} />
    </div>
  );
}
