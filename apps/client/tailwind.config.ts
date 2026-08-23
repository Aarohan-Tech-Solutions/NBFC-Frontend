import type { Config } from "tailwindcss";
import { baseTailwindConfig } from "@nbfc/config/tailwind";

const config: Config = {
  ...baseTailwindConfig,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;
