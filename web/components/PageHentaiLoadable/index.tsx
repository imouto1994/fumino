import loadable from "@loadable/component";

export default loadable(() =>
  import(
    /* webpackChunkName: "page-hentai", webpackPrefetch: true */ "../PageHentai"
  ),
);