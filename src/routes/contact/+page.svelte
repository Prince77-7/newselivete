<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  // Contact form state
  let name = '';
  let email = '';
  let phone = '';
  let message = '';
  let selectedAgent = '';
  let formSubmitted = false;
  let formError = false;
  
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

  // Our agents
  const agents = [
    {
      id: "1",
      name: "Waiel Grey",
      title: "Luxury Property Specialist",
      phone: "(310) 555-8732",
      email: "waiel@wasaw.com",
      photo: "/images/agent1.jpg",
      bio: "With over 15 years of experience in luxury real estate, Waiel specializes in high-end properties in Beverly Hills and the surrounding areas, leveraging a unique blend of Keller Williams strategies and Crye-Leike market insight."
    },
    {
      id: "2",
      name: "Albara Al-Shujaa",
      title: "Urban Properties & Investment Expert",
      phone: "(212) 555-1919",
      email: "albara@wasaw.com",
      photo: "/images/agent2.jpg",
      bio: "Albara has unparalleled knowledge of the urban real estate market and investment opportunities, focusing on premier properties and delivering results through a powerful fusion of KW systems and CL client-centric service."
    },
    {
      id: "3",
      name: "Mohamed Aly",
      title: "Coastal & Lifestyle Properties Specialist",
      phone: "(310) 555-4276",
      email: "mohamed@wasaw.com",
      photo: "/images/agent3.jpg",
      bio: "Mohamed has built a reputation for representing the finest coastal and lifestyle properties, with particular expertise in architectural masterpieces and unique estates, utilizing the best of Keller Williams and Crye-Leike methodologies."
    }
  ];
  
  // Form submission handler
  function handleSubmit() {
    if (!name || !email || !message) {
      formError = true;
      return;
    }
    
    // In a real app, this would send data to a server
    console.log('Form submitted:', { name, email, phone, message, selectedAgent });
    
    // Reset form and show success message
    formSubmitted = true;
    formError = false;
    name = '';
    email = '';
    phone = '';
    message = '';
    selectedAgent = '';
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      formSubmitted = false;
    }, 5000);
  }
</script>

<svelte:head>
  <title>Contact | WASAW</title>
</svelte:head>

