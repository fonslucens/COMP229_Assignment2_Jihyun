import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Frontend-only configuration from the deployment slides.
// Keep index.html as the build entry so the deployed site has an HTML document.
export default defineConfig({ plugins: [react()] });
