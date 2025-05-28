<script lang="ts">
  import { onMount } from 'svelte';
  import { themeStore } from '$lib/stores/themeStore';

  // Theme store subscription
  let isLightMode: boolean;
  themeStore.subscribe(value => {
    isLightMode = value;
  });

  // Game state
  let currentPropertyIndex = 0;
  let currentImageIndex = 0;
  let guessAttempts = 0;
  let userGuess = '';
  let gameState: 'guessing' | 'feedback' | 'revealed' = 'guessing';
  let feedbackMessage = '';
  let isCorrect = false;

  // Sample property data (in a real app, this would come from an API)
  const properties = [
    {
      id: 1,
      images: [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2',
        'https://picsum.photos/800/600?random=3'
      ],
      title: 'Modern Downtown Loft',
      location: 'Nashville, TN',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      actualPrice: 485000,
      description: 'Stunning modern loft with exposed brick and city views'
    },
    {
      id: 2,
      images: [
        'https://picsum.photos/800/600?random=4',
        'https://picsum.photos/800/600?random=5',
        'https://picsum.photos/800/600?random=6'
      ],
      title: 'Suburban Family Home',
      location: 'Franklin, TN',
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      actualPrice: 675000,
      description: 'Beautiful family home with large backyard and modern amenities'
    },
    {
      id: 3,
      images: [
        'https://picsum.photos/800/600?random=7',
        'https://picsum.photos/800/600?random=8',
        'https://picsum.photos/800/600?random=9'
      ],
      title: 'Historic Bungalow',
      location: 'East Nashville, TN',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      actualPrice: 425000,
      description: 'Charming historic home with original hardwood floors'
    },
    {
      id: 4,
      images: [
        'https://picsum.photos/800/600?random=10',
        'https://picsum.photos/800/600?random=11',
        'https://picsum.photos/800/600?random=12'
      ],
      title: 'Luxury Estate',
      location: 'Brentwood, TN',
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4500,
      actualPrice: 1250000,
      description: 'Magnificent estate with pool and guest house'
    },
    {
      id: 5,
      images: [
        'https://picsum.photos/800/600?random=13',
        'https://picsum.photos/800/600?random=14',
        'https://picsum.photos/800/600?random=15'
      ],
      title: 'Starter Home',
      location: 'Antioch, TN',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1400,
      actualPrice: 185000,
      description: 'Perfect starter home with great potential'
    }
  ];

  $: currentProperty = properties[currentPropertyIndex];

  function resetGame() {
    currentPropertyIndex = 0;
    currentImageIndex = 0;
    guessAttempts = 0;
    userGuess = '';
    gameState = 'guessing';
    feedbackMessage = '';
    isCorrect = false;
  }

  function nextImage() {
    if (currentProperty && currentImageIndex < currentProperty.images.length - 1) {
      currentImageIndex++;
    } else {
      currentImageIndex = 0;
    }
  }

  function prevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
    } else if (currentProperty) {
      currentImageIndex = currentProperty.images.length - 1;
    }
  }

  function submitGuess() {
    if (!userGuess || !currentProperty) return;

    const guess = parseInt(userGuess.replace(/[,$]/g, ''));
    const actual = currentProperty.actualPrice;
    const difference = Math.abs(guess - actual);
    const percentDiff = (difference / actual) * 100;

    guessAttempts++;

    if (percentDiff <= 5) {
      // Within 5% is considered correct
      isCorrect = true;
      feedbackMessage = `🎉 Excellent! You were within 5% of the actual price!`;
      gameState = 'revealed';
    } else if (guessAttempts >= 3) {
      // Out of attempts
      gameState = 'revealed';
      feedbackMessage = `Out of attempts! The actual price was $${actual.toLocaleString()}.`;
    } else {
      // Give feedback and allow another guess
      const higher = guess < actual;
      feedbackMessage = `${higher ? '📈 Higher!' : '📉 Lower!'} You have ${3 - guessAttempts} attempts left.`;
      gameState = 'feedback';
    }

    userGuess = '';
  }

  function nextProperty() {
    if (currentPropertyIndex < properties.length - 1) {
      currentPropertyIndex++;
    } else {
      currentPropertyIndex = 0;
    }
    currentImageIndex = 0;
    guessAttempts = 0;
    userGuess = '';
    gameState = 'guessing';
    feedbackMessage = '';
    isCorrect = false;
  }

  function formatPrice(value: string) {
    // Remove non-digits
    const numbers = value.replace(/\D/g, '');
    // Add commas
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    userGuess = formatPrice(target.value);
  }

  function handleImageError(event: Event) {
    const img = event.currentTarget as HTMLImageElement;
    img.src = `https://via.placeholder.com/800x600/1a1a1a/990000?text=${encodeURIComponent(currentProperty.title)}`;
  }

  onMount(() => {
    // Initialize with first property
    resetGame();
  });
