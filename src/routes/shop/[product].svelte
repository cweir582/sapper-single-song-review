<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    // const res = await this.fetch(`blog/${params.slug}.json`);
    // const data = await res.json();
    // if (res.status === 200) {
    // 	return { post: data };
    // } else {
    // 	this.error(res.status, data.message);
    // }
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

  <div class="mt-8 mx-8">
    <div class="mt-4 mx-auto">
      <h1 class="font-bold text-3xl">Lorem ipsum dolor sit</h1>
      <div class="font-semibold text-2xl">
        <span>Cart (X)</span>
        <span class="">Checkout</span>
      </div>
    </div>
    <div class="mt-8 flex">
      <div class="w-1/3 shadow-md bg-white rounded-lg py-4 mr-8">
        <img src="./logo.png" class="h-56 mx-auto" alt="" />
      </div>
      <div class="w-2/3 flex flex-col justify-between text-xl">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat deleniti provident praesentium at omnis. Earum magnam neque quisquam iste quibusdam, optio praesentium voluptate esse officiis consequuntur quos distinctio sequi consequatur?</p>
        <div class="mt-2"><span class="text-4xl font-semibold">$3</span><button class="bg-green-400 hover:bg-green-500 shadow-md rounded-md px-4 py-2 ml-4">add to cart</button></div>
      </div>
    </div>
  </div>

</div>
