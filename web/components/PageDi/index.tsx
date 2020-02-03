import React, { ReactElement } from "react";
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "wouter";

import CardBookList from "../CardBookList";
import Tabs from "../Tabs";
import booksJSON from "../../../json/di.json";

export default function PageDi(): ReactElement<void> {
  const { books } = booksJSON;
  const { wanted, purchased } = books;

  return (
    <>
      <Helmet>
        <title>Di Wishlist</title>
        <link rel="canonical" href="https://wishlist.noobsaigon.com/di" />
      </Helmet>
      <Tabs
        tabs={[
          { title: `${wanted.length} Wanted`, url: "/di/wanted" },
          { title: `${purchased.length} Purchased`, url: "/di/purchased" },
        ]}
      />
      {process.env.BROWSER ? (
        <Switch>
          <Route path="/di/wanted">
            <CardBookList books={wanted} />
          </Route>
          <Route path="/di/purchased">
            <CardBookList books={purchased} />
          </Route>
        </Switch>
      ) : null}
    </>
  );
}
