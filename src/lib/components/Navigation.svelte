<script>
  import { page } from '$app/stores';
  
  // Toggle mobile menu
  let mobileMenuOpen = false;
  
  // Function to toggle menu
  function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
  
  // Close menu when route changes
  $: if ($page.url.pathname) {
    mobileMenuOpen = false;
  }
</script>

<nav class="main-nav">
  <div class="nav-container">
    <a href="/" class="logo">SELIVETE</a>
    
    <button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle menu">
      <div class="menu-bar" class:open={mobileMenuOpen}></div>
    </button>
    
    <div class="nav-links" class:open={mobileMenuOpen}>
      <a href="/properties" class:active={$page.url.pathname === '/properties'}>
        PROPERTIES
      </a>
      <a href="/about" class:active={$page.url.pathname === '/about'}>
        APPROACH
      </a>
      <a href="/contact" class:active={$page.url.pathname === '/contact'}>
        CONTACT
      </a>
    </div>
  </div>
</nav>

<style>
  .main-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
  }
  
  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .logo {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(1.2rem, 2vw, 1.8rem);
    color: var(--color-blood-red);
    text-decoration: none;
    letter-spacing: 0.05em;
  }
  
  .nav-links {
    display: flex;
    gap: clamp(1.5rem, 4vw, 3rem);
  }
  
  .nav-links a {
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: clamp(0.9rem, 1.2vw, 1.1rem);
    color: var(--color-pure-white);
    text-decoration: none;
    transition: color 0.3s ease;
    position: relative;
  }
  
  .nav-links a:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: var(--color-blood-red);
    transition: width 0.3s ease;
  }
  
  .nav-links a:hover, .nav-links a.active {
    color: var(--color-blood-red);
  }
  
  .nav-links a:hover:after, .nav-links a.active:after {
    width: 100%;
  }
  
  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 30px;
    position: relative;
  }
  
  .menu-bar {
    width: 30px;
    height: 2px;
    background-color: var(--color-pure-white);
    position: relative;
    transition: all 0.3s ease;
  }
  
  .menu-bar:before, .menu-bar:after {
    content: '';
    position: absolute;
    width: 30px;
    height: 2px;
    background-color: var(--color-pure-white);
    transition: all 0.3s ease;
  }
  
  .menu-bar:before {
    top: -8px;
  }
  
  .menu-bar:after {
    top: 8px;
  }
  
  .menu-bar.open {
    background-color: transparent;
  }
  
  .menu-bar.open:before {
    transform: rotate(45deg);
    top: 0;
    background-color: var(--color-blood-red);
  }
  
  .menu-bar.open:after {
    transform: rotate(-45deg);
    top: 0;
    background-color: var(--color-blood-red);
  }
  
  /* Mobile adjustments */
  @media (max-width: 768px) {
    .menu-toggle {
      display: block;
      z-index: 110;
    }
    
    .nav-links {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.95);
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
      z-index: 100;
    }
    
    .nav-links.open {
      transform: translateX(0);
    }
    
    .nav-links a {
      font-size: 1.5rem;
      opacity: 0;
      animation: fadeIn 0.5s forwards;
    }
    
    .nav-links.open a:nth-child(1) {
      animation-delay: 0.1s;
    }
    
    .nav-links.open a:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .nav-links.open a:nth-child(3) {
      animation-delay: 0.3s;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style> 