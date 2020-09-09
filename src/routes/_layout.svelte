<script>
  import Nav from "../components/Nav.svelte";
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import CartStore from "../stores/cart";

  const { preloading, page, session } = stores();

  const { host, path, params, query } = $page;

  export let segment;

  onMount(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    CartStore.set(cart);
  });

  console.log(segment);
</script>

<style>
  :global(.green) {
    background: linear-gradient(-45deg, #39df78, #f6f6f6);
    background-size: 400% 1000%;
    animation: gradient 8s ease infinite;
  }

  :global(.red-bg) {
    background: linear-gradient(-45deg, #eb8989, #000, #fff);
    background-size: 400% 1000%;
    animation: gradient 10s ease infinite;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
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
      <nav class="p-4 red text-white rounded-lg ml-4 shadow-md font-semibold">
        <a href="/shop">shop</a>
      </nav>
      <nav class="p-4 red text-white rounded-lg ml-4 shadow-md font-semibold">
        <a href="/submit-song">submit song</a>
      </nav>
      <nav class="p-4 red text-white rounded-lg ml-4 shadow-md font-semibold">
        <a href="/privacy-policy">privacy policy</a>
      </nav>
    </div>
  {/if}

</main>
