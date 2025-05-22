<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  // Light mode state
  let isLightMode = false;

  onMount(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      isLightMode = true;
    }
  });

  function toggleTheme() {
    isLightMode = !isLightMode;
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
  }
  
  // Data for approach sections
  const approachSections = [
    {
      title: "The Power of Three: A Client-Centric Triumvirate",
      description: "We are not solo agents; we are a dedicated triumvirate. This unique team structure ensures you receive unparalleled attention, diverse expertise, and a truly bespoke service meticulously tailored to your individual aspirations, whether buying or selling.",
      icon: "🤝"
    },
    {
      title: "Radical Transparency: Your Foundation of Trust",
      description: "Our commitment to absolute transparency shatters industry norms. We provide exhaustive insights and unvarnished truths about every property and process step, empowering you with the clarity needed for decisive, fully-informed decisions.",
      icon: "💎"
    },
    {
      title: "The KW/CL Blueprint: Innovation Meets Legacy",
      description: "Our distinct advantage lies in our alchemic blend: the pioneering systems and tech-forward strategies of Keller Williams fused with Crye-Leike's deep market mastery and client-first heritage. This synergy creates your unfair advantage in the market.",
      icon: "🔗"
    },
    {
      title: "Strategic Acumen & Architectural Insight",
      description: "Leveraging our collective expertise, which includes keen architectural understanding and design foresight, we unlock hidden potential and identify opportunities others miss. This elevates your search or sale from transactional to transformational.",
      icon: "🏛️"
    }
  ];
  
  // Team values
  const values = [
    {
      title: "Unyielding Integrity",
      description: "Honesty is our bedrock. We champion your best interests with unwavering ethical standards, even if it challenges a conventional sale."
    },
    {
      title: "Synergistic Innovation",
      description: "Fueled by our collective creativity and the dynamic KW/CL framework, we relentlessly pioneer superior real estate experiences."
    },
    {
      title: "Collective Excellence",
      description: "As a unified team, we hold ourselves accountable to the highest echelons of performance, delivering exceptional outcomes consistently."
    },
    {
      title: "Your Definitive Success",
      description: "Your triumph is our ultimate metric. We leverage our combined strength and unique methodology to ensure your goals are not just met, but exceeded."
    }
  ];
</script>

<svelte:head>
  <title>Our Unconventional Advantage | WASAW</title>
</svelte:head>

