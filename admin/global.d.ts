declare module "*.css" {
  const classNameHashMap: { [key: string]: string };
  export default classNameHashMap;
}

declare module "netlify-cms-app" {
  const CMS: any;
  export default CMS;
}
