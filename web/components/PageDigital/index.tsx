import React, { ReactElement } from "react";
import { Helmet } from "react-helmet-async";

import CardBookList from "../CardBookList";
import digitalBooks from "../../../json/digital.json";

export default function PageManga(): ReactElement<void> {
  const { books } = digitalBooks;
  const { wishlist } = books;

  return (
    <>
      <Helmet>
        <title>Digital Wishlist</title>
        <link rel="canonical" href="https://wishlist.noobsaigon.com/di" />
      </Helmet>
      <CardBookList books={wishlist} />
    </>
  );
}
