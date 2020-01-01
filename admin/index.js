import CMS from "netlify-cms-app";

import BookScraper from "./widgets/BookScraper";
import BooksPreview from "./previews/BooksPreview";

CMS.registerWidget("bookScraper", BookScraper);

if (process.env.NODE_ENV === "production") {
  const manifest = require("../build/manifest.json");
  console.log("MANIFEST", manifest);
  for (const fileName of Object.keys(manifest)) {
    if (fileName.endsWith(".css")) {
      console.log(fileName);
      CMS.registerPreviewStyle(manifest[fileName]);
    }
  }
}

CMS.registerPreviewTemplate("doujinshi", BooksPreview);
CMS.registerPreviewTemplate("hentai", BooksPreview);
CMS.registerPreviewTemplate("manga", BooksPreview);
CMS.registerPreviewTemplate("digital", BooksPreview);

CMS.init();
