<script>
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

    let percent, image, src;

    window.onload = function() {        
        document.querySelector('.component-filedrop').onchange = function($param_event) {        
            if($param_event.target.files[0].type.indexOf("image") < 0) {
                window.alert("Por favor, insira apenas imagens");
                return;
            }
            checkImage($param_event.target.files[0]);
        }
    }

    const dispatchImage = $param_event => dispatch('submit', image)

    const cancelUpload = $param_event => image = '';

    const checkImage = $param_image => {        
        if(!$param_image) return;
        image = $param_image;
        let reader = new FileReader();

        reader.onprogress = $param_event => percent = 100 * $param_event.loaded / $param_event.total;

        reader.onload = $param_event => {
            src = $param_event.target.result;
            percent = 0;
        }

        reader.readAsDataURL(image);        
    }
</script>

<style>
    .component-filedrop .columns .column .button { text-decoration: none }
    .component-filedrop .columns .column.text-center { text-align: center }
    .component-filedrop .columns .column .file { display: inline-block }
    .component-filedrop .columns .column.margin-center { margin: 0 auto }
    .image-preview .image { margin: 0 auto }
</style>

<section class="component-filedrop">    

    {#if image}
        <div class="columns">
            <div class="column text-center">
                <div class="image-preview">
                    <div class="columns is-centered is-mobile">
                        <div class="column is-half margin-center">
                            <figure class="image">
                                <img in:fade="{{ duration: 500 }}" alt="Preview Image" src={ src }>
                            </figure>
                        </div>
                    </div>                    
                </div>                
            </div>
        </div>

    {/if}    

    {#if percent && percent < 100}
        <div class="columns is-centered">
            <div class="column is-half-desktop is-mobile">
                <progress class="progress is-primary" value={ percent } max="100"> { percent } </progress>
            </div>
        </div>
    {/if}

    <div class="columns">
        <div class="column text-center">
            {#if image}
                <a href="javascript:void()" on:click="{ dispatchImage }" class="button is-success">
                    <span class="file-icon"> <i class="fas fa-upload"></i> </span>
                    Enviar
                </a>
                <a href="javascript:void()" on:click="{ cancelUpload }" class="button is-danger">
                    <span class="file-icon"> <i class="fas fa-window-close"></i> </span>
                    Cancelar
                </a>
            {:else}
                <div class="file">
                    <label class="file-label">
                        <input class="file-input" type="file" name="resume">
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-camera"></i>
                            </span>
                            <span class="file-label">Selecionar</span>
                        </span>
                    </label>
                </div>
            {/if}
        </div>
    </div>
</section>