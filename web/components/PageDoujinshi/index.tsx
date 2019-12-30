import React, { ReactElement } from "react";

import CardBookList from "../CardBookList";
import doujinshiBooks from "../../../json/doujinshi.json";

export default function PageDoujinshi(): ReactElement<void> {
  const { books } = doujinshiBooks;

  return <CardBookList books={books} cardThumbnailRatio={1.42} />;
}
