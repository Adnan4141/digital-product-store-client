# Digital Product Store - Client (Frontend)

A modern, responsive frontend application for the Digital Product E-Store built with Next.js 15, React, and TypeScript. This client application provides a seamless shopping experience for customers and a powerful admin panel for store management.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Core Features](#-core-features)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Project Structure](#-project-structure)
- [Stripe Integration](#-stripe-integration)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)

## 🎯 Project Overview

The Digital Product Store frontend is a full-featured e-commerce client application that enables users to:

- **Browse Products**: View a catalog of digital products with category filtering and search functionality
- **Shopping Cart**: Add items to cart, update quantities, and remove items
- **Checkout Process**: Complete checkout with email collection and order summary
- **Stripe Payment**: Secure payment processing using Stripe Payment Intents (test mode)
- **Order History**: View past orders by email address
- **Admin Panel**: Manage products, categories, and orders (admin access required)

## 🛠️ Tech Stack

### Core Technologies

- **Next.js 15** - React framework with App Router
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes for backend proxy
  - Built-in optimization

- **React 18.3** - UI library
  - Hooks (useState, useEffect, useContext)
  - Context API for state management
  - Component-based architecture

- **TypeScript 5** - Type-safe development
  - Full type coverage
  - Interface definitions for all data models
  - Type-safe API calls

### Styling & UI

- **Tailwind CSS 3.4** - Utility-first CSS framework
  - Custom button classes with `@apply` directives
  - Responsive design utilities
  - Custom color schemes and gradients
  - Modern, beautiful UI components

### Payment Processing

- **Stripe.js** - Payment processing SDK
  - `@stripe/stripe-js` - Stripe JavaScript SDK
  - `@stripe/react-stripe-js` - React components for Stripe
  - Payment Intents API integration

### Additional Libraries

- **React Hot Toast 2.6** - Toast notifications
  - Success, error, and info notifications
  - Customizable appearance

## ✨ Core Features

### 3.1 Product Catalog

- **Browse Products**: Display all available digital products
- **Category Filter**: Filter products by category
- **Search Functionality**: Search products by name (if implemented)
- **Product Cards**: Beautiful product cards with:
  - Product image
  - Product name and description
  - Price display
  - Category badge
  - Add to cart button

### 3.2 Shopping Cart

- **Add to Cart**: Add products to shopping cart with quantity selection
- **Cart Management**:
  - View all cart items
  - Update item quantities
  - Remove items from cart
  - Real-time total calculation
- **Persistent Cart**: Cart state persists using React Context API
- **Cart Page**: Dedicated cart page with full cart management

### 3.3 Checkout Process

- **Email Collection**: Collect customer email address
- **Order Summary**: Display complete order summary including:
  - List of items with quantities
  - Individual item prices
  - Total amount
- **Order Creation**: Create order via API before payment
- **Stripe Integration**: Secure payment form using Stripe Elements

### 3.4 Stripe Payment Integration (Test Mode)

- **Payment Intents**: Create payment intents via backend API
- **Stripe Elements**: Modern payment form with:
  - Card number input
  - Expiry date
  - CVC code
  - ZIP code (if required)
- **Payment Processing**: Handle payment confirmation
- **Success Page**: Redirect to success page after successful payment
- **Error Handling**: Display payment errors to users

### 3.5 Admin Panel

- **Authentication**: Simple email/password login
- **Product Management**:
  - Create new products
  - View all products
  - Update product stock
- **Category Management**:
  - Create categories
  - Update categories
  - View all categories
- **Order Management**:
  - View all orders
  - Filter orders by email and status
  - Update order status
  - View detailed order information
- **UI Features**:
  - Tab-based navigation
  - Loading states
  - Toast notifications
  - Responsive design

## 📦 Installation & Setup

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Backend server running (see server README)

### Step 1: Install Dependencies

```bash
cd client
npm install
```

This will install all required packages including:
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Stripe.js
- React Hot Toast

### Step 2: Environment Configuration

Create a `.env.local` file in the `client` directory:

```bash
cp env.example .env.local
```

Or create manually:

```bash
touch .env.local
```

### Step 3: Configure Environment Variables

Edit `.env.local` with your configuration:

```env
# Stripe Publishable Key (from Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Backend API Endpoint
NEXT_PUBLIC_API_ENDPOINT=http://localhost:5000/api
```

**Important**: 
- All client-side environment variables must have the `NEXT_PUBLIC_` prefix
- These variables are exposed to the browser
- Never put sensitive keys (like secret keys) in client environment variables

### Step 4: Start Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

Open your browser and navigate to:
- **Customer Store**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (test or live) | `pk_test_51...` |
| `NEXT_PUBLIC_API_ENDPOINT` | Backend API base URL | `http://localhost:5000/api` |

### Environment Variable Details

#### NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

- **Purpose**: Stripe publishable key for payment processing
- **Source**: Stripe Dashboard → Developers → API keys
- **Format**: Starts with `pk_test_` (test) or `pk_live_` (production)
- **Security**: Safe to expose in client code (by design)

#### NEXT_PUBLIC_API_ENDPOINT

- **Purpose**: Base URL for backend API calls
- **Format**: Full URL including protocol and `/api` path
- **Examples**:
  - Development: `http://localhost:5000/api`
  - Production: `https://api.yourdomain.com/api`

## 🚀 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Development Server

The development server runs on `http://localhost:3000` by default.

Features:
- Hot module replacement (HMR)
- Fast refresh
- Error overlay
- TypeScript type checking

### Code Structure

```
client/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin panel pages
│   ├── cart/               # Shopping cart page
│   ├── checkout/            # Checkout flow
│   ├── orders/             # Order history
│   └── page.tsx            # Homepage (product catalog)
├── components/             # React components
├── contexts/               # React contexts
├── lib/                    # Utility functions
└── types/                  # TypeScript types
```

## 📁 Project Structure

```
client/
│
├── app/                          # Next.js App Router
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard with login
│   │
│   ├── api/                      # API Proxy Routes (optional)
│   │   ├── categories/
│   │   ├── products/
│   │   └── create-payment-intent/
│   │
│   ├── cart/
│   │   └── page.tsx              # Shopping cart page
│   │
│   ├── checkout/
│   │   ├── page.tsx              # Checkout page with Stripe
│   │   └── success/
│   │       └── page.tsx          # Order success page
│   │
│   ├── orders/
│   │   └── page.tsx              # Order history by email
│   │
│   ├── globals.css               # Global styles with Tailwind
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Homepage - Product catalog
│
├── components/                   # React Components
│   ├── shared/
│   │   ├── Footer.tsx           # Footer component
│   │   └── Navbar.tsx            # Navigation bar
│   └── StripeProvider.tsx        # Stripe context provider
│
├── contexts/                     # React Contexts
│   └── CartContext.tsx           # Shopping cart state management
│
├── lib/                          # Utility Libraries
│   ├── config.ts                 # Configuration constants (API_BASE_URL)
│   └── data.ts                   # Mock data (if any)
│
├── types/                        # TypeScript Type Definitions
│   └── index.ts                  # All type interfaces
│
├── .env.local                    # Environment variables (gitignored)
├── env.example                   # Environment variables example
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 💳 Stripe Integration

### Setup

1. **Get Stripe Publishable Key**:
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
   - Copy your **Publishable key** (starts with `pk_test_`)
   - Add to `.env.local` as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

2. **Stripe Provider**:
   - The app uses `StripeProvider` component to initialize Stripe
   - Located in `components/StripeProvider.tsx`
   - Wraps the application in `app/layout.tsx`

### Payment Flow

1. **Customer adds items to cart**
2. **Customer proceeds to checkout**
3. **Order is created** via `POST /api/orders`
4. **Payment intent is created** via `POST /api/orders/:id/payment`
5. **Stripe Payment Element** is rendered
6. **Customer enters card details**
7. **Payment is confirmed** using Stripe.js
8. **Success page** is displayed

### Test Cards

Use these test card numbers for testing:

| Card Number | Description |
|-------------|-------------|
| `4242 4242 4242 4242` | Visa - Success |
| `4000 0000 0000 0002` | Visa - Card declined |
| `4000 0025 0000 3155` | Visa - Requires authentication |

**Test Details**:
- **Expiry Date**: Any future date (e.g., `12/25`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP**: Any 5 digits (e.g., `12345`)

### Payment Flow Description

```
┌─────────────────┐
│  Shopping Cart  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Checkout Page │
│  - Email Input  │
│  - Order Summary│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Create Order    │
│ POST /api/orders│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Create Payment  │
│ Intent          │
│ POST /api/orders│
│ /:id/payment    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Stripe Elements │
│ - Card Input    │
│ - Payment Form  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Confirm Payment │
│ Stripe.js       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Success Page   │
│  Order Complete │
└─────────────────┘
```

## 🔌 API Integration

### API Base URL

Configured in `lib/config.ts`:

```typescript
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000/api';
```

### API Endpoints Used

#### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

#### Categories

- `GET /api/categories` - Get all categories

#### Orders

- `POST /api/orders` - Create new order
- `POST /api/orders/:id/payment` - Create payment intent
- `GET /api/orders/history?email=...` - Get order history
- `GET /api/orders/:id` - Get order by ID

#### Admin (Protected)

- `POST /api/products` - Create product
- `PUT /api/products/:id/stock` - Update stock
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `GET /api/orders` - Get all orders (with filters)
- `PUT /api/orders/:id/status` - Update order status

### API Call Examples

```typescript
// Fetch products
const response = await fetch(`${API_BASE_URL}/products`);
const products = await response.json();

// Create order
const orderResponse = await fetch(`${API_BASE_URL}/orders`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    items: [{ productId: 'uuid', quantity: 2 }],
    customerEmail: 'customer@example.com'
  })
});
```

## 🚢 Deployment

### Prerequisites

Before deploying, ensure you have:
- ✅ Backend server deployed and accessible
- ✅ Stripe account with publishable key
- ✅ Production API endpoint URL
- ✅ Git repository with your code

### Option A: Vercel (Recommended for Next.js)

Vercel is the recommended platform for Next.js applications, offering seamless deployment and optimization.

#### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub, GitLab, or Bitbucket

#### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your Git repository
3. Vercel will auto-detect Next.js

#### Step 3: Configure Project Settings
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `client` (if monorepo) or leave blank if client is root
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

#### Step 4: Set Environment Variables
In Project Settings → Environment Variables, add:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_API_ENDPOINT=https://your-server-domain.railway.app/api
```

