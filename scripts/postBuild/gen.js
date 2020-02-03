import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { ChunkExtractor } from "@loadable/server";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import staticLocationHook from "wouter/static-location";
import { injectManifest } from "workbox-build";
import fs from "fs";
import path from "path";
import pug from "pug";
import terser from "terser";

import Root from "../../web/components/Root";

const manifestJSON = require("../../build/manifest.json");

const runtimeContent = fs.readFileSync(
  path.resolve(
    __dirname,
    `../../build/${manifestJSON["runtime.js"].split("/").pop()}`,
  ),
  "utf-8",
);

const bundleFiles = Object.keys(manifestJSON);
const cssInlineMap = bundleFiles
  .filter(file => /^styles~.*\.(css|js)$/.test(file))
  .reduce((map, file) => {
    map[manifestJSON[file]] = fs.readFileSync(
      path.resolve(
        __dirname,
        `../../build/${manifestJSON[file].split("/").pop()}`,
      ),
      "utf-8",
    );

    return map;
  }, {});

const swContent = terser.minify(
  fs.readFileSync(path.resolve(__dirname, "./sw.js"), "utf-8"),
).code;

function ensureDirSync(dirPath) {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
}

(async function() {
  const staticURLS = process.env.LITE
    ? ["/", "/m"]
    : ["/", "/d", "/m", "/h", "/di"];

  // Generate all static pages
  for (const url of staticURLS) {
    const helmetContext = {};
    const chunkExtractor = new ChunkExtractor({
      statsFile: path.resolve(__dirname, `../../build/loadable-stats.json`),
    });
    const jsx = chunkExtractor.collectChunks(
      <HelmetProvider context={helmetContext}>
        <Router hook={staticLocationHook(url)}>
          <Root />
        </Router>
      </HelmetProvider>,
    );
    const appContent = renderToString(jsx);

    // Generate required inline critical CSS
    const cssInlines = chunkExtractor.getStyleElements().map(styleElement => {
      const styleHref = styleElement.props.href;
      return {
        url: styleHref,
        content: cssInlineMap[styleHref],
      };
    });

    // Generate required JS chunks
    const scriptElements = chunkExtractor.getScriptElements();
    const [
      requiredChunksScriptElement,
      ...otherScriptElements
    ] = scriptElements;

    const requiredChunksID = requiredChunksScriptElement.props.id;
    const requiredChunksJSON =
      requiredChunksScriptElement.props.dangerouslySetInnerHTML.__html;

    const jsInlines = otherScriptElements
      .map(scriptElement => {
        const scriptSrc = scriptElement.props.src;

        // Inline Webpack Runtime script
        if (scriptSrc === manifestJSON["runtime.js"]) {
          return runtimeContent;
        }
        // Inline CSS mapping script
        else if (cssInlineMap[scriptSrc] != null) {
          return cssInlineMap[scriptSrc];
        } else {
          return null;
        }
      })
      .filter(s => s != null);

    const jsBundleURLs = otherScriptElements
      .map(scriptElement => {
        const scriptSrc = scriptElement.props.src;

        // Inline Webpack Runtime script
        if (scriptSrc === manifestJSON["runtime.js"]) {
          return null;
        }
        // Inline CSS mapping script
        else if (cssInlineMap[scriptSrc] != null) {
          return null;
        } else {
          return scriptSrc;
        }
      })
      .filter(s => s != null);

    const { helmet } = helmetContext;

    const html = pug.renderFile(
      path.resolve(__dirname, "../../web/index.pug"),
      {
        appContent: "",
        helmet: `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`,
        cssInlines,
        jsInlines,
        jsBundleURLs,
        requiredChunksID,
        requiredChunksJSON,
        swContent,
      },
    );
    ensureDirSync(path.resolve(__dirname, `../../build${url}`));
    fs.writeFileSync(
      path.resolve(
        __dirname,
        `../../build${url === "/" ? "/index.html" : `${url}/index.html`}`,
      ),
      html,
      "utf-8",
    );
  }

  // Generate service worker files
  const { count, size, warnings } = await injectManifest({
    swSrc: path.resolve(__dirname, "../../web/sw.js"),
    swDest: path.resolve(__dirname, "../../build/sw.js"),
    globDirectory: path.resolve(__dirname, "../../build/"),
    globIgnores: ["**/runtime-*.js"],
    globPatterns: ["**/*.js", "index.html", "**/*.css"],
    dontCacheBustURLsMatching: /\.js$/,
  });

  warnings.forEach(console.warn);
  console.log(`${count} files will be precached, totaling ${size} bytes.`);

  const workboxSWJSPath = path.resolve(__dirname, `../../build/sw.js`);
  const workboxSWJSContent = fs.readFileSync(workboxSWJSPath, "utf-8");
  fs.writeFileSync(
    workboxSWJSPath,
    terser.minify(workboxSWJSContent).code,
    "utf-8",
  );
})();
