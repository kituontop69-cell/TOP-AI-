# AI Vault — Progressive Web App (PWA)

> Discover, compare, and launch the best free and free-tier AI websites and tools in one modern hub.

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-06b6d4?style=for-the-badge&logo=pwa&logoColor=white)](https://aivault.app)
[![React 19](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.3-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

---

## 🌟 Overview

**AI Vault** is a production-quality Progressive Web App designed as a centralized directory for discovering free and free-tier artificial intelligence tools. It connects users directly to official external websites with verified links, transparent pricing breakdowns, and zero deceptive claims.

### Key Philosophy
* **It is a directory, not a clone:** Every listing links directly to the official external service.
* **Transparent Pricing Labels:** No vague "Free" labels. Every tool specifies:
  * 🟢 **Free Forever** (Completely free, no paywall or time limit)
  * 🟡 **Free Tier** (Permanent free tier with recurring limits/quotas)
  * 🔵 **Free Credits** (Initial trial or daily refills to test for free)
  * ⚪ **Open Source** (Open weights / client-side in browser / self-hostable)
  * 🟠 **Limited Free** (Substantial free features, but throttled resolution or rate limits)
  * 🔴 **Paid** (Subscription or paid license)
* **Zero Friction Highlighting:** Quick filters identify tools requiring **No Login** (instant access with zero signups).

---

## 📱 Progressive Web App (PWA) Capabilities

### Android & Desktop (Chrome / Edge / Brave)
* Native installation prompt triggered automatically via `beforeinstallprompt`.
* "Install App" button available in navigation header and home callout.
* Standalone window, dock/app drawer icon, and fast launch.

### iPhone & iPad (iOS Safari)
* Custom, interactive iOS installation guide modal:
  1. Open `aivault.app` in Safari
  2. Tap the **Share** button (Square with arrow)
  3. Scroll and tap **Add to Home Screen**
  4. Tap **Add** in the top-right corner
* Standalone fullscreen experience with support for iOS notches, safe area insets, and dynamic islands.

### Offline Resilience
* Service worker powered by `vite-plugin-pwa` and Workbox.
* Caches app shell, stylesheet, fonts, icons, and local directory data.
* Intelligent `OfflineBanner` alerts users when network drops while maintaining full browsing capability of cached tools.

---

## 🚀 Starter Database (30+ Handpicked Tools)

The catalog comes pre-seeded with verified official links and accurate pricing classifications:

| Tool | Category | Pricing Status | Login Requirement |
| :--- | :--- | :--- | :--- |
| **LM Arena (LMSYS)** | AI Arenas, AI Chat, Research | 🟢 Free Forever | 🚫 No Login |
| **Design Arena** | AI Arenas, Design | 🟢 Free Forever | 🚫 No Login |
| **Freebuff** | AI Coding, App Builders | 🟡 Free Tier | 🚫 No Login |
| **OpenRouter** | Developer Tools, AI Chat | 🔵 Free Credits & Free Models | 🔒 Login Required |
| **Duck.ai (DuckDuckGo)** | AI Chat, AI Search | 🟢 Free Forever | 🚫 No Login (Anonymous) |
| **Perplexity AI** | AI Search, Research | 🟡 Free Tier | 🚫 No Login |
| **Microsoft Copilot** | AI Chat, AI Search | 🟡 Free Tier | 🚫 No Login |
| **Mistral Le Chat** | AI Chat, AI Writing | 🟡 Free Tier | 🔒 Login Required |
| **Hugging Face Spaces** | AI Arenas, Experimental | ⚪ Open Source | 🚫 No Login |
| **Krea AI** | AI Image, AI Video, Design | 🟡 Free Tier | 🔒 Login Required |
| **Canva Magic Studio** | Design, Presentations | 🟡 Free Tier | 🔒 Login Required |
| **Pixlr AI** | Design, AI Image | 🟡 Free Tier | 🚫 No Login |
| **Ideogram AI** | AI Image, Design | 🟡 Free Tier (Daily credits) | 🔒 Login Required |
| **Leonardo AI** | AI Image, 3D / Animation | 🔵 Free Credits (150/day) | 🔒 Login Required |
| **CapCut AI** | AI Video, Design | 🟡 Free Tier | 🔒 Login Required |
| **Kling AI** | AI Video, 3D / Animation | 🔵 Free Credits (66/day) | 🔒 Login Required |
| **Hailuo AI (MiniMax)** | AI Video, Experimental | 🔵 Free Credits | 🔒 Login Required |
| **Luma Dream Machine** | AI Video, 3D / Animation | 🔵 Free Credits (30/month) | 🔒 Login Required |
| **Pika Labs** | AI Video, Experimental | 🟡 Free Tier | 🔒 Login Required |
| **Runway Gen-3** | AI Video, VFX | 🔵 Free Credits (125 trial) | 🔒 Login Required |
| **Kilo Code** | AI Coding, Developer Tools | 🟡 Free Tier | 🔒 Login Required |
| **Cline** | AI Coding, Developer Tools | ⚪ Open Source | 🚫 No Login |
| **ElevenLabs** | AI Voice, Productivity | 🟡 Free Tier (10k chars/mo) | 🔒 Login Required |
| **Suno AI** | AI Music, Experimental | 🔵 Free Credits (50/day) | 🔒 Login Required |
| **Gamma App** | Presentations, Documents | 🔵 Free Credits (400 welcome) | 🔒 Login Required |
| **DeepSeek Chat** | AI Chat, AI Coding, Research | 🟢 Free (Reasoning R1) | 🔒 Login Required |
| **v0 by Vercel** | AI Coding, App Builders | 🔵 Free Credits | 🔒 Login Required |
| **Bolt.new** | App Builders, Full-Stack | 🟡 Free Tier | 🔒 Login Required |
| **Whisper Web** | AI Voice, Productivity | 🟢 Free Forever (In-Browser ML) | 🚫 No Login |
| **ChatPDF** | PDF & Documents, Education | 🟡 Free Tier (2 docs/day) | 🚫 No Login |

---

## 🗂️ 20 Dedicated Categories

1. 🤖 **AI Chat** — Conversational assistants and frontier LLMs
2. ⚔️ **AI Arenas** — Blind side-by-side model battles and leaderboards
3. 🎨 **AI Image** — Photorealistic text-to-image and visual generators
4. 🎬 **AI Video** — Text-to-video, camera control, and generative motion
5. 💻 **AI Coding** — Autonomous agents, IDE extensions, and autocomplete
6. 🎤 **AI Voice** — Voice cloning, text-to-speech, and dubbing
7. 🎵 **AI Music** — Song generators and instrumental synthesis
8. 📝 **AI Writing** — Copywriting, essays, and summarization
9. 🔎 **AI Search** — Cited answer engines with source grounding
10. 📚 **AI Education** — Interactive tutors and study accelerators
11. 📄 **PDF & Documents** — Chat with PDFs and paper extractors
12. 📊 **Presentations** — Slide deck builders and visual decks
13. ✨ **Design** — UI layout generation, mockups, and logos
14. 🧠 **Research** — Literature review, arXiv analysis, and citations
15. 📱 **App Builders** — Prompt-to-web app and prototype sandboxes
16. 🧪 **Experimental** — Bleeding-edge research models and Gradio demos
17. 🔧 **Developer Tools** — APIs, routing gateways, and debuggers
18. 🧊 **3D / Animation** — Text-to-mesh, Gaussian splatting, and rigging
19. 🌐 **Translation** — Context-aware multilingual localization
20. ⚡ **Productivity** — Automation, calendar assistants, and meeting notes

---

## 🔐 Admin Dashboard

The Admin Dashboard provides full CRUD governance over the directory:
* **Passkey Gate:** Protected by an admin passkey (configured via `VITE_ADMIN_PASSKEY` or default `KITUONTOP69`).
* **Tool Management:**
  * Add new tool with strict data validation (HTTPS URL verification, name, description, categories, tags, pricing model, login requirement, mobile friendly toggle).
  * Edit existing listings in place.
  * Delete listings with confirmation.
  * 1-click toggles for **Verified**, **Featured**, and **Trending** badges.
* **Accuracy Reports Inbox:** Review reports submitted by users (broken link, price change, wrong category, defunct tool). Resolve or dismiss reports.
* **Directory Analytics:** Real-time anonymous event metrics (launches, searches, views, favorites).
* **Backup & Restore:** 1-click JSON export and import for seamless catalog backups.

---

## ☁️ Dual-Mode Storage Architecture

AI Vault operates in **Dual-Mode**:

1. **Zero-Config Local Mode (Default):**
   * Works instantly without setting up any cloud databases.
   * Uses reactive `localStorage` and memory caching with instant UI synchronization.
   * Completely offline-capable.

2. **Cloud Mode (Supabase / Firebase):**
   * Copy `.env.example` to `.env`.
   * Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
   * Run the provided [`supabase-schema.sql`](file:///c:/Users/kitub/OneDrive/Desktop/New%20folder%20(3)/supabase-schema.sql) in your Supabase SQL editor.
   * Tools, favorites, and user reports will automatically synchronize remotely across devices.

---

## 🛠️ Local Development & Scripts

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for production
```bash
npm run build
```
Compiles TypeScript with zero errors and generates service workers and PWA manifests in `dist/`.

### 4. Preview production build locally
```bash
npm run preview
```

---

## 🚀 Deployment to Vercel

AI Vault is pre-configured with [`vercel.json`](file:///c:/Users/kitub/OneDrive/Desktop/New%20folder%20(3)/vercel.json) for instantaneous zero-config deployment to Vercel:

### Option A: Vercel CLI
```bash
# 1. Install Vercel CLI (if not installed)
npm install -g vercel

# 2. Deploy
vercel
```

### Option B: Vercel Web Dashboard (GitHub / Git)
1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework Preset: **Vite** (auto-detected).
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. (Optional) Set Environment Variables:
   * `VITE_ADMIN_PASSKEY`: Your custom secret admin passkey
   * `VITE_SUPABASE_URL`: (Optional) Your Supabase project URL
   * `VITE_SUPABASE_ANON_KEY`: (Optional) Your Supabase public key
7. Click **Deploy**.

---

## 🐙 Deployment to GitHub Pages (Free Hosting)

AI Vault includes complete configuration for hosting on **GitHub Pages**:

### Option 1: Automatic Deployment with GitHub Actions (Recommended)
This repository includes [`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml).

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of AI Vault PWA"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. On GitHub, go to your repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. That's it! GitHub Actions will automatically run the workflow, build the app, and publish your website at `https://<your-username>.github.io/<your-repo-name>/`.

### Option 2: 1-Command CLI Deployment with `gh-pages`
```bash
# Builds the app and publishes the dist folder to the gh-pages branch
npm run deploy
```
Then in GitHub repository **Settings** → **Pages**:
- Source: **Deploy from a branch**
- Branch: `gh-pages` / `/(root)`
- Click **Save**.

*Note: The build process automatically generates `dist/404.html` so client-side routing and page reloads work smoothly on GitHub Pages.*

---

## 🛡️ Safety, Trust & Legal Disclaimer

* AI Vault is an independent directory and is not affiliated with the listed services unless explicitly stated.
* All trademarks, logos, brand names, and service marks are the property of their respective owners.
* AI Vault does **not** host pirated AI accounts, circumvent paywalls, distribute cracked credentials, or scrape private data. Every tool card links directly to the service's official website.
