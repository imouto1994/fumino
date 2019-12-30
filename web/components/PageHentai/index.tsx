import React, { ReactElement } from "react";

import CardBookList from "../CardBookList";
import hentaiBooks from "../../../json/hentai.json";

export default function PageHentai(): ReactElement<void> {
  const { books } = hentaiBooks;

  return <CardBookList books={books} />;
}
