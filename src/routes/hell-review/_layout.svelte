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

</style>

<main>
	<slot></slot>
</main>