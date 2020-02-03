import React, { ReactElement } from "react";
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "wouter";

import CardBookList from "../CardBookList";
import Tabs from "../Tabs";
import booksJSON from "../../../json/d.json";

export default function PageD(): ReactElement<void> {
  const { books } = booksJSON;
  const { wanted, purchased } = books;

  return (
    <>
      <Helmet>
        <title>D Wishlist</title>
        <link rel="canonical" href="https://wishlist.noobsaigon.com/d" />
      </Helmet>
      <Tabs
        tabs={[
          { title: `${wanted.length} Wanted`, url: "/d/wanted" },
          { title: `${purchased.length} Purchased`, url: "/d/purchased" },
        ]}
      />
      {process.env.BROWSER ? (
        <Switch>
          <Route path="/d/wanted">
            <CardBookList books={wanted} />
          </Route>
          <Route path="/d/purchased">
            <CardBookList books={purchased} />
          </Route>
        </Switch>
      ) : null}
    </>
  );
}
