import React, { ReactElement } from "react";
import { Helmet } from "react-helmet-async";
import { Switch, Route } from "wouter";

import CardBookList from "../CardBookList";
import Tabs from "../Tabs";
import booksJSON from "../../../json/h.json";

export default function PageH(): ReactElement<void> {
  const { books } = booksJSON;
  const { wanted, purchased } = books;

  return (
    <>
      <Helmet>
        <title>H Wishlist</title>
        <link rel="canonical" href="https://wishlist.noobsaigon.com/h" />
      </Helmet>
      <Tabs
        tabs={[
          { title: `${wanted.length} Wanted`, url: "/h/wanted" },
          { title: `${purchased.length} Purchased`, url: "/h/purchased" },
        ]}
      />
      {process.env.BROWSER ? (
        <Switch>
          <Route path="/h/wanted">
            <CardBookList books={wanted} />
          </Route>
          <Route path="/h/purchased">
            <CardBookList books={purchased} />
          </Route>
        </Switch>
      ) : null}
    </>
  );
}
