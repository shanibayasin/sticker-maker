# StickerMaker — Free Online Die-Cut Sticker Maker

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

> Design custom stickers, remove backgrounds, and export print-ready artwork in seconds — all in your browser, no sign-up required.

---

## 📖 Overview

**StickerMaker** is a free browser-based sticker creator for making custom die-cut stickers online. It includes a canvas editor for uploading images, removing backgrounds, applying white sticker borders, adding Urdu/English text, and exporting high-quality PNG/PDF files without sign-up.

The app is built as a **React + Vite** single-page experience with an **Express** server for local dev and asset serving. It includes category pages, template browsing, blog/pricing/about sections, and a production-ready structure for deployment.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Canvas Editor** | Drag, resize, rotate, zoom, and layer controls |
| 🖼️ **Background Removal** | Client-side workflow for uploaded images |
| 🔲 **Auto Die-Cut Borders** | White border generation with shadow and border styling |
| ✍️ **Text Editing** | English and Urdu-friendly font families |
| 📚 **Template Library** | Category-based sticker browsing |
| 📦 **Sticker Packs** | Create multiple designs in one project |
| 📐 **Custom Presets** | Responsive mobile-friendly editor layout |
| 📤 **Export Options** | PNG export and print-ready PDF via jsPDF |
| ↩️ **Undo/Redo** | History and local state persistence in browser |
| 🧭 **Routing** | Home, Templates, Editor, Blog, Pricing, About, and category pages |
| 🔍 **SEO Support** | Dynamic metadata, sitemap, and robots.txt routes |

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,ts,vite,tailwind,express,nodejs,git,vercel" alt="Tech Stack Icons" />
</p>

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS, Custom CSS |
| **Backend** | Express.js, dotenv |
| **Canvas & Export** | HTML5 Canvas, jsPDF, canvas-confetti |
| **UI / Icons** | lucide-react, motion |
| **AI / GenAI** | @google/genai |
| **Additional** | Fabric, @tailwindcss/vite |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** (or yarn/pnpm)

### 📦 Install

```bash
npm install
```

### 🖥️ Run Locally

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

> The app serves through the Express dev server on **port 3000**.

---

## 📁 Project Structure

```text
.
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── server.ts
├── tsconfig.json
├── vite.config.ts
├── assets/
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── components/
│   │   ├── about/
│   │   │   └── AboutPage.tsx
│   │   ├── blog/
│   │   │   ├── BlogPage.tsx
│   │   │   └── BlogPostPage.tsx
│   │   ├── category/
│   │   │   └── CategoryPage.tsx
│   │   ├── common/
│   │   │   ├── DieCutStickerCard.tsx
│   │   │   ├── StickerDieCutGraphic.tsx
│   │   │   └── StickerPreviewModal.tsx
│   │   ├── editor/
│   │   │   ├── BgRemovalModal.tsx
│   │   │   ├── FloatingToolbar.tsx
│   │   │   ├── FontPicker.tsx
│   │   │   ├── PropertiesPanel.tsx
│   │   │   ├── StickerEditor.tsx
│   │   │   └── TemplateSidebar.tsx
│   │   ├── home/
│   │   │   └── HomePage.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── pricing/
│   │   │   └── PricingPage.tsx
│   │   ├── seo/
│   │   │   └── SEOHead.tsx
│   │   └── templates/
│   │       └── TemplatesPage.tsx
│   ├── data/
│   │   ├── blogData.ts
│   │   ├── categoriesData.ts
│   │   ├── fontsData.ts
│   │   ├── marketingData.ts
│   │   └── templatesData.ts
│   ├── types/
│   │   └── sticker.ts
│   └── utils/
│       ├── canvasHelper.ts
│       └── fontLoader.ts
├── sticker-maker/
└── node_modules/
```

---

## ☁️ Deployment

This project is set up for deployment on **Vercel**.

**Live URL:** [https://your-live-url.vercel.app](https://your-live-url.vercel.app)

### Production Build

```bash
npm run build
```

Then deploy the generated project or connect the repository to Vercel using the standard **Vite/React deployment flow**.

<p align="center">
  <a href="https://vercel.com/new">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
  </a>
</p>

---

## 📄 License

**All rights reserved.**

---

<p align="center">
  Made with ❤️ using React, Vite & Tailwind CSS
</p>
