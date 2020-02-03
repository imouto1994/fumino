import loadable from "@loadable/component";

export default loadable(() =>
  import(/* webpackChunkName: "page-di", webpackPrefetch: true */ "../PageDi"),
);
