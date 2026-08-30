import React, { useState } from 'react';
import { 
  Sparkles, 
  Scissors, 
  Type, 
  Image as ImageIcon, 
  Shapes, 
  Search, 
  Plus, 
  Smile, 
  Package, 
  Upload, 
  Loader2, 
  Check,
  X
} from 'lucide-react';
import { StickerCategory, StickerTemplate, ClipartItem } from '../../types/sticker';
import { STICKER_TEMPLATES, CLIPART_ELEMENTS } from '../../data/templatesData';

interface TemplateSidebarProps {
  activeTab: 'border' | 'templates' | 'text' | 'uploads' | 'elements' | 'pack';
  onTabChange: (tab: 'border' | 'templates' | 'text' | 'uploads' | 'elements' | 'pack') => void;
  borderWidth: number;
  onBorderWidthChange: (width: number) => void;
  borderColor: string;
  onBorderColorChange: (color: string) => void;
  hasShadow: boolean;
  onHasShadowToggle: () => void;
  previewBg: 'checkerboard' | 'dark' | 'mint' | 'peach';
  onPreviewBgChange: (bg: 'checkerboard' | 'dark' | 'mint' | 'peach') => void;
  onSelectTemplate: (tmpl: StickerTemplate) => void;
  onAddText: (type: 'title' | 'bubble' | 'urdu' | 'minimal') => void;
  onAddShape: (shapeType: string, fill?: string) => void;
  onAddClipart: (item: ClipartItem) => void;
  onUploadImageFile: (file: File) => void;
  isProcessingUpload: boolean;
  stickerPack: Array<{ id: string; name: string }>;
  activePackIndex: number;
  onSelectPackIndex: (idx: number) => void;
  onAddPackItem: () => void;
  isCollapsed?: boolean;
  onCloseMobile?: () => void;
}

