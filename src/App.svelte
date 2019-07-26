<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";

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
    <!-- <Route path="about" component="{About}" /> -->
    <Route path="/"><Home /></Route>
  </div>
</Router>