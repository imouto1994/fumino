import CMS from "netlify-cms-app";
import { ComponentType } from "react";

import LinkScraper from "./widgets/LinkScraper";

CMS.registerWidget("linkScraper", LinkScraper as ComponentType<any>);

CMS.init();
