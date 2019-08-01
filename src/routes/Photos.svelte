<script>
    import Navbar from '../components/Navbar.svelte';
    import { oStore } from '../data/Store.js';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    let loading = false,
    isActive = false,
    filter = '',
    array = [],
    image;

    const toggleModal = () => isActive = !isActive;

    const setImage = $param_event => {
        image = $param_event.target.src;
        toggleModal();
    }    

    onMount(async () => {
        if(oStore.get().length <= 0) {
            loading = !loading;
            oStore.parse();
            await oStore.set();
            loading = !loading;
        }
        
        array = oStore.get();        
    })

</script>

<style>
    .container-input {
        box-sizing: border-box;
        padding: 10px;
    }
    
    .margin { margin: 0 auto }
    
    .small-padding {
        box-sizing: border-box;
        padding: 2px;
    }
    
    .image-layout {
        overflow: hidden;
        cursor: pointer;
    }
</style>

<section class="component-photos">

    <div class="{isActive ? 'is-active' : '' } modal">
        <div class="modal-background"></div>
        <div class="modal-content has-text-centered">
            {#if image} <img alt="Foto" src={ image }>{/if}
        </div>
        <button on:click="{ toggleModal }" class="modal-close is-large" aria-label="close"></button>
    </div>

    <div class="columns is-mobile is-centered">
        <div class="column is-10-mobile is-10-tablet is-half-desktop">
            <Navbar />
            <div class="box">
                <p>Abaixo é possível filtrar e ver as fotos que estão inseridas no sistema, se desejar inserir novas fotos, por favor pressione o link <b>Inserir</b> que está logo acima.</p>
                <p class="has-text-info">** Lembre-se de adicionar o sinal da hashtag <b><i>#</i></b> antes de inserir o nome do filto de sua preferência.</p>
                <div class="container-input">
                    <div class="columns is-centered">
                        <div class="column is-half is-mobile">
                            <input bind:value={ filter } class="input" type="text" placeholder="#filtro">
                        </div>
                    </div>
                </div>

                {#if loading}
                    <div class="columns is-centered has-text-centered">
                        <div class="column is-half is-mobile">
                            <div class="columns"> <div class="column"> <span> Carregando... </span> </div> </div>
                            <div class="columns"> <progress class="progress is-small is-info" max="100"></progress> </div>
                        </div>
                    </div>
                {/if}

                <div class="columns is-multiline">
                    {#each array as photo, index}
                        {#if filter.length > 0}
                            {#if photo.attributes.hashtag.indexOf(filter) >= 0}
                                <div class="column is-4 has-text-centered">
                                    <figure class="image image-layout margin is-128x128">
                                        <img on:click="{ setImage }" class="margin" alt="Foto" data-key={ photo.id } src={ photo.attributes.image._url }>
                                    </figure>
                                    {#each photo.attributes.hashtag as hashtag}
                                        <span> { hashtag } </span>
                                    {/each}
                                </div>
                            {/if}
                        {:else}
                            <div class="column is-4 has-text-centered">                                
                                <p> Orientation >> { photo.attributes.image._orientation } </p>
                                <figure class="image image-layout margin is-128x128">
                                    <img on:click="{ setImage }" class="{ photo.attributes.image._portrait ? 'portrait' : '' } margin" alt="Foto" data-key={ photo.id } src={ photo.attributes.image._url }>
                                </figure>
                                {#each photo.attributes.hashtag as hashtag}
                                    <span class="small-padding"> { hashtag } </span>
                                {/each}
                            </div>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>