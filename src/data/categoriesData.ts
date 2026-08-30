import { CategoryInfo, StickerCategory } from '../types/sticker';

export const CATEGORIES_DATA: Record<StickerCategory, CategoryInfo> = {
  funny: {
    slug: 'funny',
    name: 'Funny & Meme',
    badge: 'Trending Viral',
    metaTitle: 'Funny Sticker Maker – Create Viral Meme Stickers Free Online',
    metaDescription: 'Design hilarious meme stickers and funny reaction stickers in seconds. Add witty captions, comic bubbles, and bold white die-cut outlines for instant PNG download.',
    h1: 'Funny Sticker Maker — Design Viral Reaction & Meme Stickers Free',
    intro: 'Turn internet humor, inside jokes, and viral memes into custom die-cut stickers within seconds. Whether you are building playful reactions for your Discord community, witty punchlines for your group chats, or slapstick laptop decals, our Funny Sticker Maker provides the tools to combine comic typography, pop-art bubbles, and expressive character clipart. With automatic background removal and customizable contour strokes, creating hilarious stickers has never been faster or easier.',
    keywords: ['funny sticker maker', 'meme stickers online', 'make funny stickers free', 'reaction stickers download', 'discord emote maker', 'custom meme decals'],
    specs: {
      recommendedSize: '512 x 512 px',
      format: 'Transparent PNG / WebP',
      dpi: '300 DPI for vinyl print',
      useCase: 'Discord, Telegram, Laptop Stickers, Reaction Memes',
    },
    samplePrompts: [
      'Dramatic cat crying face with yellow comic bubble',
      'Dumpster fire on retro badge with "Everything is Fine" text',
      '"Sending this from my bed" in bubbly pastel font with sleepy pillow',
      'Capybara sipping iced coffee with sunglasses',
    ],
    relatedCategories: ['whatsapp', 'quotes', 'aesthetic'],
    faqs: [
      {
        question: 'How do I add meme text over my funny sticker?',
        answer: 'Select the "Text" tab in the editor, click on "Meme Text" or "Impact Bold", type your caption, and adjust the black outline stroke width for that classic viral meme aesthetic.',
      },
      {
        question: 'Can I export funny stickers for Discord server emotes?',
        answer: 'Yes! Our editor exports transparent PNGs that scale down crisply to Discord 128x128 emote standards with zero background artifacts.',
      },
      {
        question: 'How do I make my pet into a funny sticker?',
        answer: 'Upload a picture of your pet, hit "AI Background Remover" to isolate their face, choose an auto white border, and add a funny speech bubble or cartoon sunglasses.',
      },
    ],
  },

  aesthetic: {
    slug: 'aesthetic',
    name: 'Aesthetic & Indie',
    badge: 'Cottagecore & Y2K',
    metaTitle: 'Aesthetic Sticker Maker – Design Indie, Pastel & Y2K Stickers Online',
    metaDescription: 'Design dreamy aesthetic stickers with pastel palettes, vintage botany, vaporwave elements, and clean die-cut white borders. Free high-res PNG export.',
    h1: 'Aesthetic Sticker Maker — Craft Vintage, Pastel & Indie Stickers',
    intro: 'Elevate your journal, water bottle, and iPad planners with carefully curated aesthetic stickers. From warm neutral botanical sketches and soft cottagecore butterflies to shimmering Y2K chrome stars and vaporwave gradients, our Aesthetic Sticker Maker allows creators to express mood-driven visual identities. Pair delicate serif typography with organic shapes, adjust subtle paper drop-shadows, and export high-resolution transparent assets tailored for digital scrapbooking or matte vinyl printing.',
    keywords: ['aesthetic sticker maker', 'indie sticker creator', 'y2k sticker maker', 'pastel stickers online', 'digital planner stickers', 'cottagecore stickers'],
    specs: {
      recommendedSize: '1080 x 1080 px',
      format: 'Transparent 24-bit PNG / PDF',
      dpi: '300 DPI high-definition',
      useCase: 'GoodNotes Planners, Hydro Flask, Journaling, Scrapbooking',
    },
    samplePrompts: [
      'Pressed wild lavender branch with subtle gold grain',
      'Holographic chrome cyber star with soft pastel aura',
      'Minimalist continuous line art coffee mug on beige circle',
      'Retro floral daisy with curved serif "Stay Gentle" quote',
    ],
    relatedCategories: ['quotes', 'instagram', 'funny'],
    faqs: [
      {
        question: 'Can I use these aesthetic stickers in GoodNotes and Notability?',
        answer: 'Yes! Download your stickers as Transparent PNGs and drag them directly onto your digital planner pages on iPad or tablet apps.',
      },
      {
        question: 'How do I achieve that soft indie matte finish?',
        answer: 'In the editor, use our warm neutral color presets (soft sage, oat beige, blush pink) and set the die-cut border to 4px with a soft ambient shadow.',
      },
      {
        question: 'Are aesthetic vector elements included for free?',
        answer: 'Yes, our clipart library includes hundreds of hand-drawn botanicals, celestial stars, retro ribbons, and geometric stamps completely free.',
      },
    ],
  },

  logo: {
    slug: 'logo',
    name: 'Logo & Brand Stickers',
    badge: 'Business & Merch',
    metaTitle: 'Logo Sticker Maker – Create Custom Brand & Product Stickers',
    metaDescription: 'Design professional die-cut logo stickers for packaging, merch giveaways, and business branding. Auto white cutline and 300 DPI print-ready vectors.',
    h1: 'Logo Sticker Maker — Turn Brand Logos into Die-Cut Merch Stickers',
    intro: 'Transform your company emblem, boutique logo, or product artwork into high-impact die-cut promotional stickers. Perfect for e-commerce unboxing inserts, café takeaway cups, event swag bags, and laptop merchandise, our Logo Sticker Maker creates clean contour borders around intricate brand silhouettes. Upload your vector SVG or transparent PNG logo, configure exact bleed margins, preview physical vinyl finishes, and download print-ready 300 DPI PDF proofs ready for commercial cutting machines.',
    keywords: ['logo sticker maker', 'custom business stickers', 'brand stickers online', 'merch sticker creator', 'cricut logo stickers', 'print ready sticker files'],
    specs: {
      recommendedSize: '1200 x 1200 px / Vector PDF',
      format: '300 DPI CMYK PDF & PNG',
      dpi: '300 DPI commercial grade',
      useCase: 'Packaging Seals, Merch Swag, Product Labels, Laptop Brand Decals',
    },
    samplePrompts: [
      'Circular artisan bakery badge with "Freshly Baked Since 2024"',
      'Modern geometric coffee roasters emblem with die-cut contour',
      'Tech startup hexagonal icon with crisp white 6px border',
      'Eco-friendly leaf seal with "100% Recyclable Packaging" text',
    ],
    relatedCategories: ['quotes', 'aesthetic', 'whatsapp'],
    faqs: [
      {
        question: 'Will the exported logo sticker have a transparent background?',
        answer: 'Yes, all exports preserve clean transparency outside the die-cut white border, ensuring seamless placement over colored packages.',
      },
      {
        question: 'Can I send these files directly to sticker print vendors like Sticker Mule?',
        answer: 'Absolutely. Choose the "Print-Ready PDF (300 DPI)" export option which embeds crisp vector outlines and high-resolution raster layers.',
      },
      {
        question: 'How do I add a circular or kiss-cut border around my logo?',
        answer: 'Under the "Elements" tab, select a badge shape (circle, hexagon, shield) or choose "Auto Die-Cut Contour" to hug the exact silhouette of your logo.',
      },
    ],
  },

  whatsapp: {
    slug: 'whatsapp',
    name: 'WhatsApp Stickers',
    badge: '512x512 WebP/PNG',
    metaTitle: 'WhatsApp Sticker Maker – Create Custom Stickers for WhatsApp Free',
    metaDescription: 'Design custom WhatsApp stickers online in seconds. Auto-crop, transparent 512x512 PNG/WebP exports, and pack generator. 100% free, no app download required.',
    h1: 'WhatsApp Sticker Maker — Create Custom Chat Stickers Online Free',
    intro: 'Transform your favorite personal photos, funny memes, and expressive quotes into vibrant custom stickers ready for WhatsApp. Unlike clunky mobile apps loaded with intrusive ads and watermark restrictions, our web-based WhatsApp Sticker Maker gives you complete creative freedom on any smartphone, tablet, or desktop browser. Every sticker is automatically rendered to WhatsApp’s exact 512x512 pixel specifications with seamless transparent alpha channels and lightweight compression to guarantee instant sending in your group chats.\n\nSimply upload your camera roll snaps or self-portraits, let our AI background remover isolate your face or subject in a split second, add a playful bold outline, and layer animated emojis or witty speech bubbles. Use our built-in Sticker Pack tool to assemble matching packs of 3 to 30 stickers that you can import straight into WhatsApp or WhatsApp Web with zero hassle.',
    keywords: ['whatsapp sticker maker', 'create whatsapp stickers online', 'make custom whatsapp stickers', 'whatsapp sticker maker web', 'free whatsapp sticker pack creator', 'transparent 512x512 stickers'],
    specs: {
      recommendedSize: '512 x 512 px exact',
      format: 'Transparent PNG / WebP (Under 100KB)',
      dpi: '72 - 150 DPI screen optimized',
      useCase: 'WhatsApp 1-on-1 Chats, Group Chats, WhatsApp Status',
    },
    samplePrompts: [
      'Waving hand hello with "Salam / Hey there!" greeting bubble',
      'Surprised face selfie with comic explosion background',
      '"On My Way!" motorcycle courier sticker with speed lines',
      'Birthday cupcake with candle and "Happy Birthday!" banner',
    ],
    relatedCategories: ['urdu', 'funny', 'instagram'],
    faqs: [
      {
        question: 'What is the required image size for WhatsApp stickers?',
        answer: 'WhatsApp requires stickers to be exactly 512x512 pixels with a transparent background and file size under 100KB. Our editor formats your stickers to these exact dimensions automatically.',
      },
      {
        question: 'How do I import the exported stickers into WhatsApp on iPhone and Android?',
        answer: 'Download the transparent PNGs, open a sticker import app like "Sticker Maker Studio" or upload them directly via WhatsApp Web desktop drag-and-drop to send as custom stickers.',
      },
      {
        question: 'Can I create a full 30-sticker pack in one session?',
        answer: 'Yes, click "Sticker Pack Mode" in our top bar to add new canvases, design matching stickers, and batch export them as a organized zip file.',
      },
    ],
  },

  instagram: {
    slug: 'instagram',
    name: 'Instagram Stories & Reels',
    badge: '1080x1080 Transparent',
    metaTitle: 'Instagram Sticker Maker – Design Story & Reel Stickers Online',
    metaDescription: 'Make eye-catching Instagram story stickers, GIF overlays, and link CTA badges. Download crystal-clear transparent PNGs to paste straight into your stories.',
    h1: 'Instagram Sticker Maker — Design Custom Story & Reel Stickers',
    intro: 'Level up your Instagram Stories, Reels, and TikTok content with custom-branded overlay stickers that drive engagement and clicks. Whether you are creating "New Post", "Link in Bio", "Swipe Up", or countdown reminder stickers for your brand, our Instagram Sticker Maker provides modern animated-style vectors, vibrant neon gradients, and bold drop-shadows. Because every file exports as an ultra-crisp transparent PNG, you can copy the image directly from your phone camera roll and paste it into Instagram Stories in seconds without needing GIPHY brand approval.',
    keywords: ['instagram sticker maker', 'instagram story stickers', 'link in bio sticker creator', 'make transparent story overlays', 'custom instagram stickers', 'reel sticker maker'],
    specs: {
      recommendedSize: '1080 x 1080 px',
      format: 'Transparent PNG (Copy-Paste ready)',
      dpi: '72 - 300 DPI high retina',
      useCase: 'Instagram Stories, Reels Overlays, TikTok Videos, Bio Links',
    },
    samplePrompts: [
      'Neon glowing "NEW POST" badge with pulsating starburst',
      '"Tap Here for Link" arrow pointer with vibrant gradient',
      'Behind the Scenes clapperboard with handwritten chalk font',
      'Weekly podcast microphone badge with audio wave bars',
    ],
    relatedCategories: ['aesthetic', 'quotes', 'whatsapp'],
    faqs: [
      {
        question: 'How do I paste custom stickers directly into Instagram Stories?',
        answer: 'Save the transparent PNG to your phone camera roll. In Instagram Story mode, tap the sticker icon > camera roll sticker, or simply copy the photo and select "Add Sticker" from the iOS/Android clipboard pop-up.',
      },
      {
        question: 'Do I need a GIPHY brand account to use these stickers on Instagram?',
        answer: 'No! By using the direct camera roll paste method, you can use any custom sticker immediately without waiting for GIPHY verification.',
      },
      {
        question: 'What resolution is best for Instagram Reels overlays?',
        answer: 'We recommend our 1080x1080 square canvas or 1080x1920 full vertical canvas to ensure pin-sharp clarity on high-density smartphone displays.',
      },
    ],
  },

  quotes: {
    slug: 'quotes',
    name: 'Quotes & Lettering',
    badge: 'Typography & Badges',
    metaTitle: 'Quote Sticker Maker – Create Custom Typography & Lettering Stickers',
    metaDescription: 'Design inspiring quote stickers and bold typography decals. Choose curved text, vintage scripts, comic fonts, and auto white die-cut borders.',
    h1: 'Quote Sticker Maker — Turn Words into Custom Lettering Stickers',
    intro: 'Turn your favorite motivational quotes, book passages, song lyrics, and affirmations into expressive typography stickers. Our Quote Sticker Maker features advanced text styling tools including curved text warping, dual-tone stroke outlines, drop-shadow extrusion, and retro bubble lettering. Choose from hundreds of curated display typefaces, add decorative flourishes and starbursts, and let our engine automatically generate a smooth die-cut border that binds your words into a unified physical or digital sticker.',
    keywords: ['quote sticker maker', 'typography sticker maker', 'lettering stickers online', 'curved text stickers', 'affirmation stickers', 'custom word decals'],
    specs: {
      recommendedSize: '1080 x 1080 px',
      format: 'Transparent PNG / PDF Vector',
      dpi: '300 DPI print ready',
      useCase: 'Water Bottles, Laptop Lids, Notebooks, Motivation Boards',
    },
    samplePrompts: [
      '"Do It With Passion Or Not At All" in curved retro 70s typography',
      '"One Day At A Time" in soft pastel script with floral vines',
      '"Breathe In Peace, Breathe Out Stress" minimal badge',
      '"Progress Over Perfection" bold stamp sticker with distressed texture',
    ],
    relatedCategories: ['aesthetic', 'funny', 'urdu'],
    faqs: [
      {
        question: 'Can I bend or curve text into an arch or circle?',
        answer: 'Yes! Select any text layer and use our "Curved Text" slider in the inspector to bend your quote into an upward arch, downward smile, or full circle.',
      },
      {
        question: 'How do I make multi-line quotes look cohesive as a single sticker?',
        answer: 'Our auto die-cut border connects closely spaced letters and words into one unified contour silhouette, so you get one clean peelable sticker.',
      },
      {
        question: 'Can I upload my own custom font files (TTF/OTF)?',
        answer: 'Yes, with our Pro workspace you can drop in your own custom font files to maintain exact brand or personal lettering styles.',
      },
    ],
  },

  urdu: {
    slug: 'urdu',
    name: 'Urdu & Nastaliq',
    badge: 'Niche Differentiator',
    metaTitle: 'Urdu Sticker Maker – Create Free Nastaliq Urdu Stickers Online',
    metaDescription: 'Design custom Urdu stickers online with authentic Noto Nastaliq calligraphy, funny Pakistani meme punchlines, Eid greetings, and Jumma Mubarak quotes. Free PNG download.',
    h1: 'Urdu Sticker Maker — Create Nastaliq Calligraphy & Meme Stickers Online',
    intro: 'Design authentic, culturally rich Urdu stickers with fluid Nastaliq calligraphy, iconic Pakistani pop-culture quotes, and heartfelt festive greetings. While most Western design tools lack proper Right-to-Left (RTL) rendering and break Urdu character ligatures, our specialized Urdu Sticker Maker natively supports the Noto Nastaliq Urdu typeface alongside hundreds of pre-designed Urdu phrases, Eid Mubarak banners, Jumma Mubarak blessings, and viral desi meme punchlines.\n\nWhether you want to create a funny "Sabar Ka Phal Mitha Hota Hai" tea sticker, a poetic Allama Iqbal couplet, or a customized family greeting pack for Ramadan, our tool renders each ligature with flowing typographic grace. Upload your own photography, remove backgrounds in one click, apply a die-cut white border around the Nastaliq text flow, and export transparent 512x512 PNGs ready for WhatsApp, Telegram, and Instagram.',
    keywords: ['urdu sticker maker', 'nastaliq sticker maker', 'urdu whatsapp stickers online', 'eid mubarak stickers free', 'urdu meme stickers', 'pakistani sticker maker', 'urdu calligraphy sticker creator'],
    specs: {
      recommendedSize: '512 x 512 px (WhatsApp) / 1200 x 1200 px',
      format: 'Transparent PNG / WebP',
      dpi: '300 DPI for vinyl decals',
      useCase: 'WhatsApp Family Groups, Pakistani Memes, Eid Greetings, Truck Art Merch',
    },
    samplePrompts: [
      '"چائے زندگی ہے" (Chai Zindagi Hai) in bold Nastaliq with steaming cup',
      '"عید مبارک" (Eid Mubarak) in elegant golden calligraphy with crescent moon',
      '"دیکھ مگر پیار سے" (Dekh Magar Pyar Se) retro truck art style sticker',
      '"جمعہ مبارک" (Jumma Mubarak) with intricate Islamic floral arch border',
    ],
    relatedCategories: ['whatsapp', 'quotes', 'funny'],
    faqs: [
      {
        question: 'Does the text editor support authentic Urdu Nastaliq font ligatures without breaking letters?',
        answer: 'Yes! We use native web Noto Nastaliq rendering with full Right-to-Left (RTL) bidirectional text processing so every joint, kasheeda, and diacritic renders properly.',
      },
      {
        question: 'Are there pre-made Urdu phrases and greetings available in the editor?',
        answer: 'Yes, under the "Elements" tab, open the "Urdu Calligraphy" section to find ready-to-use stickers for Chai, Eid, Jumma, Desi Memes, and Truck Art phrases.',
      },
      {
        question: 'Can I combine Urdu text with photos and white die-cut borders for WhatsApp?',
        answer: 'Absolutely. Upload any photo, add your Urdu caption above or below, and our die-cut border wraps seamlessly around both the image and the Nastaliq script.',
      },
    ],
  },
};
