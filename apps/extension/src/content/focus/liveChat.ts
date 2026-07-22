export function hideLiveChat(hide: boolean) {
  const selectors = [
    "#chat",
    "ytd-live-chat-frame",
    "ytd-live-chat-renderer",
    "#chat-container",
  ];

  selectors.forEach((selector) => {
    document
      .querySelectorAll<HTMLElement>(selector)
      .forEach((element) => {
        element.style.display = hide ? "none" : "";
      });
  });
}