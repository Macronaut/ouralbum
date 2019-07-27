<script>
  import { Router, Link, Route } from "svelte-routing";
  
  import Fotos from "./routes/Fotos.svelte";
  import Home from "./routes/Home.svelte";
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
    <Route path="/inserir" component="{Add}" />
    <Route path="/fotos" component="{Fotos}" />
    <Route path="/"><Home /></Route>
  </div>
</Router>