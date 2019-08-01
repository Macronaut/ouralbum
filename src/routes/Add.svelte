<script>    
    import Notification from '../components/Notification.svelte';
    import FileUpload from '../components/FileUpload.svelte';
    import Navbar from '../components/Navbar.svelte';
    import { oStore } from '../data/Store.js';
    import { fade } from 'svelte/transition';
    import { writable } from 'svelte/store';

    let array = writable([]),
    loading = false;

    const removeNotification = $param_function => {
      let temp;
      array.subscribe($result => temp = $result);
      temp.splice($param_function.detail, 1)
      array.set(temp);
    }    

    const uploadFile = async $param_function => {      
      oStore.parse();

      const Photo = Parse.Object.extend('Photo'),
      oPhoto = new Photo();

      loading = !loading;

      let aHashtag = $param_function.detail.sHashtag.split(" "),
      hasError = false;

      if($param_function.detail.sHashtag.length > 0) {
        aHashtag.forEach($hashtag => {
          if($hashtag.trim().indexOf("#") < 0 || $hashtag.trim().match(/#/g).length > 1) hasError = !hasError          
        });
  
        if(hasError) {
          alert("Suas hashtags foram inseridas incorretamente, por favor revise");
          loading = !loading;
          return;
        }
      }      

      oPhoto.set("hashtag", aHashtag);

      oPhoto.set("image", new Parse.File($param_function.detail.oImage.name, $param_function.detail.oImage));

      oPhoto.save()
      .then($result => {
        loading = !loading;
        let temp;
        array.subscribe($result => temp = $result);
        temp = [...temp, "Imagem enviada com sucesso"];
        array.set(temp);
        oStore.set();
      })
      .catch($error => {
        loading = !loading;
        alert("error :: " + $error);
      });
    }
</script>

<style>
</style>

<section class="component-add">
  
  <div class="columns is-mobile is-centered">
      <div class="column is-10-mobile is-10-tablet is-half-desktop">
        <Navbar />

        <div class="box">
          <div class="columns">
            <div class="column">              
              <p>Esta é a tela de inserir novas fotos no álbum de fotos, para inserir pressione <b>selecionar</b> e então quando a mesma for carregada e uma prévia for apresentada, pressione <b>enviar</b> para adicioná-la, caso mude de idéia pressione <b>cancelar</b>. Lembre-se que se desejar filtrá-las posteriormente, digite na caixa abaixo as <i>hashtags</i> que preferir - separadas por espaços - e pressione <b>enter</b>.</p>
              <p class="has-text-info">** Lembre-se de adicionar o sinal da hashtag <b><i>#</i></b> antes de cada uma delas.</p>
            </div>
          </div>

          {#each $array as message, index}
            <div class="columns is-centered">
              <div class="column is-half is-mobile">
                  <div class="container-notification" in:fade="{{ duration: 500 }}" out:fade="{{ duration: 500 }}">
                    <Notification on:remove="{ removeNotification }" notificationId={ index } notification={ message } />
                  </div>
              </div>
            </div>
          {/each}

          {#if !loading}
            <div class="columns">
              <div class="column">
                <FileUpload on:submit="{ uploadFile }" />
              </div>
            </div>
          {:else}
            <div class="columns is-centered">
              <div class="column is-half is-mobile">
                <progress class="progress is-info" max="100"></progress>
              </div>
            </div>
          {/if}


        </div>
      </div>
  </div>  
</section>