**Important Notes**:
- All client-side variables must have `NEXT_PUBLIC_` prefix
- Variables are exposed to the browser (safe for publishable keys)
- Never add secret keys here

#### Step 5: Deploy
1. Click **"Deploy"**
2. Vercel will build and deploy automatically
3. Your app will be available at `https://your-project.vercel.app`

#### Step 6: Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Option B: Netlify

#### Step 1: Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub

#### Step 2: Create New Site
1. Click **"Add new site"** → **"Import an existing project"**
2. Connect your Git repository
3. Select the repository

#### Step 3: Configure Build Settings
- **Base directory**: `client` (if monorepo)
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: Leave blank

**Note**: For Next.js on Netlify, you may need to use `@netlify/plugin-nextjs`:
1. Create `netlify.toml` in client root:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### Step 4: Set Environment Variables
In Site Settings → Environment Variables, add:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_API_ENDPOINT`

#### Step 5: Deploy
Netlify will automatically deploy on every push to your main branch.

### Option C: Manual Deployment (VPS/Server)

#### Step 1: Prepare Server
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Step 2: Clone Repository
```bash
git clone https://github.com/yourusername/digital-product-store.git
cd digital-product-store/client
```

#### Step 3: Install Dependencies
```bash
npm install
```

#### Step 4: Configure Environment
```bash
cp env.example .env.local
# Edit .env.local with production values
```

#### Step 5: Build Application
```bash
npm run build
```

#### Step 6: Start Production Server
```bash
npm start
```

#### Step 7: Use PM2 for Process Management
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "digital-store-client" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Step 8: Configure Nginx (Reverse Proxy)
Create `/etc/nginx/sites-available/digital-store`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/digital-store /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Step 9: Setup SSL with Let's Encrypt
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Environment Variables for Production

#### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (live mode) | `pk_live_51...` |
| `NEXT_PUBLIC_API_ENDPOINT` | Backend API base URL | `https://api.yourdomain.com/api` |

