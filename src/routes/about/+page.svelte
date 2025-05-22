<script>
  import Navigation from '$lib/components/Navigation.svelte';
  
  // Data for approach sections
  const approachSections = [
    {
      title: "Client-Focused Experience",
      description: "We reject the conventional approach of rushing clients through properties to maximize sales. Instead, we take the time to understand your unique needs, lifestyle, and aspirations, ensuring every property we show you is a potential match.",
      icon: "🔍"
    },
    {
      title: "Transparency in All Dealings",
      description: "Unlike traditional real estate practices that often hide issues to make a sale, we believe in complete transparency. We'll provide comprehensive information about every property, including potential concerns, ensuring you make fully informed decisions.",
      icon: "💎"
    },
    {
      title: "Architectural Expertise",
      description: "Our team includes specialists with backgrounds in architecture and design who can help you see beyond the current state of a property to its full potential. We provide insights on structural integrity, renovation possibilities, and design opportunities.",
      icon: "🏛️"
    },
    {
      title: "Technological Innovation",
      description: "We leverage cutting-edge technology to enhance your property search, from immersive virtual tours that save you time to detailed analytics that help you understand market trends and property values in depth.",
      icon: "💻"
    }
  ];
  
  // Team values
  const values = [
    {
      title: "Integrity",
      description: "We believe in honesty above all else, even when it means losing a sale."
    },
    {
      title: "Innovation",
      description: "We constantly seek new ways to improve the real estate experience."
    },
    {
      title: "Excellence",
      description: "We hold ourselves to the highest standards in everything we do."
    },
    {
      title: "Client Success",
      description: "Your satisfaction and successful outcome is our primary measure of success."
    }
  ];
</script>

<svelte:head>
  <title>Our Approach | SELIVETE</title>
</svelte:head>

<Navigation />

<div class="about-page">
  <header class="page-header">
    <h1>OUR <span class="highlight-red">APPROACH</span></h1>
    <p class="page-subtitle">Revolutionizing real estate through transparency, expertise, and a focus on your unique needs</p>
  </header>
  
  <section class="mission-section">
    <div class="mission-content">
      <h2>OUR <span class="highlight-red">MISSION</span></h2>
      <p>
        At SELIVETE, we're driven by a singular mission: to transform the real estate experience from a 
        transactional process into a meaningful journey tailored to your unique vision and lifestyle. 
        We believe that finding the perfect property is about more than square footage and amenities—it's 
        about discovering a space that resonates with who you are and who you aspire to be.
      </p>
      <p>
        We reject the conventional sales-first approach that has dominated real estate for decades. 
        Instead, we place your needs at the center of everything we do, creating a revolutionary 
        client experience built on transparency, expertise, and genuine connection.
      </p>
    </div>
    <div class="mission-image">
      <!-- This would be an actual image in production -->
    </div>
  </section>
  
  <section class="approach-section">
    <h2>THE <span class="highlight-red">ATYPICAL</span> DIFFERENCE</h2>
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
      <h2>OUR <span class="highlight-red">VALUES</span></h2>
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
      <h2>OUR <span class="highlight-red">STORY</span></h2>
      <div class="story-text">
        <p>
          SELIVETE was founded in 2020 by a group of industry veterans who had grown disillusioned 
          with the traditional real estate model. After decades of collective experience at some of 
          the world's most prestigious firms, they recognized a fundamental disconnect between what 
          clients truly need and what the industry was providing.
        </p>
        <p>
          The founding team envisioned a new approach—one that would challenge industry norms and 
          prioritize client relationships over transaction volume. They assembled a diverse team of 
          experts not just in real estate, but in architecture, design, finance, and technology to 
          create a holistic service that addresses every aspect of the property journey.
        </p>
        <p>
          Today, SELIVETE has grown into a boutique agency known for its revolutionary approach and 
          unwavering commitment to client success. We remain dedicated to our founding vision: transforming 
          real estate into an experience that's as personal and unique as the properties we represent.
        </p>
      </div>
    </div>
  </section>
  
  <section class="cta-section">
    <h2>READY TO EXPERIENCE THE <span class="highlight-red">DIFFERENCE?</span></h2>
    <p>Connect with our team and discover a new approach to real estate.</p>
    <a href="/contact" class="cta-button">CONTACT US</a>
  </section>
</div>

<style>
  .about-page {
    background-color: var(--color-deep-matte-black);
    color: var(--color-pure-white);
    min-height: 100vh;
    padding-top: 80px; /* Space for fixed navigation */
  }
  
  .page-header {
    text-align: center;
    padding: 5rem 2rem;
    background-color: rgba(20, 20, 20, 0.8);
  }
  
  .page-header h1 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin: 0 0 1rem 0;
  }
  
  .highlight-red {
    color: var(--color-blood-red);
  }
  
  .page-subtitle {
    font-family: var(--font-headline);
    font-weight: 200;
    font-size: clamp(1rem, 2vw, 1.4rem);
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
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
  }
  
  @media (max-width: 480px) {
    .page-header {
      padding: 3rem 1rem;
    }
  }
</style> 