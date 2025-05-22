<script lang="ts">
  import { onMount, afterUpdate, onDestroy } from 'svelte';

  let typicalButtonClicks = 0;
  let typicalButtonVanished = false;
  let showAtypicalExperience = false;
  let contentVisible = false; // New flag to control visibility
  let isLightMode = false; // New light mode state

  // Placeholder for WebGL loading animation
  let isLoading = true;

  // Property showcase data (would normally come from API/database)
  // const featuredProperties = [ ... ]; // REMOVED

  let atypicalExperienceContainer: HTMLDivElement | null = null; // For binding to the scrollable wrapper
  let initialScrollDone = false; // Flag to ensure scroll-to-bottom runs once

  onMount(() => {
    setTimeout(() => {
      isLoading = false;
    }, 1800);

    if (localStorage.getItem('typicalButtonVanished') === 'true') {
      typicalButtonVanished = true;
    }
    
    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      isLightMode = true;
    }
  });

  afterUpdate(() => {
    // Handle body scroll and scroll-to-bottom for atypical experience
    if (showAtypicalExperience && atypicalExperienceContainer) {
      if (!initialScrollDone) {
        contentVisible = false; // Hide content while scrolling
        // Scroll to the bottom to start the "scroll up" experience
        setTimeout(() => { // Timeout to ensure DOM is fully updated
          if (atypicalExperienceContainer) {
              atypicalExperienceContainer.scrollTop = atypicalExperienceContainer.scrollHeight;
              
              // Only show content after scroll is complete
              setTimeout(() => {
                initialScrollDone = true; // Set flag after first scroll
                contentVisible = true; // Show content after scroll is complete
              }, 300); // Wait a bit after scrolling before showing content
          }
        }, 200); // Longer timeout to ensure DOM is fully ready
      }

      if (typeof document !== 'undefined') {
        document.body.classList.add('scroll-up-mode');
        document.body.classList.remove('no-scroll');
      }
    } else if (typeof document !== 'undefined') {
      document.body.classList.remove('scroll-up-mode');
      if (isLoading || !showAtypicalExperience) {
        document.body.classList.add('no-scroll');
      }
    }
  });
  
  onDestroy(() => {
    // No observer to clean up
    
    // Ensure no-scroll is removed if component is destroyed while active
    if (typeof document !== 'undefined') {
        document.body.classList.remove('no-scroll');
        document.body.classList.remove('scroll-up-mode');
    }
  });

  /** @param {MouseEvent & { currentTarget: HTMLButtonElement }} event */
  function handleTypicalClick(event: MouseEvent & { currentTarget: HTMLButtonElement }) {
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
  }

  function toggleTheme() {
    isLightMode = !isLightMode;
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
  }
</script>

<svelte:head>
    <title>WASAW | Unconventional Real Estate Excellence</title>
</svelte:head>