export const TemplateSidebar: React.FC<TemplateSidebarProps> = ({
  activeTab,
  onTabChange,
  borderWidth,
  onBorderWidthChange,
  borderColor,
  onBorderColorChange,
  hasShadow,
  onHasShadowToggle,
  previewBg,
  onPreviewBgChange,
  onSelectTemplate,
  onAddText,
  onAddShape,
  onAddClipart,
  onUploadImageFile,
  isProcessingUpload,
  stickerPack,
  activePackIndex,
  onSelectPackIndex,
  onAddPackItem,
  isCollapsed,
  onCloseMobile,
}) => {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<StickerCategory | 'all'>('all');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Filter templates
  const filteredTemplates = STICKER_TEMPLATES.filter((tmpl) => {
    const matchesCat = selectedCategory === 'all' || tmpl.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      tmpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filter clipart
  const filteredClipart = CLIPART_ELEMENTS.filter((item) => {
    return searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const categories: Array<{ id: StickerCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'funny', label: 'Funny / Meme' },
    { id: 'aesthetic', label: 'Aesthetic' },
    { id: 'whatsapp', label: 'WhatsApp 512px' },
    { id: 'logo', label: 'Brand & Logo' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'quotes', label: 'Quotes' },
    { id: 'urdu', label: 'Urdu نستعلیق' },
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUploadImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadImageFile(e.target.files[0]);
    }
  };

  return (
    <aside 
      aria-label="Editor Sidebar" 
      className={`bg-white border-r border-neutral-200 flex flex-col shrink-0 z-30 transition-all duration-200 ${
        isCollapsed ? 'hidden md:flex md:w-16' : 'w-full sm:w-80 md:w-84'
      }`}
    >
      {/* Mobile Drawer Header with Close Button */}
      {onCloseMobile && (
        <div className="flex md:hidden items-center justify-between p-3 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span className="font-extrabold text-xs text-neutral-900 capitalize">
              {activeTab === 'border' ? 'Die-Cut Border' : activeTab} Tools
            </span>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-200 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            title="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Tab Icons Strip */}
      <div className="grid grid-cols-6 border-b border-neutral-200 p-1 bg-neutral-50 text-neutral-600 shrink-0">
        <button
          onClick={() => onTabChange('border')}
          className={`p-2 rounded-xl flex flex-col items-center gap-1 text-[10px] font-bold transition-all min-h-[44px] justify-center ${
            activeTab === 'border' ? 'bg-white text-rose-600 shadow-2xs' : 'hover:bg-neutral-100'
          }`}
          title="Die-Cut Border"
        >
          <Scissors className="w-4 h-4" />
          <span className="hidden sm:inline">Die-Cut</span>
        </button>

        <button
          onClick={() => onTabChange('templates')}
          className={`p-2 rounded-xl flex flex-col items-center gap-1 text-[10px] font-bold transition-all min-h-[44px] justify-center ${
            activeTab === 'templates' ? 'bg-white text-rose-600 shadow-2xs' : 'hover:bg-neutral-100'
          }`}
          title="Templates"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">Templates</span>
        </button>

        <button
          onClick={() => onTabChange('text')}
          className={`p-2 rounded-xl flex flex-col items-center gap-1 text-[10px] font-bold transition-all min-h-[44px] justify-center ${
            activeTab === 'text' ? 'bg-white text-rose-600 shadow-2xs' : 'hover:bg-neutral-100'
          }`}
          title="Text"
        >
          <Type className="w-4 h-4" />
          <span className="hidden sm:inline">Text</span>
        </button>

        <button
          onClick={() => onTabChange('uploads')}
          className={`p-2 rounded-xl flex flex-col items-center gap-1 text-[10px] font-bold transition-all min-h-[44px] justify-center ${
            activeTab === 'uploads' ? 'bg-white text-rose-600 shadow-2xs' : 'hover:bg-neutral-100'
          }`}
          title="Uploads & Cutout"
        >
          <ImageIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Upload</span>
        </button>

        <button
          onClick={() => onTabChange('elements')}
          className={`p-2 rounded-xl flex flex-col items-center gap-1 text-[10px] font-bold transition-all min-h-[44px] justify-center ${
            activeTab === 'elements' ? 'bg-white text-rose-600 shadow-2xs' : 'hover:bg-neutral-100'
          }`}
          title="Clipart & Shapes"
        >
          <Shapes className="w-4 h-4" />
          <span className="hidden sm:inline">Clipart</span>
        </button>

        <button
          onClick={() => onTabChange('pack')}
          className={`p-2 rounded-xl flex flex-col items-center gap-1 text-[10px] font-bold transition-all min-h-[44px] justify-center ${
            activeTab === 'pack' ? 'bg-white text-rose-600 shadow-2xs' : 'hover:bg-neutral-100'
          }`}
          title="Sticker Pack Mode"
        >
          <Package className="w-4 h-4" />
          <span className="hidden sm:inline">Pack</span>
        </button>
      </div>

      {/* Main Drawer Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 1. DIE-CUT BORDER TAB */}
        {activeTab === 'border' && (
          <div className="space-y-5">
            <div>
              <h3 className="font-extrabold text-sm text-neutral-900 flex items-center gap-1.5">
                <Scissors className="w-4 h-4 text-rose-500" />
                <span>Signature Die-Cut Border</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Real-time vinyl contour outline wrapped around all active artwork elements.
              </p>
            </div>

            {/* Thickness Slider (0 - 24px) */}
            <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-neutral-700">Border Thickness</span>
                <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                  {borderWidth}px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                step="1"
                value={borderWidth}
                onChange={(e) => onBorderWidthChange(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-1.5 bg-neutral-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-medium">
                <span>0px (None)</span>
                <span>8px (Classic)</span>
                <span>24px (Bold)</span>
              </div>
            </div>

            {/* Border Outline Color */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-700">Border Outline Color</span>
              <div className="flex items-center gap-2">
                {['#FFFFFF', '#000000', '#FDE047', '#F43F5E', '#10B981', '#38BDF8', '#8B5CF6'].map((c) => (
                  <button
                    key={c}
                    onClick={() => onBorderColorChange(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      borderColor === c ? 'scale-110 ring-2 ring-rose-500' : 'border-neutral-200'
                    }`}
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
                <input
                  type="color"
                  value={borderColor}
                  onChange={(e) => onBorderColorChange(e.target.value)}
                  className="w-7 h-7 rounded-full cursor-pointer bg-transparent border-0"
                  title="Custom Color"
                />
              </div>
            </div>

            {/* Vinyl 3D Shadow Toggle */}
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <div>
                <p className="text-xs font-bold text-neutral-800">Realistic Vinyl Shadow</p>
                <p className="text-[11px] text-neutral-400">Adds peelable 3D depth</p>
              </div>
              <button
                onClick={onHasShadowToggle}
                className={`w-10 h-6 rounded-full transition-colors p-0.5 ${
                  hasShadow ? 'bg-rose-500' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    hasShadow ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Canvas Backdrop Grid */}
            <div className="space-y-2 pt-2 border-t border-neutral-200">
              <span className="text-xs font-bold text-neutral-700">Canvas Preview Backdrop</span>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => onPreviewBgChange('checkerboard')}
                  className={`h-10 rounded-lg border flex items-center justify-center text-[10px] font-bold ${
                    previewBg === 'checkerboard' ? 'ring-2 ring-rose-500 font-extrabold' : ''
                  } checkerboard-bg`}
                >
                  Transparent
                </button>
                <button
                  onClick={() => onPreviewBgChange('dark')}
                  className={`h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold ${
                    previewBg === 'dark' ? 'ring-2 ring-rose-500' : ''
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => onPreviewBgChange('mint')}
                  className={`h-10 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center text-[10px] font-bold ${
                    previewBg === 'mint' ? 'ring-2 ring-rose-500' : ''
                  }`}
                >
                  Mint
                </button>
                <button
                  onClick={() => onPreviewBgChange('peach')}
                  className={`h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-[10px] font-bold ${
                    previewBg === 'peach' ? 'ring-2 ring-rose-500' : ''
                  }`}
                >
                  Peach
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. TEMPLATES TAB */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-sm text-neutral-900">Preset Templates</h3>
              <p className="text-xs text-neutral-500">Pick any design to customize instantly</p>
            </div>

            {/* Search input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search templates (e.g. funny, coffee, urdu)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg shrink-0 font-semibold transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-rose-500 text-white shadow-2xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Template Cards Grid with "Use this template" hover */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {filteredTemplates.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="group relative bg-neutral-50 rounded-xl border border-neutral-200 hover:border-rose-300 hover:shadow-md transition-all overflow-hidden cursor-pointer"
                  onClick={() => onSelectTemplate(tmpl)}
                >
                  <div className="aspect-square checkerboard-bg p-2 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={tmpl.thumbnail}
                      alt={tmpl.title}
                      className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-rose-600/80 backdrop-blur-2xs opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-2 text-white transition-opacity">
                      <Sparkles className="w-5 h-5 mb-1" />
                      <span className="text-[11px] font-bold text-center">Use Template</span>
                    </div>
                  </div>

                  <div className="p-2 space-y-0.5">
                    <p className="font-bold text-[11px] text-neutral-800 line-clamp-1 group-hover:text-rose-600">
                      {tmpl.title}
                    </p>
                    <span className="text-[10px] text-neutral-400 capitalize">{tmpl.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. TEXT TAB */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-sm text-neutral-900">Add Sticker Text</h3>
              <p className="text-xs text-neutral-500">Pick a style to add to your canvas</p>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => onAddText('bubble')}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-400 text-white font-bangers text-xl tracking-wider text-left shadow-xs hover:opacity-95 transition-opacity"
              >
                ★ Bubble Comic Pop
              </button>

              <button
                onClick={() => onAddText('title')}
                className="w-full p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-fredoka font-bold text-base text-left transition-colors"
              >
                + Playful Sticker Heading
              </button>

              <button
                onClick={() => onAddText('urdu')}
                className="w-full p-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-urdu font-bold text-lg text-right transition-colors"
              >
                اردو نستعلیق خطاطی شامل کریں +
              </button>

              <button
                onClick={() => onAddText('minimal')}
                className="w-full p-3 rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 font-sans font-medium text-xs text-left transition-colors"
              >
                + Clean Minimalist Subtitle
              </button>
            </div>
          </div>
        )}

        {/* 4. UPLOADS & AI BG REMOVER TAB */}
        {activeTab === 'uploads' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-sm text-neutral-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>Upload & Auto Cutout</span>
              </h3>
              <p className="text-xs text-neutral-500">
                Upload photos, graphics, or selfies. Instant background removal with preview.
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Prominent Drag & Drop Upload Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all space-y-2.5 ${
                isDragOver
                  ? 'border-rose-500 bg-rose-50/70 scale-102'
                  : 'border-neutral-300 hover:border-rose-400 hover:bg-rose-50/40 bg-neutral-50/50'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-2xs">
                {isProcessingUpload ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Upload className="w-6 h-6" />
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-800">
                  {isProcessingUpload ? 'Analyzing image...' : 'Drag & drop image here, or browse'}
                </p>
                <p className="text-[10px] text-neutral-400 mt-0.5">JPG, PNG, WebP up to 15MB</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Smart edge detection automatically removes the background and wraps it with a die-cut vinyl stroke.</span>
            </div>
          </div>
        )}

        {/* 5. ELEMENTS & CLIPART TAB */}
        {activeTab === 'elements' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-sm text-neutral-900">Sticker Clipart & Badges</h3>
              <p className="text-xs text-neutral-500">Add shapes, emoji stamps, and badges</p>
            </div>

            {/* Shape Badges */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-700">Badge Backings</span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => onAddShape('circle', '#FEF08A')}
                  className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg font-bold text-yellow-900 border border-yellow-300 text-center"
                >
                  Circle
                </button>
                <button
                  onClick={() => onAddShape('pill', '#FCE7F3')}
                  className="p-2 bg-pink-100 hover:bg-pink-200 rounded-lg font-bold text-pink-900 border border-pink-300 text-center"
                >
                  Pill Badge
                </button>
                <button
                  onClick={() => onAddShape('star', '#FED7AA')}
                  className="p-2 bg-orange-100 hover:bg-orange-200 rounded-lg font-bold text-orange-900 border border-orange-300 text-center"
                >
                  Star
                </button>
              </div>
            </div>

            {/* Clipart Elements Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-700">Popular Clipart & Seals</span>
              <div className="grid grid-cols-2 gap-2">
                {filteredClipart.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onAddClipart(item)}
                    className="p-2.5 bg-neutral-50 hover:bg-rose-50 border border-neutral-200 hover:border-rose-300 rounded-xl text-left text-xs font-semibold text-neutral-800 transition-colors flex items-center gap-2"
                  >
                    <Smile className="w-3.5 h-3.5 text-rose-500" />
                    <span className="truncate">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. STICKER PACK MODE */}
        {activeTab === 'pack' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-sm text-neutral-900 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-rose-500" />
                <span>Multi-Sticker Pack</span>
              </h3>
              <p className="text-xs text-neutral-500">
                Design cohesive WhatsApp and Telegram packs in a single session.
              </p>
            </div>

            <div className="space-y-2">
              {stickerPack.map((stk, idx) => (
                <div
                  key={stk.id}
                  onClick={() => onSelectPackIndex(idx)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    activePackIndex === idx
                      ? 'bg-rose-50 border-rose-300 text-rose-900'
                      : 'bg-neutral-50 border-neutral-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg checkerboard-bg flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </div>
                    <span className="font-bold text-xs">{stk.name}</span>
                  </div>
                  {activePackIndex === idx && (
                    <span className="text-[10px] font-bold text-rose-600 bg-white px-2 py-0.5 rounded shadow-2xs">
                      Active
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={onAddPackItem}
              className="w-full py-2.5 rounded-xl border-2 border-dashed border-neutral-300 hover:border-rose-400 hover:bg-rose-50 text-xs font-bold text-neutral-600 hover:text-rose-600 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Sticker to Pack</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
