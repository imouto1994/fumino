import styles from "./styles.css";

import React, { ReactElement, useCallback, useState } from "react";
import { Route, Switch } from "wouter";
import { Helmet } from "react-helmet-async";
import classnames from "classnames";

import PageDoujinshiLoadable from "../PageDoujinshiLoadable";
import PageHentaiLoadable from "../PageHentaiLoadable";
import PageMangaLoadable from "../PageMangaLoadable";
import PageDigitalLoadable from "../PageDigitalLoadable";
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

  return (
    <ThemeContext.Provider value={theme}>
      <Helmet>
        <title>{"Youn's Wishlist"}</title>
        <meta
          name="description"
          content="Wishlist of weeaboo stuffs to be purchased"
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
        <Switch>
          <Route path="/d">
            <div className={styles.routeWishlist}>
              <PageDoujinshiLoadable />
            </div>
          </Route>
          <Route path="/h">
            <div className={styles.routeWishlist}>
              <PageHentaiLoadable />
            </div>
          </Route>
          <Route path="/m">
            <div className={styles.routeWishlist}>
              <PageMangaLoadable />
            </div>
          </Route>
          <Route path="/di">
            <div className={styles.routeWishlist}>
              <PageDigitalLoadable />
            </div>
          </Route>
          <Route path="/:rest*">
            <div className={styles.routeHome}>
              <PageHome />
            </div>
          </Route>
        </Switch>

        <NavBar />
      </div>
    </ThemeContext.Provider>
  );
}
