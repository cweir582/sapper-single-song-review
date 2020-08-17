<script>
  import { onMount, onDestroy } from "svelte";
    
  onDestroy(async () => {
    try {
      document.body.style.backgroundColor = "#68D391"
    } catch (error) {
      
    }
  });

  onMount(async () => {
    document.body.style.backgroundColor = "#000"
  });

</script>
<style>


</style>

<main>
	<slot></slot>
</main>