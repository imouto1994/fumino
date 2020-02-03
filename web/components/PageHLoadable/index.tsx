import loadable from "@loadable/component";

export default loadable(() =>
  import(/* webpackChunkName: "page-h", webpackPrefetch: true */ "../PageH"),
);
