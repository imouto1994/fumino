import styles from "!css-loader!postcss-loader!sass-loader!../web/components/styles.scss";

import CMS from "netlify-cms-app";

import BookScraper from "./widgets/BookScraper";
import DoujinshisPreview from "./previews/DoujinshisPreview";

CMS.registerWidget("bookScraper", BookScraper);

CMS.registerPreviewStyle(styles.toString(), { raw: true });
CMS.registerPreviewTemplate("doujinshis", DoujinshisPreview);

CMS.init();
