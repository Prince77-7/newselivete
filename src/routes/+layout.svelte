<script>
  import '../app.css';
  import Navigation from '$lib/components/Navigation.svelte';
  import { page } from '$app/stores';
  
  // Hide navigation on home page
  $: showNavigation = $page.url.pathname !== '/';
</script>

{#if showNavigation}
  <Navigation currentPath={$page.url.pathname} />
{/if}

<slot />

<style lang="postcss">
  /* CSS variables are now defined in app.css */
  
  /* Global styles moved to app.css */
</style> 