#### Development vs Production

**Development** (`.env.local`):
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_API_ENDPOINT=http://localhost:5000/api
```

**Production** (Platform environment variables):
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_API_ENDPOINT=https://your-server-domain.railway.app/api
```

### Post-Deployment Checklist

- [ ] Application builds successfully
- [ ] Environment variables configured
- [ ] API endpoint points to production server
- [ ] Stripe publishable key is production key
- [ ] Homepage loads and displays products
- [ ] Shopping cart works
- [ ] Checkout process completes
- [ ] Payment processing works
- [ ] Admin panel accessible
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate installed (if applicable)

### Updating API Endpoint

If you change your backend server URL:

1. **Update Environment Variable**:
   - Vercel: Project Settings → Environment Variables → Edit `NEXT_PUBLIC_API_ENDPOINT`
   - Netlify: Site Settings → Environment Variables → Edit `NEXT_PUBLIC_API_ENDPOINT`
   - Manual: Update `.env.local` and rebuild

2. **Redeploy**:
   - Vercel/Netlify: Push a new commit or trigger redeploy
   - Manual: `npm run build && npm start`

### Troubleshooting Deployment

#### Build Fails
- Check Node.js version (requires 18+)
- Verify all dependencies installed
- Check build logs for specific errors
- Ensure TypeScript compiles without errors

