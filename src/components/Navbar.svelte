<script>
  import { Link } from 'svelte-routing';

  let current = window.location.href.split("/").pop(),
  array = ["home", "inserir"];
</script>

<style>
  .component-navbar .breadcrumb li+li::before { color: #FFF }
  .component-navbar {
    box-sizing: border-box;
    padding: 10px 0;
  }
  
</style>

<section class="component-navbar">
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      {#each array as url}
        {#if url === "home"}
          <li class="{current === '' ? 'has-text-weight-bold' : ''}"><Link to="/">Home</Link></li>
        {:else}
          <li class="{current === url ? 'has-text-weight-bold' : ''}"><Link to="/{ url }" aria-current="page"> { url.charAt(0).toUpperCase() + url.slice(1) } </Link></li>
        {/if}
      {/each}
    </ul>
  </nav>
</section>