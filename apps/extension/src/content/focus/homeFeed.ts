export function hideHomeFeed(hide: boolean) {
  const selectors = [
    "ytd-rich-grid-renderer",
    "ytd-browse[page-subtype='home']",
    "#contents.ytd-rich-grid-renderer",
  ];

  selectors.forEach((selector) => {
    document
      .querySelectorAll<HTMLElement>(selector)
      .forEach((element) => {
        element.style.display = hide ? "none" : "";
      });
  });
}