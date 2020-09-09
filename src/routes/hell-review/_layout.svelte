<script>
  import { onMount, onDestroy } from "svelte";
    
  onDestroy(async () => {
    try {
      document.body.classList.remove('red-bg');
    } catch (error) {
      
    }
  });

  onMount(async () => {
    document.body.classList.add('red-bg');
  });

</script>
<style>
  :global(.red) {
    background-color: #FF0606;
  }

</style>

<main>
	<slot></slot>
</main>