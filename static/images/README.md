# Image Organization for WASAW Website

This directory contains all static images for the website. Here's how to organize your images:

## 🚀 **DEVELOPER GUIDE: Adding New Blog Posts**

### **Super Quick Method (2 minutes) - Use the Generator Script**

Run this command in your terminal:
```bash
npm run new-blog
```
or
```bash
node scripts/add-blog-post.js
```

This script will:
- ✅ Automatically find the next blog ID number
- ✅ Generate a complete blog post template
- ✅ Show you exactly where to paste it
- ✅ Tell you what to name your image file

### **Manual Method (5 minutes)**

1. **Choose the next ID number** (current highest is 12, so next would be 13)
2. **Add your image**: Save as `13.jpg` in `/static/images/blog/`
3. **Add blog data**: Copy the template below and paste it at the TOP of the `blogPosts` array in both files:
   - `src/routes/blog/+page.svelte` (around line 75)
   - `src/routes/blog/[id]/+page.svelte` (around line 20)

### **Blog Post Template**
```javascript
{
  id: "13", // Next number in sequence
  title: "Your Blog Title Here",
  excerpt: "A compelling 1-2 sentence summary that appears on the blog list page.",
  date: "January 15, 2025", // Format: Month DD, YYYY
  author: "Waiel Grey", // or "Albara Al-Shujaa" or "Mohamed Aly"
  authorImage: "/images/wasaw_white.svg", // Keep this as-is
  tags: ["Tag1", "Tag2", "Tag3"], // 2-4 relevant tags
  category: "Market Insights", // See categories below
  readTime: "6 min read", // Estimate based on content length
  image: "/images/blog/13.jpg", // Your image filename
  content: `
    <p>Your blog content goes here in HTML format.</p>
    
    <h2>Section Heading</h2>
    <p>More content...</p>
    
    <h3>Subsection</h3>
    <ul>
      <li>Bullet point 1</li>
      <li>Bullet point 2</li>
    </ul>
    
    <p>Final paragraph...</p>
  `
},
```

### **Available Categories**
- `"Market Reports"` - Market analysis and data
- `"Luxury Properties"` - High-end real estate topics
- `"Market Insights"` - General market trends
- `"Seller Tips"` - Advice for sellers
- `"Investment"` - Investment strategies
- `"WASAW Approach"` - Company methodology
- `"Sustainable Living"` - Eco-friendly features
- `"Buyer Tips"` - Advice for buyers

### **Available Authors**
- `"Waiel Grey"` - CEO, Luxury Property Specialist
- `"Albara Al-Shujaa"` - Urban Properties & Investment Expert  
- `"Mohamed Aly"` - Coastal & Lifestyle Properties Specialist

### **Content Writing Tips**
- Use HTML tags: `<p>`, `<h2>`, `<h3>`, `<ul>`, `<li>`, `<strong>`
- Keep paragraphs focused and readable
- Use bullet points for lists
- Include 2-3 main sections with `<h2>` headings
- Aim for 800-2000 words for good SEO
- End with a strong conclusion paragraph

### **That's It! 🎉**
- The pagination automatically updates
- Search and filtering work automatically  
- The new post appears first (newest posts show first)
- No other code changes needed!

### **Exact File Locations to Edit**

**File 1: Blog List Page**
- **Path**: `src/routes/blog/+page.svelte`
- **What to find**: Look for `const blogPosts = [` (around line 75)
- **What to do**: Add your new blog object at the very top of the array (after the opening `[`)

**File 2: Blog Detail Page**  
- **Path**: `src/routes/blog/[id]/+page.svelte`
- **What to find**: Look for `const blogPostsRaw = [` (around line 20)
- **What to do**: Add the same blog object at the very top of this array too

### **Example: Adding Blog Post #13**

1. **Save image**: `static/images/blog/13.jpg`

2. **Edit both files** - add this at the TOP of both arrays:
```javascript
const blogPosts = [ // or blogPostsRaw = [
  {
    id: "13",
    title: "2025 Real Estate Market Predictions",
    excerpt: "Our expert analysis of what to expect in the real estate market for 2025.",
    date: "January 15, 2025",
    author: "Waiel Grey",
    authorImage: "/images/wasaw_white.svg",
    tags: ["Predictions", "Market Analysis", "2025"],
    category: "Market Reports",
    readTime: "8 min read",
    image: "/images/blog/13.jpg",
    content: `
      <p>As we enter 2025, the real estate market continues to evolve...</p>
      <h2>Key Predictions for 2025</h2>
      <p>Based on current trends, we predict...</p>
    `
  },
  // ... existing blog posts below
```

