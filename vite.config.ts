import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const fileNames = [
  "src",
  "components",
  "app",
  "pages",
  "shared",
  "widgets",
  "entities",
  "features",
  "mock",
];
const filePaths = fileNames.reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: `/${cur === "src" ? cur : "src/" + cur}`,
  }),
  [],
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "sentry",
      project: "logistics-hub",
      url: "https://sentry.the-devs.com/",
    }),
  ],

  server: {
    port: 3000,
  },

  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      ...filePaths,
      OUI: "/src/shared/ui/objectCRUD",
    },
  },
});
