import styles from "./styles.css";

import React, { ReactElement, useCallback, useState } from "react";
import { Route, Switch } from "wouter";
import { Helmet } from "react-helmet-async";
import classnames from "classnames";

import PageDoujinshiLoadable from "../PageDoujinshiLoadable";
import PageHentaiLoadable from "../PageHentaiLoadable";
import PageMangaLoadable from "../PageMangaLoadable";
import PageDigitalLoadable from "../PageDigitalLoadable";
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
          content={theme === "dark" ? "#1f232d" : "#5f5273"}
        />
      </Helmet>
      <div className={containerClassName}>
        <button className={styles.themeButton} onClick={onThemeToggle}>
          {theme === "dark" ? "🌝" : "🌚"}
        </button>
        <div className={styles.routes}>
          <Switch>
            <Route path="/d">
              <PageDoujinshiLoadable />
            </Route>
            <Route path="/h">
              <PageHentaiLoadable />
            </Route>
            <Route path="/m">
              <PageMangaLoadable />
            </Route>
            <Route path="/di">
              <PageDigitalLoadable />
            </Route>
          </Switch>
        </div>
        <NavBar />
      </div>
    </ThemeContext.Provider>
  );
}