3. **Done!** Your new blog post will appear first on the blog page.

### **Troubleshooting**

**Q: My blog post doesn't show up**
- Check that you added it to BOTH files (`+page.svelte` and `[id]/+page.svelte`)
- Make sure the `id` is unique and in quotes: `id: "13"`
- Verify the image path matches your filename: `image: "/images/blog/13.jpg"`

**Q: The blog detail page shows "Post Not Found"**
- Ensure the `id` matches exactly in both files
- Check that you added the `content` field with backticks: `content: \`...\``

**Q: I want to add a new category**
- Just use it in your blog post - the system automatically detects new categories
- Categories are generated from existing blog posts dynamically

**Q: How do I estimate read time?**
- ~200 words per minute reading speed
- 1000 words ≈ 5 min read
- 1500 words ≈ 7-8 min read
- 2000+ words ≈ 10+ min read

### **Advanced: Content Formatting**

**Rich Content Example:**
```html
content: `
  <p>Introduction paragraph with <strong>bold text</strong> and key points.</p>
  
  <h2>Main Section Title</h2>
  <p>Section content explaining the topic in detail.</p>
  
  <h3>Subsection</h3>
  <p>More specific information about this aspect:</p>
  <ul>
    <li>First important point</li>
    <li>Second key insight</li>
    <li>Third consideration</li>
  </ul>
  
  <h3>Another Subsection</h3>
  <p>Additional details and analysis.</p>
  
  <h2>Second Main Section</h2>
  <p>Continue with more content...</p>
  
  <p>Strong concluding paragraph that ties everything together.</p>
`
```

---

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
- **Simple naming convention**: `12.jpg`, `11.jpg`, `10.jpg`, etc. (newest posts have highest numbers)
- Examples:
  - `12.jpg` (Blog post ID 12: "2024 Year-End Market Outlook" - NEWEST)
  - `11.jpg` (Blog post ID 11: "Smart Home Technology")
  - `10.jpg` (Blog post ID 10: "Winter Selling Strategies")
  - `9.jpg` (Blog post ID 9: "Investment Property Tax Strategies")
  - `8.jpg` (Blog post ID 8: "Multigenerational Living")
  - `7.jpg` (Blog post ID 7: "Luxury Amenities That Add Value")
  - `6.jpg` (Blog post ID 6: "Market Analysis Q1 2024")
  - `5.jpg` (Blog post ID 5: "Client Advocacy Triumvirate")
  - `4.jpg` (Blog post ID 4: "Sustainable Luxury")
  - `3.jpg` (Blog post ID 3: "Navigating Bidding Wars")
  - `2.jpg` (Blog post ID 2: "Luxury Property Staging")
  - `1.jpg` (Blog post ID 1: "Future of Real Estate" - OLDEST)

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
<img src="/images/blog/12.jpg" alt="2024 Year-End Market Outlook" />
<img src="/images/blog/11.jpg" alt="Smart Home Technology" />
<img src="/images/blog/10.jpg" alt="Winter Selling Strategies" />
<img src="/images/blog/9.jpg" alt="Investment Property Tax Strategies" />
<img src="/images/blog/8.jpg" alt="Multigenerational Living" />
<img src="/images/blog/7.jpg" alt="Luxury Amenities That Add Value" />
<img src="/images/blog/6.jpg" alt="Market Analysis Q1 2024" />
<img src="/images/blog/5.jpg" alt="Client Advocacy Triumvirate" />
<img src="/images/blog/4.jpg" alt="Sustainable Luxury" />
<img src="/images/blog/3.jpg" alt="Navigating Bidding Wars" />
<img src="/images/blog/2.jpg" alt="Luxury Property Staging" />
<img src="/images/blog/1.jpg" alt="Future of Real Estate" />
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
- ✅ **Blog Pages**: Expecting `12.jpg`, `11.jpg`, `10.jpg`, etc. in `/images/blog/`
- ✅ **Guess the Price Game**: Expecting `1-1.jpg`, `1-2.jpg`, etc. in `/images/properties/guess-the-price/`
- The code has been updated to use these simple naming conventions
- Simply add your images with these exact names and they will work immediately 