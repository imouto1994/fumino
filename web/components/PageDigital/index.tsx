import React, { ReactElement } from "react";

import CardBookList from "../CardBookList";
import digitalBooks from "../../../json/digital.json";

export default function PageManga(): ReactElement<void> {
  const { books } = digitalBooks;

  return <CardBookList books={books} />;
}
