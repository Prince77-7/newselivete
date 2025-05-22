<script lang="ts">
  import { page } from '$app/stores';
  import { themeStore } from '$lib/stores/themeStore';
  
  // Subscribe to themeStore for isLightMode for local UI elements like the toggle icon
  let isLightModeFromStore: boolean;
  themeStore.subscribe(value => {
    isLightModeFromStore = value;
  });

  function togglePageTheme() {
    themeStore.toggle();
  }
  
  // Get post ID from URL
  const postId = $page.params.id;
  
  // Sample blog data (in a real app, this would come from an API or database)
  const blogPostsRaw = [
    {
      id: "1",
      title: "The Future of Real Estate: Emerging Trends for 2024",
      excerpt: "Explore the innovative trends reshaping the real estate landscape and how savvy investors can position themselves for success.",
      date: "April 25, 2024",
      author: "Waiel Grey",
      authorImage: "/images/wasaw_white.svg",
      tags: ["Trends", "Market Analysis", "Investment"],
      category: "Market Insights",
      readTime: "5 min read",
      image: "/images/placeholder-blog-detail-1.jpg",
      content: `
        <p>The real estate market is constantly evolving, shaped by economic shifts, technological advancements, and changing consumer preferences. As we move through 2024, several key trends are emerging that savvy investors and homeowners should be watching closely.</p>
        
        <h2>1. Artificial Intelligence in Property Valuation</h2>
        <p>AI-powered algorithms are revolutionizing how properties are valued. These sophisticated systems analyze vast datasets—including historical sales, neighborhood metrics, economic indicators, and even social media sentiment—to provide more accurate and nuanced property valuations than traditional methods.</p>
        <p>For investors, this means having access to predictive analytics that can identify undervalued properties or emerging hot spots before they become widely recognized. For sellers, AI valuation tools provide deeper insights into optimal pricing strategies based on specific property features that might be overlooked in traditional comparative market analyses.</p>
        
        <h2>2. Climate Resilience as a Value Driver</h2>
        <p>With climate-related events becoming more frequent and severe, properties with resilient features are commanding premium prices. These include homes elevated above flood plains, structures built with fire-resistant materials, properties with independent power sources, and designs that maximize natural cooling.</p>
        <p>Forward-thinking investors are now conducting climate risk assessments before purchases and proactively upgrading properties with resilient features. This trend is particularly pronounced in coastal areas, where sea level rise and storm surge concerns are driving demand for elevated structures and reinforced building materials.</p>
        
        <h2>3. The Rise of Wellness-Focused Communities</h2>
        <p>Post-pandemic, buyer priorities have shifted dramatically toward health and wellness features. New developments are increasingly being designed around concepts of physical and mental wellbeing, featuring elements such as:</p>
        <ul>
          <li>Enhanced air filtration and purification systems</li>
          <li>Abundant natural light and biophilic design elements</li>
          <li>Community gardens and farm-to-table programming</li>
          <li>Integrated fitness facilities and walking trails</li>
          <li>Meditation spaces and quiet zones</li>
        </ul>
        <p>These wellness-focused communities are not just a luxury niche but are becoming mainstream expectations, particularly among affluent buyers willing to pay substantial premiums for environments that support their health goals.</p>
        
        <h2>4. Flexible, Multipurpose Spaces</h2>
        <p>The hybrid work revolution has fundamentally changed housing requirements. Properties that offer dedicated home office spaces, separate entrances for work visitors, or accessory dwelling units that can serve as workspaces are seeing heightened demand. Multi-generational living arrangements are also driving interest in homes with flexible floor plans that can adapt to changing family needs.</p>
        
        <h2>5. Tokenization of Real Estate Assets</h2>
        <p>Blockchain technology is enabling the fractional ownership of properties through tokenization, allowing investors to purchase shares of high-value real estate with lower capital requirements. This democratization of real estate investment is opening the market to a broader pool of investors and creating new liquidity in traditionally illiquid assets.</p>
        <p>Several platforms now offer tokenized real estate investments with transparent fee structures and automated dividend distributions, making portfolio diversification more accessible than ever before.</p>
        
        <h2>Strategic Positioning for Investors</h2>
        <p>To capitalize on these emerging trends, investors should consider the following strategies:</p>
        <ol>
          <li><strong>Leverage data analytics platforms</strong> that incorporate AI for property identification and valuation</li>
          <li><strong>Assess climate resilience</strong> when evaluating potential investments, particularly in vulnerable regions</li>
          <li><strong>Consider retrofitting existing properties</strong> with wellness features to command premium rents or sales prices</li>
          <li><strong>Target properties with flexible spatial configurations</strong> that can adapt to evolving work-life integration needs</li>
          <li><strong>Explore fractional investment opportunities</strong> in markets that might otherwise be inaccessible</li>
        </ol>
        
        <p>The most successful real estate investors in 2024 will be those who recognize that the market is no longer primarily driven by location alone, but by a complex interplay of technological innovation, environmental considerations, and lifestyle preferences. By staying ahead of these trends, investors can position themselves to identify opportunities that others might miss and create substantial value in their portfolios.</p>
      `
    },
    {
      id: "2",
      title: "Luxury Property Staging: The Art of Creating Irresistible Spaces",
      excerpt: "Discover the psychological principles and design strategies behind staging high-end properties that command premium prices.",
      date: "April 18, 2024",
      author: "Albara Al-Shujaa",
      authorImage: "/images/wasaw_white.svg",
      tags: ["Luxury", "Design", "Staging"],
      category: "Luxury Properties",
      readTime: "7 min read",
      image: "/images/placeholder-blog-detail-2.jpg",
      content: `
        <p>In the ultra-competitive luxury real estate market, exceptional staging isn't just a nice-to-have—it's essential for commanding top dollar. High-end buyers aren't just purchasing square footage; they're investing in a lifestyle, an identity, and a narrative about who they are and how they live. Effective luxury staging is the art of crafting that narrative in a way that creates an emotional connection with potential buyers.</p>
        
        <h2>The Psychology Behind Luxury Property Staging</h2>
        <p>Luxury staging operates on several psychological principles that influence buyer perception and decision-making:</p>
        
        <h3>Aspiration and Identity</h3>
        <p>Luxury buyers are often motivated by aspiration—they're purchasing not just a home but a representation of who they aspire to be. Effective staging creates environments that reflect the sophisticated, cultured, and successful identity that buyers envision for themselves.</p>
        
        <h3>Cognitive Ease</h3>
        <p>When potential buyers can easily envision themselves in a space without mental friction, they're more likely to form a positive emotional connection. Luxury staging removes cognitive barriers by presenting spaces that flow logically and feel intuitively "right."</p>
        
        <h3>Perceived Value</h3>
        <p>Studies show that thoughtfully staged luxury properties are perceived as having significantly higher value—often 5-10% more—than identical unstaged properties. This perception translates directly into higher offers and faster sales.</p>
        
        <h2>Key Elements of Effective Luxury Staging</h2>
        <p>The most successful luxury staging incorporates several critical elements:</p>
        
        <h3>Curated Art Collections</h3>
        <p>In luxury properties, generic mass-produced artwork is immediately recognizable—and detrimental. Instead, staging should include carefully curated pieces that reflect sophistication and cultural awareness. Many luxury stagers collaborate with galleries to feature authentic works from emerging artists, creating talking points and interest.</p>
        
        <h3>Bespoke and Limited-Edition Pieces</h3>
        <p>High-net-worth buyers recognize quality and craftsmanship. Incorporating handcrafted furniture, limited-edition design pieces, and custom elements signals exclusivity and attention to detail. These items don't necessarily need to be the most expensive options, but they should demonstrate thoughtful curation and distinctive character.</p>
        
        <h3>Sensory Coherence</h3>
        <p>Luxury staging engages all senses with a coherent experience:</p>
        <ul>
          <li><strong>Visual:</strong> Carefully considered color palettes that create atmosphere while allowing architectural features to shine</li>
          <li><strong>Tactile:</strong> Varied textures that invite touch—cashmere throws, silk pillows, hand-knotted rugs</li>
          <li><strong>Olfactory:</strong> Subtle, sophisticated scent profiles using high-end home fragrances</li>
          <li><strong>Auditory:</strong> Consideration of acoustics and background sound during showings</li>
        </ul>
        
        <h3>Negative Space</h3>
        <p>Luxury staging understands that negative space—the deliberate absence of objects—creates a sense of expansiveness and exclusivity. While middle-market staging might fill spaces to create coziness, luxury staging often employs strategic minimalism to highlight architectural features and emphasize spatial generosity.</p>
        
        <h2>Room-Specific Staging Strategies</h2>
        
        <h3>Primary Suites</h3>
        <p>The primary bedroom should evoke a sanctuary-like quality with:</p>
        <ul>
          <li>Hotel-inspired bed styling with high thread-count linens and multiple layers of pillows</li>
          <li>Seating area that suggests a private retreat within the room</li>
          <li>Strategic lighting that creates ambiance while still showcasing space</li>
          <li>Thoughtful nightstand vignettes suggesting a cultivated lifestyle (leather-bound books, artisanal accessories)</li>
        </ul>
        
        <h3>Kitchens</h3>
        <p>Even in luxury homes where the buyer may rarely cook, kitchens remain crucial selling points:</p>
        <ul>
          <li>Minimal but strategic countertop staging with high-end small appliances</li>
          <li>Curated cookbooks that signal sophistication</li>
          <li>Artisanal cutting boards and culinary tools as design elements</li>
          <li>Fresh produce arranged as color-coordinated still life compositions</li>
        </ul>
        
        <h3>Outdoor Spaces</h3>
        <p>Luxury outdoor staging should create "rooms" within the landscape:</p>
        <ul>
          <li>Multiple conversation areas suggesting different usage scenarios</li>
          <li>Al fresco dining setups with complete table settings</li>
          <li>Strategic lighting that showcases landscaping and extends the usable hours of the space</li>
          <li>High-quality outdoor furniture that communicates durability and investment</li>
        </ul>
        
        <h2>The Return on Investment</h2>
        <p>While professional luxury staging represents a significant investment—often $30,000 to $150,000+ for a high-end property—the returns are substantial. Data consistently shows that expertly staged luxury properties:</p>
        <ul>
          <li>Sell 60-70% faster than non-staged counterparts</li>
          <li>Command price premiums of 5-10% above comparable unstaged properties</li>
          <li>Generate more competitive bidding scenarios</li>
          <li>Receive more favorable media coverage and social media attention</li>
        </ul>
        
        <p>For a $10 million property, even a modest 5% premium represents a $500,000 increase—far outweighing the staging investment.</p>
        
        <h2>The WASAW Approach to Luxury Staging</h2>
        <p>At WASAW, our triumvirate approach brings multiple perspectives to the staging process. We collaborate with elite staging professionals while leveraging our collective expertise in buyer psychology, architectural appreciation, and market positioning. The result is staging that doesn't just showcase a property—it tells a compelling story that resonates with discerning buyers.</p>
        
        <p>In the luxury market, exceptional staging isn't an expense—it's an investment that delivers measurable returns. By creating environments that speak to both the emotional and rational aspects of high-end purchasing decisions, we help our clients achieve premium results in even the most competitive markets.</p>
      `
    }
  ];

  // Reactive statement to process posts and select the current one
  $: blogPosts = blogPostsRaw.map(p => ({
    ...p,
    authorImageResolved: isLightModeFromStore ? '/images/wasaw_red.svg' : p.authorImage
  }));
  
  $: post = blogPosts.find(p => p.id === postId) || blogPosts[0];
  
  // Related posts (in a real app, this would be more sophisticated)
  $: relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);
