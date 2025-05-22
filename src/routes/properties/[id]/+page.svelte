<script>
  import { page } from '$app/stores';
  import Navigation from '$lib/components/Navigation.svelte';
  
  // In a real app, this would come from a database/API
  // For demo purposes, we'll create a static property database
  const propertiesDatabase = [
    {
      id: "1",
      title: "Glass Haven",
      location: "Beverly Hills, CA",
      price: "$12,500,000",
      sqft: "8,200",
      beds: 5,
      baths: 7,
      yearBuilt: 2021,
      description: "A modernist masterpiece perched in the hills with panoramic views of the city and ocean beyond. This architectural triumph features walls of glass that blur the line between indoor and outdoor living, creating a seamless connection with nature. The property boasts a negative-edge pool that appears to float above the cityscape, a home theater, wine cellar, and a primary suite with dual bathrooms and expansive closets.",
      features: [
        "Panoramic city and ocean views",
        "Negative-edge infinity pool",
        "Smart home technology throughout",
        "Wine cellar with temperature control",
        "Home theater with professional acoustics",
        "Chef's kitchen with top-of-line appliances",
        "Private gym with sauna",
        "5-car garage with EV charging",
        "Outdoor kitchen and entertainment area",
        "Lush landscaped gardens"
      ],
      images: [
        "/images/property1.jpg",
        "/images/property1-2.jpg",
        "/images/property1-3.jpg",
        "/images/property1-4.jpg"
      ],
      agent: {
        name: "Alexandra Reynolds",
        phone: "(310) 555-8732",
        email: "alexandra@selivete.com",
        photo: "/images/agent1.jpg"
      }
    },
    {
      id: "2",
      title: "Skyline Penthouse",
      location: "Manhattan, NY",
      price: "$8,900,000",
      sqft: "4,100",
      beds: 3,
      baths: 4,
      yearBuilt: 2019,
      description: "The epitome of luxury urban living with 360-degree views from the heart of Manhattan. This penthouse sits atop one of the city's most prestigious buildings, offering unparalleled luxury and sophistication. Floor-to-ceiling windows showcase breathtaking views of the city skyline, Central Park, and the Hudson River. The residence features a private elevator entry, custom finishes throughout, and a wraparound terrace perfect for entertaining.",
      features: [
        "360° views of Manhattan skyline",
        "Private elevator entry",
        "14-foot ceilings",
        "Custom Italian kitchen",
        "Primary suite with dual walk-in closets",
        "Marble bathrooms with heated floors",
        "Smart home automation system",
        "24-hour doorman and concierge",
        "Wraparound terrace with outdoor kitchen",
        "Access to building amenities including pool and spa"
      ],
      images: [
        "/images/property2.jpg",
        "/images/property2-2.jpg",
        "/images/property2-3.jpg",
        "/images/property2-4.jpg"
      ],
      agent: {
        name: "Jonathan Pierce",
        phone: "(212) 555-1919",
        email: "jonathan@selivete.com",
        photo: "/images/agent2.jpg"
      }
    },
    {
      id: "3",
      title: "Coastal Retreat",
      location: "Malibu, CA",
      price: "$15,750,000",
      sqft: "6,800",
      beds: 6,
      baths: 8,
      yearBuilt: 2018,
      description: "Beachfront living at its finest with direct access to the pristine sands of Malibu. This contemporary masterpiece offers the ultimate California lifestyle with expansive views of the Pacific Ocean from nearly every room. The open-concept design creates a seamless flow between indoor and outdoor spaces, perfect for entertaining. Features include a gourmet kitchen, home theater, wine cellar, and a luxurious primary suite with a private oceanfront terrace.",
      features: [
        "Private beach access",
        "Floor-to-ceiling ocean views",
        "Heated infinity pool and spa",
        "Outdoor entertaining area with fireplace",
        "Chef's kitchen with butler's pantry",
        "Home theater with state-of-the-art sound",
        "Climate-controlled wine cellar",
        "Smart home technology throughout",
        "Rooftop deck with 360° views",
        "Separate guest house"
      ],
      images: [
        "/images/property3.jpg",
        "/images/property3-2.jpg",
        "/images/property3-3.jpg",
        "/images/property3-4.jpg"
      ],
      agent: {
        name: "Sophia Chen",
        phone: "(310) 555-4276",
        email: "sophia@selivete.com",
        photo: "/images/agent3.jpg"
      }
    }
  ];
  
  // Get property ID from URL
  const propertyId = $page.params.id;
  
  // Find property in our database
  const property = propertiesDatabase.find(p => p.id === propertyId);
  
  // State for image gallery
  let currentImageIndex = 0;
  
  function nextImage() {
    if (property) {
      currentImageIndex = (currentImageIndex + 1) % property.images.length;
    }
  }
  
  function prevImage() {
    if (property) {
      currentImageIndex = (currentImageIndex - 1 + property.images.length) % property.images.length;
    }
  }
  
  function setImage(index) {
    currentImageIndex = index;
  }
