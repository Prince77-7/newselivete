<script>
  import Navigation from '$lib/components/Navigation.svelte';
  
  // Property data (would typically come from an API or database)
  const properties = [
    {
      id: 1,
      title: "Glass Haven",
      location: "Beverly Hills, CA",
      price: "$12,500,000",
      sqft: "8,200",
      beds: 5,
      baths: 7,
      image: "/images/property1.jpg",
      featured: true,
      description: "A modernist masterpiece perched in the hills with panoramic views of the city and ocean beyond."
    },
    {
      id: 2,
      title: "Skyline Penthouse",
      location: "Manhattan, NY",
      price: "$8,900,000",
      sqft: "4,100",
      beds: 3,
      baths: 4,
      image: "/images/property2.jpg",
      featured: true,
      description: "The epitome of luxury urban living with 360-degree views from the heart of Manhattan."
    },
    {
      id: 3,
      title: "Coastal Retreat",
      location: "Malibu, CA",
      price: "$15,750,000",
      sqft: "6,800",
      beds: 6,
      baths: 8,
      image: "/images/property3.jpg",
      featured: true,
      description: "Beachfront living at its finest with direct access to the pristine sands of Malibu."
    },
    {
      id: 4,
      title: "Desert Oasis",
      location: "Scottsdale, AZ",
      price: "$4,350,000",
      sqft: "5,400",
      beds: 4,
      baths: 5,
      image: "/images/property4.jpg",
      featured: false,
      description: "A contemporary masterpiece nestled in the desert landscape with mountain views."
    },
    {
      id: 5,
      title: "Vineyard Estate",
      location: "Napa Valley, CA",
      price: "$7,900,000",
      sqft: "4,800",
      beds: 4,
      baths: 6,
      image: "/images/property5.jpg",
      featured: false,
      description: "A perfect blend of luxury living and wine country charm with private vineyard."
    },
    {
      id: 6,
      title: "Mountain Lodge",
      location: "Aspen, CO",
      price: "$11,200,000",
      sqft: "7,500",
      beds: 5,
      baths: 7,
      image: "/images/property6.jpg",
      featured: false,
      description: "Ski-in/ski-out mountain retreat with breathtaking views of the Rockies."
    },
    {
      id: 7,
      title: "Lakefront Mansion",
      location: "Lake Tahoe, NV",
      price: "$9,800,000",
      sqft: "6,900",
      beds: 6,
      baths: 8,
      image: "/images/property7.jpg",
      featured: false,
      description: "Spectacular waterfront property with private dock and panoramic lake views."
    },
    {
      id: 8,
      title: "Urban Loft",
      location: "Chicago, IL",
      price: "$3,200,000",
      sqft: "3,200",
      beds: 2,
      baths: 3,
      image: "/images/property8.jpg",
      featured: false,
      description: "Industrial-chic loft in a converted historic building with soaring ceilings."
    }
  ];
  
  // Filter state
  let selectedLocation = '';
  let minPrice = 0;
  let maxPrice = 20000000;
  let minBeds = 0;
  
  // Computed filtered properties
  $: filteredProperties = properties.filter(property => {
    const propertyPrice = parseInt(property.price.replace(/\$|,/g, ''));
    const matchesLocation = selectedLocation ? property.location.includes(selectedLocation) : true;
    const matchesPrice = propertyPrice >= minPrice && propertyPrice <= maxPrice;
    const matchesBeds = property.beds >= minBeds;
    
    return matchesLocation && matchesPrice && matchesBeds;
  });
  
  // Available locations for filter
  $: locations = [...new Set(properties.map(p => p.location.split(',')[1].trim()))];
  
  // Handle filter reset
  function resetFilters() {
    selectedLocation = '';
    minPrice = 0;
    maxPrice = 20000000;
    minBeds = 0;
  }
</script>

<svelte:head>
  <title>Properties | SELIVETE</title>
</svelte:head>

<Navigation />

