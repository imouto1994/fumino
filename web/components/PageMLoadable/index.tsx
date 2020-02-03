import loadable from "@loadable/component";

export default loadable(() =>
  import(/* webpackChunkName: "page-m", webpackPrefetch: true */ "../PageM"),
);
