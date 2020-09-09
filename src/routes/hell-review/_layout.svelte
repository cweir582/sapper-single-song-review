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

  :global(.white-shadow) {
    box-shadow: 0 .4rem 1rem rgba(255, 255, 255, 0.7);
  }

</style>

<main>
	<slot></slot>
</main>