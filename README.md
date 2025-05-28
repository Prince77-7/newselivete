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
- **Image Carousels**: Browse through multiple property photos
- **3 Attempts**: Users get 3 chances to guess the correct price
- **Smart Feedback**: Get "Higher" or "Lower" hints after each guess
- **Success Criteria**: Within 5% of actual price is considered correct
- **Mobile Optimized**: Fully responsive design that works beautifully on all devices
- **Theme Support**: Seamlessly integrates with the site's dark/light theme system

### Game Features:
- Property details including bedrooms, bathrooms, and square footage
- Location information for each property
- Automatic price formatting with commas
- Visual feedback for correct/incorrect guesses
- Property counter to track progress
- Smooth transitions and animations

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