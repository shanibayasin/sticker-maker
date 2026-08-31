export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const text = `User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://stickermaker.app/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send(text);
}
