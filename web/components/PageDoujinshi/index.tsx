import React, { ReactElement } from "react";
import { Helmet } from "react-helmet-async";

import CardBookList from "../CardBookList";
import doujinshiBooks from "../../../json/doujinshi.json";

export default function PageDoujinshi(): ReactElement<void> {
  const { books } = doujinshiBooks;

  return (
    <>
      <Helmet>
        <title>Doujinshi Wishlist</title>
        <link rel="canonical" href="https://wishlist.noobsaigon.com/d" />
      </Helmet>
      <CardBookList books={books} />
    </>
  );
}
