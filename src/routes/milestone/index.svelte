<script>
  import { goto, stores } from "@sapper/app";
    import { onMount } from "svelte";
  const { preloading, page, session } = stores();

  const { host, path, params, query } = $page;

  const { slug } = params;


  onMount(async () => {
      if(!slug) {
        await goto('/');
      }
  })

</script>