<script>
  import { onMount, onDestroy } from "svelte";
  import { goto, stores } from "@sapper/app";
  const { preloading, page, session } = stores();
  const { host, path, params, query } = $page;

  let state = 'normal';
  $: currentState = state;


  async function confirmOrder() {
    const res = await fetch("https://single-song-review.herokuapp.com/orders/confirm/" + query['confirm']);

    if (res.status === 200) {
      const data = await res.json();
      if(data.order_state === 'paid') {
        localStorage.removeItem('cart');
        state = 'confirmed';
      }else {
        state = 'not confirmed';
      }
    }else {
      state = 'not confirmed';
    }
  }

  onMount(async () => {
    try {
      await confirmOrder();
    } catch (error) {
      console.log(error);
      state = 'wrong';
    }
  });
</script>

<div
  class="mx-4 p-6 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md font-semibold text-3xl">
  
  {#if currentState === 'confirmed'}
    Your order is confirmed.
  {:else if currentState === 'normal'}
    Loading
  {:else}
    Something went wrong
  {/if}

</div>