<!-- Theme Toggle Button -->
<button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
  {#if isLightMode}
    <span class="theme-icon">🌙</span>
  {:else}
    <span class="theme-icon">☀️</span>
  {/if}
</button>

<div class="about-page" class:light-mode={isLightMode}>
  <header class="page-header">
    <h1>OUR <span class="highlight-red">UNCONVENTIONAL<br class="mobile-break"> ADVANTAGE</span></h1>
    <p class="page-subtitle">Discover how our dedicated triumvirate of realtors and our unique KW/CL synergy deliver unparalleled results for buyers and sellers at WASAW.</p>
  </header>
  
  <section class="mission-section">
    <div class="mission-content">
      <h2>OUR <span class="highlight-red">MISSION:</span> YOUR TRIUMPH, AMPLIFIED.</h2>
      <p>
        At WASAW, our mission is to revolutionize your real estate journey. We operate as a <span class="highlight-red">cohesive team of three seasoned professionals</span>, not as individual agents. This collective force is dedicated to transforming the often-impersonal transactional process into a strategic, bespoke experience, meticulously tailored to your unique vision and lifestyle—whether you're buying your dream home or maximizing the sale of your valued property.
      </p>
      <p>
        We reject the conventional, sales-driven model. Instead, we champion your ambitions by leveraging our <span class="highlight-red">powerful fusion of Keller Williams' innovative systems and Crye-Leike's market-leading expertise</span>. This client-centric paradigm, built on radical transparency and collective mastery, ensures your real estate goals are not just met, but decisively exceeded.
      </p>
    </div>
    <div class="mission-image">
      <!-- This would be an actual image in production -->
    </div>
  </section>
  
  <section class="approach-section">
    <h2>THE <span class="highlight-red">WASAW</span> DIFFERENCE: HOW WE ELEVATE YOUR EXPERIENCE</h2>
    <div class="approach-grid">
      {#each approachSections as section, i}
        <div class="approach-card" style="animation-delay: {i * 0.1}s">
          <div class="approach-icon">{section.icon}</div>
          <h3>{section.title}</h3>
          <p>{section.description}</p>
        </div>
      {/each}
    </div>
  </section>
  
  <section class="values-section">
    <div class="values-content">
      <h2>OUR <span class="highlight-red">CORE TENETS:</span> THE FOUNDATION OF OUR PARTNERSHIP</h2>
      <div class="values-grid">
        {#each values as value, i}
          <div class="value-item">
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <section class="story-section">
    <div class="story-content">
      <h2>OUR <span class="highlight-red">GENESIS:</span> FORGED FROM EXPERIENCE, DRIVEN BY VISION</h2>
      <div class="story-text">
        <p>
          WASAW was born from a shared conviction among three industry veterans who saw a profound opportunity to redefine real estate excellence. With decades of combined experience navigating the complexities of the market, often within the frameworks of Keller Williams and Crye-Leike, we recognized the limitations of traditional, siloed approaches.
        </p>
        <p>
          We envisioned a new paradigm: a <span class="highlight-red">synergistic team of three</span>, where collective wisdom, diverse strengths, and a shared commitment to client advocacy would form the cornerstone of our practice. Our unconventional model strategically integrates the pioneering spirit and robust systems of <span class="highlight-red">Keller Williams</span> with the established market leadership and unparalleled client service of <span class="highlight-red">Crye-Leike</span>, creating a potent, client-focused force.
        </p>
        <p>
          Today, WASAW stands as a testament to this vision—a boutique force renowned for its innovative methodology and unwavering dedication to achieving superior outcomes. We are not just agents; we are your strategic partners, your advocates, your <span class="highlight-red">triumvirate of trust</span>, committed to transforming your real estate ambitions into resounding successes.
        </p>
      </div>
    </div>
  </section>
  
  <section class="cta-section">
    <h2>EXPERIENCE THE POWER OF <span class="highlight-red">THREE.</span></h2>
    <p>Connect with our dedicated team at WASAW and discover your unconventional path to real estate success.</p>
    <a href="/contact" class="cta-button">UNLOCK YOUR ADVANTAGE</a>
  </section>
</div>

<style>
  /* Light mode variables */
  :root {
    --light-bg-primary: #fafafa;
    --light-bg-secondary: #f5f5f5;
    --light-text-primary: #1a1a1a;
    --light-text-secondary: #4a4a4a;
    --light-accent-red: #B8002D;
    --light-shadow: rgba(0, 0, 0, 0.1);
    --light-sage-green: #E6F7E6;
    --light-powder-blue: #E8F4F8;
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

  .about-page {
    background-color: var(--color-deep-matte-black);
    color: var(--color-pure-white);
    min-height: 100vh;
    padding-top: 80px; /* Space for fixed navigation */
    transition: background-color 0.4s ease, color 0.4s ease;
  }

  /* Light mode main styling */
  .about-page.light-mode {
    background-color: var(--light-bg-primary);
    color: var(--light-text-primary);
  }
  
  .page-header {
    text-align: center;
    padding: 5rem 2rem;
    background-color: rgba(20, 20, 20, 0.8);
  }

  .light-mode .page-header {
    background-color: var(--light-bg-secondary);
  }
  
  .page-header h1 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin: 0 0 1rem 0;
    word-wrap: break-word;
    max-width: 100%;
    padding: 0 0.5rem;
  }
  
  .mobile-break {
    display: none;
  }
  
  .highlight-red {
    color: var(--color-blood-red);
  }

  .light-mode .highlight-red {
    color: var(--light-accent-red);
  }

  /* Fix all text colors in light mode */
  .light-mode .mission-content p,
  .light-mode .story-text p {
    color: var(--light-text-primary);
  }

  .light-mode .approach-card h3 {
    color: var(--light-accent-red);
  }

  .light-mode .approach-card p {
    color: var(--light-text-primary);
  }

  .light-mode .value-item h3 {
    color: var(--light-text-primary);
  }

  .light-mode .value-item p {
    color: var(--light-text-primary);
  }
  
  .page-subtitle {
    font-family: var(--font-headline);
    font-weight: 200;
    font-size: clamp(1rem, 2vw, 1.4rem);
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
  }

  .light-mode .page-subtitle {
    color: var(--light-text-secondary);
    opacity: 1;
  }
  
  /* Mission Section */
  .mission-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 1400px;
    margin: 0 auto;
    padding: 5rem 2rem;
  }
  
  .mission-content {
    padding-right: 3rem;
  }
  
  .mission-content h2, 
  .approach-section h2, 
  .values-content h2, 
  .story-content h2 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(2rem, 4vw, 2.5rem);
    margin: 0 0 2rem 0;
  }
  
  .mission-content p {
    font-family: var(--font-body);
    font-size: clamp(1rem, 1.5vw, 1.1rem);
    line-height: 1.7;
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .mission-image {
    background-color: rgba(30, 30, 30, 0.7);
    background-image: url('/images/about-mission.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 8px;
  }
  
  /* Approach Section */
  .approach-section {
    background-color: rgba(15, 15, 15, 0.7);
    padding: 5rem 2rem;
    text-align: center;
  }

  .light-mode .approach-section {
    background-color: var(--light-bg-secondary);
  }
  
  .approach-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .approach-card {
    background-color: rgba(30, 30, 30, 0.7);
    border-radius: 8px;
    padding: 2rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: fadeInUp 0.5s ease forwards;
    opacity: 0;
    transform: translateY(20px);
  }

  .light-mode .approach-card {
    background-color: var(--light-bg-primary);
    box-shadow: 0 2px 10px var(--light-shadow);
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .approach-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }

  .light-mode .approach-card:hover {
    box-shadow: 0 15px 30px var(--light-shadow);
  }
  
  .approach-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .approach-card h3 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 1.3rem;
    margin: 0 0 1rem 0;
    color: var(--color-blood-red);
  }
  
  .approach-card p {
    font-family: var(--font-body);
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
  }
  
  /* Values Section */
  .values-section {
    max-width: 1400px;
    margin: 0 auto;
    padding: 5rem 2rem;
  }
  
  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }
  
  .value-item {
    background-color: rgba(30, 30, 30, 0.7);
    border-radius: 8px;
    padding: 1.5rem;
    border-left: 3px solid var(--color-blood-red);
  }

  .light-mode .value-item {
    background-color: var(--light-bg-secondary);
    border-left: 3px solid var(--light-accent-red);
    box-shadow: 0 2px 10px var(--light-shadow);
  }
  
  .value-item h3 {
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 1.3rem;
    margin: 0 0 0.8rem 0;
    color: var(--color-pure-white);
  }
  
  .value-item p {
    font-family: var(--font-body);
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
  
  /* Story Section */
  .story-section {
    background-color: rgba(15, 15, 15, 0.7);
    padding: 5rem 2rem;
  }

  .light-mode .story-section {
    background-color: var(--light-bg-secondary);
  }
  
  .story-content {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .story-text p {
    font-family: var(--font-body);
    font-size: clamp(1rem, 1.5vw, 1.1rem);
    line-height: 1.7;
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.9);
  }
  
  /* CTA Section */
  .cta-section {
    background-color: var(--color-blood-red);
    padding: 5rem 2rem;
    text-align: center;
  }

  .light-mode .cta-section {
    background-color: var(--light-accent-red);
  }
  
  .cta-section h2 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    margin: 0 0 1rem 0;
  }
  
  .cta-section p {
    font-family: var(--font-body);
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    margin: 0 0 2rem 0;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .cta-button {
    display: inline-block;
    background-color: var(--color-pure-white);
    color: var(--color-blood-red);
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 1rem;
    text-decoration: none;
    padding: 1.2rem 3rem;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .cta-button:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transform: translateY(-3px);
  }
  
  /* Responsive Adjustments */
  @media (max-width: 992px) {
    .mission-section {
      grid-template-columns: 1fr;
    }
    
    .mission-content {
      padding-right: 0;
      margin-bottom: 2rem;
    }
    
    .mission-image {
      height: 300px;
    }
  }
  
  @media (max-width: 768px) {
    .approach-grid, .values-grid {
      grid-template-columns: 1fr;
    }
    
    .page-header, .mission-section, .approach-section, .values-section, .story-section {
      padding: 3rem 1.5rem;
    }
    
    .cta-section {
      padding: 3rem 1.5rem;
    }
    
    .mobile-break {
      display: inline;
    }
    
    .page-header h1 {
      font-size: clamp(2rem, 8vw, 3rem);
      line-height: 1.2;
    }
  }
  
  @media (max-width: 480px) {
    .page-header {
      padding: 3rem 1rem;
    }
    
    .page-header h1 {
      font-size: clamp(1.8rem, 7vw, 2.5rem);
    }
    
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