<script>
  import { onMount, onDestroy } from "svelte";
    import CartStore from "../../stores/cart";

  let products = [];

  let cartItem = 0;
  let cartPrice = 0;

  // const unsubscribe = CartStore.subscribe(value => {
  //   cartItem = value.length;
  //   cartPrice = value.reduce((acc, item) => {
  //     return acc + item.price
  //   }, 0)
  // });


  // onDestroy(unsubscribe);


  const getProduts = async () => {
    const res = await fetch('https://single-song-review.herokuapp.com/products');

    return res.status === 200 ? await res.json() : [];
  };

  onMount(async () => {
    products = await getProduts();

    const cart = JSON.parse(localStorage.getItem('cart'));

    if(!cart) return;
    cartItem = cart.length;
    cartPrice = cart.reduce((acc, item) => {
      return acc + item.price
    }, 0)
    // console.log(products);
  });


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

  <div class="mt-4 max-w-lg mx-auto">
    <h1 class="font-bold text-3xl">get merch look cool</h1>
    <div class="font-semibold text-2xl">
          <span>Cart ({cartItem}x){cartPrice > 0 ? " - $" + cartPrice : ''}</span>
      <a href="/checkout" class="underline hover:no-underline">Checkout</a>
    </div>
  </div>

  <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 md:mx-8 mx-auto mt-8 max-w-lg md:max-w-none row-auto">
    {#if products.length > 0}
      {#each products as product}
        <div class="flex flex-col">
          <div class="shadow-md bg-white rounded-md text-center p-2 flex-auto">
            <div class="w-1/2 mx-auto">
              <img src="{product.image.formats.thumbnail.url}" class="" alt="" />
            </div>
            <div class="text-lg font-semibold">
              <a class="no-underline hover:underline" href="/shop/{product.slug}">
                {product.title}
              </a>
            </div>
          </div>
          <div class="text-3xl font-bold text-center">${product.price}</div>
        </div>
      {/each}
    {:else}
      <p>No Prodcuts</p>
    {/if}
  </div>

</div>
