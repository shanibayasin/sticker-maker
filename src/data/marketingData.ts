export interface FeatureItem {
  id: string;
  iconName: string;
  headline: string;
  description: string;
  badge?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  stickerMade: string;
  verified: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'export' | 'whatsapp' | 'printing' | 'features';
}

export const HERO_COPY = {
  h1: "Sticker Maker — Design Custom Stickers Free in Seconds",
  h1Highlight: "Free in Seconds",
  subheadline: "Skip the heavy learning curve of complex design tools. Upload any photo, remove the background with one click, add an iconic die-cut white border, and download crisp, transparent PNGs or print-ready 300 DPI files instantly — no signup or credit card required.",
  primaryCta: "Create a Sticker — It's Free",
  secondaryCta: "Browse 1,000+ Templates",
  trustMetrics: [
    { label: "Stickers Created", value: "3.4M+" },
    { label: "Active Creators", value: "240k+" },
    { label: "Average Render Time", value: "0.4s" },
    { label: "User Rating", value: "4.9/5" },
  ],
};

export const FEATURES_COPY: FeatureItem[] = [
  {
    id: "photo-to-sticker",
    iconName: "Wand2",
    headline: "Photo to Sticker",
    description: "Upload any photo and get a sticker-ready result in one step with automatic background removal, white die-cut borders, and instant export options.",
    badge: "1-Step Flow",
  },
  {
    id: "ai-bg-removal",
    iconName: "Wand2",
    headline: "Smart Background Remover",
    description: "Instantly isolate people, pets, logos, or illustrations with sub-pixel edge detection. Say goodbye to tedious lasso selections and hello to clean, transparent silhouettes in a fraction of a second.",
    badge: "Instant AI",
  },
  {
    id: "die-cut-border",
    iconName: "Scissors",
    headline: "Auto Die-Cut White Border",
    description: "Generate the signature vinyl sticker look with intelligent contour dilation that wraps around complex artwork. Adjust outline thickness from 2px to 24px and preview realistic sticker drop-shadows live.",
    badge: "Signature Look",
  },
  {
    id: "drag-and-drop",
    iconName: "Move",
    headline: "Drag-and-Drop Editor",
    description: "Arrange custom typography, playful doodle clipart, curved text, and badges on an ultra-smooth HTML5 canvas. Layer, rotate, flip, and rescale artwork with zero lag on desktop or mobile touchscreens.",
    badge: "Smooth 60fps",
  },
  {
    id: "templates-library",
    iconName: "Sparkles",
    headline: "1,000+ Ready Templates",
    description: "Jumpstart your creativity with professionally curated sticker presets across funny memes, aesthetic vibes, WhatsApp packs, and Urdu calligraphy. Fully customizable in one click.",
    badge: "Weekly Updates",
  },
  {
    id: "pack-maker",
    iconName: "Layers",
    headline: "Sticker Pack Maker",
    description: "Build complete matching sticker collections for Telegram, Discord, iMessage, and WhatsApp in a single project. Batch export your entire pack with automated file naming and consistent dimension scaling.",
    badge: "Multi-Sticker",
  },
  {
    id: "instant-export",
    iconName: "Download",
    headline: "Instant PNG & 300 DPI Export",
    description: "Export high-resolution transparent PNGs, optimized WebP for messaging apps, or print-ready PDF vectors formatted for Cricut and silhouette cutters. Download immediately without creating an account.",
    badge: "No Signup Needed",
  },
];

