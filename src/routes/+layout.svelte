<script>
  import '../app.css';
</script>

<slot />

<style lang="postcss">
  /* CSS variables are now defined in app.css */
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-headline);
    color: var(--color-blood-red);
  }

  a {
    color: var(--color-blood-red);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style> 