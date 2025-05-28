# WASAW Real Estate Website

A modern, interactive real estate website built with SvelteKit featuring an unconventional design and powerful user experience.

## Features

- **Unconventional Homepage Experience**: Interactive decision gateway with unique scroll-up design
- **Theme Toggle**: Dark/Light mode support throughout the site
- **Responsive Design**: Mobile-first approach with beautiful responsive layouts
- **Guess the Price Game**: Interactive real estate price guessing game with two sections:
  - Properties We Sold
  - Properties We Bought
- **Modern Navigation**: Glassmorphism navigation with smooth animations

## New: Guess the Price Game

Navigate to `/guess-the-price` to experience our interactive real estate knowledge game:

- **Two Game Modes**: Switch between "Properties We Sold" and "Properties We Bought"
- **Interactive Carousel**: Browse through multiple property photos
- **Smart Guessing System**: 3 attempts with helpful feedback (higher/lower)
- **Mobile Responsive**: Perfect experience on all devices
- **No Database Required**: All data stored in component files

## Blog System

The website features a comprehensive blog system with:

- **12 High-Quality Blog Posts**: Covering market analysis, luxury properties, investment strategies, and more
- **Functional Pagination**: 6 posts per page with smooth navigation
- **Search & Filter**: Find posts by title, content, tags, or category
- **Responsive Design**: Beautiful on desktop and mobile
- **SEO Optimized**: Proper meta tags and structured content

### 🚀 **Adding New Blog Posts (Super Easy for Developers)**

Adding a new blog post takes just 2 minutes:

```bash
npm run new-blog
```

This command:
- ✅ Automatically finds the next blog ID
- ✅ Generates a complete template with today's date
- ✅ Shows exactly where to paste the code
- ✅ Tells you what to name your image file

**That's it!** No complex setup, no database changes, no routing updates needed. The pagination, search, and filtering all work automatically.

**Full documentation**: See `static/images/README.md` for complete developer guide with examples, troubleshooting, and advanced formatting tips.

## Tech Stack

- **SvelteKit**: Modern web framework
- **TypeScript**: Type-safe development
- **CSS Custom Properties**: Dynamic theming
- **Responsive Design**: Mobile-first approach
- **No Database Required**: All data is stored in-component for easy deployment

## Development

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run build
```

The site is optimized for static deployment and can be hosted on any static hosting service. 