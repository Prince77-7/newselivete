<script lang="ts">
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import Navigation from '$lib/components/Navigation.svelte';

  let typicalButtonClicks = 0;
  let typicalButtonVanished = false;
  let showAtypicalExperience = false;

  // Placeholder for WebGL loading animation
  let isLoading = true;

  // Property showcase data (would normally come from API/database)
  // const featuredProperties = [ ... ]; // REMOVED

  let atypicalExperienceContainer: HTMLDivElement | null = null; // For binding to the scrollable wrapper
  let slideElements: HTMLElement[] = []; // To hold references to slide elements for IntersectionObserver
  let observer: IntersectionObserver | null = null;
  let initialScrollDone = false; // Flag to ensure scroll-to-bottom runs once

  onMount(() => {
    setTimeout(() => {
      isLoading = false;
    }, 1800);

    if (localStorage.getItem('typicalButtonVanished') === 'true') {
      typicalButtonVanished = true;
    }

    // Initialize IntersectionObserver
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            } else {
              // Optional: Remove if you want animations on scroll away and back
              // entry.target.classList.remove('is-visible');
            }
          });
        },
        { threshold: 0.4 } // Trigger when 40% of the slide is visible
      );
    }
  });

  afterUpdate(() => {
    // Handle body scroll and scroll-to-bottom for atypical experience
    if (showAtypicalExperience && atypicalExperienceContainer) {
      if (!initialScrollDone) {
        // Scroll to the bottom to start the "scroll up" experience
        setTimeout(() => { // Timeout to ensure DOM is fully updated
          if (atypicalExperienceContainer) {
              atypicalExperienceContainer.scrollTop = atypicalExperienceContainer.scrollHeight;
              initialScrollDone = true; // Set flag after first scroll
          }
        }, 0);
      }

      if (typeof document !== 'undefined') {
        document.body.classList.add('scroll-up-mode');
        document.body.classList.remove('no-scroll');
      }
      
      // Observe slides if not already observed
      if (observer && slideElements.length > 0) {
        slideElements.forEach(slide => {
          if (slide && !slide.classList.contains('is-visible')) { // Check if already observed/visible might be complex here
             observer?.observe(slide);
          }
        });
      }

    } else if (typeof document !== 'undefined') {
      document.body.classList.remove('scroll-up-mode');
      if (isLoading || !showAtypicalExperience) {
        document.body.classList.add('no-scroll');
      }
    }
  });
  
  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
    // Ensure no-scroll is removed if component is destroyed while active
    if (typeof document !== 'undefined') {
        document.body.classList.remove('no-scroll');
        document.body.classList.remove('scroll-up-mode');
    }
  });

  // Reactive statement to manage observing slides when showAtypicalExperience changes
  // This might be more robust if slideElements are bound directly in an #each, 
  // but with fixed slides, we'll manually populate and observe.
  $: if (showAtypicalExperience && atypicalExperienceContainer) {
    if (observer) { 
      const currentSlides = atypicalExperienceContainer.querySelectorAll('.slide') as NodeListOf<HTMLElement>;
      slideElements = Array.from(currentSlides);
      slideElements.forEach(slide => {
        if (slide) observer?.observe(slide);
      });
    }
  } else if (!showAtypicalExperience) {
    if (observer) { 
        slideElements.forEach(slide => {
            if (slide) observer?.unobserve(slide);
        });
    }
    slideElements = [];
    initialScrollDone = false; // Reset flag when atypical experience is hidden
  }

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
    // console.log("Atypical Experience Activated!"); // Original console log
  }
</script>

