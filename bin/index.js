#!/usr/bin/env node

import { mkdirSync, writeFileSync, existsSync, copyFileSync } from "fs";
import { resolve, dirname } from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function copyTemplate(templatePath, destinationPath) {
  copyFileSync(resolve(__dirname, "../templates", templatePath), destinationPath);
}

function createVueProject(projectName) {
  const projectPath = resolve(process.cwd(), projectName);

  if (existsSync(projectPath)) {
    console.error(`Folder ${projectName} already exists.`);
    process.exit(1);
  }

  mkdirSync(projectPath);
  mkdirSync(resolve(projectPath, "src"));
  mkdirSync(resolve(projectPath, "src/components"));

  // Copy templates
  copyTemplate("index.html", resolve(projectPath, "index.html"));
  copyTemplate("src/main.js", resolve(projectPath, "src/main.js"));
  copyTemplate("src/App.vue", resolve(projectPath, "src/App.vue"));
  copyTemplate("src/components/HelloWorld.vue", resolve(projectPath, "src/components/HelloWorld.vue"));
  copyTemplate("vite.config.js", resolve(projectPath, "vite.config.js"));

  // Create package.json
  const pkg = {
    name: projectName,
    version: "1.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      serve: "vite preview",
    },
    dependencies: {
      vue: "^3.0.0",
      nodality: "^1.0.90",
    },
    devDependencies: {
      vite: "^4.0.0",
      "@vitejs/plugin-vue": "^4.0.0",
    },
  };
  writeFileSync(resolve(projectPath, "package.json"), JSON.stringify(pkg, null, 2));

  // Install dependencies
  console.log("Installing dependencies...");
  execSync("npm install", { cwd: projectPath, stdio: "inherit" });

  console.log(`\nDone! To start your app:
  cd ${projectName}
  npm run dev       # Start development server
  npm run build     # Build for production
  npm run serve     # Preview production build
`);
}

// Parse CLI arguments
const args = process.argv.slice(2);
if (!args[0]) {
  console.error("Usage: npm create nodality-vue <project-name>");
  process.exit(1);
}

createVueProject(args[0]);