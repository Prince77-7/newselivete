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
      image: "/images/placeholder-blog-1.jpg"
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
      image: "/images/placeholder-blog-2.jpg"
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
      image: "/images/placeholder-blog-3.jpg"
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
      image: "/images/placeholder-blog-4.jpg"
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
      image: "/images/placeholder-blog-5.jpg"
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
      image: "/images/placeholder-blog-6.jpg"
    }
  ];
  
  // Filters
  let selectedCategory = "";
  const categories = [...new Set(blogPosts.map(post => post.category))];
  
  // Search functionality
  let searchQuery = "";
  
  // Computed filtered posts
  $: filteredPosts = blogPosts.map(post => ({
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
  /* CSS custom properties for theme system */
  :root {
    /* Light mode variables */
    --light-bg-primary: #fafafa;
    --light-bg-secondary: #f5f5f5;
    --light-text-primary: #1a1a1a;
    --light-text-secondary: #4a4a4a;
    --light-accent-red: #B8002D;
    --light-shadow: rgba(0, 0, 0, 0.1);
    --light-border: rgba(0, 0, 0, 0.1);
    
    /* Default dark mode theme properties */
    --background: var(--color-deep-matte-black, #0a0a0a);
    --foreground: var(--color-pure-white, #ffffff);
    --muted: rgba(20, 20, 20, 0.8);
    --muted-foreground: rgba(255, 255, 255, 0.7);
    --card: rgba(30, 30, 30, 0.7);
    --card-foreground: var(--color-pure-white, #ffffff);
    --border: rgba(255, 255, 255, 0.1);
    --primary: var(--color-blood-red, #990000);
    --primary-foreground: var(--color-pure-white, #ffffff);
  }

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

  /* General Blog Page Styles */
  .blog-page {
    background-color: var(--background); /* Ensure this uses the themed background */
    color: var(--foreground); /* Ensure this uses the themed foreground */
    transition: background-color 0.4s ease, color 0.4s ease;
    padding-bottom: 4rem; /* Ensure space for footer if any */
  }

  /* Light mode overrides for existing CSS variables */
  :global(body.light-mode) .blog-page {
    --background: var(--light-bg-primary);
    --foreground: var(--light-text-primary);
    --card: var(--light-bg-secondary);
    --card-foreground: var(--light-text-primary);
    --popover: var(--light-bg-primary);
    --popover-foreground: var(--light-text-primary);
    --primary: var(--light-accent-red); /* Using theme's accent red */
    --primary-foreground: var(--light-bg-primary); /* Text on primary buttons */
    --secondary: #e5e7eb; /* Light gray for secondary elements */
    --secondary-foreground: #1f2937; /* Dark text on secondary */
    --muted: #f3f4f6; /* Very light gray for muted backgrounds */
    --muted-foreground: #6b7280; /* Gray text for muted elements */
    --accent: #fde68a; /* A light yellow accent - can be adjusted */
    --accent-foreground: #78350f; /* Dark text on accent */
    --destructive: #ef4444; /* Standard destructive red */
    --destructive-foreground: #f8fafc; /* Light text on destructive */
    --border: var(--light-border); /* Use theme-defined light border */
    --input: #ffffff; /* Brighter input background for light mode */
    --ring: var(--light-accent-red); /* Ring color for focus, using theme's accent */

    /* Ensure specific elements inside cards also update */
    /* For .search-box input, .filter-options select, .reset-button */
    --search-input-bg: #ffffff;
    --search-input-text: var(--light-text-primary);
    --search-input-border: var(--light-border);
    --search-icon-color: var(--light-text-secondary);

    --select-bg: #ffffff;
    --select-text: var(--light-text-primary);
    --select-border: var(--light-border);

    --reset-button-bg: #ffffff;
    --reset-button-text: var(--light-text-primary);
    --reset-button-border: var(--light-border);
    --reset-button-hover-bg: var(--light-bg-secondary);

    /* For .blog-card elements */
    --blog-card-bg: #ffffff; /* Explicitly set card background */
    --blog-card-border: var(--light-border);
    --blog-card-shadow: 0 10px 25px var(--light-shadow);
    --blog-card-category-bg: var(--light-accent-red);
    --blog-card-category-text: var(--light-bg-primary);
    --blog-card-meta-text: var(--light-text-secondary);
    --blog-card-title-link-text: var(--light-text-primary);
    --blog-card-title-link-hover-text: var(--light-accent-red);
    --blog-card-excerpt-text: var(--light-text-secondary);
    --blog-card-author-name-text: var(--light-text-primary);
    --blog-card-tag-bg: var(--light-bg-secondary); /* Lighter background for tags */
    --blog-card-tag-text: var(--light-text-secondary);

    /* For .no-results */
    --no-results-bg: #ffffff;
    --no-results-border: var(--light-border);
    --no-results-icon-color: var(--light-text-secondary);
    --no-results-h2-text: var(--light-text-primary);
    --no-results-p-text: var(--light-text-secondary);

    /* For .pagination */
    --pagination-button-bg: #ffffff;
    --pagination-button-text: var(--light-text-primary);
    --pagination-button-border: var(--light-border);
    --pagination-button-hover-bg: var(--light-bg-secondary);
    --pagination-active-bg: var(--light-accent-red);
    --pagination-active-text: var(--light-bg-primary);
    --pagination-active-border: var(--light-accent-red);

    /* For .newsletter-section and .newsletter-card */
    --newsletter-section-bg: var(--light-bg-secondary); /* Lighter section background */
    --newsletter-card-bg: #ffffff; /* White card background */
    --newsletter-card-shadow: 0 10px 25px var(--light-shadow);
    --newsletter-h2-text: var(--light-text-primary);
    --newsletter-p-text: var(--light-text-secondary);
    --newsletter-input-bg: #ffffff;
    --newsletter-input-text: var(--light-text-primary);
    --newsletter-input-border: var(--light-border);
    --newsletter-privacy-text: var(--light-text-secondary);

    /* Podcast Player Light Mode Variables */
    --podcast-section-bg: var(--light-bg-primary);
    --podcast-title-text: var(--light-text-primary);
    --podcast-player-bg: var(--light-bg-secondary);
    --podcast-player-border: var(--light-border);
    --podcast-play-pause-icon-color: var(--light-text-primary);
    --podcast-play-pause-hover-bg: rgba(0, 0, 0, 0.1);
    --podcast-time-text: var(--light-text-secondary);
    --podcast-progress-bar-bg: #e0e0e0;
    --podcast-progress-bar-filled-bg: var(--light-accent-red);
    --podcast-skip-button-icon-color: var(--light-text-primary);
    --podcast-skip-button-hover-bg: rgba(0,0,0,0.08);
    --podcast-disclaimer-text: var(--light-text-secondary);
  }

  .blog-header {
    background-color: var(--muted); /* Changed from var(--primary) */
    color: var(--foreground); /* Changed from var(--primary-foreground) */
    text-align: center;
    padding: 5rem 2rem;
    margin-bottom: 3rem;
  }
  
  .blog-header h1 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin: 0 0 1rem 0;
    color: var(--foreground); /* Ensure h1 text color is consistent with header color */
  }
  
  .highlight-red { /* Default highlight, used for "Insights" */
    color: var(--primary); /* This will make "Insights" red */
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
    color: var(--search-icon-color, var(--muted-foreground));
  }
  
  .search-box input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--search-input-border, var(--border));
    background-color: var(--search-input-bg, var(--card));
    color: var(--search-input-text, var(--card-foreground));
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
    border: 1px solid var(--select-border, var(--border));
    background-color: var(--select-bg, var(--card));
    color: var(--select-text, var(--card-foreground));
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
    border: 1px solid var(--reset-button-border, var(--border));
    background-color: var(--reset-button-bg, var(--card));
    color: var(--reset-button-text, var(--card-foreground));
    font-family: var(--font-body);
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .reset-button:hover {
    background-color: var(--reset-button-hover-bg, var(--muted));
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
    background-color: var(--blog-card-bg, var(--card));
    border: 1px solid var(--blog-card-border, var(--border));
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  
  .blog-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--blog-card-shadow, 0 10px 25px rgba(0, 0, 0, 0.1));
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
    background-color: var(--blog-card-category-bg, var(--primary));
    color: var(--blog-card-category-text, var(--primary-foreground));
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
    color: var(--blog-card-meta-text, var(--muted-foreground));
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
    color: var(--blog-card-title-link-text, var(--card-foreground));
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .card-title a:hover {
    color: var(--blog-card-title-link-hover-text, var(--primary));
  }
  
  .card-excerpt {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--blog-card-excerpt-text, var(--muted-foreground));
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
    color: var(--blog-card-author-name-text, var(--card-foreground));
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: flex-end;
  }
  
  .tag {
    font-size: 0.75rem;
    color: var(--blog-card-tag-text, var(--muted-foreground));
    background-color: var(--blog-card-tag-bg, var(--muted));
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
  }
  
  /* No Results */
  .no-results {
    text-align: center;
    padding: 4rem 2rem;
    background-color: var(--no-results-bg, var(--card));
    border-radius: 0.75rem;
    border: 1px solid var(--no-results-border, var(--border));
  }
  
  .no-results svg {
    color: var(--no-results-icon-color, var(--muted-foreground));
    margin-bottom: 1.5rem;
  }
  
  .no-results h2 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0 0 0.75rem 0;
    color: var(--no-results-h2-text, var(--card-foreground));
  }
  
  .no-results p {
    font-size: 1rem;
    color: var(--no-results-p-text, var(--muted-foreground));
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
    border: 1px solid var(--pagination-button-border, var(--border));
    background-color: var(--pagination-button-bg, var(--card));
    color: var(--pagination-button-text, var(--card-foreground));
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .pagination-button:hover:not(:disabled) {
    background-color: var(--pagination-button-hover-bg, var(--muted));
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
    border: 1px solid var(--pagination-button-border, var(--border));
    background-color: var(--pagination-button-bg, var(--card));
    color: var(--pagination-button-text, var(--card-foreground));
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .page-number:hover:not(.active) {
    background-color: var(--pagination-button-hover-bg, var(--muted));
  }
  
  .page-number.active {
    background-color: var(--pagination-active-bg, var(--primary));
    color: var(--pagination-active-text, var(--primary-foreground));
    border-color: var(--pagination-active-border, var(--primary));
  }
  
  /* Newsletter Section */
  .newsletter-section {
    background-color: var(--newsletter-section-bg, var(--muted));
    padding: 4rem 2rem;
  }
  
  .newsletter-card {
    max-width: 800px;
    margin: 0 auto;
    background-color: var(--newsletter-card-bg, var(--card));
    border-radius: 1rem;
    box-shadow: var(--newsletter-card-shadow, 0 10px 25px rgba(0, 0, 0, 0.1));
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
    color: var(--newsletter-h2-text, var(--card-foreground));
  }
  
  .newsletter-content p {
    font-size: 1.1rem;
    color: var(--newsletter-p-text, var(--muted-foreground));
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
    border: 1px solid var(--newsletter-input-border, var(--border));
    background-color: var(--newsletter-input-bg, var(--background));
    color: var(--newsletter-input-text, var(--foreground));
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
    color: var(--newsletter-privacy-text, var(--muted-foreground));
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
    
    .theme-toggle-page {
      top: calc(var(--nav-height, 50px) + 0.8rem);
      right: 1.5rem;
      width: 45px;
      height: 45px;
    }
    
    .theme-icon-page {
      font-size: 1.3rem;
    }

    /* Podcast Player Mobile Styles */
    .audio-player-custom {
      padding: 0.5rem 0.75rem; /* Reduced padding for mobile single row */
      gap: 0.5rem; /* Reduced gap between main items */
    }
    .audio-player-custom .audio-controls {
      gap: 0.5rem; /* Reduced gap within audio-controls (times, progress bar) */
    }
    .play-pause-button {
      margin: 0; /* Reset margin */
      padding: 0.4rem; /* Slightly smaller padding for the button itself */
    }
    .play-pause-button svg {
      width: 24px; /* Slightly smaller play/pause icon */
      height: 24px;
    }

    .skip-button {
      margin: 0; /* Reset margin */
      padding: 0.4rem; /* Slightly smaller padding */
    }
    .skip-button svg {
      width: 18px; /* Smaller skip icons */
      height: 18px;
    }
    .skip-button .skip-amount {
      display: none; /* Hide '15s' text on mobile to save space */
    }
    
    .time-display {
      font-size: 0.8rem; /* Smaller time font */
      min-width: 35px; /* Slightly smaller min-width */
    }

    /* Ensure skip buttons are not too close to screen edges if player is full width */
    .audio-player-custom > .skip-button.backward {
       margin-left: 0; 
    }
    .audio-player-custom > .skip-button.forward {
       margin-right: 0;
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

  /* START PODCAST SECTION STYLES */
  .podcast-section {
    padding: 3rem 0;
    background-color: var(--podcast-section-bg, var(--background)); /* Default to page bg */
    border-bottom: 1px solid var(--podcast-player-border, var(--border)); /* Use specific or fallback */
  }

  .podcast-title {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(1.5rem, 4vw, 2rem);
    text-align: center;
    margin-bottom: 2rem;
    color: var(--podcast-title-text, var(--foreground));
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .audio-player-custom {
    display: flex;
    align-items: center;
    gap: 0.75rem; /* Reduced gap for potentially tighter mobile */
    background-color: var(--podcast-player-bg, var(--card));
    padding: 0.75rem 1rem; /* Reduced padding */
    border-radius: 0.75rem;
    border: 1px solid var(--podcast-player-border, var(--border));
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    max-width: 700px; /* Limit width of player */
    margin: 0 auto; /* Center the player */
  }

  .play-pause-button {
    background: none;
    border: none;
    color: var(--podcast-play-pause-icon-color, var(--foreground));
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .play-pause-button:hover {
    background-color: var(--podcast-play-pause-hover-bg, rgba(255, 255, 255, 0.1));
  }

  .play-pause-button svg {
    width: 28px; /* Slightly larger icon */
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
    color: var(--podcast-time-text, var(--muted-foreground));
    min-width: 40px; /* Ensure space for MM:SS */
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
    background-color: var(--podcast-progress-bar-bg, var(--muted));
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden; /* Ensure filled bar stays within bounds */
  }

  .progress-bar-filled {
    height: 100%;
    background-color: var(--podcast-progress-bar-filled-bg, var(--primary));
    border-radius: 4px;
    transition: width 0.1s linear; /* Smooth progress update */
  }

  .skip-button {
    background: none;
    border: none;
    color: var(--podcast-skip-button-icon-color, var(--foreground));
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background-color 0.2s ease;
    display: flex;
    flex-direction: column; /* Stack icon and number */
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono, monospace);
    font-size: 0.7rem; /* Small text for 15 */
    line-height: 1;
  }
  .skip-button svg {
    width: 20px; /* Smaller icon for skip */
    height: 20px;
    /* margin-bottom: 2px; Removed as text might be too small or we rely on aria-label */
  }
  .skip-button .skip-amount {
    display: block;
    margin-top: 2px; /* Add a little space if icon is above */
    font-size: 0.65rem; /* Even smaller for '15s' */
  }

  .skip-button:hover {
    background-color: var(--podcast-skip-button-hover-bg, rgba(255, 255, 255, 0.08));
    line-height: 1.5;
  }

  /* Icon specific adjustments if needed, e.g., for replay/forward icons */
  .skip-button.backward svg {
    /* transform: scaleX(-1); /* If using a forward icon that needs flipping */
  }

  .podcast-disclaimer {
    font-size: 0.8rem;
    color: var(--podcast-disclaimer-text, var(--muted-foreground));
    text-align: center;
    margin-top: 1.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
  }
  /* END PODCAST SECTION STYLES */
</style> 