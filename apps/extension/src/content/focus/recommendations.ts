export function hideRecommendations(hide: boolean) {
  const selectors = [
    "#secondary",
    "#related",
    "ytd-watch-next-secondary-results-renderer",
  ];

  selectors.forEach((selector) => {
    document
      .querySelectorAll<HTMLElement>(selector)
      .forEach((element) => {
        element.style.display = hide ? "none" : "";
      });
  });
}