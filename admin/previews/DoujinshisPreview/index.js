import React from "react";

import CardBookList from "../../../web/components/CardBookList";

export default function DoujinshisPreview(props) {
  const { entry } = props;
  const books = entry.toJS().data.books.filter(({ book }) => book != null);

  return (
    <div className="textGray20">
      <CardBookList books={books} />
    </div>
  );
}
