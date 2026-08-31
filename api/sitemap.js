export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const baseUrl = 'https://sticker-maker-online.vercel.app';
  const categories = ['funny', 'aesthetic', 'logo', 'whatsapp', 'instagram', 'quotes', 'urdu'];
  const blogPosts = ['how-to-make-whatsapp-stickers', 'best-sticker-size-for-printing', 'how-to-create-die-cut-white-borders'];

  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/sticker-maker', priority: '0.9', changefreq: 'weekly' },
    { loc: '/free-sticker-maker', priority: '0.9', changefreq: 'weekly' },
    { loc: '/whatsapp-sticker-maker', priority: '0.9', changefreq: 'weekly' },
    { loc: '/photo-to-sticker', priority: '0.9', changefreq: 'weekly' },
    { loc: '/custom-sticker-maker', priority: '0.9', changefreq: 'weekly' },
    { loc: '/create/stickers', priority: '0.9', changefreq: 'weekly' },
    { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
    { loc: '/pricing', priority: '0.7', changefreq: 'monthly' },
    { loc: '/about', priority: '0.6', changefreq: 'monthly' },
    { loc: '/privacy-policy', priority: '0.5', changefreq: 'monthly' },
    { loc: '/terms', priority: '0.5', changefreq: 'monthly' },
  ];

  const categoryPages = categories.map((cat) => ({
    loc: `/sticker-maker/${cat}`,
    priority: '0.9',
    changefreq: 'weekly',
  }));

  const blogPages = blogPosts.map((slug) => ({
    loc: `/blog/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  }));

  const allPages = [...staticPages, ...categoryPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  return res.status(200).send(xml);
}
