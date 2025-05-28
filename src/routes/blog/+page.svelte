<script lang="ts">
  import { page } from '$app/stores';
  import { themeStore } from '$lib/stores/themeStore';
  import { onMount } from 'svelte';
  
  // Subscribe to themeStore for isLightMode for local UI elements like the toggle icon
  let isLightModeFromStore: boolean;
  themeStore.subscribe(value => {
    isLightModeFromStore = value;
  });

  function togglePageTheme() {
    themeStore.toggle();
  }
  
  // --- START PODCAST PLAYER LOGIC ---
  let audioPlayer: HTMLAudioElement;
  let isPlaying = false;
  let currentTime = 0;
  let duration = 0;
  let progress = 0;

  const podcastSrc = "https://link.storjshare.io/raw/jvqbfu2d5wsx52rlrow3zxcrwv6a/grey/memphis.mp3";

  function togglePlayPause() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      isPlaying = true;
    } else {
      audioPlayer.pause();
      isPlaying = false;
    }
  }

  function handleTimeUpdate() {
    currentTime = audioPlayer.currentTime;
    progress = (currentTime / duration) * 100;
  }

  function handleLoadedMetadata() {
    duration = audioPlayer.duration;
  }

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
  
  function handleProgressClick(event: MouseEvent) {
    if (!duration) return;
    const progressWrapper = event.currentTarget as HTMLElement;
    const clickPosition = event.offsetX;
    const newTime = (clickPosition / progressWrapper.offsetWidth) * duration;
    audioPlayer.currentTime = newTime;
  }

  function skipTime(seconds: number) {
    if (!audioPlayer) return;
    const newTime = audioPlayer.currentTime + seconds;
    if (newTime < 0) {
      audioPlayer.currentTime = 0;
    } else if (newTime > duration) {
      audioPlayer.currentTime = duration;
    } else {
      audioPlayer.currentTime = newTime;
    }
  }

  // --- END PODCAST PLAYER LOGIC ---
  
  // Sample blog data - newest posts first with highest numbers
  const blogPosts = [
    {
      id: "12",
      title: "2024 Year-End Market Outlook: What to Expect in Real Estate",
      excerpt: "Our comprehensive analysis of market trends, interest rate predictions, and investment opportunities heading into 2025.",
      date: "December 15, 2024",
      author: "Waiel Grey",
      authorImage: "/images/wasaw_white.svg",
      tags: ["Market Analysis", "Predictions", "Investment"],
      category: "Market Reports",
      readTime: "8 min read",
      image: "/images/blog/12.jpg"
    },
    {
      id: "11",
      title: "Smart Home Technology: The New Standard in Luxury Real Estate",
      excerpt: "How integrated smart home systems are becoming essential features that buyers expect in high-end properties.",
      date: "December 8, 2024",
      author: "Mohamed Aly",
      authorImage: "/images/wasaw_white.svg",
      tags: ["Technology", "Luxury", "Smart Homes"],
      category: "Luxury Properties",
      readTime: "6 min read",
      image: "/images/blog/11.jpg"
    },
    {
      id: "10",
      title: "Winter Selling Strategies: Maximizing Your Property's Appeal",
      excerpt: "Expert tips for presenting your home at its best during the traditionally slower winter selling season.",
      date: "November 28, 2024",
      author: "Albara Al-Shujaa",
      authorImage: "/images/wasaw_white.svg",
      tags: ["Selling", "Strategy", "Seasonal"],
      category: "Seller Tips",
      readTime: "5 min read",
      image: "/images/blog/10.jpg"
    },
    {
      id: "9",
      title: "Investment Property Tax Strategies for 2024",
      excerpt: "Navigate the latest tax implications and optimization strategies for real estate investors in the current market.",
      date: "November 20, 2024",
      author: "Waiel Grey",
      authorImage: "/images/wasaw_white.svg",
      tags: ["Investment", "Tax Strategy", "Finance"],
      category: "Investment",
      readTime: "9 min read",
      image: "/images/blog/9.jpg"
    },
    {
      id: "8",
      title: "The Rise of Multigenerational Living: Design and Market Trends",
      excerpt: "How changing family dynamics are driving demand for homes that accommodate multiple generations under one roof.",
      date: "November 12, 2024",
      author: "Mohamed Aly",
      authorImage: "/images/wasaw_white.svg",
      tags: ["Design", "Trends", "Family Living"],
      category: "Market Insights",
      readTime: "7 min read",
      image: "/images/blog/8.jpg"
    },
    {
      id: "7",
      title: "Luxury Amenities That Actually Add Value",
      excerpt: "Not all high-end features are created equal. Discover which luxury amenities provide the best return on investment.",
      date: "October 30, 2024",
      author: "Albara Al-Shujaa",
      authorImage: "/images/wasaw_white.svg",
      tags: ["Luxury", "ROI", "Amenities"],
      category: "Luxury Properties",
      readTime: "6 min read",
      image: "/images/blog/7.jpg"
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
      image: "/images/blog/6.jpg"
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
      image: "/images/blog/5.jpg"
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
      image: "/images/blog/4.jpg"
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
      image: "/images/blog/3.jpg"
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
      image: "/images/blog/2.jpg"
    },
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
      image: "/images/blog/1.jpg"
    }
  ];
  
  // Filters
  let selectedCategory = "";
  const categories = [...new Set(blogPosts.map(post => post.category))];
  
  // Search functionality
  let searchQuery = "";
  
  // Pagination
  let currentPage = 1;
  const postsPerPage = 6;
  
  // Computed filtered posts
  $: allFilteredPosts = blogPosts.map(post => ({
      ...post,
      // Dynamically choose author image based on theme
      authorImageResolved: isLightModeFromStore ? '/images/wasaw_red.svg' : post.authorImage
    })).filter(post => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    return matchesCategory && matchesSearch;
  });
  
  // Paginated posts
  $: totalPages = Math.ceil(allFilteredPosts.length / postsPerPage);
  $: startIndex = (currentPage - 1) * postsPerPage;
  $: endIndex = startIndex + postsPerPage;
  $: filteredPosts = allFilteredPosts.slice(startIndex, endIndex);
  
  // Reset to page 1 when filters change
  $: if (selectedCategory || searchQuery) {
    currentPage = 1;
  }
  
  // Pagination functions
  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      // Scroll to top of blog content
      document.querySelector('.blog-container')?.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  function nextPage() {
    goToPage(currentPage + 1);
  }
  
  function prevPage() {
    goToPage(currentPage - 1);
  }
  
  // Reset filters
  function resetFilters() {
    selectedCategory = "";
    searchQuery = "";
    currentPage = 1;
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
  
  <!-- START PODCAST SECTION -->
  <section class="podcast-section">
    <div class="container">
      <h2 class="podcast-title">LATEST INTELLIGENCE PODCAST</h2>
      <div class="audio-player-custom">
        <audio 
          bind:this={audioPlayer} 
          src={podcastSrc} 
          on:timeupdate={handleTimeUpdate}
          on:loadedmetadata={handleLoadedMetadata}
          on:ended={() => isPlaying = false}
          preload="metadata"
        ></audio>
        
        <button class="skip-button backward" on:click={() => skipTime(-15)} aria-label="Skip backward 15 seconds">
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="currentColor"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"></path></svg>
          <span class="skip-amount">15s</span>
        </button>

        <button class="play-pause-button" on:click={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {#if isPlaying}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          {/if}
        </button>
        
        <button class="skip-button forward" on:click={() => skipTime(15)} aria-label="Skip forward 15 seconds">
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"></path></svg>
          <span class="skip-amount">15s</span>
        </button>
        
        <div class="audio-controls">
          <div class="time-display current-time">{formatTime(currentTime)}</div>
          <div class="progress-bar-wrapper" on:click={handleProgressClick}>
            <div class="progress-bar-filled" style="width: {progress}%"></div>
          </div>
          <div class="time-display duration">{formatTime(duration)}</div>
        </div>
      </div>
      <p class="podcast-disclaimer">
        All information presented is accurate. However, the voice is artificially generated, which may occasionally result in minor faults or imperfections in delivery.
      </p>
    </div>
  </section>
  <!-- END PODCAST SECTION -->
  
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
                  <img src={post.authorImageResolved} alt={post.author} class="author-image" />
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
      <button 
        class="pagination-button" 
        on:click={prevPage}
        disabled={currentPage === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
        Previous
      </button>
      
      <div class="pagination-pages">
        {#each Array.from({length: totalPages}, (_, i) => i + 1) as pageNum}
          {#if totalPages <= 7 || pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)}
            <button 
              class="page-number"
              class:active={pageNum === currentPage}
              on:click={() => goToPage(pageNum)}
            >
              {pageNum}
            </button>
          {:else if pageNum === currentPage - 2 || pageNum === currentPage + 2}
            <span class="pagination-ellipsis">...</span>
          {/if}
        {/each}
      </div>
      
      <button 
        class="pagination-button"
        on:click={nextPage}
        disabled={currentPage === totalPages}
      >
        Next
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
      </button>
    </div>
    
    <!-- Pagination Info -->
    <div class="pagination-info">
      <p>Showing {startIndex + 1}-{Math.min(endIndex, allFilteredPosts.length)} of {allFilteredPosts.length} articles</p>
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
  /* General Blog Page Styles */
  .blog-page {
    background-color: var(--background);
    color: var(--foreground);
    transition: background-color 0.4s ease, color 0.4s ease;
    padding-bottom: 4rem;
    padding-top: 80px; /* Space for fixed navigation */
  }

  .blog-header {
    background-color: var(--muted);
    color: var(--foreground);
    text-align: center;
    padding: 5rem 2rem;
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
    color: var(--card-foreground);
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
    color: var(--card-foreground);
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
  
  .pagination-ellipsis {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: var(--card-foreground);
    font-size: 0.9rem;
  }
  
  .pagination-info {
    text-align: center;
    margin-top: 1rem;
  }
  
  .pagination-info p {
    font-size: 0.9rem;
    color: var(--muted-foreground);
    margin: 0;
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
    background-color: #800000;
    transform: translateY(-2px);
  }
  
  .privacy-note {
    font-size: 0.8rem;
    color: var(--muted-foreground);
    margin: 0;
  }

  /* Podcast Section Styles */
  .podcast-section {
    padding: 3rem 0;
    background-color: var(--background);
    border-bottom: 1px solid var(--border);
  }

  .podcast-title {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(1.5rem, 4vw, 2rem);
    text-align: center;
    margin-bottom: 2rem;
    color: var(--foreground);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .audio-player-custom {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background-color: var(--card);
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    border: 1px solid var(--border);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    max-width: 700px;
    margin: 0 auto;
  }

  .play-pause-button {
    background: none;
    border: none;
    color: var(--foreground);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .play-pause-button:hover {
    background-color: var(--muted);
  }

  .play-pause-button svg {
    width: 28px;
    height: 28px;
  }

  .audio-controls {
    display: flex;
    align-items: center;
    flex-grow: 1;
    gap: 0.75rem;
  }

  .time-display {
    font-family: var(--font-mono, monospace);
    font-size: 0.9rem;
    color: var(--muted-foreground);
    min-width: 40px;
  }
  .current-time {
    text-align: right;
  }
  .duration {
    text-align: left;
  }

  .progress-bar-wrapper {
    flex-grow: 1;
    height: 8px;
    background-color: var(--muted);
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
  }

  .progress-bar-filled {
    height: 100%;
    background-color: var(--primary);
    border-radius: 4px;
    transition: width 0.1s linear;
  }

  .skip-button {
    background: none;
    border: none;
    color: var(--foreground);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background-color 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono, monospace);
    font-size: 0.7rem;
    line-height: 1;
  }
  .skip-button svg {
    width: 20px;
    height: 20px;
  }
  .skip-button .skip-amount {
    display: block;
    margin-top: 2px;
    font-size: 0.65rem;
  }

  .skip-button:hover {
    background-color: var(--muted);
  }

  .podcast-disclaimer {
    font-size: 0.8rem;
    color: var(--muted-foreground);
    text-align: center;
    margin-top: 1.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
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

    /* Podcast Player Mobile Styles */
    .audio-player-custom {
      padding: 0.5rem 0.75rem;
      gap: 0.5rem;
    }
    .audio-player-custom .audio-controls {
      gap: 0.5rem;
    }
    .play-pause-button {
      margin: 0;
      padding: 0.4rem;
    }
    .play-pause-button svg {
      width: 24px;
      height: 24px;
    }

    .skip-button {
      margin: 0;
      padding: 0.4rem;
    }
    .skip-button svg {
      width: 18px;
      height: 18px;
    }
    .skip-button .skip-amount {
      display: none;
    }
    
    .time-display {
      font-size: 0.8rem;
      min-width: 35px;
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