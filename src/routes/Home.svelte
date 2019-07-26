<script>    
    import FileDrop from "../components/FileDrop.svelte";

    const uploadFile = $param_function => {
        debugger;
    }
</script>

<style>
    .card-shadow {
        -webkit-box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.25);
        -moz-box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.25);
        box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.25);
    }
</style>

<section class="component-home">
    <div class="columns is-mobile is-centered">
        <div class="column is-half-desktop is-three-quarters-mobile card-shadow">
            <FileDrop on:submit="{ uploadFile }" />
        </div>
    </div>
</section>