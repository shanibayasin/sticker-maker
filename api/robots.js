export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const text = `User-agent: *
Allow: /
Allow: /google6fb636039de5c2e2.html
Disallow: /api/
Sitemap: https://sticker-maker-online.vercel.app/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send(text);
}