<div class="properties-page">
  <header class="page-header">
    <h1>EXCEPTIONAL <span class="highlight-red">PROPERTIES</span></h1>
    <p class="page-subtitle">Discover our curated collection of extraordinary real estate</p>
  </header>
  
  <div class="properties-container">
    <aside class="filter-sidebar">
      <div class="filter-section">
        <h3>FILTERS</h3>
        
        <div class="filter-group">
          <label for="location">Location</label>
          <select id="location" bind:value={selectedLocation}>
            <option value="">All Locations</option>
            {#each locations as location}
              <option value={location}>{location}</option>
            {/each}
          </select>
        </div>
        
        <div class="filter-group">
          <label for="price-range">Price Range</label>
          <div class="price-inputs">
            <input type="number" id="min-price" bind:value={minPrice} min="0" step="100000" placeholder="Min">
            <span>to</span>
            <input type="number" id="max-price" bind:value={maxPrice} min="0" step="100000" placeholder="Max">
          </div>
        </div>
        
        <div class="filter-group">
          <label for="beds">Minimum Beds</label>
          <select id="beds" bind:value={minBeds}>
            <option value="0">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
          </select>
        </div>
        
        <button class="reset-button" on:click={resetFilters}>Reset Filters</button>
      </div>
    </aside>
    
    <div class="properties-list">
      {#if filteredProperties.length === 0}
        <div class="no-results">
          <p>No properties match your current filters.</p>
          <button class="reset-button" on:click={resetFilters}>Reset Filters</button>
        </div>
      {:else}
        <div class="property-grid">
          {#each filteredProperties as property}
            <div class="property-card">
              <div class="property-image" style="background-image: url({property.image || '/images/placeholder.jpg'})">
                <div class="property-price">{property.price}</div>
                {#if property.featured}
                  <div class="property-featured">FEATURED</div>
                {/if}
              </div>
              <div class="property-details">
                <h3 class="property-title">{property.title}</h3>
                <p class="property-location">{property.location}</p>
                <p class="property-description">{property.description}</p>
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
      {/if}
    </div>
  </div>
</div>

<style>
  .properties-page {
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
  
  .properties-container {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  /* Filter Sidebar */
  .filter-sidebar {
    background-color: rgba(30, 30, 30, 0.7);
    border-radius: 8px;
    padding: 1.5rem;
    height: fit-content;
    position: sticky;
    top: 100px;
  }
  
  .filter-section h3 {
    font-family: var(--font-headline);
    font-weight: 700;
    font-size: 1.3rem;
    margin: 0 0 1.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.5rem;
  }
  
  .filter-group {
    margin-bottom: 1.5rem;
  }
  
  .filter-group label {
    display: block;
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  .filter-group select, 
  .filter-group input {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--color-pure-white);
    padding: 0.7rem;
    border-radius: 4px;
    font-family: var(--font-body);
    font-size: 0.9rem;
  }
  
  .price-inputs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .price-inputs span {
    font-size: 0.8rem;
    opacity: 0.8;
  }
  
  .reset-button {
    background-color: transparent;
    border: 1px solid var(--color-blood-red);
    color: var(--color-blood-red);
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 0.9rem;
    padding: 0.7rem 1rem;
    cursor: pointer;
    width: 100%;
    transition: all 0.3s ease;
    border-radius: 4px;
  }
  
  .reset-button:hover {
    background-color: var(--color-blood-red);
    color: var(--color-pure-white);
  }
  
  /* Properties List */
  .property-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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
  
  .property-featured {
    position: absolute;
    top: 1rem;
    left: 0;
    background-color: var(--color-deep-matte-black);
    color: var(--color-pure-white);
    padding: 0.4rem 1rem;
    font-family: var(--font-headline);
    font-weight: 500;
    font-size: 0.8rem;
    letter-spacing: 0.05em;
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
    margin: 0 0 0.8rem 0;
  }
  
  .property-description {
    font-family: var(--font-body);
    font-size: 0.9rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 1rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
  
  .no-results {
    text-align: center;
    padding: 3rem;
    background-color: rgba(30, 30, 30, 0.3);
    border-radius: 8px;
  }
  
  .no-results p {
    font-family: var(--font-body);
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
  
  .no-results .reset-button {
    display: inline-block;
    width: auto;
    padding: 0.8rem 2rem;
  }
  
  /* Responsive adjustments */
  @media (max-width: 992px) {
    .properties-container {
      grid-template-columns: 1fr;
    }
    
    .filter-sidebar {
      position: static;
      margin-bottom: 2rem;
    }
  }
  
  @media (max-width: 768px) {
    .property-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
  
  @media (max-width: 480px) {
    .page-header {
      padding: 3rem 1rem;
    }
    
    .properties-container {
      padding: 1rem;
    }
  }
</style> 