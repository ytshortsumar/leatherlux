# LeatherLux

A premium leather goods e-commerce storefront built with React and Vite.
Handcrafted full-grain leather wallets, bags, jackets, and belts.

**Live Demo:** https://leatherlux.vercel.app

> Frontend Web Development Internship — Zynnex Solutions
> Umar Farooq · ZYNVEX-CERT-0933

## Features

- **Responsive Navbar** with logo, mobile menu, and a Shop dropdown (Wallets, Jackets, Bags, Belts)
- **Hero section** — rotating 3-image carousel with overlay, heading, and "Shop Now" CTA
- **Features strip** — Premium Quality, Handcrafted, Fast & Reliable, Easy Returns
- **Featured Products** — reusable ProductCard component driven by mock product data
- **About & Contact pages** — full content, store details, and a working contact form UI
- **Footer** — brand info, quick links, customer service links, newsletter form, and social icons
- Fully responsive across mobile, tablet, and desktop

## Tech Stack

- **React** (Vite)
- **React Router** — client-side routing
- **Bootstrap 5** — layout and grid
- **lucide-react** — icons
- Plain CSS (scoped per component)

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── assets/        # Images (hero carousel)
├── components/    # Navbar, Footer, Hero, Features, ProductCard, FeaturedProducts
├── data/          # Mock product data
├── pages/         # Home, Shop, Cart, About, Contact
├── App.jsx        # Routes
└── main.jsx       # Entry point
public/
└── products/      # Product images
```

## Roadmap

- **Module 1** — Project foundation, homepage, deployment ✅
- **Module 2** — Shop page, filtering, product detail pages, Firebase Firestore
- **Module 3** — Cart & checkout
- **Module 4** — Admin panel, final polish & deployment