#### API Calls Fail
- Verify `NEXT_PUBLIC_API_ENDPOINT` is correct
- Check backend server is running and accessible
- Verify CORS is configured on backend for your frontend domain
- Test API endpoint directly in browser/Postman

#### Stripe Payment Not Working
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is correct
- Check you're using production key for production deployment
- Ensure backend has matching Stripe secret key
- Check browser console for Stripe errors

#### Images Not Loading
- Verify image URLs are absolute (not relative)
- Check CORS settings if images are from external source
- Ensure image domains are configured in `next.config.ts` if needed

#### 404 Errors on Refresh
- This is normal for client-side routing
- Vercel handles this automatically
- For Netlify, ensure `_redirects` file or `netlify.toml` is configured
- For manual deployment, configure server to serve `index.html` for all routes

### Performance Optimization

#### Next.js Optimizations (Automatic)
- ✅ Automatic code splitting
- ✅ Image optimization with `next/image`
- ✅ Static generation where possible
- ✅ Server-side rendering for product catalog

#### Additional Optimizations
- Enable Next.js Image Optimization
- Use CDN for static assets
- Implement caching headers
- Optimize bundle size (check with `npm run build`)

### Monitoring and Analytics

Consider adding:
- **Vercel Analytics**: Built-in with Vercel
- **Google Analytics**: Add tracking code
- **Error Monitoring**: Sentry, LogRocket
- **Performance Monitoring**: Web Vitals

### Security Best Practices

- ✅ Never expose secret keys in client code
- ✅ Use HTTPS in production
- ✅ Validate all user inputs
- ✅ Implement rate limiting (on backend)
- ✅ Keep dependencies updated
- ✅ Use environment variables for sensitive config


## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Stripe.js Documentation](https://stripe.com/docs/stripe-js)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Note**: This is the frontend client application. Make sure the backend server is running for full functionality.
