import "./styles.scss";

import React, { ReactElement } from "react";
import { Route } from "wouter";

import PageDoujinshi from "./PageDoujinshi";
import PageHentai from "./PageHentai";
import PageManga from "./PageManga";
import PageDigital from "./PageDigital";
import MenuBar from "./MenuBar";

export default function Root(): ReactElement<void> {
  return (
    <div className="textGray20">
      <div className="pB64">
        <Route path="/doujinshi">
          <PageDoujinshi />
        </Route>
        <Route path="/hentai">
          <PageHentai />
        </Route>
        <Route path="/manga">
          <PageManga />
        </Route>
        <Route path="/digital">
          <PageDigital />
        </Route>
      </div>
      <MenuBar />
    </div>
  );
}
