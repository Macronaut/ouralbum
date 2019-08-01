<script>
  import { Router, Link, Route } from "svelte-routing";

  import Photos from "./routes/Photos.svelte";  
  import Add from "./routes/Add.svelte";

  export let url = "";

</script>

<style>
	.container-app {
		box-sizing: border-box;
		padding-top: 40px;
	}
</style>

<Router url="{url}">
  <!-- <nav>
    <Link to="/">Home</Link>    
  </nav> -->
  <div class="container-app">
    <p class="is-size-3 has-text-centered has-text-white has-text-weight-bold">Nossa <i class="fas fa-heart"/> Jornada</p>
    <Route path="/inserir" component="{Add}" />
    <Route path="/" component="{Photos}" />
  </div>
</Router>