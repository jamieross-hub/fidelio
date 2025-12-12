/// <reference types="vitest/config" />
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from "vite-plugin-pwa";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
import path from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const contractsPath = fileURLToPath(new URL(process.env.API_CONTRACT_PATH || "../backend/api-contract", import.meta.url));
const schemaPath = fileURLToPath(new URL(process.env.SCHEMA_PATH || "../backend/prisma/zod/schemas/variants", import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        Components({
            dts: true,
        }),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Fidelio",
                short_name: "Fidelio",
                description: "Take control of your finances today.",
                theme_color: "#ffffff",
                background_color: "#ffffff",
                start_url: "/",
                display: "standalone",
                orientation: "portrait",
                icons: [
                    {
                        src: "/192w/icon.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "/512w/icon.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any",
                    },
                ],
            },
            workbox: {
                // Configure Workbox options
                skipWaiting: true,
                clientsClaim: true,
            },
        }),
    ],
    resolve: {
        alias: {
            "@api-contract": contractsPath,
            "@schemas": schemaPath,
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    test: {
        projects: [
            {
                extends: true,
                plugins: [
                    // The plugin will run tests for the stories defined in your Storybook config
                    // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
                    storybookTest({
                        configDir: path.join(dirname, ".storybook"),
                    }),
                ],
                test: {
                    name: "storybook",
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: "playwright",
                        instances: [
                            {
                                browser: "chromium",
                            },
                        ],
                    },
                    setupFiles: [".storybook/vitest.setup.ts"],
                },
            },
        ],
    },
});
