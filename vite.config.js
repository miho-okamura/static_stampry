import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import FullReload from "vite-plugin-full-reload";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const basePath = env.VITE_BASE_PATH || "/";

  return {
    server: {
      host: true,
      watch: {
        usePolling: true,
      },
    },

    root: "./src",
    base: basePath,

    build: {
      outDir,
      emptyOutDir: true,

      rollupOptions: {
        input: {
          // HTML
          main: resolve(root, "index.html"),

          // CSS
          style: resolve(root, "scss/style.scss"),
          "style-lower": resolve(root, "scss/style-lower.scss"),
          "style-contact": resolve(root, "scss/style-contact.scss"),
          "style-new": resolve(root, "scss/style-new.scss"),
          "style-company": resolve(root, "scss/style-company.scss"),

          
          // SHOP
          
          "style-shop": resolve(root, "scss/style-shop.scss"),
        },

        output: {
          entryFileNames: `assets/js/[name].js`,
          chunkFileNames: `assets/js/[name].js`,

          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || "";
            const ext = name.split(".").pop();

            // 画像
            if (["gif", "jpeg", "jpg", "png", "svg", "webp"].includes(ext)) {
              const pathParts = name.split("/");
              const fileName = pathParts.pop();
              const folderPath = pathParts.length
                ? pathParts.join("/") + "/"
                : "";

              return `assets/images/${folderPath}${fileName}`;
            }

            // CSS
            if (ext === "css") {
              return "assets/css/[name][extname]";
            }

            return "assets/[name].[ext]";
          },
        },
      },
    },

    css: {
      preprocessorOptions: {
        scss: {},
      },
      devSourcemap: true,
    },

    plugins: [
      ViteEjsPlugin({
        base: basePath,
        assetsPath: "assets/images",
      }),

      FullReload([`${root}/**/*.ejs`]),

      ViteImageOptimizer({
        include: ["src/assets/images/**/*.{png,jpg,jpeg,svg,gif,webp}"],
        svg: { plugins: [{ removeViewBox: false }] },
        png: { quality: 80, stripAll: true },
        jpeg: { quality: 80, stripAll: true },
        jpg: { quality: 80, stripAll: true },
      }),
    ],
  };
});