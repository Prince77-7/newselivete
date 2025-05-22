<script>
  import { page } from '$app/stores';
  
  // Sample blog data
  const blogPosts = [
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
      image: "/images/wasaw_white.svg"
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
      image: "/images/wasaw_white.svg"
    },
    {
      id: "3",
      title: "Navigating Bidding Wars: Strategies for Success in Competitive Markets",
      excerpt: "Learn proven techniques to help your offers stand out in multiple-bid scenarios without overextending your budget.",
      date: "April 12, 2024",
      author: "Mohamed Aly",
      authorImage: "/images/wasaw_white.svg",
      tags: ["Buying", "Negotiation", "Strategy"],
      category: "Buyer Tips",
      readTime: "6 min read",
      image: "/images/wasaw_white.svg"
    },
    {
      id: "4",
      title: "Sustainable Luxury: Eco-Friendly Features That Add Value",
      excerpt: "Discover how environmentally conscious upgrades can enhance property value while reducing carbon footprint and operational costs.",
      date: "April 5, 2024",
      author: "Waiel Grey",
      authorImage: "/images/wasaw_white.svg",
      tags: ["Sustainability", "Luxury", "Investment"],
      category: "Sustainable Living",
      readTime: "8 min read",
      image: "/images/wasaw_white.svg"
    },
    {
      id: "5",
      title: "The Art of Client Advocacy: How Our Triumvirate Approach Changes Real Estate",
      excerpt: "Understanding the revolutionary impact of having three dedicated agents working in perfect harmony for each client.",
      date: "March 28, 2024",
      author: "Albara Al-Shujaa",
      authorImage: "/images/wasaw_white.svg",
      tags: ["Client Service", "WASAW Method", "Teamwork"],
      category: "WASAW Approach",
      readTime: "6 min read",
      image: "/images/wasaw_white.svg"
    },
    {
      id: "6",
      title: "Market Analysis: Q1 2024 Real Estate Insights",
      excerpt: "A deep dive into the latest market data, trends, and predictions for high-end properties in key metropolitan areas.",
      date: "March 20, 2024",
      author: "Mohamed Aly",
      authorImage: "/images/wasaw_white.svg",
      tags: ["Market Analysis", "Data", "Trends"],
      category: "Market Reports",
      readTime: "10 min read",
      image: "/images/wasaw_white.svg"
    }
  ];
  
  // Filters
  let selectedCategory = "";
  const categories = [...new Set(blogPosts.map(post => post.category))];
  
  // Search functionality
  let searchQuery = "";
  
  // Computed filtered posts
  $: filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    return matchesCategory && matchesSearch;
  });
  
  // Reset filters
  function resetFilters() {
    selectedCategory = "";
    searchQuery = "";
  }
</script>

<svelte:head>
  <title>Blog | WASAW</title>
</svelte:head>

