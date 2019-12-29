import styles from "./styles.css";

import React, { ReactElement, useCallback, useState } from "react";
import { Route } from "wouter";
import classnames from "classnames";

import PageDoujinshi from "../PageDoujinshi";
import PageHentai from "../PageHentai";
import PageManga from "../PageManga";
import PageDigital from "../PageDigital";
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
      <div className={containerClassName}>
        <button className={styles.themeButton} onClick={onThemeToggle}>
          {theme === "dark" ? "🌝" : "🌚"}
        </button>
        <div className={styles.routes}>
          <Route path="/d">
            <PageDoujinshi />
          </Route>
          <Route path="/h">
            <PageHentai />
          </Route>
          <Route path="/m">
            <PageManga />
          </Route>
          <Route path="/di">
            <PageDigital />
          </Route>
        </div>
        <NavBar />
      </div>
    </ThemeContext.Provider>
  );
}
