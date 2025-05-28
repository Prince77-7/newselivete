# Image Organization for WASAW Website

This directory contains all static images for the website. Here's how to organize your images:

## Directory Structure

### `/static/images/agents/`
**For agent photos on the contact page**
- Place individual agent headshots here
- Recommended format: JPG or PNG
- Recommended size: 400x400px (square) or 300x400px (portrait)
- **Simple naming convention**: `agent1.jpg`, `agent2.jpg`, `agent3.jpg`
- Examples:
  - `agent1.jpg` (Waiel Grey)
  - `agent2.jpg` (Albara Al-Shujaa)
  - `agent3.jpg` (Mohamed Aly)

### `/static/images/blog/`
**For blog post images**
- Place blog featured images and content images here
- Recommended format: JPG or WebP
- Recommended size: 1200x630px for featured images
- **Simple naming convention**: `1.jpg`, `2.jpg`, `3.jpg`, etc. (matching blog post ID)
- Examples:
  - `1.jpg` (Blog post ID 1: "The Future of Real Estate")
  - `2.jpg` (Blog post ID 2: "Luxury Property Staging")
  - `3.jpg` (Blog post ID 3: "Navigating Bidding Wars")
  - `4.jpg`, `5.jpg`, `6.jpg`, etc.

### `/static/images/properties/`
**For general property images**
- Place property listing photos here
- Recommended format: JPG or WebP
- Recommended size: 1200x800px or 1600x1200px
- Naming convention: `property-address-or-id-01.jpg`

### `/static/images/properties/guess-the-price/`
**For the Guess the Price game**
- Place property photos specifically for the guessing game
- Recommended format: JPG or WebP
- Recommended size: 800x600px (matches current placeholder size)
- **Simple naming convention**: `1-1.jpg`, `1-2.jpg`, `1-3.jpg` (property ID - image number)
- Examples:
  - `1-1.jpg`, `1-2.jpg`, `1-3.jpg` (Modern Downtown Loft - 3 images)
  - `2-1.jpg`, `2-2.jpg`, `2-3.jpg` (Suburban Family Home - 3 images)
  - `3-1.jpg`, `3-2.jpg`, `3-3.jpg` (Historic Bungalow - 3 images)
  - `4-1.jpg`, `4-2.jpg`, `4-3.jpg` (Luxury Estate - 3 images)
  - `5-1.jpg`, `5-2.jpg`, `5-3.jpg` (Starter Home - 3 images)

## How to Use These Images

### In the Contact Page
```svelte
<img src="/images/agents/agent1.jpg" alt="Waiel Grey - Real Estate Agent" />
<img src="/images/agents/agent2.jpg" alt="Albara Al-Shujaa - Real Estate Agent" />
<img src="/images/agents/agent3.jpg" alt="Mohamed Aly - Real Estate Agent" />
```

### In Blog Posts
```svelte
<img src="/images/blog/1.jpg" alt="The Future of Real Estate" />
<img src="/images/blog/2.jpg" alt="Luxury Property Staging" />
<img src="/images/blog/3.jpg" alt="Navigating Bidding Wars" />
```

### In Guess the Price Game
The code is already updated to expect:
```javascript
images: [
  '/images/properties/guess-the-price/1-1.jpg',
  '/images/properties/guess-the-price/1-2.jpg',
  '/images/properties/guess-the-price/1-3.jpg'
]
```

## Image Optimization Tips

1. **Compress images** before uploading to reduce file size
2. **Use WebP format** when possible for better compression
3. **Provide alt text** for accessibility
4. **Use consistent aspect ratios** within each category
5. **Consider retina displays** - provide 2x resolution when needed

## Current Status

- ✅ **Contact Page**: Expecting `agent1.jpg`, `agent2.jpg`, `agent3.jpg` in `/images/agents/`
- ✅ **Blog Pages**: Expecting `1.jpg`, `2.jpg`, `3.jpg`, etc. in `/images/blog/`
- ✅ **Guess the Price Game**: Expecting `1-1.jpg`, `1-2.jpg`, etc. in `/images/properties/guess-the-price/`
- The code has been updated to use these simple naming conventions
- Simply add your images with these exact names and they will work immediately 