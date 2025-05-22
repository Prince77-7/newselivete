<script>
  import { onMount } from 'svelte';
  import { BROWSER } from 'esm-env';
  
  // Theme state
  let theme = 'dark';
  
  // Toggle theme function
  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    updateTheme();
  }
  
  // Apply theme to document
  function updateTheme() {
    if (BROWSER) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }
  
  // Initialize theme on mount
  onMount(() => {
    if (BROWSER) {
      const savedTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      theme = savedTheme;
      updateTheme();
    }
  });
</script>

<button 
  class="theme-toggle" 
  on:click={toggleTheme}
  aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
>
  {#if theme === 'dark'}
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon sun"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
  {/if}
</button>

<style>
  .theme-toggle {
    background: none;
    border: none;
    color: var(--foreground);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    transition: background-color 0.2s ease;
    padding: 0;
  }

  .theme-toggle:hover {
    background-color: var(--muted);
  }

  .theme-toggle .icon {
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .theme-toggle:active .icon {
    transform: scale(0.9);
  }
</style> 