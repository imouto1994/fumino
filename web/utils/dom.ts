export const verticalScrollbarWidth = (function getScrollbarWidth(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  const div = document.createElement("div");
  div.style.overflow = "scroll";
  div.style.visibility = "hidden";
  div.style.position = "absolute";
  div.style.width = "100px";
  div.style.height = "100px";
  document.body.appendChild(div);
  const scrollbarWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);

  return scrollbarWidth;
})();
