import loadable from "@loadable/component";

export default loadable(() =>
  import(
    /* webpackChunkName: "page-manga", webpackPrefetch: true */ "../PageManga"
  ),
);
