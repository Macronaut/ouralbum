<script>
  import { createEventDispatcher } from 'svelte';  

  export let notification,
  notificationId;
  
  const dispatch = createEventDispatcher();

  const dispatchRemove = $param_event => dispatch('remove', notificationId);
</script>

<div class="notification is-success">
  <button on:click="{ dispatchRemove }" class="delete"></button>
  { notification }
</div>