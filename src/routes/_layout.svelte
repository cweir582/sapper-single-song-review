<script>
  import Nav from "../components/Nav.svelte";
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import CartStore from "../stores/cart";

  const { preloading, page, session } = stores();

  const { host, path, params, query } = $page;

  export let segment;

  onMount(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    CartStore.set(cart);
  })

  console.log(segment);
</script>

<style>
  :global(body) {
    background-color: #68d391;
  }
</style>

<!-- <Nav {segment}/> -->

<main>
  <slot />
  {#if segment !== 'hell-review'}
    <div
      class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto rounded
      lowercase flex justify-end mb-24">
      <nav
        class="p-4 bg-pink-200 text-gray-700 rounded-lg ml-4 shadow-md
        font-semibold">
        <a href="/shop">shop</a>
      </nav>
      <nav
        class="p-4 bg-pink-200 text-gray-700 rounded-lg ml-4 shadow-md
        font-semibold">
        <a href="/submit-song">submit song</a>
      </nav>
      <nav
        class="p-4 bg-pink-200 text-gray-700 rounded-lg ml-4 shadow-md
        font-semibold">
        <a href="/privacy-policy">privacy policy</a>
      </nav>
    </div>
  {:else}
    <div
      class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto rounded
      lowercase flex justify-end mb-24">
      <nav
        class="p-4 red text-white rounded-lg ml-4 shadow-md
        font-semibold">
        <a href="/shop">shop</a>
      </nav>
      <nav
        class="p-4 red text-white rounded-lg ml-4 shadow-md
        font-semibold">
        <a href="/submit-song">submit song</a>
      </nav>
      <nav
        class="p-4 red text-white rounded-lg ml-4 shadow-md
        font-semibold">
        <a href="/privacy-policy">privacy policy</a>
      </nav>
    </div>
  {/if}

</main>
