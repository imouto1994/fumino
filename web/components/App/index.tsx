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
          <Route path="/d/:type?">
            <div className={styles.routeWishlist}>
              <PageDLoadable />
            </div>
          </Route>
          <Route path="/h/:type?">
            <div className={styles.routeWishlist}>
              <PageHLoadable />
            </div>
          </Route>
          <Route path="/m/:type?">
            <div className={styles.routeWishlist}>
              <PageMLoadable />
            </div>
          </Route>
          <Route path="/di/:type?">
            <div className={styles.routeWishlist}>
              <PageDiLoadable />
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
