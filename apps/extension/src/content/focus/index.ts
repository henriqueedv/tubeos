import { hideShortsSidebar } from "./shorts";
import { hideRecommendations } from "./recommendations";
import { hideComments } from "./comments";
import { hideHomeFeed } from "./homeFeed";
import { hideLiveChat } from "./liveChat";

export function applyFocusMode(settings: any) {
  if (!settings.enabled) {
    hideShortsSidebar(false);
    hideRecommendations(false);
    hideComments(false);
    hideHomeFeed(false);
    hideLiveChat(false);
    return;
  }

  hideShortsSidebar(settings.hideShorts);
  hideRecommendations(settings.hideRecommendations);
  hideComments(settings.hideComments);
  hideHomeFeed(settings.hideHomeFeed);
  hideLiveChat(settings.hideLiveChat);
}