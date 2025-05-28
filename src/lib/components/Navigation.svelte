<script lang="ts">
  import { BROWSER } from 'esm-env';
  import { themeStore } from '$lib/stores/themeStore'; // Import the theme store
  
  // Define navigation links
  const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About Us' },
    { href: '/blog', text: 'Blog' },
    { href: '/guess-the-price', text: 'Guess the Price' },
    // Add other primary navigation links here, e.g.:
    // { href: '/listings', text: 'Listings' }, 
    // { href: '/services', text: 'Services' },
    { href: '/contact', text: 'Contact' }
  ];
  
  // Toggle mobile menu
  let mobileMenuOpen = false;
  
  // Function to toggle menu
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
  
  // Function to toggle theme using the store
  function toggleTheme() {
    themeStore.toggle();
  }
  
  // Track the current path - this will be set from +layout.svelte
  export let currentPath = '';
  // Prop to control light mode
  export let isLightMode = false;
  
  // Close menu when route changes
  $: if (BROWSER && currentPath) {
    mobileMenuOpen = false;
  }
</script>

<nav class="main-navigation" class:nav-scrolled={true} class:light-mode={isLightMode}>
  <div class="nav-container">
    <a href="/" class="nav-logo">
      {#if isLightMode}
        <img src="/images/wasaw_red.svg" alt="WASAW Logo" class="logo-svg" />
      {:else}
        <img src="/images/wasaw_white.svg" alt="WASAW Logo" class="logo-svg" />
      {/if}
    </a>
    
    <button class="mobile-menu-toggle" on:click={toggleMobileMenu} aria-label="Toggle menu" aria-expanded={mobileMenuOpen}>
      <span class="hamburger-icon" class:open={mobileMenuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
    
    <div class="nav-right">
      <ul class="nav-links" class:open={mobileMenuOpen}>
        {#each navLinks as link}
          <li>
            <a 
              href={link.href} 
              class="nav-link" 
              class:active={currentPath === link.href}
              aria-current={currentPath === link.href ? 'page' : undefined}
            >
              {link.text}
            </a>
          </li>
        {/each}
        <!-- Theme toggle button in nav menu -->
        <li class="theme-toggle-container">
          <button class="theme-toggle-nav" on:click={toggleTheme} aria-label="Toggle theme">
            {#if isLightMode}
              <span class="theme-icon-nav">🌙</span>
            {:else}
              <span class="theme-icon-nav">☀️</span>
            {/if}
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
  .main-navigation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000; /* High z-index to stay on top */
    padding: 0.8rem 2rem; /* Reduced padding for a slimmer bar */
    background-color: rgba(0, 0, 0, 0.75); /* Semi-transparent black */
    color: var(--color-pure-white);
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Subtle bottom border */
    backdrop-filter: blur(8px); /* Adds the glossy effect */
    -webkit-backdrop-filter: blur(8px); /* For Safari */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  }
  
  /* Light mode navigation */
  .main-navigation.light-mode {
    background-color: rgba(250, 250, 250, 0.85); /* Light, slightly transparent background */
    color: var(--light-text-primary);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 4px 20px var(--light-shadow);
  }
  
  .nav-container {
    max-width: 1600px; /* Allow wider content */
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .nav-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--color-pure-white);
  }

  .logo-svg {
    height: 40px; /* Slightly larger since it's the only element now */
    width: auto;
  }
  
  .nav-right {
    display: flex;
    align-items: center;
  }
  
  .nav-links {
    list-style: none;
    display: flex;
    gap: 1.8rem; /* Increased gap */
    margin: 0;
    padding: 0;
    align-items: center;
  }
  
  .nav-link {
    font-family: var(--font-headline);
    font-weight: 400; /* Changed from 300 to normal weight for better visibility */
    font-size: 0.95rem; /* Slightly smaller */
    text-decoration: none;
    color: rgba(255, 255, 255, 0.85); /* Slightly less bright white */
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.5rem 0.2rem; /* Add some vertical padding for better click area */
    position: relative;
    transition: color 0.3s ease;
  }
  
  /* Light mode nav links */
  .main-navigation.light-mode .nav-link {
    color: var(--light-text-secondary); /* Darker text for light mode */
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px; /* Position it slightly below the text */
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-blood-red);
    transition: width 0.3s ease;
  }
  
  .main-navigation.light-mode .nav-link::after {
    background-color: var(--light-accent-red); /* Red accent for light mode */
  }
  
  .nav-link:hover,
  .nav-link.active {
    color: var(--color-pure-white);
  }
  
  .main-navigation.light-mode .nav-link:hover,
  .main-navigation.light-mode .nav-link.active {
    color: var(--light-text-primary); /* Slightly darker hover/active for light mode */
  }
  
  .nav-link:hover::after,
  .nav-link.active::after {
    width: 100%;
  }
  

  
  /* Mobile Menu Styles */
  .mobile-menu-toggle {
    display: none; /* Hidden by default */
    background: none;
    border: none;
    color: var(--color-pure-white);
    cursor: pointer;
    padding: 0.5rem;
  }
  
  /* Light mode mobile toggle */
  .main-navigation.light-mode .mobile-menu-toggle {
    color: var(--light-text-primary);
  }
  
  .hamburger-icon {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 56px; /* Doubled from 28px to 56px */
    height: 22px;
  }
  
  .hamburger-icon span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: var(--color-pure-white);
    border-radius: 3px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    position: relative;
  }

  /* Make hamburger lines more interesting with gradient and shadow */
  .hamburger-icon span::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, var(--color-pure-white) 0%, rgba(255, 255, 255, 0.8) 50%, var(--color-pure-white) 100%);
    border-radius: 3px;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
  }

  /* Light mode hamburger icon */
  .main-navigation.light-mode .hamburger-icon span {
    background-color: var(--light-text-primary);
  }

  .main-navigation.light-mode .hamburger-icon span::before {
    background: linear-gradient(90deg, var(--light-text-primary) 0%, rgba(26, 26, 26, 0.8) 50%, var(--light-text-primary) 100%);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }

  /* Hamburger animation with more interesting transforms */
  .hamburger-icon.open span:nth-child(1) {
    transform: rotate(45deg) translate(12px, 12px); /* Adjusted for longer lines */
  }
  .hamburger-icon.open span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  .hamburger-icon.open span:nth-child(3) {
    transform: rotate(-45deg) translate(12px, -12px); /* Adjusted for longer lines */
  }

  /* Add subtle hover effect for hamburger */
  .mobile-menu-toggle:hover .hamburger-icon span::before {
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
  }

  .main-navigation.light-mode .mobile-menu-toggle:hover .hamburger-icon span::before {
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  }

  /* Theme toggle button styles */
  .theme-toggle-container {
    display: flex;
    align-items: center;
    margin-left: 1rem;
  }

  .theme-toggle-nav {
    background: none;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .theme-toggle-nav:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.4);
  }

  .theme-icon-nav {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }

  .theme-toggle-nav:hover .theme-icon-nav {
    transform: rotate(15deg);
  }

  /* Light mode theme toggle */
  .main-navigation.light-mode .theme-toggle-nav {
    border-color: rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.1);
  }

  .main-navigation.light-mode .theme-toggle-nav:hover {
    background-color: rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.4);
  }
  
  @media (max-width: 768px) {
    .nav-links {
      display: none; /* Hide desktop links */
      flex-direction: column;
      position: absolute;
      top: 100%; /* Position below the nav bar */
      left: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.85); /* Match the nav bar transparency */
      backdrop-filter: blur(8px); /* Same glossy effect */
      padding: 1rem 0; /* Add some padding */
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }
    
    /* Light mode mobile menu dropdown */
    .main-navigation.light-mode .nav-links {
      background-color: rgba(250, 250, 250, 0.9); /* Lighter background for light mode */
      box-shadow: 0 8px 16px var(--light-shadow);
    }
    
    .nav-links.open {
      display: flex; /* Show when mobile menu is open */
    }
    
    .nav-links li {
      width: 100%;
      text-align: center;
    }
    
    .nav-link {
      display: block;
      padding: 1rem;
      width: 100%;
      font-size: 1.1rem;
    }

    .nav-link::after {
      bottom: 0.5rem; /* Adjust for larger mobile link padding */
    }
    
    .mobile-menu-toggle {
      display: flex; /* Show hamburger */
      align-items: center;
    }

    /* Mobile theme toggle adjustments */
    .theme-toggle-container {
      margin-left: 0;
      padding: 1rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: 0.5rem;
    }

    .main-navigation.light-mode .theme-toggle-container {
      border-top-color: rgba(0, 0, 0, 0.1);
    }

    .theme-toggle-nav {
      margin: 0 auto; /* Center the button in mobile */
    }

    /* Hide theme toggle on desktop when mobile menu is closed */
    .theme-toggle-container {
      display: none;
    }

    .nav-links.open .theme-toggle-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  /* Desktop theme toggle visibility */
  @media (min-width: 769px) {
    .theme-toggle-container {
      display: flex !important; /* Always show on desktop */
    }
  }
</style> 