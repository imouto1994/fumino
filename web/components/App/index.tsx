import styles from "./styles.css";

import React, { ReactElement, useCallback, useState } from "react";
import { Route, Switch } from "wouter";
import { Helmet } from "react-helmet-async";
import classnames from "classnames";

import PageDLoadable from "../PageDLoadable";
import PageHLoadable from "../PageHLoadable";
import PageMLoadable from "../PageMLoadable";
import PageDiLoadable from "../PageDiLoadable";
import PageHome from "../PageHome";
import NavBar from "../NavBar";
import { Theme, ThemeContext } from "../../contexts/theme";

export default function App(): ReactElement<void> {
  const [theme, setTheme] = useState<Theme>("light");
  const onThemeToggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  const containerClassName = classnames(
    styles.container,
    theme === "dark" ? styles.themeDark : styles.themeLight,
  );

  const routes = [
    <Route path="/m/:type?" key="/m">
      <div className={styles.routeWishlist}>
        <PageMLoadable />
      </div>
    </Route>,
  ];
  if (!process.env.LITE) {
    routes.concat([
      <Route path="/d/:type?" key="/d">
        <div className={styles.routeWishlist}>
          <PageDLoadable />
        </div>
      </Route>,
      <Route path="/h/:type?" key="/h">
        <div className={styles.routeWishlist}>
          <PageHLoadable />
        </div>
      </Route>,
      <Route path="/di/:type?" key="/di">
        <div className={styles.routeWishlist}>
          <PageDiLoadable />
        </div>
      </Route>,
    ]);
  }
  routes.push(
    <Route path="/:rest*" key="/rest">
      <div className={styles.routeHome}>
        <PageHome />
      </div>
    </Route>,
  );

  return (
    <ThemeContext.Provider value={theme}>
      <Helmet>
        <title>{"Youn's Manga Database"}</title>
        <meta
          name="description"
          content="Personal database of weeaboo stuffs"
        />
        <meta
          name="theme-color"
          content={theme === "dark" ? "#1f232d" : "#fafcfc"}
        />
      </Helmet>
      <div className={containerClassName}>
        <button className={styles.themeButton} onClick={onThemeToggle}>
          {theme === "dark" ? "🌝" : "🌚"}
        </button>
        <NavBar />
        <Switch>{routes}</Switch>
      </div>
    </ThemeContext.Provider>
  );
}