{#if isLoading}
  <div class="loading-screen full-screen-view" class:light-mode={isLightMode}>
    <div class="breathing-circle"></div>
    <!-- <p class="loading-text"><span>R</span><span>E</span><span>V</span><span>O</span><span>L</span><span>U</span><span>T</span><span>I</span><span>O</span><span>N</span>IZING...</p> --> <!-- REMOVED TEXT -->
    <!-- Placeholder for WebGL Particle Animation -->
  </div>
{:else if !showAtypicalExperience}
  <!-- Theme Toggle Button -->
  <button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
    {#if isLightMode}
      <span class="theme-icon">🌙</span>
    {:else}
      <span class="theme-icon">☀️</span>
    {/if}
  </button>
  
  <div class="decision-gateway full-screen-view" class:light-mode={isLightMode}>
    <div class="intro-text">
      <h2 class="welcome-headline">
        <span class="welcome-text">Welcome to</span>
        <img src="/images/wasaw_red.svg" alt="WASAW Logo" class="headline-logo-svg" />
      </h2>
      <p class="sub-headline">To elevate your real estate journey, we must ask:</p>
    </div>
    <h1 class="main-question">What kind of <span class="highlight-red">real estate agent</span> are you searching for?</h1>
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
        aria-label="Choose Atypical Realtors (WASAW)"
      >
        <span>Atypical Realtors (WASAW)</span>
      </button>
    </div>
  </div>
{:else}
  <!-- ATYPICAL EXPERIENCE - SCROLL UP DESIGN -->
  <div class="atypical-experience-wrapper" class:light-mode={isLightMode} bind:this={atypicalExperienceContainer}>
    <!-- Initial placeholder to ensure proper height for scrolling -->
    <div class="scroll-content-inner" class:content-hidden={!contentVisible}>
      
      <!-- Slide 6 (Topmost, revealed LAST when scrolling up) -->
      <section class="slide slide-visible" id="slide-contact">
        <div class="slide-content">
          <h2 class="slide-title">ASCEND WITH <span class="highlight-red">WASAW.</span></h2>
          <p class="slide-text">Your distinctive real estate experience is waiting. Connect with our triumvirate of experts at WASAW to explore how our unconventional synergy achieves the exceptional, for buyers and sellers alike.</p>
          <a href="/contact" class="cta-button-scroll-up">INITIATE YOUR ASCENSION</a>
        </div>
      </section>

      <!-- Slide 5 -->
      <section class="slide slide-visible" id="slide-process">
        <div class="slide-content">
          <h2 class="slide-title">THE ALCHEMY OF <span class="highlight-red">EXCELLENCE.</span></h2>
          <p class="slide-text">Our unconventional blueprint is forged from proven mastery. We meticulously fuse the pioneering training, robust systems, and tech-forward ethos of <span class="highlight-red">Keller Williams</span> with the deep-rooted market dominance and impeccable client-centric service of <span class="highlight-red">Crye-Leike</span>. This powerful alchemy, amplified by our collective insight as three dedicated professionals at WASAW, creates a bespoke, hyper-efficient process. Expect unparalleled market intelligence and innovative strategies, delivering a seamless experience that consistently transcends the conventional.</p>
          <p class="slide-highlight">INNOVATION & HERITAGE. <span class="highlight-red">YOUR UNFAIR ADVANTAGE WITH WASAW.</span></p>
        </div>
      </section>
      
      <!-- Slide 4 -->
      <section class="slide slide-visible" id="slide-philosophy">
        <div class="slide-content">
          <h2 class="slide-title">THE <span class="highlight-red">WASAW TRIFECTA:</span> YOUR UNRIVALED ALLIANCE.</h2>
          <p class="slide-text">Why settle for a singular perspective when you can command a <span class="highlight-red">triumvirate of dedicated experts at WASAW</span>? We are three seasoned realtors, united by a relentless pursuit of your triumph. Forget the limitations of a solo agent. We offer a collective force, a synergistic partnership singularly focused on elevating your real estate journey, whether you're acquiring your dream sanctuary or strategically divesting your legacy asset.</p>
          <p class="slide-highlight">THREE MINDS. ONE MISSION. <span class="highlight-red">YOUR ULTIMATE SUCCESS WITH WASAW.</span></p>
        </div>
      </section>

      <!-- Slide 3 (Sellers) -->
      <section class="slide slide-visible" id="slide-sellers-success">
        <div class="slide-content">
          <h2 class="slide-title">MAXIMIZE YOUR MOMENTUM: THE <span class="highlight-red">SELLER'S PINNACLE WITH WASAW.</span></h2>
          <p class="slide-text">Command premium value with our strategic market orchestration. We blend innovative exposure with astute pricing, ensuring your property captivates and converts. Expect a seamless journey to an exceptional sale, powered by our collective WASAW expertise.</p>
          <p class="slide-highlight">STRATEGY. EXPOSURE. <span class="highlight-red">RESULTS BY WASAW.</span></p>
        </div>
      </section>

      <!-- Slide 2 (Buyers) -->
      <section class="slide slide-visible" id="slide-buyers-edge">
        <div class="slide-content">
          <h2 class="slide-title">SECURE YOUR SUMMIT: THE <span class="highlight-red">BUYER'S ASCENDANCY WITH WASAW.</span></h2>
          <p class="slide-text">Navigate the market with unparalleled acuity. We arm you with preemptive insights and masterful negotiation, transforming aspiration into acquisition. Your dream property isn't just found; it's conquered with our unified WASAW strength.</p>
          <p class="slide-highlight">INSIGHT. ACCESS. <span class="highlight-red">VICTORY WITH WASAW.</span></p>
        </div>
      </section>

      <!-- Slide 1 (Initially visible at the bottom after auto-scroll) -->
      <section class="slide slide-visible" id="slide-main-hero">
        <div class="slide-content">
          <div class="initial-prompt">
            <p class="scroll-up-notice">PREPARE FOR THE <span class="highlight-red">UNCONVENTIONAL.</span> WELCOME TO <span class="highlight-red">WASAW.</span></p>
            <div class="arrow-up-animated">
              <span>▲</span>
            </div>
          </div>
          <h1 class="atypical-title-scroll-up">WITH WASAW, YOU WON'T BE SCROLLING DOWN. <span class="highlight-red">YOU'LL BE MOVING UP.</span></h1>
          <p class="atypical-subtitle-scroll-up">REAL ESTATE, <span class="highlight-red">REDEFINED BY THREE AT WASAW.</span></p>
        </div>
      </section>

    </div>
  </div>
{/if}

<style>
  :root {
    --base-button-size: clamp(120px, 15vw, 180px); /* Dynamic button size */
    --button-padding: clamp(10px, 2vw, 20px);    /* Dynamic padding */
    --color-slide-bg-alt: #1a1a1a; /* Slightly lighter black/grey for alternate slides */
    --color-olive-green: #001D00; /* Updated to user-specified hex code */
    --color-dark-blue: #000C39; /* Updated to user-specified hex code */
    --color-kw-red: #D40032; /* Approximate Keller Williams Red */
    --color-cl-blue: #0033A0; /* Approximate Crye-Leike Blue - using a slightly brighter one for visibility */
    --grid-size: 40px; /* Size of grid cells */
    --grid-line: 0.5px; /* Thickness of grid lines */
    --grid-color-light: rgba(255, 255, 255, 0.07); /* Light color for grid lines - slightly more visible */
    --grid-color-dark: rgba(0, 0, 0, 0.15); /* Dark color for grid lines (for lighter backgrounds) - more visible */
    
    /* Light mode color variables */
    --light-bg-primary: #fafafa; /* Soft white background */
    --light-bg-secondary: #f5f5f5; /* Slightly darker for contrast */
    --light-text-primary: #1a1a1a; /* Dark text for readability */
    --light-text-secondary: #4a4a4a; /* Slightly lighter for secondary text */
    --light-accent-red: #B8002D; /* Slightly darker red for better contrast on light */
    --light-grid-color: rgba(0, 0, 0, 0.08); /* Subtle grid for light mode */
    --light-shadow: rgba(0, 0, 0, 0.1); /* Subtle shadows */
    --light-sage-green: #E6F7E6; /* Beautiful light sage green */
    --light-powder-blue: #E8F4F8; /* Beautiful light powder blue */
  }

  /* Apply to body when scroll-up mode is active */
  :global(body.scroll-up-mode) {
    overflow: hidden; /* Prevent body scroll, wrapper will scroll */
    overflow-x: hidden; /* Explicitly prevent horizontal scroll */
  }
  :global(body.scroll-up-mode), :global(html) {
    height: 100%; /* Ensure html and body take full height */
    overflow-x: hidden; /* Prevent horizontal scroll on html and body */
  }
  /* Keep existing no-scroll for loading/decision */
  :global(body.no-scroll) {
    overflow: hidden;
  }

  /* Theme Toggle Button */
  .theme-toggle {
    position: fixed;
    top: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .theme-toggle:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  .theme-icon {
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }

  .theme-toggle:hover .theme-icon {
    transform: rotate(15deg);
  }

  /* Light mode toggle adjustments */
  .light-mode .theme-toggle {
    background-color: rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.2);
  }

  .light-mode .theme-toggle:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  /* Hide content until ready */
  .content-hidden {
    opacity: 0;
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
    transition: background-color 0.4s ease, color 0.4s ease;
  }

  /* Light mode styles for full-screen sections */
  .full-screen-view.light-mode {
    background-color: var(--light-bg-primary);
    color: var(--light-text-primary);
  }

  .loading-screen {
    z-index: 10; 
  }

  .breathing-circle {
    width: clamp(200px, 50vw, 400px);
    height: clamp(200px, 50vw, 400px);
    border-radius: 50%;
    background-color: rgba(153, 0, 0, 0.3); 
    position: absolute;
    top: 50%;
    left: 50%;
    animation: combinedCircleAnimation 1.8s ease-in-out forwards; /* Changed animation */
    z-index: 1; /* Ensure it's above anything else in loading screen if needed */
    opacity: 0; /* Start with 0 opacity, animation will fade it in */
  }

  /* Light mode breathing circle */
  .light-mode .breathing-circle {
    background-color: rgba(184, 0, 45, 0.4); /* Adjusted for light mode visibility */
  }

  @keyframes combinedCircleAnimation {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
      box-shadow: 0 0 20px 5px rgba(153, 0, 0, 0.1);
    }
    25% { /* Fade in and initial small breathe */
      opacity: 0.7;
      transform: translate(-50%, -50%) scale(0.8);
      box-shadow: 0 0 30px 10px rgba(153, 0, 0, 0.2), 
                  0 0 50px 20px rgba(153, 0, 0, 0.1);
    }
    50% { /* Mid breathe */
      opacity: 0.9;
      transform: translate(-50%, -50%) scale(1);
      box-shadow: 0 0 50px 20px rgba(153, 0, 0, 0.4), 
                  0 0 80px 40px rgba(153, 0, 0, 0.2);
    }
    75% { /* Start of zoom and fade */
      opacity: 0.6;
      transform: translate(-50%, -50%) scale(0.9);
      box-shadow: 0 0 40px 15px rgba(153, 0, 0, 0.3);
    }
    100% { /* Zoom in fully and fade out */
      opacity: 0;
      transform: translate(-50%, -50%) scale(5); /* Significantly larger scale for zoom */
      box-shadow: 0 0 60px 30px rgba(153, 0, 0, 0.1);
    }
  }

  /* Light mode animation with adjusted shadows */
  .light-mode .breathing-circle {
    animation-name: combinedCircleAnimationLight;
  }

  @keyframes combinedCircleAnimationLight {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
      box-shadow: 0 0 20px 5px rgba(184, 0, 45, 0.15);
    }
    25% { /* Fade in and initial small breathe */
      opacity: 0.8;
      transform: translate(-50%, -50%) scale(0.8);
      box-shadow: 0 0 30px 10px rgba(184, 0, 45, 0.25), 
                  0 0 50px 20px rgba(184, 0, 45, 0.15);
    }
    50% { /* Mid breathe */
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      box-shadow: 0 0 50px 20px rgba(184, 0, 45, 0.5), 
                  0 0 80px 40px rgba(184, 0, 45, 0.25);
    }
    75% { /* Start of zoom and fade */
      opacity: 0.7;
      transform: translate(-50%, -50%) scale(0.9);
      box-shadow: 0 0 40px 15px rgba(184, 0, 45, 0.35);
    }
    100% { /* Zoom in fully and fade out */
      opacity: 0;
      transform: translate(-50%, -50%) scale(5); /* Significantly larger scale for zoom */
      box-shadow: 0 0 60px 30px rgba(184, 0, 45, 0.15);
    }
  }

  .intro-text {
    margin-bottom: clamp(1rem, 3vh, 2rem); 
  }

  .welcome-headline {
    font-family: var(--font-headline);
    font-weight: 700; 
    font-size: clamp(2rem, 6vw, 4.5rem); 
    text-transform: uppercase;
    color: var(--color-pure-white);
    margin: 0 0 0.5rem 0;
    line-height: 1.1;
    display: flex;
    flex-direction: column; /* Stack text and logo vertically */
    align-items: center; /* Center both text and logo */
    justify-content: center;
    gap: 0.3rem; /* Small gap between text and logo */
  }

  .welcome-text {
    display: block; /* Ensure text is on its own line */
  }

  .headline-logo-svg {
    height: clamp(2.5rem, 6vw, 4.5rem); /* Slightly smaller since it's on its own line */
    width: auto;
    /* Remove margin-left since it's now stacked vertically */
    /* filter property removed as we are using pre-colored SVGs */
  }

  .sub-headline {
    font-family: var(--font-body);
    font-size: clamp(0.9rem, 2.5vw, 1.4rem); 
    color: var(--color-pure-white);
    opacity: 0.8;
    margin: 0;
  }

  /* Light mode text adjustments - ALL text elements */
  .light-mode .welcome-headline {
    color: var(--light-text-primary);
  }

  .light-mode .sub-headline {
    color: var(--light-text-secondary);
    /* Remove opacity: 1 - it interferes with animation starting at opacity: 0 */
  }

  .light-mode .main-question {
    color: var(--light-text-primary);
  }

  /* Light mode colors - no !important to avoid animation interference */

  .main-question {
    font-family: var(--font-headline);
    font-weight: 500; 
    font-size: clamp(1.5rem, 4vw, 3rem); 
    color: var(--color-pure-white);
    margin-bottom: clamp(1.5rem, 5vh, 3rem); 
    line-height: 1.3;
    max-width: 90%; 
  }

  .highlight-red {
    color: var(--color-blood-red);
  }

  /* Light mode highlight */
  .light-mode .highlight-red {
    color: var(--light-accent-red);
  }

  .button-container {
    display: flex;
    flex-wrap: wrap; 
    justify-content: center;
    gap: clamp(1rem, 3vw, 2rem); 
    position: relative;
    min-height: calc(var(--base-button-size) + (2 * var(--button-padding)) + 10px); 
    align-items: center;
    width: 100%; 
  }

  .gateway-button {
    width: var(--base-button-size);
    height: var(--base-button-size);
    border-radius: 50%; 
    font-family: var(--font-headline);
    font-weight: 500; 
    font-size: clamp(0.8rem, 1.8vw, 1.2rem); 
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

  /* Light mode button styles */
  .light-mode .atypical-button-styled {
    background-color: var(--light-accent-red);
    color: var(--light-bg-primary);
    border-color: var(--light-accent-red);
  }

  .light-mode .atypical-button-styled:hover {
    background-color: var(--light-bg-primary);
    color: var(--light-accent-red);
    border-color: var(--light-accent-red);
    box-shadow: 0 4px 15px var(--light-shadow);
  }

  /* NEW ATYPICAL SCROLL-UP EXPERIENCE STYLES */
  .atypical-experience-wrapper {
    height: 100vh; /* Occupy full viewport height */
    width: 100vw; /* Ensure full viewport width */
    overflow-y: scroll;
    overflow-x: hidden; /* Prevent horizontal scrolling */
    scroll-snap-type: y mandatory; /* Snap scrolling on Y axis */
    background-color: var(--color-deep-matte-black);
    color: var(--color-pure-white);
    position: relative; /* For z-indexing if Navigation needs to overlay */
  }

  /* Light mode for atypical experience wrapper */
  .atypical-experience-wrapper.light-mode {
    background-color: var(--light-bg-primary);
    color: var(--light-text-primary);
  }
  
  /* Optional: Style for Navigation if it's used within this view, though the HTML structure above does not include it here */
  /* 
  .atypical-experience-wrapper :global(.navigation-component) { 
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  } 
  */

  .scroll-content-inner {
    /* This div is mostly for structure, direct children are slides */
    transition: opacity 0.5s ease-out; /* Smooth transition when showing content */
  }

  /* Grid background pattern */
  .slide {
    height: 100vh; 
    width: 100%;
    max-width: 100vw; /* Prevent slides from exceeding viewport width */
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem clamp(1rem, 5vw, 4rem);
    box-sizing: border-box;
    text-align: center;
    opacity: 0; /* Start with slides invisible */
    transform: translateY(30px); /* Start with slides slightly offset */
    transition: opacity 0.6s ease-out, transform 0.6s ease-out, background-color 0.5s ease-out; /* Faster transitions */
    background-color: var(--color-deep-matte-black); /* Default background */
    position: relative; /* For background positioning */
    overflow-x: hidden; /* Prevent any content from overflowing horizontally */
  }

  /* Basic grid for all slides - will be customized per slide */
  .slide::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(to right, var(--grid-color-light) var(--grid-line), transparent var(--grid-line)),
      linear-gradient(to bottom, var(--grid-color-light) var(--grid-line), transparent var(--grid-line));
    background-size: var(--grid-size) var(--grid-size);
    pointer-events: none; /* Don't block interactions */
    z-index: 1; /* Above background, below content */
    opacity: 0.8; /* More visible effect */
  }

  /* Make hero slide grid more visible */
  #slide-main-hero::before,
  #slide-buyers-edge::before { /* Buyers slide uses default light grid */
    background-image: 
      linear-gradient(to right, var(--grid-color-light) var(--grid-line), transparent var(--grid-line)),
      linear-gradient(to bottom, var(--grid-color-light) var(--grid-line), transparent var(--grid-line));
    background-size: var(--grid-size) var(--grid-size);
    opacity: 0.8; /* Ensure it's visible */
  }

  /* Grid with perspective for philosophy slide */
  #slide-philosophy::before {
    background-image: 
      linear-gradient(to right, var(--grid-color-dark) var(--grid-line), transparent var(--grid-line)),
      linear-gradient(to bottom, var(--grid-color-dark) var(--grid-line), transparent var(--grid-line));
    transform: perspective(1000px) rotateX(5deg);
    background-size: calc(var(--grid-size) * 1.2) calc(var(--grid-size) * 1.2);
    opacity: 0.8; /* Ensure it's visible */
  }

  /* Light mode grid for philosophy slide */
  .light-mode #slide-philosophy::before {
    background-image: 
      linear-gradient(to right, rgba(0, 100, 0, 0.1) var(--grid-line), transparent var(--grid-line)),
      linear-gradient(to bottom, rgba(0, 100, 0, 0.1) var(--grid-line), transparent var(--grid-line));
    opacity: 0.6;
  }

  /* Diagonal grid for process slide */
  #slide-process::before {
    background-image: 
      linear-gradient(45deg, var(--grid-color-dark) var(--grid-line), transparent var(--grid-line)),
      linear-gradient(135deg, var(--grid-color-dark) var(--grid-line), transparent var(--grid-line));
    background-size: calc(var(--grid-size) * 1.5) calc(var(--grid-size) * 1.5);
    opacity: 0.8; /* Ensure it's visible */
  }

  /* Light mode grid for process slide */
  .light-mode #slide-process::before {
    background-image: 
      linear-gradient(45deg, rgba(0, 100, 200, 0.1) var(--grid-line), transparent var(--grid-line)),
      linear-gradient(135deg, rgba(0, 100, 200, 0.1) var(--grid-line), transparent var(--grid-line));
    opacity: 0.6;
  }

  /* Larger grid for contact slide, also sellers slide */
  #slide-contact::before,
  #slide-sellers-success::before { /* Sellers slide uses larger light grid */
    background-size: calc(var(--grid-size) * 2) calc(var(--grid-size) * 2);
    background-image: 
      linear-gradient(to right, var(--grid-color-light) var(--grid-line), transparent var(--grid-line)),
      linear-gradient(to bottom, var(--grid-color-light) var(--grid-line), transparent var(--grid-line));
    opacity: 0.8; /* Ensure it's visible */
  }

  /* Make slides visible by default with this class */
  .slide-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Apply alternate background colors */
  #slide-buyers-edge {
    background-color: var(--color-deep-matte-black); /* Default dark background */
  }
  #slide-sellers-success {
    background-color: var(--color-slide-bg-alt);
  }
  #slide-philosophy {
    background-color: var(--color-olive-green); /* Changed to Olive Green */
  }
  #slide-process { 
    background-color: var(--color-dark-blue);
  }
  #slide-contact {
    background-color: var(--color-slide-bg-alt);
  }

  /* Light mode slide backgrounds - convert black backgrounds to light */
  .light-mode #slide-main-hero {
    background-color: var(--light-bg-primary);
    color: var(--light-text-primary);
  }
  .light-mode #slide-buyers-edge {
    background-color: var(--light-bg-primary);
    color: var(--light-text-primary);
  }
  .light-mode #slide-sellers-success {
    background-color: var(--light-bg-secondary);
    color: var(--light-text-primary);
  }
  .light-mode #slide-contact {
    background-color: var(--light-bg-secondary);
    color: var(--light-text-primary);
  }
  .light-mode #slide-philosophy {
    background-color: var(--light-sage-green);
    color: var(--light-text-primary);
  }
  .light-mode #slide-process {
    background-color: var(--light-powder-blue);
    color: var(--light-text-primary);
  }

  /* Light mode text styling for all slide elements */
  .light-mode .slide-title {
    color: var(--light-text-primary);
  }
  .light-mode .slide-text {
    color: var(--light-text-primary);
  }
  .light-mode .slide-highlight {
    color: var(--light-text-primary);
  }
  .light-mode .atypical-title-scroll-up {
    color: var(--light-text-primary);
  }
  .light-mode .atypical-subtitle-scroll-up {
    color: var(--light-text-primary);
  }
  .light-mode .scroll-up-notice {
    color: var(--light-text-primary);
  }

  /* Ensure slide content is fully visible by default */
  .slide-content {
    max-width: 800px; /* Max width for content within a slide */
    width: 100%;
    box-sizing: border-box; /* Include padding in width calculation */
    /* Remove transforms and opacity changes - all content visible by default */
    transform: translateY(0) !important; /* Force no transform */
    opacity: 1 !important; /* Force full opacity */
    position: relative;
    z-index: 2; /* Above the grid */
    overflow-wrap: break-word; /* Prevent long words from overflowing */
    word-wrap: break-word; /* Legacy support */
  }

  /* Remove animate-in class as it's no longer needed */
  
  /* Remove different animation states for different slides */
  #slide-philosophy .slide-content,
  #slide-process .slide-content,
  #slide-contact .slide-content {
    transform: translateY(0) !important;
    opacity: 1 !important;
    /* No scale changes */
  }

  .initial-prompt {
    margin-bottom: 2rem;
    animation: subtlePulse 2.5s infinite ease-in-out;
  }

  @keyframes subtlePulse {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.02); }
  }

  .scroll-up-notice {
    font-family: var(--font-headline);
    font-weight: 300;
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    font-weight: 600; /* Increased font-weight for more boldness */
  }

  .arrow-up-animated {
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: var(--color-blood-red);
    animation: bounceUp 1.5s infinite;
  }
  
  .arrow-up-animated span {
     display: inline-block; /* Allows transform */
  }

  @keyframes bounceUp {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-15px);
    }
    60% {
      transform: translateY(-7px);
    }
  }

  .atypical-title-scroll-up {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(2.2rem, 6vw, 5rem);
    text-transform: uppercase;
    color: var(--color-pure-white);
    margin: 0 0 0.5rem 0;
    line-height: 1.1;
  }

  .atypical-subtitle-scroll-up {
    font-family: var(--font-headline);
    font-weight: 500; /* Increased from 200 to 500 for better visibility */
    font-size: clamp(1.1rem, 2.5vw, 2rem);
    color: var(--color-pure-white);
    opacity: 1; /* Increased from 0.9 to 1 for full visibility */
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .slide-title {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(2rem, 5vw, 4rem);
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }

  .slide-text {
    font-family: var(--font-body);
    font-size: clamp(1rem, 2.2vw, 1.3rem);
    line-height: 1.8;
    opacity: 0.9;
    margin-bottom: 1.5rem;
  }
  
  .slide-text:last-child {
      margin-bottom: 0;
  }
  
  .slide-highlight {
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-pure-white); /* Default white, use .highlight-red for red parts */
    margin-top: 2rem;
    margin-bottom: 2rem; /* Ensure spacing if it's followed by a button */
  }

  .cta-button-scroll-up {
    display: inline-block;
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: clamp(0.9rem, 1.8vw, 1.1rem);
    color: var(--color-pure-white);
    background-color: transparent;
    border: 2px solid var(--color-blood-red);
    padding: clamp(0.8rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2.5rem);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    transition: all 0.3s ease;
    margin-top: 1rem; /* Spacing from text above */
  }

  .cta-button-scroll-up:hover {
    background-color: var(--color-blood-red);
    color: var(--color-pure-white);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(153, 0, 0, 0.3);
  }

  /* Light mode CTA button */
  .light-mode .cta-button-scroll-up {
    color: var(--light-text-primary);
    border-color: var(--light-accent-red);
  }

  .light-mode .cta-button-scroll-up:hover {
    background-color: var(--light-accent-red);
    color: var(--light-bg-primary);
    box-shadow: 0 10px 20px var(--light-shadow);
  }

  /* Responsive adjustments for new scroll-up design */
  @media (max-width: 768px) {
    .atypical-title-scroll-up {
      font-size: clamp(2rem, 8vw, 3.5rem);
    }
    .atypical-subtitle-scroll-up {
      font-size: clamp(1rem, 4vw, 1.5rem);
    }
    .slide-title {
      font-size: clamp(1.8rem, 7vw, 3rem);
    }
    .slide-text {
      font-size: clamp(0.9rem, 3vw, 1.1rem);
    }
    .slide-highlight {
      font-size: clamp(1rem, 3.5vw, 1.3rem);
    }
    .initial-prompt {
        margin-bottom: 1rem;
    }
    .scroll-up-notice {
        font-size: clamp(0.8rem, 2.5vw, 1rem);
    }
    .arrow-up-animated {
        font-size: clamp(1.8rem, 6vw, 3rem);
    }

  }
  
  /* Keep existing responsive adjustments for parts of the page that were not changed */
   @media (max-width: 480px) {
    .welcome-headline {
      font-size: clamp(1.8rem, 8vw, 3rem);
    }
    
    .main-question {
      font-size: clamp(1.3rem, 6vw, 2.2rem);
    }
    
    /* .section-header was removed, so this rule is no longer needed */
    /* 
    .section-header {
      flex-direction: column;
      align-items: flex-start;
    } 
    */
  }

  /* Decision Gateway Text Animations */
  @keyframes textFadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .welcome-headline,
  .sub-headline,
  .main-question,
  .button-container {
    opacity: 0; /* Start hidden */
    animation-fill-mode: forwards; /* Stay visible after animation */
  }

  /* Apply staggered animations when decision gateway is shown */
  /* These will play after isLoading becomes false */
  .welcome-headline {
    animation: textFadeInUp 0.6s ease-out 0.2s forwards;
  }

  .sub-headline {
    animation: textFadeInUp 0.6s ease-out 0.5s forwards; /* 0.2s (prev end) + 0.3s delay */
  }

  .main-question {
    animation: textFadeInUp 0.6s ease-out 0.8s forwards; /* 0.5s + 0.3s delay */
  }

  .button-container {
    animation: textFadeInUp 0.6s ease-out 1.1s forwards; /* 0.8s + 0.3s delay */
    /* min-height set below to prevent layout shift is still relevant */
  }

  /* Remove separate light mode animations - use same timing for both themes */
  /* End Decision Gateway Text Animations */

  /* Additional Light Mode Responsive Adjustments */
  @media (max-width: 768px) {
    .theme-toggle {
      top: 1.5rem;
      right: 1.5rem;
      width: 45px;
      height: 45px;
    }
    
    .theme-icon {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 480px) {
    .theme-toggle {
      top: 1rem;
      right: 1rem;
      width: 40px;
      height: 40px;
    }
    
    .theme-icon {
      font-size: 1.1rem;
    }
  }

</style> 