<div class="blog-page">
  <header class="blog-header">
    <div class="container">
      <h1>Real Estate <span class="highlight-red">Insights</span></h1>
      <p class="lead">Expert perspectives, market analysis, and insider knowledge from our team of seasoned professionals.</p>
    </div>
  </header>
  
  <div class="blog-container">
    <div class="search-filters">
      <div class="search-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        <input 
          type="text" 
          placeholder="Search articles..." 
          bind:value={searchQuery}
          aria-label="Search articles"
        >
      </div>
      
      <div class="filter-options">
        <select bind:value={selectedCategory} aria-label="Filter by category">
          <option value="">All Categories</option>
          {#each categories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
        
        <button class="reset-button" on:click={resetFilters}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
          Reset
        </button>
      </div>
    </div>
    
    {#if filteredPosts.length === 0}
      <div class="no-results">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>
        <h2>No articles found</h2>
        <p>We couldn't find any articles matching your search criteria.</p>
        <button class="primary-button" on:click={resetFilters}>Clear Filters</button>
      </div>
    {:else}
      <div class="blog-grid">
        {#each filteredPosts as post}
          <article class="blog-card">
            <div class="card-image">
              <img src={post.image} alt={post.title} />
              <div class="card-category">{post.category}</div>
            </div>
            <div class="card-content">
              <div class="card-meta">
                <span class="date">{post.date}</span>
                <span class="dot">•</span>
                <span class="read-time">{post.readTime}</span>
              </div>
              <h2 class="card-title">
                <a href={`/blog/${post.id}`}>{post.title}</a>
              </h2>
              <p class="card-excerpt">{post.excerpt}</p>
              <div class="card-footer">
                <div class="author">
                  <img src={post.authorImage} alt={post.author} class="author-image" />
                  <span class="author-name">{post.author}</span>
                </div>
                <div class="tags">
                  {#each post.tags as tag}
                    <span class="tag">{tag}</span>
                  {/each}
                </div>
              </div>
            </div>
          </article>
        {/each}
      </div>
    {/if}
    
    <div class="pagination">
      <button class="pagination-button" disabled>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
        Previous
      </button>
      <div class="pagination-pages">
        <button class="page-number active">1</button>
        <button class="page-number">2</button>
        <button class="page-number">3</button>
      </div>
      <button class="pagination-button">
        Next
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
      </button>
    </div>
  </div>
  
  <section class="newsletter-section">
    <div class="container">
      <div class="newsletter-card">
        <div class="newsletter-content">
          <h2>Stay Informed</h2>
          <p>Subscribe to our newsletter for exclusive market insights, luxury property listings, and expert advice.</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit" class="primary-button">Subscribe</button>
          </form>
          <p class="privacy-note">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .blog-page {
    background-color: var(--background);
    color: var(--foreground);
    min-height: 100vh;
    padding-top: 80px; /* Space for fixed navigation */
  }
  
  .blog-header {
    text-align: center;
    padding: 5rem 2rem;
    background-color: var(--muted);
    margin-bottom: 3rem;
  }
  
  .blog-header h1 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin: 0 0 1rem 0;
    color: var(--foreground);
  }
  
  .highlight-red {
    color: var(--primary);
  }
  
  .lead {
    font-family: var(--font-headline);
    font-weight: 300;
    font-size: clamp(1rem, 2vw, 1.4rem);
    max-width: 700px;
    margin: 0 auto;
    color: var(--muted-foreground);
  }
  
  .blog-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem 4rem;
  }
  
  /* Search and Filters */
  .search-filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .search-box {
    position: relative;
    flex: 1;
    min-width: 250px;
  }
  
  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted-foreground);
  }
  
  .search-box input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    background-color: var(--card);
    color: var(--card-foreground);
    font-family: var(--font-body);
    font-size: 0.95rem;
  }
  
  .search-box input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(153, 0, 0, 0.1);
  }
  
  .filter-options {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  .filter-options select {
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    background-color: var(--card);
    color: var(--card-foreground);
    font-family: var(--font-body);
    font-size: 0.95rem;
    cursor: pointer;
  }
  
  .reset-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    background-color: var(--card);
    color: var(--card-foreground);
    font-family: var(--font-body);
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .reset-button:hover {
    background-color: var(--muted);
  }
  
  /* Blog Grid */
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .blog-card {
    border-radius: 0.75rem;
    overflow: hidden;
    background-color: var(--card);
    border: 1px solid var(--border);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  
  .blog-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .card-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
  
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .blog-card:hover .card-image img {
    transform: scale(1.05);
  }
  
  .card-category {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background-color: var(--primary);
    color: var(--primary-foreground);
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .card-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  .card-meta {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    color: var(--muted-foreground);
    margin-bottom: 0.75rem;
  }
  
  .dot {
    margin: 0 0.5rem;
  }
  
  .card-title {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 1.25rem;
    margin: 0 0 0.75rem 0;
    line-height: 1.4;
  }
  
  .card-title a {
    color: var(--card-foreground);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .card-title a:hover {
    color: var(--primary);
  }
  
  .card-excerpt {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--muted-foreground);
    margin: 0 0 1.5rem 0;
    flex: 1;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: auto;
  }
  
  .author {
    display: flex;
    align-items: center;
  }
  
  .author-image {
    width: 32px;
    height: 32px;
    border-radius: 9999px;
    object-fit: cover;
    margin-right: 0.75rem;
  }
  
  .author-name {
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: flex-end;
  }
  
  .tag {
    font-size: 0.75rem;
    color: var(--muted-foreground);
    background-color: var(--muted);
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
  }
  
  /* No Results */
  .no-results {
    text-align: center;
    padding: 4rem 2rem;
    background-color: var(--card);
    border-radius: 0.75rem;
    border: 1px solid var(--border);
  }
  
  .no-results svg {
    color: var(--muted-foreground);
    margin-bottom: 1.5rem;
  }
  
  .no-results h2 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0 0 0.75rem 0;
  }
  
  .no-results p {
    font-size: 1rem;
    color: var(--muted-foreground);
    margin: 0 0 1.5rem 0;
  }
  
  /* Pagination */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  }
  
  .pagination-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    background-color: var(--card);
    color: var(--card-foreground);
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .pagination-button:hover:not(:disabled) {
    background-color: var(--muted);
  }
  
  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .pagination-pages {
    display: flex;
    gap: 0.5rem;
    margin: 0 1rem;
  }
  
  .page-number {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    background-color: var(--card);
    color: var(--card-foreground);
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .page-number:hover:not(.active) {
    background-color: var(--muted);
  }
  
  .page-number.active {
    background-color: var(--primary);
    color: var(--primary-foreground);
    border-color: var(--primary);
  }
  
  /* Newsletter Section */
  .newsletter-section {
    background-color: var(--muted);
    padding: 4rem 2rem;
  }
  
  .newsletter-card {
    max-width: 800px;
    margin: 0 auto;
    background-color: var(--card);
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .newsletter-content {
    padding: 2.5rem;
    text-align: center;
  }
  
  .newsletter-content h2 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 2rem;
    margin: 0 0 1rem 0;
    color: var(--card-foreground);
  }
  
  .newsletter-content p {
    font-size: 1.1rem;
    color: var(--muted-foreground);
    margin: 0 0 1.5rem 0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .newsletter-form {
    display: flex;
    gap: 1rem;
    max-width: 500px;
    margin: 0 auto 1rem;
  }
  
  .newsletter-form input {
    flex: 1;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-body);
    font-size: 0.95rem;
  }
  
  .newsletter-form input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(153, 0, 0, 0.1);
  }
  
  .primary-button {
    padding: 0.75rem 1.5rem;
    background-color: var(--primary);
    color: var(--primary-foreground);
    border: none;
    border-radius: 0.5rem;
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }
  
  .primary-button:hover {
    background-color: #800000; /* Darker red */
    transform: translateY(-2px);
  }
  
  .privacy-note {
    font-size: 0.8rem;
    color: var(--muted-foreground);
    margin: 0;
  }
  
  /* Responsive Adjustments */
  @media (max-width: 992px) {
    .blog-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .blog-grid {
      grid-template-columns: 1fr;
    }
    
    .search-filters {
      flex-direction: column;
    }
    
    .filter-options {
      width: 100%;
      justify-content: space-between;
    }
    
    .newsletter-form {
      flex-direction: column;
    }
    
    .newsletter-section {
      padding: 3rem 1.5rem;
    }
    
    .newsletter-content {
      padding: 2rem 1.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .blog-header, .blog-container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    
    .card-footer {
      flex-direction: column;
      gap: 1rem;
    }
    
    .tags {
      justify-content: flex-start;
    }
    
    .pagination-pages {
      margin: 0 0.5rem;
    }
  }
</style> 