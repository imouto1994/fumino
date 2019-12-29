import CMS from "netlify-cms-app";

import BookScraper from "./widgets/BookScraper";
import DoujinshisPreview from "./previews/DoujinshisPreview";
import manifest from "../build/manifest.json";

CMS.registerWidget("bookScraper", BookScraper);

CMS.registerPreviewStyle(manifest["main.css"]);
CMS.registerPreviewTemplate("doujinshis", DoujinshisPreview);

CMS.init();
