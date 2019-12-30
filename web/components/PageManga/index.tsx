import React, { ReactElement } from "react";

import CardBookList from "../CardBookList";
import mangaBooks from "../../../json/manga.json";

export default function PageManga(): ReactElement<void> {
  const { books } = mangaBooks;

  return <CardBookList books={books} cardThumbnailRatio={1.5} />;
}
