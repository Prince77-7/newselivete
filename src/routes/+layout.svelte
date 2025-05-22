<script lang="ts">
  import '../app.css';
  import Navigation from '$lib/components/Navigation.svelte';
  import { page } from '$app/stores';
  import { themeStore } from '$lib/stores/themeStore'; // Import the theme store

  // Subscribe to the theme store
  let isLightMode: boolean;
  themeStore.subscribe(value => {
    isLightMode = value;
  });
  
  // Hide navigation on home page decision gateway, but show on scroll-up experience
  // The home page will manage its own theme toggle before the atypical experience is shown.
  $: showNavigation = $page.url.pathname !== '/'; // Simplified for now, +page.svelte handles its internal state for when nav should appear

</script>

{#if showNavigation}
  <Navigation currentPath={$page.url.pathname} {isLightMode} />
{/if}


<slot />

<style lang="postcss">
  /* CSS variables are now defined in app.css */
  
  /* Global styles moved to app.css */

  /* Global light mode body class - can be used by any page */
  :global(body.light-mode) {
    /* Transitions for smooth theme changes */
    transition: background-color 0.4s ease, color 0.4s ease;
  }

</style> 