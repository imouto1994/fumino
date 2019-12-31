declare module "*.css" {
  const classNameHashMap: { [key: string]: string };
  export default classNameHashMap;
}

interface Window {
  DocumentTouch?: any;
}
