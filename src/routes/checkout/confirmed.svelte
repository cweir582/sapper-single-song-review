<script>
  import { onMount, onDestroy } from "svelte";
  import { goto, stores } from "@sapper/app";
  const { preloading, page, session } = stores();
  const { host, path, params, query } = $page;
  const { slug } = params;

  async function confirmOrder() {
    const res = await fetch("http://127.0.0.1:1337/orders/confirm/" + query['confirm']);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      if(data.order_status === 'paid') {
        localStorage.removeItem('cart');
      }
    }
  }

  onMount(async () => {
    await confirmOrder();
  });
</script>

<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md">
  Confirm
</div>
