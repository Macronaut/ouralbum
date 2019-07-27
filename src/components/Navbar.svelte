<script>
  let current = window.location.href.split("/").pop(),
  array = ["home", "fotos", "inserir"];
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
          <li><a class="{current === '' ? 'has-text-weight-bold' : ''} has-text-white" href="/">Home</a></li>
        {:else}
          <li><a class="{current === url ? 'has-text-weight-bold' : ''} has-text-white" href="/{ url }" aria-current="page"> { url.charAt(0).toUpperCase() + url.slice(1) } </a></li>
        {/if}
      {/each}
    </ul>
  </nav>
</section>