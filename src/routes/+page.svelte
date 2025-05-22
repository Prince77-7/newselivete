<script>
  import { onMount } from 'svelte';
  import Navigation from '$lib/components/Navigation.svelte';

  let typicalButtonClicks = 0;
  let typicalButtonVanished = false;
  let showAtypicalExperience = false;

  // Placeholder for WebGL loading animation
  let isLoading = true;

  // Property showcase data (would normally come from API/database)
  const featuredProperties = [
    {
      id: 1,
      title: "Glass Haven",
      location: "Beverly Hills, CA",
      price: "$12,500,000",
      sqft: "8,200",
      beds: 5,
      baths: 7,
      image: "/images/property1.jpg" 
    },
    {
      id: 2,
      title: "Skyline Penthouse",
      location: "Manhattan, NY",
      price: "$8,900,000",
      sqft: "4,100",
      beds: 3,
      baths: 4,
      image: "/images/property2.jpg"
    },
    {
      id: 3,
      title: "Coastal Retreat",
      location: "Malibu, CA",
      price: "$15,750,000",
      sqft: "6,800",
      beds: 6,
      baths: 8,
      image: "/images/property3.jpg"
    }
  ];

  onMount(() => {
    // Simulate loading animation completion
    setTimeout(() => {
      isLoading = false;
    }, 2000); // Max 2 seconds for loading

    // Check localStorage for previous interaction
    if (localStorage.getItem('typicalButtonVanished') === 'true') {
      typicalButtonVanished = true;
    }
  });

  // Reactive statement to control body scroll
  $: if (typeof document !== 'undefined') {
    if (isLoading || !showAtypicalExperience) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  /** @param {MouseEvent & { currentTarget: HTMLButtonElement }} event */
  function handleTypicalClick(event) {
    if (typicalButtonVanished) return;

    typicalButtonClicks++;
    const button = event.currentTarget;

    switch (typicalButtonClicks) {
      case 1:
        // Button slides right with subtle easing
        button.style.transform = 'translateX(50px)';
        button.style.transition = 'transform 0.3s ease-out';
        break;
      case 2:
        // Button jumps to upper corner with bounce effect
        button.style.position = 'absolute'; // Keep this for movement
        button.style.top = 'calc(var(--base-button-size) * 0.2)';
        button.style.left = 'calc(100% - (var(--base-button-size) * 1.5))';
        button.style.transform = 'translateY(-20px) scale(0.8)';
        button.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        setTimeout(() => button.style.transform = 'translateY(0) scale(0.8)', 150);
        break;
      case 3:
        // Button shrinks while moving to bottom left
        button.style.position = 'absolute'; // Ensure it's absolute for positioning
        button.style.top = 'calc(100vh - (var(--base-button-size) * 1.2))';
        button.style.left = 'calc(var(--base-button-size) * 0.2)';
        button.style.transform = 'scale(0.6)';
        button.style.transition = 'all 0.4s ease-in-out';
        break;
      case 4:
        // Button fades to 30% opacity and moves diagonally
        button.style.position = 'absolute'; // Ensure it's absolute
        button.style.opacity = '0.3';
        button.style.top = 'calc(50vh - (var(--base-button-size) * 0.3))';
        button.style.left = 'calc(50vw - (var(--base-button-size) * 0.3))';
        button.style.transform = 'translate(80px, -80px) scale(0.6) rotate(45deg)';
        button.style.transition = 'all 0.5s ease-in';
        break;
      case 5:
        // Button appears to "glitch" then vanishes completely
        button.style.position = 'absolute'; // Ensure it's absolute for final animation
        button.classList.add('glitch');
        setTimeout(() => {
          button.style.display = 'none';
          typicalButtonVanished = true;
          localStorage.setItem('typicalButtonVanished', 'true');
        }, 500); // Glitch duration
        break;
    }
  }

  function handleAtypicalClick() {
    showAtypicalExperience = true;
    console.log("Atypical Experience Activated!");
  }
</script>

{#if isLoading}
  <div class="loading-screen full-screen-view">
    <div class="breathing-circle"></div>
    <p class="loading-text"><span>R</span><span>E</span><span>V</span><span>O</span><span>L</span><span>U</span><span>T</span><span>I</span><span>O</span><span>N</span>IZING...</p>
    <!-- Placeholder for WebGL Particle Animation -->
  </div>
{:else if !showAtypicalExperience}
  <div class="decision-gateway full-screen-view">
    <div class="intro-text">
      <h2 class="welcome-headline">Hey there, <span class="highlight-red">welcome!</span></h2>
      <p class="sub-headline">To elevate your real estate journey, we must ask:</p>
    </div>
    <h1 class="main-question">What kind of <span class="highlight-red">real estate experience</span> are you searching for?</h1>
    <div class="button-container">
      {#if !typicalButtonVanished}
        <button 
          class="gateway-button typical-button-styled" 
          on:click={handleTypicalClick}
          aria-label="Choose Typical Realtors"
        >
          <span>Typical Realtors</span>
        </button>
      {/if}
      <button 
        class="gateway-button atypical-button-styled" 
        on:click={handleAtypicalClick}
        aria-label="Choose Atypical Approach"
      >
        <span>Atypical Approach</span>
      </button>
    </div>
  </div>
{:else}
  <Navigation />
  
  <div class="atypical-experience">
    <header class="hero-section">
      <h1 class="atypical-title">PREPARE FOR THE <span class="highlight-red">UNCONVENTIONAL.</span></h1>
      <p class="atypical-subtitle">REAL ESTATE, <span class="highlight-red">REDEFINED.</span></p>
      <div class="scroll-indicator">
        <span>Scroll to explore</span>
        <div class="arrow-down"></div>
      </div>
    </header>
    
    <section class="property-showcase">
      <div class="section-header">
        <h2>FEATURED <span class="highlight-red">PROPERTIES</span></h2>
        <a href="/properties" class="view-all-link">VIEW ALL PROPERTIES</a>
      </div>
      
      <div class="property-grid">
        {#each featuredProperties as property}
          <div class="property-card">
            <div class="property-image" style="background-image: url({property.image || '/images/placeholder.jpg'})">
              <div class="property-price">{property.price}</div>
            </div>
            <div class="property-details">
              <h3 class="property-title">{property.title}</h3>
              <p class="property-location">{property.location}</p>
              <div class="property-specs">
                <span>{property.beds} BEDS</span>
                <span>{property.baths} BATHS</span>
                <span>{property.sqft} SQ FT</span>
              </div>
              <a href={`/properties/${property.id}`} class="property-link">VIEW DETAILS</a>
            </div>
          </div>
        {/each}
      </div>
    </section>
    
    <section class="about-section">
      <div class="about-content">
        <h2>OUR <span class="highlight-red">APPROACH</span></h2>
        <p>We reject conventional real estate practices that prioritize quick sales over client satisfaction. Our approach focuses on understanding your unique needs and finding properties that truly resonate with your lifestyle.</p>
        <a href="/about" class="about-link">LEARN MORE</a>
      </div>
      <div class="about-image"></div>
    </section>
    
    <section class="contact-teaser">
      <h2>READY FOR A <span class="highlight-red">DIFFERENT</span> EXPERIENCE?</h2>
      <p>Connect with our team of unconventional real estate professionals.</p>
      <a href="/contact" class="contact-button">CONTACT US</a>
    </section>
    
    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-logo">SELIVETE</div>
        <div class="footer-links">
          <a href="/properties">PROPERTIES</a>
          <a href="/about">APPROACH</a>
          <a href="/contact">CONTACT</a>
        </div>
        <div class="footer-social">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Twitter">TW</a>
          <a href="#" aria-label="Facebook">FB</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2023 SELIVETE. All rights reserved.</p>
      </div>
    </footer>
  </div>
{/if}

<style>
  :root {
    --base-button-size: clamp(120px, 15vw, 180px); /* Dynamic button size */
    --button-padding: clamp(10px, 2vw, 20px);    /* Dynamic padding */
  }

  .full-screen-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Fill viewport height */
    width: 100%; /* Fill viewport width */
    overflow: hidden; /* Prevent scrollbars within these sections */
    padding: 2rem; /* Keep some padding */
    box-sizing: border-box; /* Include padding in height/width */
    background-color: var(--color-deep-matte-black);
    color: var(--color-pure-white);
    text-align: center;
    position: relative; /* For stacking context if needed */
  }

  .loading-screen {
    /* Ensure text is above the circle */
    z-index: 10; 
  }

  .breathing-circle {
    width: clamp(200px, 50vw, 400px);
    height: clamp(200px, 50vw, 400px);
    border-radius: 50%;
    background-color: rgba(153, 0, 0, 0.3); /* Blood red with alpha */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: breathe 4s ease-in-out infinite, fadeInCircle 1s ease-out forwards;
    z-index: -1; /* Behind the loading text */
    opacity: 0;
  }

  @keyframes fadeInCircle {
    to {
      opacity: 1;
    }
  }

  @keyframes breathe {
    0%, 100% {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0.5;
      box-shadow: 0 0 30px 10px rgba(153, 0, 0, 0.2), 
                  0 0 50px 20px rgba(153, 0, 0, 0.1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.7;
      box-shadow: 0 0 50px 20px rgba(153, 0, 0, 0.4), 
                  0 0 80px 40px rgba(153, 0, 0, 0.2);
    }
  }

  .loading-text {
    font-family: var(--font-headline);
    font-weight: 700; /* Bold */
    font-size: clamp(2rem, 5vw, 3.5rem); /* Slightly smaller to fit with circle */
    color: var(--color-pure-white);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    position: relative; /* Ensure it's above the circle effectively */
    z-index: 1;
  }
  .loading-text span {
    opacity: 0;
    animation: fadeInLetter 0.2s forwards;
  }
  /* Stagger animation for each letter */
  .loading-text span:nth-child(1) { animation-delay: 0.2s; }
  .loading-text span:nth-child(2) { animation-delay: 0.3s; }
  .loading-text span:nth-child(3) { animation-delay: 0.4s; }
  .loading-text span:nth-child(4) { animation-delay: 0.5s; }
  .loading-text span:nth-child(5) { animation-delay: 0.6s; }
  .loading-text span:nth-child(6) { animation-delay: 0.7s; }
  .loading-text span:nth-child(7) { animation-delay: 0.8s; }
  .loading-text span:nth-child(8) { animation-delay: 0.9s; }
  .loading-text span:nth-child(9) { animation-delay: 1.0s; }
  .loading-text span:nth-child(10) { animation-delay: 1.1s; }
  .loading-text span:nth-child(11) { animation-delay: 1.2s; }


  @keyframes fadeInLetter {
    to {
      opacity: 1;
    }
  }

  .intro-text {
    margin-bottom: clamp(1rem, 3vh, 2rem); /* Responsive margin */
  }

  .welcome-headline {
    font-family: var(--font-headline);
    font-weight: 700; /* Bold */
    font-size: clamp(2rem, 6vw, 4.5rem); /* Adjusted for impact */
    text-transform: uppercase;
    color: var(--color-pure-white);
    margin: 0 0 0.5rem 0;
    line-height: 1.1;
  }

  .sub-headline {
    font-family: var(--font-body);
    font-size: clamp(0.9rem, 2.5vw, 1.4rem); /* Adjusted */
    color: var(--color-pure-white);
    opacity: 0.8;
    margin: 0;
  }

  .main-question {
    font-family: var(--font-headline);
    font-weight: 500; /* Medium */
    font-size: clamp(1.5rem, 4vw, 3rem); /* Adjusted */
    color: var(--color-pure-white);
    margin-bottom: clamp(1.5rem, 5vh, 3rem); /* Responsive margin */
    line-height: 1.3;
    max-width: 90%; /* Prevent very long lines on wide screens */
  }

  .highlight-red {
    color: var(--color-blood-red);
  }

  .button-container {
    display: flex;
    flex-wrap: wrap; 
    justify-content: center;
    gap: clamp(1rem, 3vw, 2rem); /* Responsive gap */
    position: relative;
    /* min-height ensures space for absolutely positioned button later */
    min-height: calc(var(--base-button-size) + (2 * var(--button-padding)) + 10px); /* Added a bit more for safety */
    align-items: center;
    width: 100%; /* Ensure container takes width for centering */
  }

  .gateway-button {
    width: var(--base-button-size);
    height: var(--base-button-size);
    border-radius: 50%; 
    font-family: var(--font-headline);
    font-weight: 500; /* Medium */
    font-size: clamp(0.8rem, 1.8vw, 1.2rem); /* Adjusted button font size */
    text-transform: uppercase;
    cursor: pointer;
    border: 3px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: var(--button-padding);
    box-sizing: border-box;
    transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    letter-spacing: 0.05em;
  }

  .gateway-button span {
    display: block;
    line-height: 1.2;
  }

  .typical-button-styled {
    background-color: var(--color-pure-white);
    color: var(--color-deep-matte-black);
    border-color: var(--color-pure-white);
  }

  .typical-button-styled:hover {
    background-color: #f0f0f0; 
    border-color: #f0f0f0;
    transform: scale(1.05);
  }

  .atypical-button-styled {
    background-color: var(--color-blood-red);
    color: var(--color-pure-white);
    border-color: var(--color-blood-red);
  }

  .atypical-button-styled:hover {
    background-color: var(--color-pure-white);
    color: var(--color-blood-red);
    border-color: var(--color-blood-red);
    transform: scale(1.1);
  }

  .glitch {
    /* This class is added by JS in the handleTypicalClick function (case 5) */
    animation: glitch-animation 0.5s forwards; /* Run once then stop, JS hides it */
    background-color: var(--color-pure-white) !important; 
    color: var(--color-deep-matte-black) !important;
    border-color: var(--color-pure-white) !important;
  }

  @keyframes glitch-animation {
    0% {
      transform: translate(2px, 1px) rotate(0deg) scale(0.6); /* Base scale from previous step */
      opacity: 0.8;
    }
    20% {
      transform: translate(-2px, -3px) rotate(-2deg) scale(0.55);
    }
    40% {
      transform: translate(3px, 2px) rotate(2deg) scale(0.6);
      opacity: 0.5;
    }
    60% {
      transform: translate(-1px, 1px) rotate(-1deg) scale(0.58);
    }
    80% {
      transform: translate(1px, -2px) rotate(1deg) scale(0.56);
      opacity: 0.3;
    }
    100% {
      transform: translate(0px, 0px) rotate(0deg) scale(0.1); /* Vanish small */
      opacity: 0;
    }
  }

  /* Atypical Experience Styling */
  .atypical-experience {
    background-color: var(--color-deep-matte-black);
    color: var(--color-pure-white);
    min-height: 100vh;
  }

  .hero-section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 2rem;
    position: relative;
  }

  .atypical-title {
    font-family: var(--font-headline);
    font-weight: 700; /* Bold */
    font-size: clamp(2.5rem, 7vw, 5.5rem);
    text-transform: uppercase;
    color: var(--color-pure-white);
    margin: 0 0 0.5rem 0;
    line-height: 1.1;
  }

  .atypical-subtitle {
    font-family: var(--font-headline);
    font-weight: 200; /* Ultralight for contrast */
    font-size: clamp(1.2rem, 3vw, 2.2rem);
    color: var(--color-pure-white);
    opacity: 0.9;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    animation: bounce 2s infinite;
  }

  .scroll-indicator span {
    font-family: var(--font-headline);
    font-weight: 200;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }

  .arrow-down {
    width: 20px;
    height: 20px;
    border-right: 2px solid var(--color-pure-white);
    border-bottom: 2px solid var(--color-pure-white);
    transform: rotate(45deg);
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  /* Property Showcase Section */
  .property-showcase {
    padding: 5rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .section-header h2 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    margin: 0;
  }

  .view-all-link {
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 0.9rem;
    color: var(--color-blood-red);
    text-decoration: none;
    border-bottom: 1px solid var(--color-blood-red);
    padding-bottom: 0.2rem;
    transition: all 0.3s ease;
  }

  .view-all-link:hover {
    color: var(--color-pure-white);
    border-color: var(--color-pure-white);
  }

  .property-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .property-card {
    background-color: rgba(20, 20, 20, 0.8);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .property-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
  }

  .property-image {
    height: 220px;
    background-size: cover;
    background-position: center;
    position: relative;
  }

  .property-price {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: var(--color-blood-red);
    color: var(--color-pure-white);
    padding: 0.5rem 1rem;
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 1.1rem;
  }

  .property-details {
    padding: 1.5rem;
  }

  .property-title {
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 1.4rem;
    margin: 0 0 0.3rem 0;
    color: var(--color-pure-white);
  }

  .property-location {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 1rem 0;
  }

  .property-specs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .property-specs span {
    font-family: var(--font-headline);
    font-weight: 200;
    font-size: 0.8rem;
    color: var(--color-pure-white);
  }

  .property-link {
    display: inline-block;
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 0.9rem;
    color: var(--color-blood-red);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .property-link:hover {
    color: var(--color-pure-white);
  }

  /* About Section */
  .about-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 70vh;
  }

  .about-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem;
    background-color: rgba(30, 30, 30, 0.7);
  }

  .about-content h2 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(2rem, 5vw, 3rem);
    margin: 0 0 2rem 0;
  }

  .about-content p {
    font-family: var(--font-body);
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.7;
    margin: 0 0 2rem 0;
    max-width: 600px;
  }

  .about-link {
    align-self: flex-start;
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 0.9rem;
    color: var(--color-blood-red);
    text-decoration: none;
    border: 2px solid var(--color-blood-red);
    padding: 0.8rem 1.5rem;
    transition: all 0.3s ease;
  }

  .about-link:hover {
    background-color: var(--color-blood-red);
    color: var(--color-pure-white);
  }

  .about-image {
    background-image: url('/images/about-image.jpg');
    background-size: cover;
    background-position: center;
  }

  /* Contact Teaser */
  .contact-teaser {
    padding: 7rem 2rem;
    text-align: center;
    background-color: var(--color-blood-red);
  }

  .contact-teaser h2 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin: 0 0 1rem 0;
    color: var(--color-pure-white);
  }

  .contact-teaser p {
    font-family: var(--font-body);
    font-size: clamp(1rem, 2vw, 1.2rem);
    margin: 0 0 2.5rem 0;
    color: var(--color-pure-white);
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  .contact-button {
    display: inline-block;
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 1rem;
    color: var(--color-pure-white);
    text-decoration: none;
    border: 2px solid var(--color-pure-white);
    padding: 1rem 2rem;
    transition: all 0.3s ease;
  }

  .contact-button:hover {
    background-color: var(--color-pure-white);
    color: var(--color-blood-red);
  }

  /* Footer */
  .site-footer {
    background-color: #111;
    padding: 4rem 2rem 2rem;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto 3rem;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .footer-logo {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--color-blood-red);
  }

  .footer-links {
    display: flex;
    gap: 2rem;
  }

  .footer-links a {
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 0.9rem;
    color: var(--color-pure-white);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-links a:hover {
    color: var(--color-blood-red);
  }

  .footer-social {
    display: flex;
    gap: 1.5rem;
  }

  .footer-social a {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--color-pure-white);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-social a:hover {
    color: var(--color-blood-red);
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 2rem;
    text-align: center;
  }

  .footer-bottom p {
    font-family: var(--font-body);
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
  }

  /* Responsive adjustments */
  @media (max-width: 992px) {
    .about-section {
      grid-template-columns: 1fr;
    }
    
    .about-image {
      height: 50vh;
      order: -1;
    }
    
    .about-content {
      padding: 3rem 2rem;
    }
  }
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1.5rem;
    }
    
    .property-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
  
  @media (max-width: 480px) {
    .welcome-headline {
      font-size: clamp(1.8rem, 8vw, 3rem);
    }
    
    .main-question {
      font-size: clamp(1.3rem, 6vw, 2.2rem);
    }
    
    .section-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style> 