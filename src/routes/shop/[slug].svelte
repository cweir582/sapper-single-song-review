<script>
  import { goto, stores } from "@sapper/app";
  import { onMount, onDestroy } from "svelte";
  import CartStore from "../../stores/cart";
  const { preloading, page, session } = stores();

  const { host, path, params, query } = $page;

  const { slug } = params;

  let product;

  let cartItem = 0;
  let cartPrice = 0;

  const unsubscribe = CartStore.subscribe(value => {
    if(value && value.length) {
      cartItem = value.length;
      cartPrice = value.reduce((acc, item) => {
        return acc + item.price
      }, 0)
  
     localStorage.setItem('cart', JSON.stringify(value))
    }

  });


  onDestroy(unsubscribe);

  onMount(async () => {
    const res = await fetch("https://single-song-review.herokuapp.com/products/" + slug);

    const data = await res.json();
    product = data;
    //return res.status === 200 ? await res.json() : [];
  });

  function addToCart() {
      CartStore.update(item => {
        if(item) return [product, ...item];
        return [product]
      });
  }
</script>

<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md">
  <div class="flex justify-start items-center mx-auto max-w-lg">
    <span class="mr-6">
      <img class="mx-auto w-20" src="./logo.png" alt="" />
    </span>
    <span class="font-bold text-2xl sm:text-4xl md:text-5xl">Shop</span>
  </div>

  {#if product}
    <div class="mt-8 mx-8">
      <div class="mt-4 mx-auto">
        <h1 class="font-bold text-3xl">{product.title}</h1>
        <div class="font-semibold text-2xl">
          <span>Cart ({cartItem}x){cartPrice > 0 ? " - $" + cartPrice : ''}</span>
          <a href="/checkout" class="underline hover:no-underline">Checkout</a>
        </div>
      </div>
      <div class="mt-8 flex flex-col md:flex-row">
        <div class="md:w-1/3 shadow-md bg-white rounded-lg py-4 mr-8">
          <img
            src="{product.image.formats.medium.url}"
            class="h-56 mx-auto"
            alt="" />
        </div>
        <div class="mt-4 md:mt-0 md:w-2/3 flex flex-col justify-between text-xl">
          <p>{product.description}</p>
          <div class="mt-2">
            <span class="text-4xl font-semibold">${product.price}</span>
            <button
              class="bg-green-400 hover:bg-green-500 shadow-md rounded-md px-4
              py-2 ml-4" on:click={addToCart}>
              add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="mt-8 mx-8">Loading...</div>
  {/if}

</div>
