# 🧳 LeatherLux

**Premium leather goods e-commerce storefront** — handcrafted full-grain leather wallets, bags, jackets, and belts.

Built with **React 19**, **Vite 8**, and **Firebase Firestore**. Deployed on **Vercel**.

🔗 **Live Demo:** [leatherlux.vercel.app](https://leatherlux.vercel.app)

> **Frontend Web Development Internship** — Zynnex Solutions  
> Umar Farooq · ZYNVEX-CERT-0933

---

## ✨ Features

### Storefront

| Area | What it does |
|------|-------------|
| **Hero Carousel** | Auto-rotating 3-image WebP carousel with overlay, heading, and "Shop Now" CTA; clickable dot navigation |
| **Features Strip** | Premium Quality · Handcrafted · Fast & Reliable · Easy Returns |
| **Featured Products** | Highlighted products fetched from Firestore and displayed in a responsive card grid |
| **Shop Page** | Full product grid with combined **category + price-range** filtering, URL-driven category deep-links (`/shop?category=...`), live product count, reset button, and empty-state message |
| **Product Detail** | Dynamic route (`/product/:id`), reusable image gallery, full description and details list, loading and "Product not found" states |
| **About & Contact** | Brand story, materials & process breakdown, mission statement, store address, and a working contact form UI |
| **Footer** | Brand info, Quick Links, Customer Service links, newsletter subscription form, and social icons (Instagram, Facebook, Email) |

### Cart & Checkout

| Area | What it does |
|------|-------------|
| **Global Cart State** | React Context + `localStorage` persistence — cart survives navigation and page refresh |
| **Cart Page** | Product thumbnails, quantity controls (increment / decrement / remove), Clear Cart, and a live Order Summary sidebar |
| **Checkout Page** | Two-column layout: validated customer details form (name, email, phone, address, city, postal code, optional notes) + live order summary; inline field errors on blur and submit; focus-to-first-error; success confirmation that clears the cart |
| **Cart Badge** | Always-visible navbar cart icon with live item-count badge |
| **Toast Notifications** | "Added to cart" success toast on every add action |
| **PKR Pricing** | Prices shown in Pakistani Rupees (Rs) site-wide via a shared `formatPrice` utility |

### Admin Panel

| Area | What it does |
|------|-------------|
| **Passcode Gate** | Client-side passcode lock (env-configurable) to keep `/admin` out of casual reach |
| **Product Table** | Sortable list of all products with thumbnail, name, category, price, and featured badge |
| **CRUD Operations** | Add, edit, and delete products directly in Firestore via a modal form; changes appear on the live store instantly |

### UX & Accessibility

- Fully **responsive** across mobile, tablet, and desktop
- Smooth **micro-animations** and hover transitions on buttons, cards, and modals
- **`prefers-reduced-motion`** media query disables all animations for users who prefer it
- Brand-gold **`:focus-visible`** outlines for keyboard navigation
- Semantic HTML and proper ARIA labels throughout
- Lazy-loaded images with eager loading and `fetchPriority="high"` for above-the-fold hero images
- Graceful **image fallback** UI when a product image fails to load

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **UI Framework** | [React 19](https://react.dev) |
| **Build Tool** | [Vite 8](https://vite.dev) |
| **Routing** | [React Router 7](https://reactrouter.com) |
| **Database** | [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore) |
| **CSS Framework** | [Bootstrap 5](https://getbootstrap.com) (grid & responsive utilities) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Styling** | Vanilla CSS — scoped per component, no preprocessors |
| **Linting** | [ESLint 10](https://eslint.org) + React Hooks & React Refresh plugins |
| **Image Optimisation** | [Sharp](https://sharp.pixelplumbing.com) (build-time WebP compression scripts) |
| **Hosting** | [Vercel](https://vercel.com) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **Firebase** project with Cloud Firestore enabled

### 1. Clone the repository

```bash
git clone https://github.com/ytshortsumar/leatherlux.git
cd leatherlux
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a `.env` file in the project root (see [`.env.example`](.env.example) for the full list):

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# Passcode for the /admin product-management page (client-side gate only).
VITE_ADMIN_PASSCODE=your-admin-passcode
```

> The `.env` file is git-ignored so credentials stay out of the repository.

### 4. Seed Firestore with sample products

```bash
npm run seed
```

This runs `scripts/seedFirestore.js`, which writes the sample product catalogue into your Firestore `products` collection.

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Dev server** | `npm run dev` | Start Vite dev server with HMR |
| **Production build** | `npm run build` | Build optimised bundle to `dist/` |
| **Preview build** | `npm run preview` | Preview the production build locally |
| **Lint** | `npm run lint` | Run ESLint across the project |
| **Seed data** | `npm run seed` | Populate Firestore with sample products |

---

## 📁 Project Structure

```
leatherlux/
├── public/
│   ├── favicon.svg            # SVG favicon
│   ├── icons.svg              # Sprite sheet
│   └── products/              # Optimised product images (WebP)
├── scripts/
│   ├── seedFirestore.js       # Populates Firestore with product data
│   ├── optimize-images.mjs    # Sharp script — compress product images
│   └── optimize-hero.mjs      # Sharp script — compress hero images
├── src/
│   ├── assets/
│   │   └── hero/              # Hero carousel images (WebP)
│   ├── components/
│   │   ├── Navbar.jsx         # Sticky navbar with logo, Shop dropdown, cart icon
│   │   ├── Hero.jsx           # Auto-rotating image carousel with dots
│   │   ├── Features.jsx       # Value-proposition strip
│   │   ├── FeaturedProducts.jsx  # Featured product grid (Firestore)
│   │   ├── ProductCard.jsx    # Reusable product card with Add to Cart
│   │   ├── ImageGallery.jsx   # Product image gallery with thumbnails
│   │   └── Footer.jsx         # Site-wide footer
│   ├── context/
│   │   ├── CartContext.js     # React Context definition
│   │   ├── CartProvider.jsx   # Cart state, localStorage persistence, toast
│   │   └── Toast.css          # Toast notification styles
│   ├── data/
│   │   └── products.js        # Seed data source for Firestore
│   ├── hooks/
│   │   └── useCart.js         # Custom hook to consume CartContext
│   ├── pages/
│   │   ├── Home.jsx           # Homepage (Hero + Features + Featured Products)
│   │   ├── Shop.jsx           # Shop page with category & price filters
│   │   ├── ProductDetail.jsx  # Single product view (dynamic route)
│   │   ├── Cart.jsx           # Shopping cart with quantity controls
│   │   ├── Checkout.jsx       # Checkout form with validation
│   │   ├── About.jsx          # About page — materials, mission, store info
│   │   ├── Contact.jsx        # Contact form
│   │   └── Admin.jsx          # Admin panel — CRUD for products
│   ├── services/
│   │   └── productService.js  # Firestore CRUD (get, create, update, delete)
│   ├── utils/
│   │   └── formatPrice.js     # PKR currency formatter (Rs X,XXX)
│   ├── firebase.js            # Firebase app + Firestore initialisation
│   ├── App.jsx                # Route definitions
│   ├── main.jsx               # React DOM entry point
│   └── index.css              # Global styles, focus rings, reduced-motion
├── .env.example               # Environment variable template
├── .gitignore
├── eslint.config.js           # ESLint flat config
├── index.html                 # HTML shell
├── package.json
├── vercel.json                # SPA rewrite for Vercel deployment
└── vite.config.js             # Vite configuration
```

---

## 🌐 Deployment

The project is deployed on **Vercel** and auto-deploys from the `main` branch.

### Vercel configuration

A `vercel.json` file is included with a catch-all SPA rewrite so that React Router handles all client-side routes:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Manual deployment

```bash
npm run build          # generates dist/
npx vercel --prod      # deploy to Vercel (or use the Vercel dashboard)
```

---

## 🧪 Browser & Device Compatibility

Tested and verified across:

| Browser | Desktop | Mobile |
|---------|---------|--------|
| **Google Chrome** | ✅ | ✅ |
| **Mozilla Firefox** | ✅ | ✅ |
| **Microsoft Edge** | ✅ | ✅ |
| **Safari** | ✅ | ✅ (iOS) |

**Responsive breakpoints** (Bootstrap grid):
- **Mobile**: < 576px
- **Tablet**: 576px – 991px
- **Desktop**: ≥ 992px

---

## 📋 Development Roadmap

| Module | Focus | Status |
|--------|-------|--------|
| **Module 1** | Project foundation, homepage, Vercel deployment | ✅ Complete |
| **Module 2** | Shop page, filtering, product detail, Firebase Firestore | ✅ Complete |
| **Module 3** | Cart & checkout (Context, localStorage, validation, PKR pricing) | ✅ Complete |
| **Module 4** | Admin panel, UI polish, animations, documentation & testing | ✅ Complete |

---

## 📄 License

This project was built as part of a frontend web development internship. All rights reserved.

---

<p align="center">
  <strong>Leather<span>Lux</span></strong> — Premium leather, crafted to last.
</p>
