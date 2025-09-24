// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://poplotus.in/</loc>
      <lastmod>2024-12-19</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://poplotus.in/products</loc>
      <lastmod>2024-12-19</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://poplotus.in/about</loc>
      <lastmod>2024-12-19</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://poplotus.in/blogs</loc>
      <lastmod>2024-12-19</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
    <url>
      <loc>https://poplotus.in/sustainability</loc>
      <lastmod>2024-12-19</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>
    <url>
      <loc>https://poplotus.in/contact</loc>
      <lastmod>2024-12-19</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>
  </urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",  // ✅ must be XML
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300", // ✅ helps on Vercel
    },
  });
}
