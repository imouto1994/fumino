import React, { ReactElement } from "react";
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "wouter";

import CardBookList from "../CardBookList";
import Tabs from "../Tabs";
import booksJSON from "../../../json/m.json";

export default function PageM(): ReactElement<void> {
  const { books } = booksJSON;
  const { wanted, purchased } = books;

  return (
    <>
      <Helmet>
        <title>M Database</title>
        <link
          rel="canonical"
          href={`https://${
            process.env.LITE ? "fumino" : "wishlist"
          }.noobsaigon.com/d`}
        />
      </Helmet>
      <Tabs
        tabs={[
          { title: `${wanted.length} Wanted`, url: "/m/wanted" },
          { title: `${purchased.length} Purchased`, url: "/m/purchased" },
        ]}
      />
      {process.env.BROWSER ? (
        <Switch>
          <Route path="/m/wanted">
            <CardBookList books={wanted} />
          </Route>
          <Route path="/m/purchased">
            <CardBookList books={purchased} />
          </Route>
        </Switch>
      ) : null}
    </>
  );
}