</script>

<svelte:head>
  <title>Guess the Price | WASAW Real Estate Game</title>
  <meta name="description" content="Test your real estate knowledge with WASAW's interactive price guessing game. Can you guess the prices of our successful deals?" />
</svelte:head>

<div class="guess-game-container">
  <!-- Header -->
  <header class="game-header">
    <div class="container">
      <h1 class="game-title">
        <span class="title-main">Guess the</span>
        <span class="title-highlight">Price</span>
      </h1>
      <p class="game-subtitle">Test your real estate knowledge with our successful sales</p>
    </div>
  </header>

  <!-- Main Game Area -->
  <main class="game-main">
    <div class="container">
      {#if currentProperty}
        <div class="property-card">
          <!-- Image Carousel -->
          <div class="image-carousel">
            <div class="carousel-container">
              <img 
                src={currentProperty.images[currentImageIndex]} 
                alt={currentProperty.title}
                class="property-image"
                on:error={handleImageError}
              />
              
              <!-- Navigation Arrows -->
              {#if currentProperty.images.length > 1}
                <button class="carousel-btn prev" on:click={prevImage} aria-label="Previous image">
                  ‹
                </button>
                <button class="carousel-btn next" on:click={nextImage} aria-label="Next image">
                  ›
                </button>
              {/if}
              
              <!-- Image Indicators -->
              {#if currentProperty.images.length > 1}
                <div class="image-indicators">
                  {#each currentProperty.images as _, index}
                    <button 
                      class="indicator"
                      class:active={index === currentImageIndex}
                      on:click={() => currentImageIndex = index}
                      aria-label={`View image ${index + 1}`}
                    ></button>
                  {/each}
                </div>
              {/if}
            </div>
          </div>

          <!-- Property Info -->
          <div class="property-info">
            <h2 class="property-title">{currentProperty.title}</h2>
            <p class="property-location">📍 {currentProperty.location}</p>
            <p class="property-description">{currentProperty.description}</p>
            
            <div class="property-details">
              <div class="detail-item">
                <span class="detail-icon">🛏️</span>
                <span>{currentProperty.bedrooms} Bed</span>
              </div>
              <div class="detail-item">
                <span class="detail-icon">🚿</span>
                <span>{currentProperty.bathrooms} Bath</span>
              </div>
              <div class="detail-item">
                <span class="detail-icon">📐</span>
                <span>{currentProperty.sqft.toLocaleString()} sq ft</span>
              </div>
            </div>
          </div>

          <!-- Game Interface -->
          <div class="game-interface">
            {#if gameState === 'guessing' || gameState === 'feedback'}
              <div class="guess-section">
                <h3 class="guess-title">
                  What do you think we sold this property for?
                </h3>
                
                {#if gameState === 'feedback'}
                  <div class="feedback-message">
                    <p>{feedbackMessage}</p>
                  </div>
                {/if}

                <div class="guess-input-container">
                  <span class="dollar-sign">$</span>
                  <input 
                    type="text" 
                    bind:value={userGuess}
                    on:input={handleInput}
                    placeholder="Enter your guess"
                    class="guess-input"
                    maxlength="10"
                  />
                  <button 
                    class="submit-btn"
                    on:click={submitGuess}
                    disabled={!userGuess}
                  >
                    Guess
                  </button>
                </div>

                <div class="attempts-counter">
                  <span>Attempts: {guessAttempts}/3</span>
                </div>
              </div>
            {:else if gameState === 'revealed'}
              <div class="reveal-section">
                <div class="result-message" class:correct={isCorrect}>
                  <p>{feedbackMessage}</p>
                </div>
                
                <div class="actual-price">
                  <h3>Actual Sale Price:</h3>
                  <div class="price-display">
                    ${currentProperty.actualPrice.toLocaleString()}
                  </div>
                </div>

                <button class="next-property-btn" on:click={nextProperty}>
                  Next Property
                </button>
              </div>
            {/if}
          </div>
        </div>

        <!-- Property Counter -->
        <div class="property-counter">
          <span>Property {currentPropertyIndex + 1} of {properties.length}</span>
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
  .guess-game-container {
    min-height: 100vh;
    background-color: var(--color-deep-matte-black);
    color: var(--color-pure-white);
    font-family: var(--font-body);
    transition: background-color 0.4s ease, color 0.4s ease;
    padding-top: 80px;
  }

  /* Light mode styles */
  :global(body.light-mode) .guess-game-container {
    background-color: var(--light-bg-primary);
    color: var(--light-text-primary);
  }

  .container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
  }

  /* Header */
  .game-header {
    padding: 2rem 0 2rem;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  :global(body.light-mode) .game-header {
    border-bottom-color: rgba(0, 0, 0, 0.1);
  }

  .game-title {
    font-family: var(--font-headline);
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 700;
    margin: 0 0 1rem;
    line-height: 1.1;
  }

  .title-main {
    color: var(--color-pure-white);
  }

  :global(body.light-mode) .title-main {
    color: var(--light-text-primary);
  }

  .title-highlight {
    color: var(--color-blood-red);
  }

  :global(body.light-mode) .title-highlight {
    color: var(--light-accent-red);
  }

  .game-subtitle {
    font-size: clamp(1rem, 3vw, 1.5rem);
    opacity: 0.8;
    margin: 0;
  }

  /* Main Game Area */
  .game-main {
    padding: 3rem 0;
  }

  .property-card {
    background-color: rgba(255, 255, 255, 0.03);
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  :global(body.light-mode) .property-card {
    background-color: rgba(0, 0, 0, 0.03);
    border-color: rgba(0, 0, 0, 0.1);
  }

  /* Image Carousel */
  .image-carousel {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
  }

  .carousel-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .property-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
  }

  .carousel-btn:hover {
    background-color: var(--color-blood-red);
    transform: translateY(-50%) scale(1.1);
  }

  .carousel-btn.prev {
    left: 1rem;
  }

  .carousel-btn.next {
    right: 1rem;
  }

  .image-indicators {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    z-index: 10;
  }

  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .indicator.active {
    background-color: var(--color-blood-red);
    transform: scale(1.2);
  }

  /* Property Info */
  .property-info {
    padding: 2rem;
  }

  .property-title {
    font-family: var(--font-headline);
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    color: var(--color-blood-red);
    margin: 0 0 0.5rem;
  }

  :global(body.light-mode) .property-title {
    color: var(--light-accent-red);
  }

  .property-location {
    font-size: 1.1rem;
    opacity: 0.8;
    margin: 0 0 1rem;
  }

  .property-description {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0 0 1.5rem;
    opacity: 0.9;
  }

  .property-details {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
  }

  .detail-icon {
    font-size: 1.2rem;
  }

  /* Game Interface */
  .game-interface {
    padding: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.02);
  }

  :global(body.light-mode) .game-interface {
    border-top-color: rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.02);
  }

  .guess-section {
    text-align: center;
  }

  .guess-title {
    font-family: var(--font-headline);
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    color: var(--color-blood-red);
    margin: 0 0 1.5rem;
  }

  :global(body.light-mode) .guess-title {
    color: var(--light-accent-red);
  }

  .feedback-message {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1rem;
    margin: 0 0 1.5rem;
    border-left: 4px solid var(--color-blood-red);
  }

  :global(body.light-mode) .feedback-message {
    background-color: rgba(0, 0, 0, 0.05);
    border-left-color: var(--light-accent-red);
  }

  .guess-input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 0 0 1rem;
    flex-wrap: wrap;
  }

  .dollar-sign {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-blood-red);
  }

  :global(body.light-mode) .dollar-sign {
    color: var(--light-accent-red);
  }

  .guess-input {
    background-color: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1rem 1.5rem;
    font-size: 1.2rem;
    color: var(--color-pure-white);
    font-family: var(--font-body);
    width: 200px;
    text-align: center;
    transition: all 0.3s ease;
  }

  :global(body.light-mode) .guess-input {
    background-color: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.1);
    color: var(--light-text-primary);
  }

  .guess-input:focus {
    outline: none;
    border-color: var(--color-blood-red);
    background-color: rgba(255, 255, 255, 0.08);
  }

  :global(body.light-mode) .guess-input:focus {
    border-color: var(--light-accent-red);
    background-color: rgba(0, 0, 0, 0.08);
  }

  .guess-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  :global(body.light-mode) .guess-input::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  .submit-btn {
    background-color: var(--color-blood-red);
    color: var(--color-pure-white);
    border: none;
    border-radius: 12px;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }

  :global(body.light-mode) .submit-btn {
    background-color: var(--light-accent-red);
  }

  .submit-btn:hover:not(:disabled) {
    background-color: #b30000;
    transform: translateY(-2px);
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .attempts-counter {
    font-size: 0.9rem;
    opacity: 0.7;
  }

  /* Reveal Section */
  .reveal-section {
    text-align: center;
  }

  .result-message {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 0 0 2rem;
    border-left: 4px solid #ff6b6b;
  }

  :global(body.light-mode) .result-message {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .result-message.correct {
    border-left-color: #4ecdc4;
    background-color: rgba(78, 205, 196, 0.1);
  }

  .actual-price {
    margin: 0 0 2rem;
  }

  .actual-price h3 {
    font-family: var(--font-headline);
    color: var(--color-blood-red);
    margin: 0 0 1rem;
    font-size: 1.3rem;
  }

  :global(body.light-mode) .actual-price h3 {
    color: var(--light-accent-red);
  }

  .price-display {
    font-size: clamp(2rem, 6vw, 3.5rem);
    font-weight: bold;
    color: var(--color-blood-red);
    font-family: var(--font-headline);
  }

  :global(body.light-mode) .price-display {
    color: var(--light-accent-red);
  }

  .next-property-btn {
    background-color: var(--color-blood-red);
    color: var(--color-pure-white);
    border: none;
    border-radius: 12px;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }

  :global(body.light-mode) .next-property-btn {
    background-color: var(--light-accent-red);
  }

  .next-property-btn:hover {
    background-color: #b30000;
    transform: translateY(-2px);
  }

  /* Property Counter */
  .property-counter {
    text-align: center;
    margin-top: 2rem;
    font-size: 1rem;
    opacity: 0.7;
  }

  /* Mobile Responsiveness */
  @media (max-width: 768px) {
    .guess-game-container {
      padding-top: 70px; /* Slightly less padding on mobile */
    }

    .game-header {
      padding: 1rem 0 1rem; /* Further reduced for mobile */
    }

    .image-carousel {
      height: 300px;
    }

    .property-info {
      padding: 1.5rem;
    }

    .property-details {
      gap: 1rem;
    }

    .game-interface {
      padding: 1.5rem;
    }

    .guess-input-container {
      flex-direction: column;
      align-items: stretch;
    }

    .guess-input {
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
    }

    .carousel-btn {
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
    }

    .carousel-btn.prev {
      left: 0.5rem;
    }

    .carousel-btn.next {
      right: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    .guess-input-container {
      flex-direction: column;
      align-items: stretch;
    }

    .guess-input {
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
    }

    .property-details {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style> 