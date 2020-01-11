import CMS from "netlify-cms-app";

import BookFetch from "./widgets/BookFetch";

CMS.registerWidget("bookFetch", BookFetch);

CMS.init();
