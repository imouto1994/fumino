import CMS from "netlify-cms-app";

import BookScraper from "./widgets/BookScraper";
import BooksPreview from "./previews/BooksPreview";

CMS.registerWidget("bookScraper", BookScraper);

if (process.env.NODE_ENV === "production") {
  const manifest = require("../build/manifest.json");
  CMS.registerPreviewStyle(manifest["main.css"]);
}

CMS.registerPreviewTemplate("doujinshi", BooksPreview);
CMS.registerPreviewTemplate("hentai", BooksPreview);
CMS.registerPreviewTemplate("manga", BooksPreview);
CMS.registerPreviewTemplate("digital", BooksPreview);

CMS.init();
