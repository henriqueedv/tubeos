import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "TubeOS",
  version: "0.1.0",
  description: "The operating system for YouTube.",

  action: {
    default_popup: "index.html",
    default_title: "TubeOS",
  },

  permissions: ["storage", "activeTab"],

  host_permissions: [
    "https://www.youtube.com/*"
  ],
});