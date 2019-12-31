export const isTouchDevice = ((): boolean => {
  const prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

  if (
    "ontouchstart" in window ||
    (window.DocumentTouch != null && document instanceof window.DocumentTouch)
  ) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  const query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(
    "",
  );

  return window.matchMedia(query).matches;
})();
