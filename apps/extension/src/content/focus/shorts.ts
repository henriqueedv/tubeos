export function hideShortsSidebar(hide: boolean) {
  document
    .querySelectorAll("ytd-guide-entry-renderer")
    .forEach((entry) => {
      const title = entry
        .querySelector("yt-formatted-string.title")
        ?.textContent?.trim();

      if (title === "Shorts") {
        (entry as HTMLElement).style.display = hide ? "none" : "";
      }
    });
}