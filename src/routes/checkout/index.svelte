<script>
  import { onMount, onDestroy } from "svelte";
    import { goto } from "@sapper/app";
      import { loadStripe } from "@stripe/stripe-js";
  import CartStore from "../../stores/cart";

  let products = [];

  let cartItem = 0;
  let cartPrice = 0;
  var counts = {};

  let form = {
    email: "",
    address: "",
    city: "",
    zip: "",
    cart: ""
  }

  async function proceedToStripe() {
      var stripe = Stripe('pk_live_51HQ805IWmOpG1DOULwhs67fKdhS238Gqm7CudztpqaqnKPOm2wSSRHzDIFLP15JCEPob6bpPSSJpnF34gx79XSGX00GYdHNRj4');

    const res = await fetch('https://single-song-review.herokuapp.com/orders/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })


    if(res.status === 200) {
      const session = await res.json();
      return stripe.redirectToCheckout({ sessionId: session.id });
      
    }
  }

  function removeFromCart(product) {
    let itemCount = -1;
    CartStore.update(item => {
      if(item){
        let index = -1;
        for(let i = 0;i<item.length;i++){
          if(item[i]._id == product._id)
          {
            index = i;
            break;
          }
        }
        console.log(item)
        if(index != -1){
          item.splice(index, 1);
          if(item.length == 0){
            localStorage.setItem('cart',JSON.stringify([]));
            cartPrice = 0;
            cartItem = 0;
            itemCount = 0;
          }
        }
      }
      return item
    })
    if(itemCount == 0){
      return goto("/shop");
    }
  }

  const unsubscribe = CartStore.subscribe(value => {
    if(value && value.length) {
      counts = {};
      value.forEach(function(x) {
        counts[JSON.stringify(x)] = (counts[JSON.stringify(x)] || 0) + 1;
      });
      products = Object.keys(counts).map(item => JSON.parse(item));  
      cartItem = value.length;
      cartPrice = value.reduce((acc, item) => {
        return acc + item.price
      }, 0)
      localStorage.setItem('cart', JSON.stringify(value))
      form.cart = counts;
    }
  });


  onDestroy(unsubscribe);

  onMount(async () => {
    let prod = JSON.parse(localStorage.getItem("cart"));
    if(prod.length == 0)
      return await goto('/shop')
/*    products = JSON.parse(localStorage.getItem("cart"));
    console.log("onMount():products = ", products)
    if(!products || !products.length) return await goto('/shop');
    products.forEach(function(x) {
      counts[JSON.stringify(x)] = (counts[JSON.stringify(x)] || 0) + 1;
    });
    products = Object.keys(counts).map(item => JSON.parse(item));
*/
/*
    cartPrice = products.reduce((acc, item) => {
      return acc + (item.price * counts[JSON.stringify(item)] );
    }, 0);

    form.cart = counts;*/
  });
</script>

<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md">
  <div class="flex justify-start items-center mx-auto max-w-lg">
    <span class="mr-6">
      <a href="/" class="inline-block">
        <img class="mx-auto w-20" src="./profile.svg" alt="" />
      </a>
    </span>
    <span class="font-bold text-2xl sm:text-3xl md:text-4xl">Checkout</span>
  </div>
  <form action="" class="max-w-lg mx-auto mt-12 clearfix" on:submit|preventDefault={proceedToStripe}>
    <input type="email" class="w-full p-2 text-md rounded shadow-md" placeholder="email" bind:value={form.email}>
    <input type="text" class="w-full p-2 text-md rounded shadow-md mt-4" placeholder="address" bind:value={form.address}>
    <div class="flex mt-4">
    <input type="text" class="w-1/2 p-2 text-md rounded shadow-md" placeholder="city" bind:value={form.city}>
    <input type="text" class="w-1/2 p-2 text-md rounded shadow-md ml-4" placeholder="zip" bind:value={form.zip}>
    </div>
    <input type="submit" class="p-2 rounded bg-green-400 shadow-md mt-6 float-right" value="proceed">
  </form>

  <div class="mt-4 max-w-lg mx-auto">
    <div class="font-semibold text-2xl">
      <span>Total ${cartPrice}</span>
    </div>
  </div>

  <div class="flex flex-col max-w-lg mx-auto mt-8">
    {#if products.length > 0}
      {#each products as product}
        <div class="flex items-center mb-4">
          <div class="w-12 bg-white rounded-sm shadow-md">
            <img
              src="{product.image.formats.thumbnail.url}"
              class="p-2"
              alt="" />
          </div>
          <div class="text-xl font-semibold">
            <a
              class="no-underline hover:underline ml-4"
              href="/shop/{product.slug}">
              {product.title}
            </a>
          </div>
          <div class="ml-auto flex">
            <div class="text-xl font-bold">${product.price}</div>
            &nbsp;
            <div class="text-xl">x{counts[JSON.stringify(product)]}</div>
            <button
              class="bg-red-400 hover:bg-red-500 shadow-md rounded-md px-3
              py-1 ml-4" on:click={removeFromCart(product)}>
              -
            </button>
          </div>
          
        </div>
      {/each}
    {:else}
      <p>No Prodcuts</p>
    {/if}
  </div>

</div>
