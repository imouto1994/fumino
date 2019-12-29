import React, { ReactElement } from "react";

import CardBookList from "../CardBookList";
import doujinshis from "../../../json/doujinshi.json";

export default function PageDoujinshi(): ReactElement<void> {
  const { books } = doujinshis;

  return <CardBookList books={books} />;
}
