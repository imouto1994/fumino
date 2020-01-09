import React, { ReactElement } from "react";
import { Helmet } from "react-helmet-async";

import CardBookList from "../CardBookList";
import hentaiBooks from "../../../json/hentai.json";

export default function PageHentai(): ReactElement<void> {
  const { books } = hentaiBooks;
  const { wishlist } = books;

  return (
    <>
      <Helmet>
        <title>Hentai Wishlist</title>
        <link rel="canonical" href="https://wishlist.noobsaigon.com/h" />
      </Helmet>
      <CardBookList books={wishlist} />
    </>
  );
}