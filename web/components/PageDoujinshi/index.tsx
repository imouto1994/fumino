import React, { ReactElement } from "react";
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "wouter";

import CardBookList from "../CardBookList";
import Tabs from "../Tabs";
import doujinshiBooks from "../../../json/doujinshi.json";

export default function PageDoujinshi(): ReactElement<void> {
  const { books } = doujinshiBooks;
  const { wanted, purchased } = books;

  return (
    <>
      <Helmet>
        <title>Doujinshi Wishlist</title>
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