export const TESTIMONIALS_COPY: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Maya Lin",
    role: "Etsy Sticker Shop Owner",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    quote: "I used to spend 15 minutes in Photoshop drawing clipping paths and stroke outlines for my hand-drawn illustrations. With StickerMaker, the auto die-cut contour takes literally two seconds, and the 300 DPI PDF export prints flawlessly on my vinyl cutter.",
    rating: 5,
    stickerMade: "Cute Boba Cat Die-Cut",
    verified: true,
  },
  {
    id: "test-2",
    name: "Hamza Tariq",
    role: "Digital Marketer & Community Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quote: "The Urdu Nastaliq typography support is unmatched anywhere on the internet. Making viral Urdu meme stickers and Eid greeting packs for our WhatsApp groups used to require specialized desktop software. Now my whole team creates them on their phones!",
    rating: 5,
    stickerMade: "Urdu WhatsApp Sticker Pack",
    verified: true,
  },
  {
    id: "test-3",
    name: "Chloe Vance",
    role: "Content Creator & Twitch Streamer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    quote: "Canva is great for presentations, but it's way too clunky when you just need to whip up Discord emotes and Instagram story stickers. This tool is laser-focused, blazing fast, and the transparent background export works on the first try.",
    rating: 5,
    stickerMade: "Hype Emote Badges",
    verified: true,
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Choose a Template or Upload Artwork",
    description: "Start with a pre-designed sticker layout from our trending library, or drop in your own photos, illustrations, doodles, or business logo.",
  },
  {
    step: "02",
    title: "Customize & Add Die-Cut Border",
    description: "Personalize with curved sticker typography, vibrant gradients, and clipart. Dial in your white die-cut stroke contour width and subtle vinyl shadow.",
  },
  {
    step: "03",
    title: "Download Instantly or Order Prints",
    description: "Grab transparent PNGs for WhatsApp and Instagram stories, or export print-ready 300 DPI vectors formatted for commercial sticker printing.",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: "general",
    question: "How do I make a sticker for free?",
    answer: "You can make custom stickers 100% free by opening our web editor, uploading your photo or selecting a template, clicking 'Remove Background' to isolate your subject, tweaking your text and border stroke, and hitting 'Download PNG'. There are no watermarks, paywalls, or mandatory sign-up steps for basic high-resolution exports.",
  },
  {
    category: "general",
    question: "What's the best sticker maker app?",
    answer: "The best sticker maker is one that gives you true die-cut white border generation, instant background removal, and transparent PNG exports without bloated software installations. StickerMaker is engineered specifically for sticker creation, making it faster, lighter, and more precise than general-purpose graphic suites like Canva.",
  },
  {
    category: "whatsapp",
    question: "Can I make WhatsApp stickers online?",
    answer: "Yes! Our editor includes a dedicated 512x512 pixel WhatsApp preset with automatic transparent alpha channel rendering. Once downloaded, you can import your custom PNG/WebP files directly into 'Sticker Maker for WhatsApp' or WhatsApp Web to send to your chats immediately.",
  },
  {
    category: "printing",
    question: "What file format should stickers be for printing?",
    answer: "For physical vinyl sticker printing, the industry standard is 300 DPI transparent PNG or print-ready PDF with a dedicated die-cut cut line (contour path). Our export engine allows you to download both transparent 300 DPI PNGs and vector-aligned PDF files compatible with Cricut, Silhouette Studio, and commercial printers.",
  },
  {
    category: "features",
    question: "How to remove background from a sticker image?",
    answer: "Simply upload your JPG or PNG image into the editor. Our background remover identifies the primary subject, strips away distracting backgrounds with smooth anti-aliased edges, and automatically places a white sticker border around your subject silhouette in one fluid step.",
  },
  {
    category: "general",
    question: "Is this sticker maker free to use?",
    answer: "Yes, our core sticker maker is completely free with unlimited exports, transparent background downloads, background removal, and full access to our standard sticker template library. We also offer an optional Pro tier for multi-sticker bulk batch export and custom brand font uploads.",
  },
  {
    category: "whatsapp",
    question: "Can I make a sticker pack?",
    answer: "Absolutely. With our 'Sticker Pack' feature inside the editor, you can create multiple sticker artboards simultaneously, maintain consistent styling and border thickness across all designs, and download the entire collection in a single organized zip archive.",
  },
  {
    category: "export",
    question: "What size should stickers be for Instagram?",
    answer: "For Instagram Stories and Reels stickers, the recommended canvas size is 1080x1080 pixels (or 1080x1920 full screen) saved as a transparent 24-bit PNG. Our Instagram preset automatically sets the canvas to 1080x1080 with crisp edge rendering so your stickers stay sharp when placed over photos and videos.",
  },
];
