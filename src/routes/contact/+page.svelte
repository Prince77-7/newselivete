<script lang="ts">
  import { page } from '$app/stores';
  import { themeStore } from '$lib/stores/themeStore';
  
  // Contact form state
  let name = '';
  let email = '';
  let phone = '';
  let message = '';
  let selectedAgent = '';
  let formSubmitted = false;
  let formError = false;
  let isSubmitting = false;
  let errorMessage = '';
  
  // Subscribe to themeStore for isLightMode for local UI elements like the toggle icon
  let isLightModeFromStore: boolean;
  themeStore.subscribe(value => {
    isLightModeFromStore = value;
  });

  function togglePageTheme() {
    themeStore.toggle();
  }

  // Our agents
  const agents = [
    {
      id: "1",
      name: "Waiel Grey",
      title: "Luxury Property Specialist",
      phone: "(310) 555-8732",
      email: "waiel@wasaw.com",
      photo: "/images/agents/agent1.jpg",
      bio: "With over 15 years of experience in luxury real estate, Waiel specializes in high-end properties in Beverly Hills and the surrounding areas, leveraging a unique blend of Keller Williams strategies and Crye-Leike market insight."
    },
    {
      id: "2",
      name: "Albara Al-Shujaa",
      title: "Urban Properties & Investment Expert",
      phone: "(212) 555-1919",
      email: "albara@wasaw.com",
      photo: "/images/agents/agent2.jpg",
      bio: "Albara has unparalleled knowledge of the urban real estate market and investment opportunities, focusing on premier properties and delivering results through a powerful fusion of KW systems and CL client-centric service."
    },
    {
      id: "3",
      name: "Mohamed Aly",
      title: "Coastal & Lifestyle Properties Specialist",
      phone: "(310) 555-4276",
      email: "mohamed@wasaw.com",
      photo: "/images/agents/agent3.jpg",
      bio: "Mohamed has built a reputation for representing the finest coastal and lifestyle properties, with particular expertise in architectural masterpieces and unique estates, utilizing the best of Keller Williams and Crye-Leike methodologies."
    }
  ];
  
  // Form validation
  function validateForm() {
    if (!name.trim()) {
      errorMessage = 'Please enter your full name.';
      return false;
    }
    
    if (!email.trim()) {
      errorMessage = 'Please enter your email address.';
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorMessage = 'Please enter a valid email address.';
      return false;
    }
    
    if (!message.trim()) {
      errorMessage = 'Please enter your message.';
      return false;
    }
    
    if (message.trim().length < 10) {
      errorMessage = 'Please provide a more detailed message (at least 10 characters).';
      return false;
    }
    
    return true;
  }
  
  // Form submission handler
  async function handleSubmit() {
    // Reset previous errors
    formError = false;
    errorMessage = '';
    
    // Validate form
    if (!validateForm()) {
      formError = true;
      return;
    }
    
    // Set loading state
    isSubmitting = true;
    
    try {
      // Find selected agent details
      const selectedAgentDetails = selectedAgent 
        ? agents.find(agent => agent.id === selectedAgent)
        : null;
      
      // Prepare form data for API
      const formData = {
        from_name: name.trim(),
        from_email: email.trim(),
        phone: phone.trim() || '',
        message: message.trim(),
        preferred_agent: selectedAgentDetails ? selectedAgentDetails.name : 'No preference',
        selectedAgentDetails: selectedAgentDetails
      };
      
      // Send to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }
      
      console.log('Emails sent successfully:', result);
      
      // Reset form and show success message
      formSubmitted = true;
      formError = false;
      name = '';
      email = '';
      phone = '';
      message = '';
      selectedAgent = '';
      
      // Reset success message after 8 seconds
      setTimeout(() => {
        formSubmitted = false;
      }, 8000);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      formError = true;
      errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again or contact us directly.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Contact | WASAW</title>
</svelte:head>



<div class="contact-page">
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
              <p>{errorMessage}</p>
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
          
          <button type="submit" class="submit-button" disabled={isSubmitting}>
            {#if isSubmitting}
              <span class="loading-spinner"></span>
              SENDING...
            {:else}
              SEND MESSAGE
            {/if}
          </button>
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
  /* Light mode variables - These should ideally be in app.css or :global scope */
  :root {
    /* --light-bg-primary: #fafafa; */
    /* --light-bg-secondary: #f5f5f5; */
    /* --light-text-primary: #1a1a1a; */
    /* --light-text-secondary: #4a4a4a; */
    /* --light-accent-red: #B8002D; */
    /* --light-shadow: rgba(0, 0, 0, 0.1); */
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

  /* Base Page Styles */
  .contact-page {
    background-color: var(--color-deep-matte-black);
    color: var(--color-pure-white);
    min-height: 100vh;
    padding-top: 80px; /* Space for fixed navigation */
    transition: background-color 0.4s ease, color 0.4s ease;
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
  
  /* Contact Form */
  .contact-form-wrapper {
    background-color: rgba(30, 30, 30, 0.7);
    border-radius: 8px;
    padding: 2rem;
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
  
  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    outline: none;
    border-color: var(--color-blood-red);
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .submit-button:hover:not(:disabled) {
    background-color: #7a0000;
  }
  
  .submit-button:disabled {
    background-color: #666;
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  .loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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

  /* Light Mode Styles for Contact Page */
  /* Applied using global body.light-mode */

  :global(body.light-mode) .contact-page {
    background-color: var(--background);
    color: var(--foreground);
  }

  :global(body.light-mode) .page-header {
    background-color: var(--muted);
    border-bottom: 1px solid var(--border);
  }

  :global(body.light-mode) .page-header h1,
  :global(body.light-mode) .page-header .page-subtitle {
    color: var(--foreground);
  }

  :global(body.light-mode) .highlight-red {
    color: var(--primary);
  }

  :global(body.light-mode) .contact-info h2,
  :global(body.light-mode) .contact-form-wrapper h2 {
    color: var(--foreground);
  }

  :global(body.light-mode) .contact-info p,
  :global(body.light-mode) .contact-form label {
    color: var(--muted-foreground);
  }

  :global(body.light-mode) .contact-info .info-block {
    background-color: var(--card);
    border: 1px solid var(--border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-top: 3px solid var(--primary);
  }

  :global(body.light-mode) .info-block h2 {
    color: var(--foreground);
    border-bottom-color: var(--border);
  }

  :global(body.light-mode) .info-block p {
    color: var(--muted-foreground);
  }

  :global(body.light-mode) .map-placeholder {
    background-color: var(--muted);
    border: 1px solid var(--border);
    color: var(--muted-foreground);
  }

  :global(body.light-mode) .map-placeholder p {
    color: var(--muted-foreground);
  }

  :global(body.light-mode) .contact-form-wrapper {
    background-color: var(--card);
    border: 1px solid var(--border);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  :global(body.light-mode) .contact-form input[type="text"],
  :global(body.light-mode) .contact-form input[type="email"],
  :global(body.light-mode) .contact-form input[type="tel"],
  :global(body.light-mode) .contact-form select,
  :global(body.light-mode) .contact-form textarea {
    background-color: var(--input);
    color: var(--foreground);
    border: 1px solid var(--border);
  }

  :global(body.light-mode) .contact-form input[type="text"]:focus,
  :global(body.light-mode) .contact-form input[type="email"]:focus,
  :global(body.light-mode) .contact-form input[type="tel"]:focus,
  :global(body.light-mode) .contact-form select:focus,
  :global(body.light-mode) .contact-form textarea:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(184, 0, 45, 0.1);
  }

  :global(body.light-mode) .contact-form input[type="text"]::placeholder,
  :global(body.light-mode) .contact-form input[type="email"]::placeholder,
  :global(body.light-mode) .contact-form input[type="tel"]::placeholder,
  :global(body.light-mode) .contact-form textarea::placeholder {
    color: var(--muted-foreground);
  }

  :global(body.light-mode) .contact-form button[type="submit"] {
    background-color: var(--primary);
    color: var(--primary-foreground);
  }

  :global(body.light-mode) .contact-form button[type="submit"]:hover:not(:disabled) {
    background-color: #A30027;
  }

  :global(body.light-mode) .contact-form button[type="submit"]:disabled {
    background-color: var(--muted);
    color: var(--muted-foreground);
  }

  :global(body.light-mode) .form-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    border-left: 4px solid #28a745;
  }

  :global(body.light-mode) .form-error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-left: 4px solid #dc3545;
  }

  :global(body.light-mode) .agent-section {
    background-color: var(--background);
  }

  :global(body.light-mode) .agent-section h2 {
    color: var(--foreground);
  }

  :global(body.light-mode) .agent-card {
    background-color: var(--card);
    border: 1px solid var(--border);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  :global(body.light-mode) .agent-card:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  :global(body.light-mode) .agent-details h3 {
    color: var(--foreground);
  }

  :global(body.light-mode) .agent-title {
    color: var(--primary);
  }

  :global(body.light-mode) .agent-bio {
    color: var(--muted-foreground);
  }

  :global(body.light-mode) .agent-contact-info {
    border-top-color: var(--border);
  }

  :global(body.light-mode) .agent-contact-info p {
    color: var(--muted-foreground);
  }
</style> 