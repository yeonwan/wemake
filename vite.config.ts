import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";

// SSR 플러그인 import는 주석 처리 또는 조건 분기
// import { reactRouter } from "@react-router/dev/vite";

const isSPA = process.env.BUILD_TARGET === "spa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    !isSPA && reactRouter(),
  ].filter(Boolean),
  base: process.env.NODE_ENV === "production" ? "/wemake/" : "/",
  // SSR 관련 옵션도 분기 처리 가능
});
