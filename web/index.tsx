import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { render } from "react-dom";
import { loadableReady } from "@loadable/component";

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
    render(
      <HelmetProvider>
        <Root />
      </HelmetProvider>,
      rootElement,
    );
  });
}
