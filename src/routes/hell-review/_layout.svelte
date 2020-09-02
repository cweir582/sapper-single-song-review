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
  :global(.red) {
    background-color: #FF0606;
  }

</style>

<main>
	<slot></slot>
</main>