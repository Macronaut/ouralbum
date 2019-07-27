<script>    
    import FileUpload from '../components/FileUpload.svelte';
    import Navbar from '../components/Navbar.svelte';

    const uploadFile = $param_function => {
        debugger;
    }
</script>

<style>
</style>

<section class="component-add">
  
  <div class="columns is-mobile is-centered">
      <div class="column is-half-desktop is-three-quarters-mobile">
        <Navbar />

        <div class="box">
          <div class="columns">

            <div class="column">              
              <p>Esta é a tela de inserir novas fotos no álbum, para inserir pressione <b>selecionar</b> e então quando a mesma for carregada e uma prévia for apresentada, pressione <b>enviar</b> para adicioná-la ao álbum de fotos, caso mude de idéia pressione <b>cancelar</b>.</p>            
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <FileUpload on:submit="{ uploadFile }" />
            </div>
          </div>

        </div>
      </div>
  </div>  
</section>