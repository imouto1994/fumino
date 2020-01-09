import React, { ReactElement } from "react";
import { Helmet } from "react-helmet-async";
import { Switch, Route } from "wouter";

import CardBookList from "../CardBookList";
import Tabs from "../Tabs";
import hentaiBooks from "../../../json/hentai.json";

export default function PageHentai(): ReactElement<void> {
  const { books } = hentaiBooks;
  const { wanted, purchased } = books;

  return (
    <>
      <Helmet>
        <title>Hentai Wishlist</title>
        <link rel="canonical" href="https://wishlist.noobsaigon.com/h" />
      </Helmet>
      <Tabs
        tabs={[
          { title: `${wanted.length} Wanted`, url: "/h/wanted" },
          { title: `${purchased.length} Purchased`, url: "/h/purchased" },
        ]}
      />
      <Switch>
        <Route path="/h/wanted">
          <CardBookList books={wanted} />
        </Route>
        <Route path="/h/purchased">
          <CardBookList books={purchased} />
        </Route>
      </Switch>
    </>
  );
}
