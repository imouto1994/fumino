import React, { ReactElement } from "react";
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "wouter";

import CardBookList from "../CardBookList";
import Tabs from "../Tabs";
import digitalBooks from "../../../json/digital.json";

export default function PageManga(): ReactElement<void> {
  const { books } = digitalBooks;
  const { wanted, purchased } = books;

  return (
    <>
      <Helmet>
        <title>Digital Wishlist</title>
        <link rel="canonical" href="https://wishlist.noobsaigon.com/di" />
      </Helmet>
      <Tabs
        tabs={[
          { title: `${wanted.length} Wanted`, url: "/di/wanted" },
          { title: `${purchased.length} Purchased`, url: "/di/purchased" },
        ]}
      />
      <Switch>
        <Route path="/di/wanted">
          <CardBookList books={wanted} />
        </Route>
        <Route path="/di/purchased">
          <CardBookList books={purchased} />
        </Route>
      </Switch>
    </>
  );
}