<!-- Theme Toggle Button -->
<button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
  {#if isLightMode}
    <span class="theme-icon">🌙</span>
  {:else}
    <span class="theme-icon">☀️</span>
  {/if}
</button>

<div class="contact-page" class:light-mode={isLightMode}>
  <header class="page-header">
    <h1><span class="highlight-red">CONNECT</span> WITH US</h1>
    <p class="page-subtitle">Reach out to our team of exceptional real estate professionals at WASAW</p>
  </header>
  
  <div class="contact-container">
    <div class="contact-info">
      <div class="info-block">
        <h2>OFFICE LOCATION</h2>
        <p>123 Luxury Avenue, Suite 4500</p>
        <p>Beverly Hills, CA 90210</p>
      </div>
      
      <div class="info-block">
        <h2>CONTACT DETAILS</h2>
        <p>Phone: (310) 555-7890</p>
        <p>Email: info@wasaw.com</p>
      </div>
      
      <div class="info-block">
        <h2>HOURS</h2>
        <p>Monday - Friday: 9am - 6pm</p>
        <p>Saturday: 10am - 4pm</p>
        <p>Sunday: By Appointment</p>
      </div>
      
      <div class="map-container">
        <!-- In a real app, this would be a Google Maps embed -->
        <div class="map-placeholder">
          <p>MAP LOCATION</p>
        </div>
      </div>
    </div>
    
    <div class="contact-form-wrapper">
      <h2>SEND US A MESSAGE</h2>
      
      {#if formSubmitted}
        <div class="form-success">
          <p>Thank you for reaching out. One of our representatives will contact you shortly.</p>
        </div>
      {:else}
        <form on:submit|preventDefault={handleSubmit} class="contact-form">
          {#if formError}
            <div class="form-error">
              <p>Please fill out all required fields.</p>
            </div>
          {/if}
          
          <div class="form-group">
            <label for="name">Full Name *</label>
            <input 
              type="text" 
              id="name" 
              bind:value={name} 
              placeholder="Your name"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email">Email Address *</label>
            <input 
              type="email" 
              id="email" 
              bind:value={email} 
              placeholder="Your email address"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              bind:value={phone} 
              placeholder="Your phone number (optional)"
            />
          </div>
          
          <div class="form-group">
            <label for="agent">Preferred Agent (Optional)</label>
            <select id="agent" bind:value={selectedAgent}>
              <option value="">No preference</option>
              {#each agents as agent}
                <option value={agent.id}>{agent.name}</option>
              {/each}
            </select>
          </div>
          
          <div class="form-group">
            <label for="message">Message *</label>
            <textarea 
              id="message" 
              bind:value={message} 
              placeholder="Tell us about your real estate needs"
              rows="5"
              required
            ></textarea>
          </div>
          
          <button type="submit" class="submit-button">SEND MESSAGE</button>
        </form>
      {/if}
    </div>
  </div>
  
  <section class="agent-section">
    <h2>OUR <span class="highlight-red">TEAM</span> AT WASAW</h2>
    <div class="agent-grid">
      {#each agents as agent}
        <div class="agent-card">
          <img src={agent.photo} alt={agent.name} class="agent-photo" />
          <div class="agent-details">
            <h3>{agent.name}</h3>
            <p class="agent-title">{agent.title}</p>
            <p class="agent-bio">{agent.bio}</p>
            <div class="agent-contact-info">
              <p>{agent.phone}</p>
              <p>{agent.email}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
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

  .contact-page {
    background-color: var(--color-deep-matte-black);
    color: var(--color-pure-white);
    min-height: 100vh;
    padding-top: 80px; /* Space for fixed navigation */
    transition: background-color 0.4s ease, color 0.4s ease;
  }

  /* Light mode main styling */
  .contact-page.light-mode {
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
  }
  
  .highlight-red {
    color: var(--color-blood-red);
  }

  .light-mode .highlight-red {
    color: var(--light-accent-red);
  }

  /* Fix all text colors in light mode */
  .light-mode .info-block h2 {
    color: var(--light-text-primary);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .light-mode .info-block p {
    color: var(--light-text-primary);
  }

  .light-mode .contact-form-wrapper h2 {
    color: var(--light-text-primary);
  }

  .light-mode .form-group label {
    color: var(--light-text-primary);
  }

  .light-mode .agent-section h2 {
    color: var(--light-text-primary);
  }

  .light-mode .agent-details h3 {
    color: var(--light-text-primary);
  }

  .light-mode .agent-title {
    color: var(--light-accent-red);
  }

  .light-mode .agent-bio {
    color: var(--light-text-primary);
  }

  .light-mode .agent-contact-info {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .light-mode .agent-contact-info p {
    color: var(--light-text-secondary);
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
  
  .contact-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 3rem 2rem;
  }
  
  /* Contact Info */
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .info-block {
    background-color: rgba(30, 30, 30, 0.7);
    border-radius: 8px;
    padding: 1.5rem;
  }

  .light-mode .info-block {
    background-color: var(--light-bg-secondary);
    box-shadow: 0 2px 10px var(--light-shadow);
  }
  
  .info-block h2 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 1.3rem;
    margin: 0 0 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.5rem;
  }
  
  .info-block p {
    font-family: var(--font-body);
    font-size: 1rem;
    margin: 0 0 0.5rem 0;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .map-container {
    margin-top: 1rem;
    flex: 1;
    min-height: 200px;
  }
  
  .map-placeholder {
    background-color: rgba(30, 30, 30, 0.7);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.6);
    font-family: var(--font-headline);
    font-weight: 500;
    border: 1px dashed rgba(255, 255, 255, 0.2);
  }

  .light-mode .map-placeholder {
    background-color: var(--light-bg-secondary);
    color: var(--light-text-secondary);
    border: 1px dashed rgba(0, 0, 0, 0.2);
  }
  
  /* Contact Form */
  .contact-form-wrapper {
    background-color: rgba(30, 30, 30, 0.7);
    border-radius: 8px;
    padding: 2rem;
  }

  .light-mode .contact-form-wrapper {
    background-color: var(--light-bg-secondary);
    box-shadow: 0 2px 10px var(--light-shadow);
  }
  
  .contact-form-wrapper h2 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 1.8rem;
    margin: 0 0 1.5rem 0;
    color: var(--color-pure-white);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--color-pure-white);
    padding: 0.8rem;
    border-radius: 4px;
    font-family: var(--font-body);
    font-size: 1rem;
  }

  .light-mode .form-group input,
  .light-mode .form-group textarea,
  .light-mode .form-group select {
    background-color: var(--light-bg-primary);
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: var(--light-text-primary);
  }
  
    .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .light-mode .form-group input::placeholder,
  .light-mode .form-group textarea::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    outline: none;
    border-color: var(--color-blood-red);
  }

  .light-mode .form-group input:focus,
  .light-mode .form-group textarea:focus,
  .light-mode .form-group select:focus {
    border-color: var(--light-accent-red);
  }
  
    .submit-button {
    background-color: var(--color-blood-red);
    color: var(--color-pure-white);
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 1rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
  }

  .submit-button:hover {
    background-color: #7a0000;
  }

  .light-mode .submit-button {
    background-color: var(--light-accent-red);
  }

  .light-mode .submit-button:hover {
    background-color: #950025;
    box-shadow: 0 4px 15px var(--light-shadow);
  }
  
  .form-success {
    background-color: rgba(0, 153, 0, 0.2);
    border: 1px solid rgba(0, 153, 0, 0.5);
    padding: 1.5rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
  }
  
  .form-success p {
    font-family: var(--font-body);
    font-size: 1rem;
    margin: 0;
    color: #00cc00;
  }
  
  .form-error {
    background-color: rgba(153, 0, 0, 0.2);
    border: 1px solid rgba(153, 0, 0, 0.5);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
  }
  
  .form-error p {
    font-family: var(--font-body);
    font-size: 0.9rem;
    margin: 0;
    color: var(--color-blood-red);
  }
  
  /* Agent Section */
  .agent-section {
    max-width: 1400px;
    margin: 0 auto;
    padding: 3rem 2rem 5rem;
  }
  
  .agent-section h2 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .agent-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }
  
    .agent-card {
    background-color: rgba(30, 30, 30, 0.7);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .agent-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
  }

  .light-mode .agent-card {
    background-color: var(--light-bg-secondary);
    box-shadow: 0 2px 10px var(--light-shadow);
  }

  .light-mode .agent-card:hover {
    box-shadow: 0 15px 30px var(--light-shadow);
  }
  
  .agent-photo {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  
  .agent-details {
    padding: 1.5rem;
  }
  
  .agent-details h3 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0 0 0.3rem 0;
    color: var(--color-pure-white);
  }
  
  .agent-title {
    font-family: var(--font-headline);
    font-weight: 200;
    font-size: 1rem;
    color: var(--color-blood-red);
    margin: 0 0 1rem 0;
  }
  
  .agent-bio {
    font-family: var(--font-body);
    font-size: 0.9rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 1.5rem 0;
  }
  
  .agent-contact-info {
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .agent-contact-info p {
    font-family: var(--font-body);
    font-size: 0.9rem;
    margin: 0 0 0.3rem 0;
    color: rgba(255, 255, 255, 0.7);
  }
  
  /* Responsive Adjustments */
  @media (max-width: 992px) {
    .contact-container {
      grid-template-columns: 1fr;
    }
    
    .agent-grid {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
  }
  
  @media (max-width: 768px) {
    .contact-container {
      padding: 2rem 1.5rem;
    }
    
    .agent-section {
      padding: 2rem 1.5rem 4rem;
    }
  }
  
  @media (max-width: 480px) {
    .page-header {
      padding: 3rem 1rem;
    }
    
    .agent-grid {
      grid-template-columns: 1fr;
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