{#if isLoading}
  <div class="loading-screen full-screen-view">
    <div class="breathing-circle"></div>
    <!-- <p class="loading-text"><span>R</span><span>E</span><span>V</span><span>O</span><span>L</span><span>U</span><span>T</span><span>I</span><span>O</span><span>N</span>IZING...</p> --> <!-- REMOVED TEXT -->
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
  <!-- ATYPICAL EXPERIENCE - SCROLL UP DESIGN -->
  <div class="atypical-experience-wrapper" bind:this={atypicalExperienceContainer}>
    <div class="scroll-content-inner">
      
      <!-- Slide 4 (Topmost, revealed LAST when scrolling up) -->
      <section class="slide" id="slide-contact">
        <div class="slide-content">
          <h2 class="slide-title">ASCEND TO <span class="highlight-red">EXTRAORDINARY.</span></h2>
          <p class="slide-text">Your distinctive real estate experience is waiting. Connect with us to explore how the unconventional can achieve the exceptional.</p>
          <a href="/contact" class="cta-button-scroll-up">INITIATE THE CONVERSATION</a>
        </div>
      </section>

      <!-- Slide 3 -->
      <section class="slide" id="slide-process">
        <div class="slide-content">
          <h2 class="slide-title">THE <span class="highlight-red">ATYPICAL</span> PATH</h2>
          <p class="slide-text">Forget opaque processes and industry jargon. We champion clarity, insight, and a bespoke strategy meticulously crafted for you. Every step upward is a step toward your vision.</p>
          <p class="slide-highlight">TRANSPARENCY. PRECISION. PARTNERSHIP.</p>
        </div>
      </section>
      
      <!-- Slide 2 -->
      <section class="slide" id="slide-philosophy">
        <div class="slide-content">
          <h2 class="slide-title">BEYOND BRICKS & MORTAR</h2>
          <p class="slide-text">We see more than properties; we see potential. Your aspirations are the blueprint for our approach. This isn't just about transactions, it's about transformation.</p>
          <p class="slide-highlight">YOUR JOURNEY, <span class="highlight-red">ELEVATED.</span></p>
        </div>
      </section>

      <!-- Slide 1 (Initially visible at the bottom after auto-scroll) -->
      <section class="slide hero-slide-scroll-up" id="slide-main-hero">
        <div class="slide-content">
          <div class="initial-prompt">
            <p class="scroll-up-notice">WITH US, YOU WON'T BE SCROLLING DOWN. <span class="highlight-red">YOU'LL BE SCROLLING UP.</span></p>
            <div class="arrow-up-animated">
              <span>▲</span>
            </div>
          </div>
          <h1 class="atypical-title-scroll-up">PREPARE FOR THE <span class="highlight-red">UNCONVENTIONAL.</span></h1>
          <p class="atypical-subtitle-scroll-up">REAL ESTATE, <span class="highlight-red">REDEFINED.</span></p>
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
  }

  /* Apply to body when scroll-up mode is active */
  :global(body.scroll-up-mode) {
    overflow: hidden; /* Prevent body scroll, wrapper will scroll */
  }
  :global(body.scroll-up-mode), :global(html) {
    height: 100%; /* Ensure html and body take full height */
  }
  /* Keep existing no-scroll for loading/decision */
  :global(body.no-scroll) {
    overflow: hidden;
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
    /* transform: translate(-50%, -50%); */ /* Initial transform handled by keyframes */
    animation: combinedCircleAnimation 1.8s ease-in-out forwards; /* Changed animation */
    z-index: 1; /* Ensure it's above anything else in loading screen if needed */
    opacity: 0; /* Start with 0 opacity, animation will fade it in */
  }

  /* @keyframes fadeInCircle { -- No longer needed separately
    to {
      opacity: 1;
    }
  } */

  /* @keyframes breathe { -- Combined into new animation
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
  } */

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
  }

  .sub-headline {
    font-family: var(--font-body);
    font-size: clamp(0.9rem, 2.5vw, 1.4rem); 
    color: var(--color-pure-white);
    opacity: 0.8;
    margin: 0;
  }

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
    animation: glitch-animation 0.5s forwards; 
    background-color: var(--color-pure-white) !important; 
    color: var(--color-deep-matte-black) !important;
    border-color: var(--color-pure-white) !important;
  }

  @keyframes glitch-animation {
    0% {
      transform: translate(2px, 1px) rotate(0deg) scale(0.6); 
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
      transform: translate(0px, 0px) rotate(0deg) scale(0.1); 
      opacity: 0;
    }
  }

  /* NEW ATYPICAL SCROLL-UP EXPERIENCE STYLES */
  .atypical-experience-wrapper {
    height: 100vh; /* Occupy full viewport height */
    overflow-y: scroll;
    scroll-snap-type: y mandatory; /* Snap scrolling on Y axis */
    background-color: var(--color-deep-matte-black);
    color: var(--color-pure-white);
    position: relative; /* For z-indexing if Navigation needs to overlay */
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
  }

  .slide {
    height: 100vh; 
    width: 100%;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem clamp(1rem, 5vw, 4rem);
    box-sizing: border-box;
    text-align: center;
    /* opacity: 0; */ /* Temporarily commented out for debugging */
    /* transform: translateY(30px); */ /* Temporarily commented out for debugging */
    /* transition: opacity 0.8s ease-out, transform 0.8s ease-out, background-color 0.5s ease-out; */ /* Temporarily commented out for debugging */
    background-color: var(--color-deep-matte-black); /* Default background */
    opacity: 1; /* DEBUG: Make slides visible by default */
    transform: translateY(0); /* DEBUG: Reset transform */
  }

  /* Apply alternate background colors */
  #slide-philosophy {
    background-color: var(--color-olive-green); /* Changed to Olive Green */
  }
  #slide-process { /* Third slide */
    background-color: var(--color-dark-blue);
  }
  #slide-contact {
    background-color: var(--color-slide-bg-alt);
  }

  /* Specific override for initial slide if needed, though general .slide change should cover it */
  .hero-slide-scroll-up {
     /* opacity: 1 !important; */ /* Ensure the first slide is definitely visible - REMOVE THIS DEBUG CODE */
     /* transform: translateY(0) !important; */ /* REMOVE THIS DEBUG CODE */
  }
  
  .slide.is-visible {
    opacity: 1;
    transform: translateY(0);
    /* Transition will be re-enabled after basic visibility is confirmed - This comment is now obsolete */
  }

  .slide-content {
    max-width: 800px; /* Max width for content within a slide */
    width: 100%;
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
    font-weight: 200;
    font-size: clamp(1.1rem, 2.5vw, 2rem);
    color: var(--color-pure-white);
    opacity: 0.9;
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
  /* End Decision Gateway Text Animations */

</style> 