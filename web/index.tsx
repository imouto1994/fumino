import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { render, hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";
import { Router } from "wouter";
import useLocation from "wouter/use-location";

import Root from "./components/Root";

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error("Root element not found");
}

if (process.env.NODE_ENV === "development") {
  render(
    <HelmetProvider>
      <Root />
    </HelmetProvider>,
    rootElement,
  );
} else {
  loadableReady(() => {
    if (rootElement.innerHTML.length > 0) {
      hydrate(
        <HelmetProvider>
          <Router hook={useLocation}>
            <Root />
          </Router>
        </HelmetProvider>,
        rootElement,
      );
    } else {
      render(
        <HelmetProvider>
          <Router hook={useLocation}>
            <Root />
          </Router>
        </HelmetProvider>,
        rootElement,
      );
    }
  });
}
