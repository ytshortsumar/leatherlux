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
- **Featured Products** — reusable ProductCard component, data loaded from Firestore
- **Shop page** — responsive product grid with combined category and price-range filtering, Rs price-range presets, URL-driven category deep-links (`/shop?category=...`), live product count, reset, and empty state
- **Product Detail page** — dynamic routing (`/product/:id`), reusable image gallery component, full description, price, and details, with loading and "Product not found" states
- **Cart** — global cart state via React Context, "Add to Cart" from the product cards and Product Detail page, a full Cart page (update quantity, remove item, clear cart, dynamic order summary), an empty-cart state, and persistence across navigation and refresh via `localStorage`
- **Checkout page** — two-column layout with a validated customer details form (name, email, phone, address, city, postal code, optional notes) and a live order summary, inline field errors on blur and submit, focus-to-first-error, and a success confirmation that clears the cart
- **Cart UX** — always-visible navbar cart icon with a live item-count badge, and an "Added to cart" success toast
- **PKR pricing** — prices shown in Pakistani Rupees (Rs) site-wide through a single shared `formatPrice` helper
- **Firebase Firestore** — product data stored in Firestore and fetched dynamically on the Shop, Product Detail, and Featured Products sections (replacing mock data)
- **About & Contact pages** — full content, store details, and a working contact form UI
- **Footer** — brand info, quick links, customer service links, newsletter form, and social icons
- Fully responsive across mobile, tablet, and desktop

## Tech Stack

- **React** (Vite)
- **React Router** — client-side routing
- **Firebase Firestore** — cloud product data
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

### Firebase setup

Product data is served from Firebase Firestore. To run the app with your own
Firebase project:

1. Create a Firebase project and enable **Cloud Firestore**.
2. Register a **Web app** and copy its config values.
3. Create a `.env` file in the project root (see `.env.example` for the keys):

   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

4. Seed the Firestore `products` collection with the sample data:

   ```bash
   npm run seed
   ```

The `.env` file is git-ignored so credentials stay out of the repository.

## Project Structure

```
src/
├── assets/        # Images (hero carousel)
├── components/    # Navbar, Footer, Hero, Features, ProductCard, FeaturedProducts, ImageGallery
├── context/       # CartContext, CartProvider, cart Toast
├── hooks/         # useCart — read the cart from any component
├── data/          # Product seed data (source for the Firestore seed script)
├── pages/         # Home, Shop, ProductDetail, Cart, Checkout, About, Contact
├── services/      # productService — Firestore data access
├── utils/         # formatPrice — shared Rs currency formatting
├── firebase.js    # Firebase app + Firestore init
├── App.jsx        # Routes
└── main.jsx       # Entry point
scripts/
└── seedFirestore.js  # Migrates product data into Firestore
public/
└── products/      # Product images
```

## Roadmap

- **Module 1** — Project foundation, homepage, deployment ✅
- **Module 2** — Shop page, filtering, product detail pages, Firebase Firestore ✅
- **Module 3** — Cart & checkout ✅
- **Module 4** — Admin panel, final polish & deployment
