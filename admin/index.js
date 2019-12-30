import CMS from "netlify-cms-app";

import BookScraper from "./widgets/BookScraper";
import DoujinshisPreview from "./previews/DoujinshisPreview";

CMS.registerWidget("bookScraper", BookScraper);

if (process.env.NODE_ENV === "production") {
  const manifest = require("../build/manifest.json");
  CMS.registerPreviewStyle(manifest["main.css"]);
}

CMS.registerPreviewTemplate("doujinshis", DoujinshisPreview);

CMS.init();