</script>

<svelte:head>
  <title>{property ? property.title : 'Property'} | SELIVETE</title>
</svelte:head>

<Navigation />

<div class="property-detail-page">
  {#if !property}
    <div class="not-found">
      <h1>Property Not Found</h1>
      <p>We couldn't find the property you're looking for.</p>
      <a href="/properties" class="back-link">View All Properties</a>
    </div>
  {:else}
    <section class="property-hero">
      <div class="image-gallery">
        <div class="main-image" style="background-image: url({property.images[currentImageIndex]})">
          <button class="gallery-nav prev" on:click={prevImage} aria-label="Previous image">
            <span class="arrow-left"></span>
          </button>
          <button class="gallery-nav next" on:click={nextImage} aria-label="Next image">
            <span class="arrow-right"></span>
          </button>
        </div>
        
        <div class="thumbnail-container">
          {#each property.images as image, i}
            <button 
              class="thumbnail" 
              class:active={i === currentImageIndex}
              style="background-image: url({image})" 
              on:click={() => setImage(i)}
              aria-label="View image {i+1}"
            ></button>
          {/each}
        </div>
      </div>
    </section>
    
    <section class="property-content">
      <div class="property-header">
        <div class="title-section">
          <h1>{property.title}</h1>
          <p class="location">{property.location}</p>
        </div>
        <div class="price-section">
          <p class="price">{property.price}</p>
        </div>
      </div>
      
      <div class="property-details-grid">
        <div class="details-card">
          <h2>DETAILS</h2>
          <div class="details-grid">
            <div class="detail-item">
              <span class="detail-label">Bedrooms</span>
              <span class="detail-value">{property.beds}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Bathrooms</span>
              <span class="detail-value">{property.baths}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Square Feet</span>
              <span class="detail-value">{property.sqft}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Year Built</span>
              <span class="detail-value">{property.yearBuilt}</span>
            </div>
          </div>
        </div>
        
        <div class="agent-card">
          <div class="agent-info">
            <img src={property.agent.photo} alt={property.agent.name} class="agent-photo" />
            <div class="agent-details">
              <h3>Listing Agent</h3>
              <p class="agent-name">{property.agent.name}</p>
              <p class="agent-contact">{property.agent.phone}</p>
              <p class="agent-contact">{property.agent.email}</p>
            </div>
          </div>
          <a href="/contact" class="contact-agent-btn">Contact Agent</a>
        </div>
      </div>
      
      <div class="description-section">
        <h2>ABOUT THIS PROPERTY</h2>
        <p>{property.description}</p>
      </div>
      
      <div class="features-section">
        <h2>FEATURES & AMENITIES</h2>
        <ul class="features-list">
          {#each property.features as feature}
            <li>{feature}</li>
          {/each}
        </ul>
      </div>
      
      <div class="cta-section">
        <a href="/contact" class="cta-button">SCHEDULE A VIEWING</a>
        <a href="/properties" class="back-link">Back to Properties</a>
      </div>
    </section>
  {/if}
</div>

<style>
  .property-detail-page {
    background-color: var(--color-deep-matte-black);
    color: var(--color-pure-white);
    min-height: 100vh;
    padding-top: 80px; /* Space for fixed navigation */
  }
  
  /* Not Found */
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5rem 2rem;
    text-align: center;
  }
  
  .not-found h1 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .not-found p {
    font-family: var(--font-body);
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  /* Image Gallery */
  .property-hero {
    width: 100%;
  }
  
  .image-gallery {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .main-image {
    height: 70vh;
    background-size: cover;
    background-position: center;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 1rem;
  }
  
  .gallery-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .gallery-nav:hover {
    background-color: var(--color-blood-red);
  }
  
  .prev {
    left: 20px;
  }
  
  .next {
    right: 20px;
  }
  
  .arrow-left, .arrow-right {
    width: 10px;
    height: 10px;
    border-top: 2px solid white;
    border-right: 2px solid white;
    display: block;
  }
  
  .arrow-left {
    transform: rotate(-135deg);
  }
  
  .arrow-right {
    transform: rotate(45deg);
  }
  
  .thumbnail-container {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 1rem;
  }
  
  .thumbnail {
    width: 100px;
    height: 70px;
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
    border-radius: 4px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: border-color 0.3s ease;
  }
  
  .thumbnail.active {
    border-color: var(--color-blood-red);
  }
  
  /* Property Content */
  .property-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .property-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .title-section h1 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: clamp(2rem, 5vw, 3rem);
    margin: 0 0 0.5rem 0;
    color: var(--color-pure-white);
  }
  
  .location {
    font-family: var(--font-body);
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
  
  .price {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 2rem;
    color: var(--color-blood-red);
    margin: 0;
  }
  
  /* Details Grid */
  .property-details-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .details-card, .agent-card {
    background-color: rgba(30, 30, 30, 0.7);
    border-radius: 8px;
    padding: 2rem;
  }
  
  .details-card h2, .agent-card h3 {
    font-family: var(--font-headline);
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
  
  .details-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .detail-item {
    display: flex;
    flex-direction: column;
  }
  
  .detail-label {
    font-family: var(--font-headline);
    font-weight: 200;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.3rem;
  }
  
  .detail-value {
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 1.3rem;
  }
  
  /* Agent Card */
  .agent-info {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .agent-photo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .agent-details {
    flex: 1;
  }
  
  .agent-name {
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 1.2rem;
    margin: 0 0 0.5rem 0;
  }
  
  .agent-contact {
    font-family: var(--font-body);
    font-size: 0.9rem;
    margin: 0 0 0.3rem 0;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .contact-agent-btn {
    display: block;
    background-color: var(--color-blood-red);
    color: var(--color-pure-white);
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 0.9rem;
    text-align: center;
    text-decoration: none;
    padding: 1rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .contact-agent-btn:hover {
    background-color: #7a0000;
  }
  
  /* Description Section */
  .description-section, .features-section {
    margin-bottom: 3rem;
  }
  
  .description-section h2, .features-section h2 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--color-pure-white);
  }
  
  .description-section p {
    font-family: var(--font-body);
    font-size: 1.1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.9);
  }
  
  /* Features List */
  .features-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    padding: 0;
    list-style-type: none;
  }
  
  .features-list li {
    font-family: var(--font-body);
    font-size: 1rem;
    padding: 0.7rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    padding-left: 1.5rem;
  }
  
  .features-list li::before {
    content: '•';
    color: var(--color-blood-red);
    position: absolute;
    left: 0;
    font-size: 1.2rem;
  }
  
  /* CTA Section */
  .cta-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  
  .cta-button {
    display: inline-block;
    background-color: var(--color-blood-red);
    color: var(--color-pure-white);
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 1rem;
    text-decoration: none;
    padding: 1.2rem 3rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    text-align: center;
  }
  
  .cta-button:hover {
    background-color: #7a0000;
  }
  
  .back-link {
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 0.9rem;
    color: var(--color-pure-white);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .back-link:hover {
    color: var(--color-blood-red);
  }
  
  /* Responsive Adjustments */
  @media (max-width: 992px) {
    .property-details-grid {
      grid-template-columns: 1fr;
    }
    
    .main-image {
      height: 50vh;
    }
  }
  
  @media (max-width: 768px) {
    .property-header {
      flex-direction: column;
    }
    
    .price-section {
      align-self: flex-start;
    }
    
    .features-list {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .main-image {
      height: 40vh;
    }
    
    .property-content {
      padding: 1.5rem;
    }
    
    .details-grid {
      grid-template-columns: 1fr;
    }
  }
</style> 