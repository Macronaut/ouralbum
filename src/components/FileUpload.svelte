<script>
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

	const dispatch = createEventDispatcher();

    let pondF, oPond, hashtag = '';

    FilePond.registerPlugin(FilePondPluginImagePreview, FilePondPluginImageTransform, FilePondPluginImageExifOrientation, FilePondPluginImageResize);

    onMount(() => {
        const inputElement = document.querySelector('input[type="file"]');
        pondF = FilePond.create(inputElement);
        document.querySelector('.filepond--root').addEventListener('FilePond:addfile', $param_event => { oPond = $param_event.detail });
    })

    const dispatchImage = $param_event => {        
        let oPondF = oPond.file;
        dispatch('submit', { oImage: oPondF.file, sHashtag: hashtag.toLowerCase() });
        pondF.removeFiles();
    }

</script>

<section class="component-fileupload">

    <div class="columns is-centered">
        <div class="column is-half is-mobile">
            <input class="input" type="text" bind:value={ hashtag } placeholder="#hashtag">            
        </div>
    </div>

    
    <div class="columns is-mobile is-centered">
        <div class="column is-half has-text-centered">
            <input type="file">
            {#if oPond}
                <a on:click="{ dispatchImage }" class="button is-success">
                    <span class="icon is-small"> <i class="fas fa-upload"></i> </span>
                    <span>Enviar</span>
                </a>
            {/if}
        </div>
    </div>

</section>