</script>

<svelte:head>
  <title>{post?.title || 'Blog Post'} | WASAW Blog</title>
  <meta name="description" content={post?.excerpt || 'Read our latest blog post.'} />
</svelte:head>

<!-- Theme Toggle Button for this page, uses store -->
<button class="theme-toggle-page" on:click={togglePageTheme} aria-label="Toggle theme">
  {#if isLightModeFromStore}
    <span class="theme-icon-page">🌙</span>
  {:else}
    <span class="theme-icon-page">☀️</span>
  {/if}
</button>

<article class="blog-post">
  {#if post}
    <div class="post-header">
      <div class="container">
        <div class="post-meta">
          <div class="category-tag">{post.category}</div>
          <div class="date-time">
            <span>{post.date}</span>
            <span class="dot">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
        <h1 class="post-title">{post.title}</h1>
        <div class="author-info">
          <img src={post.authorImageResolved} alt={post.author} class="author-avatar" />
          <span class="author-name">By {post.author}</span>
        </div>
      </div>
    </div>

    <div class="featured-image">
      <img src={post.image} alt={post.title} />
    </div>

    <div class="post-content container">
      {@html post.content}
    </div>

    <div class="post-footer container">
      <div class="tags">
        <strong>Tags:</strong>
        {#each post.tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    </div>

    {#if relatedPosts.length > 0}
      <aside class="related-posts container">
        <h2>Related Articles</h2>
        <div class="related-grid">
          {#each relatedPosts as relatedPost}
            <a href={`/blog/${relatedPost.id}`} class="related-card">
              <img src={relatedPost.image} alt={relatedPost.title} class="related-card-image" />
              <div class="related-card-content">
                <h3>{relatedPost.title}</h3>
                <p>{relatedPost.excerpt.substring(0, 100)}...</p>
                <span class="read-more">Read More →</span>
              </div>
            </a>
          {/each}
        </div>
      </aside>
    {/if}
  {:else}
    <div class="container post-not-found">
      <h2>Post Not Found</h2>
      <p>Sorry, we couldn't find the blog post you were looking for.</p>
      <a href="/blog" class="primary-button">Back to Blog</a>
    </div>
  {/if}
</article>

<style>
  /* Import or define your base variables if not globally available */
  /* :root { ... } */

  /* Theme Toggle Button for this page - specific styling if needed */
  .theme-toggle-page {
    position: fixed;
    top: calc(var(--nav-height, 60px) + 1rem); /* Position below nav if nav is present */
    right: 2rem;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 999; /* Ensure it's below nav (1000) but above page content */
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .theme-toggle-page:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  .theme-icon-page {
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }

  .theme-toggle-page:hover .theme-icon-page {
    transform: rotate(15deg);
  }

  /* Light mode toggle adjustments for THIS PAGE's toggle */
  /* Applied via global body.light-mode */
  :global(body.light-mode) .theme-toggle-page {
    background-color: rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.2);
  }

  :global(body.light-mode) .theme-toggle-page:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .blog-post {
    padding-top: 3rem; /* Adjust as needed, considering nav bar height */
    padding-bottom: 4rem;
    background-color: var(--background); /* Ensure this uses the themed background */
    color: var(--foreground); /* Ensure this uses the themed foreground */
    transition: background-color 0.4s ease, color 0.4s ease;
  }

  /* Light mode CSS variable overrides for this page */
  :global(body.light-mode) .blog-post {
    --background: var(--light-bg-primary);
    --foreground: var(--light-text-primary);
    --muted: var(--light-bg-secondary);
    --muted-foreground: var(--light-text-secondary);
    --card: #ffffff; /* Cards in related posts, etc. */
    --card-foreground: var(--light-text-primary);
    --border: var(--light-border);
    --primary: var(--light-accent-red);
    --primary-foreground: #ffffff; /* Text on primary buttons */
    --ring: var(--light-accent-red);

    /* More specific overrides for elements on this page */
    --post-header-bg: var(--light-bg-secondary);
    --post-category-tag-bg: var(--light-accent-red);
    --post-category-tag-text: #ffffff;
    --post-date-time-text: var(--light-text-secondary);
    --post-title-text: var(--light-text-primary);
    --post-author-name-text: var(--light-text-primary);
    
    --post-content-text: var(--light-text-primary);
    --post-content-h2-text: var(--light-text-primary);
    --post-content-h3-text: var(--light-text-primary);

    --post-tag-bg: var(--light-bg-secondary);
    --post-tag-text: var(--light-text-secondary);
    --post-footer-border: var(--light-border);

    --related-posts-bg: var(--light-bg-secondary);
    --related-posts-h2-text: var(--light-text-primary);
    --related-card-bg: #ffffff;
    --related-card-shadow: 0 10px 25px var(--light-shadow);
    --related-card-h3-text: var(--light-text-primary);
    --related-card-p-text: var(--light-text-secondary);
    --related-card-read-more-text: var(--light-accent-red);
    --related-card-read-more-hover-text: #A30027; /* Darker red for hover */

    --cta-card-bg: #ffffff;
    --cta-card-shadow: 0 10px 25px var(--light-shadow);
    --cta-h2-text: var(--light-text-primary);
    --cta-p-text: var(--light-text-secondary);
    --cta-button-bg: var(--light-accent-red);
    --cta-button-text: #ffffff;
    --cta-button-hover-bg: #A30027; /* Darker red for hover */
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  /* Light mode styles for author avatar */
  :global(body.light-mode) .author-avatar {
    border: 2px solid var(--light-accent-red);
    filter: none; /* Remove invert if it was applied for dark mode */
  }
  
  .author-avatar.light-mode-logo {
    filter: none; /* Ensure red logo is not inverted if that class is used */
  }

  .featured-image {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto 3rem;
    padding: 0 2rem;
  }

  .featured-image img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    object-fit: cover;
  }

  .post-header {
    padding: 4rem 0;
    background-color: var(--post-header-bg, var(--muted));
    margin-bottom: 2rem;
  }
  
  .post-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .category-tag {
    background-color: var(--post-category-tag-bg, var(--primary));
    color: var(--post-category-tag-text, var(--primary-foreground));
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .date-time {
    font-size: 0.9rem;
    color: var(--post-date-time-text, var(--muted-foreground));
  }
  
  .dot {
    margin: 0 0.3rem;
  }
  
  h1.post-title {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(2rem, 5vw, 3.2rem);
    line-height: 1.2;
    margin: 0 0 1.5rem 0;
    color: var(--post-title-text, var(--foreground));
  }
  
  .post-excerpt {
    font-size: 1.2rem;
    line-height: 1.6;
    color: var(--muted-foreground);
    margin-bottom: 2rem;
    font-weight: 300;
  }
  
  .author-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .author-avatar {
    width: 48px;
    height: 48px;
    border-radius: 9999px;
    object-fit: cover;
  }
  
  .author-name {
    font-weight: 600;
    font-size: 1rem;
    color: var(--post-author-name-text, var(--foreground));
  }
  
  .post-content {
    margin-bottom: 4rem;
    font-family: var(--font-body);
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--post-content-text, var(--foreground));
  }
  
  .post-content :global(h2) {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 1.8rem;
    margin: 2.5rem 0 1rem;
    color: var(--post-content-h2-text, var(--foreground));
  }
  
  .post-content :global(h3) {
    font-family: var(--font-headline);
    font-weight: 600;
    font-size: 1.4rem;
    margin: 2rem 0 0.8rem;
    color: var(--post-content-h3-text, var(--foreground));
  }
  
  .post-content :global(p) {
    margin-bottom: 1.5rem;
  }
  
  .post-content :global(ul), .post-content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }
  
  .post-content :global(li) {
    margin-bottom: 0.5rem;
  }
  
  .post-content :global(strong) {
    font-weight: 600;
  }
  
  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 2rem 0;
  }
  
  .tag {
    font-size: 0.8rem;
    color: var(--post-tag-text, var(--muted-foreground));
    background-color: var(--post-tag-bg, var(--muted));
    padding: 0.3rem 0.8rem;
    border-radius: 0.25rem;
  }
  
  .post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    border-top: 1px solid var(--post-footer-border, var(--border));
  }
  
  .related-posts {
    background-color: var(--related-posts-bg, var(--muted));
    padding: 4rem 0;
  }
  
  .related-posts h2 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--related-posts-h2-text, var(--foreground));
  }
  
  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .related-card {
    background-color: var(--related-card-bg, var(--card));
    border-radius: 1rem;
    overflow: hidden;
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .related-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--related-card-shadow, 0 10px 25px rgba(0, 0, 0, 0.1));
  }
  
  .related-card-image {
    height: 180px;
    overflow: hidden;
  }
  
  .related-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .related-card:hover .related-card-image img {
    transform: scale(1.05);
  }
  
  .related-card-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  .related-card-content h3 {
    font-family: var(--font-headline);
    font-weight: 600;
    font-size: 1.2rem;
    margin: 0 0 0.8rem 0;
    color: var(--related-card-h3-text, var(--card-foreground));
    line-height: 1.4;
  }
  
  .related-card-content p {
    font-size: 0.9rem;
    color: var(--related-card-p-text, var(--muted-foreground));
    line-height: 1.6;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .read-more {
    font-weight: 600;
    color: var(--related-card-read-more-text, var(--primary));
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .read-more:hover {
    color: var(--related-card-read-more-hover-text, #800000); /* Darker red */
  }
  
  .cta-section {
    padding: 4rem 0;
  }
  
  .cta-card {
    background-color: var(--cta-card-bg, var(--card));
    border-radius: 1rem;
    padding: 3rem;
    text-align: center;
    box-shadow: var(--cta-card-shadow, 0 10px 25px rgba(0, 0, 0, 0.05));
  }
  
  .cta-card h2 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 2rem;
    margin: 0 0 1rem 0;
    color: var(--cta-h2-text, var(--foreground));
  }
  
  .cta-card p {
    font-size: 1.1rem;
    color: var(--cta-p-text, var(--muted-foreground));
    margin: 0 0 2rem 0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .cta-button {
    display: inline-block;
    background-color: var(--cta-button-bg, var(--primary));
    color: var(--cta-button-text, var(--primary-foreground));
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 1rem;
    padding: 1rem 2.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }
  
  .cta-button:hover {
    background-color: var(--cta-button-hover-bg, #800000); /* Darker red */
    transform: translateY(-2px);
  }
  
  /* Responsive adjustments for theme toggle on this page */
  @media (max-width: 768px) {
    .theme-toggle-page {
      top: calc(var(--nav-height, 50px) + 0.8rem);
      right: 1.5rem;
      width: 45px;
      height: 45px;
    }
    
    .theme-icon-page {
      font-size: 1.3rem;
    }
  }
  
  @media (max-width: 480px) {
    .theme-toggle-page {
      top: calc(var(--nav-height, 45px) + 0.5rem);
      right: 1rem;
      width: 40px;
      height: 40px;
    }
    
    .theme-icon-page {
      font-size: 1.1rem;
    }
  }
</style> 