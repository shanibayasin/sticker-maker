# StickerMaker — Free Online Die-Cut Sticker Maker

Design custom stickers, remove backgrounds, and export print-ready artwork in seconds.

## Overview

StickerMaker is a free browser-based sticker creator for making custom die-cut stickers online. It includes a canvas editor for uploading images, removing backgrounds, applying white sticker borders, adding Urdu/English text, and exporting high-quality PNG/PDF files without sign-up.

The app is built as a React + Vite single-page experience with an Express server for local dev and asset serving. It includes category pages, template browsing, blog/pricing/about sections, and a production-ready structure for deployment.

## Features

- Browser-based sticker editor with drag, resize, rotate, zoom, and layer controls
- Client-side background removal workflow for uploaded images
- Auto die-cut white border generation with shadow and border styling
- Support for text editing with English and Urdu-friendly font families
- Template library and category-based sticker browsing
- Sticker pack creation for multiple designs in one project
- Custom canvas presets and responsive mobile-friendly editor layout
- PNG export and print-ready PDF export using jsPDF
- Undo/redo history and local state persistence in the browser
- Routing for Home, Templates, Editor, Blog, Pricing, About, and category pages
- SEO support via dynamic metadata, sitemap, and robots.txt routes

## Tech Stack

- Frontend: React 19, TypeScript, Vite
- Styling: Tailwind CSS, custom CSS
- Backend: Express.js, dotenv
- Canvas and export: HTML5 Canvas, jsPDF, canvas-confetti
- UI/icons: lucide-react, motion
- AI/GenAI integration: @google/genai
- Additional libraries: Fabric, @tailwindcss/vite

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

The app serves through the Express dev server on port 3000.

## Project Structure

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

## Deployment

This project is set up for deployment on Vercel.

Live URL: https://your-live-url.vercel.app

For production deployment, build the app with:

```bash
npm run build
```

Then deploy the generated project or connect the repository to Vercel using the standard Vite/React deployment flow.

## License

All rights reserved.
