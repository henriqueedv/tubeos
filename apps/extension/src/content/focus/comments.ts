export function hideComments(hide: boolean) {
  const comments = document.querySelector(
    "#comments"
  ) as HTMLElement | null;

  if (!comments) return;

  comments.style.display = hide ? "none" : "";
}