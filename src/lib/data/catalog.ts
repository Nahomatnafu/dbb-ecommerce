// src/lib/data/catalog.ts
// Static mock catalog used while the Supabase backend is not connected.
// Swap these reads for live queries later — shapes match src/types.

import type { Product, CommunityPost, Category } from '@/types'

// Inline SVG fallback — used only if no real image is assigned.
export const placeholderImage = (text: string, w = 800, h = 1000) => {
  const fontSize = Math.round(Math.min(w, h) / 8)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="#111111"/><text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" letter-spacing="2" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// Unsplash image helper — confirmed free-to-use stock photos.
const unsplash = (id: string, w = 800, h = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

// Per-product image map (Unsplash photo IDs, all free to use under Unsplash License).
const PRODUCT_IMAGES: Record<string, string> = {
  'mindset-hoodie':       unsplash('1499972777470-6a932ea55420'),   // black hoodie flat lay
  'no-excuses-hoodie':    unsplash('1612978322313-be209301e185'),   // black hoodie on rack
  'built-different-tee':  unsplash('1564382225035-dbdf309682a6'),   // men's white tee
  'the-movement-tee':     unsplash('1722310752951-4d459d28c678'),   // white tee on wall
  'dbb-tee':              unsplash('1494578924983-b472e391e1fa'),   // person in black pullover
  'dbb-cap':              unsplash('1678951671924-bd2c022382b0'),   // black beanie/cap product
  'mindset-beanie':       unsplash('1606748294390-f6449e6c61ef'),   // black & white knit cap
  'movement-tote':        unsplash('1583911201080-eb7064a15428'),   // black & white tote bag
}

// Lifestyle shots for categories and community grid.
const LIFESTYLE = [
  unsplash('1546863929-b9c543a2aec7', 600, 800),  // woman in black hoodie
  unsplash('1719620293684-24c428bce8fb', 600, 800), // person black hoodie graphic
  unsplash('1612978322313-be209301e185', 600, 800), // hoodie on rack
  unsplash('1499972777470-6a932ea55420', 600, 800), // hoodie flat
]

const img = placeholderImage

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

function makeVariants(slug: string): Product['variants'] {
  return sizes.map((size, i) => ({
    id: `${slug}-${size.toLowerCase()}`,
    size,
    color: 'Black',
    stock_qty: i === 0 ? 0 : 12 - i,
    sku: `${slug.toUpperCase()}-${size}`,
  }))
}

const base: Array<Omit<Product, 'variants' | 'image_url'>> = [
  { id: '1', name: 'Mindset Heavyweight Hoodie', slug: 'mindset-hoodie', description: 'A 450gsm heavyweight hoodie built to last. Boxy fit, dropped shoulders, embroidered DBB mark.', price: 120, category: 'hoodies', featured: true, active: true },
  { id: '2', name: 'No Excuses Hoodie', slug: 'no-excuses-hoodie', description: 'Premium fleece-lined hoodie with a bold back print. Your daily reminder.', price: 110, category: 'hoodies', featured: true, active: true },
  { id: '3', name: 'Built Different Tee', slug: 'built-different-tee', description: 'Heavyweight cotton tee with a relaxed drape. Screen-printed graphic.', price: 48, category: 'tees', featured: true, active: true },
  { id: '4', name: 'The Movement Tee', slug: 'the-movement-tee', description: 'Garment-dyed essential tee. Soft hand-feel, structured collar.', price: 45, category: 'tees', featured: true, active: true },
  { id: '5', name: 'Done Being Broke Tee', slug: 'dbb-tee', description: 'The statement piece. Oversized fit with chest and sleeve hits.', price: 50, category: 'tees', featured: false, active: true },
  { id: '6', name: 'DBB Structured Cap', slug: 'dbb-cap', description: '6-panel structured cap with raised embroidery and adjustable strap.', price: 38, category: 'headwear', featured: true, active: true },
  { id: '7', name: 'Mindset Beanie', slug: 'mindset-beanie', description: 'Ribbed cuffed beanie in heavyweight knit. One size.', price: 32, category: 'headwear', featured: false, active: true },
  { id: '8', name: 'Movement Tote', slug: 'movement-tote', description: 'Heavy canvas tote with reinforced straps. Carry the mindset.', price: 28, category: 'accessories', featured: false, active: true },
]

export const PRODUCTS: Product[] = base.map((p) => ({
  ...p,
  image_url: PRODUCT_IMAGES[p.slug] ?? img(p.name.split(' ')[0]),
  variants: makeVariants(p.slug),
}))

export function getAllProducts(): Product[] {
  return PRODUCTS.filter((p) => p.active)
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.active && p.featured).slice(0, 4)
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getRelatedProducts(slug: string, category: Category): Product[] {
  return PRODUCTS.filter((p) => p.active && p.slug !== slug && p.category === category).slice(0, 4)
}

export const CATEGORIES: Array<{ key: Category; label: string; image: string }> = [
  { key: 'hoodies',     label: 'Hoodies',     image: unsplash('1499972777470-6a932ea55420', 600, 800) },
  { key: 'tees',        label: 'Tees',        image: unsplash('1564382225035-dbdf309682a6', 600, 800) },
  { key: 'headwear',    label: 'Headwear',    image: unsplash('1678951671924-bd2c022382b0', 600, 800) },
  { key: 'accessories', label: 'Accessories', image: unsplash('1583911201080-eb7064a15428', 600, 800) },
]

export const COMMUNITY_POSTS: CommunityPost[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `post-${i + 1}`,
  media_url: LIFESTYLE[i % LIFESTYLE.length].replace('600&h=800', '600&h=600'),
  media_type: 'image',
  caption: ['Built different.', 'No days off.', 'The mindset is the movement.', 'Stay dangerous.'][i % 4],
  user_name: ['@marcus', '@jdot', '@simone', '@theo'][i % 4],
  approved: true,
}))
