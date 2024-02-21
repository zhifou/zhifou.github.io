import * as path from "path";
import { defineConfig } from "rspress/config";

export default defineConfig({
    root: path.join(__dirname, "src"),
    title: "知否",
    description: "Rspack-based Static Site Generator",
    icon: "/rspress-icon.png",
    base: "/",
    outDir: "docs",
    logo: {
        light: "/rspress-light-logo.png",
        dark: "/rspress-dark-logo.png",
    },
    themeConfig: {
        socialLinks: [
            {
                icon: "github",
                mode: "link",
                content: "https://github.com/zhifou",
            },
        ],
    },
});
