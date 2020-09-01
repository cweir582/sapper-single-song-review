<script>
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  const { preloading, page, session } = stores();

    const { host, path, params, query } = $page;

  let sentConfirmation = false;

  let email = "";

  async function addToEmailList() {
    const ref = query['ref'];
    const res = await fetch('https://single-song-review.herokuapp.com/subscribers', {
      method: 'POST',
      body: JSON.stringify({
        email,
        ref
      })
    });

    if (res.status === 200) {
      await goto('subscribe/check-mail');
    }
  }

</script>

<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md">
  <div class="flex justify-center items-center mx-auto max-w-lg">
    <span class="mr-6">
      <img class="mx-auto w-20 sm:w-26" src="./logo.png" alt="" />
    </span>
    <span class="font-bold text-2xl sm:text-4xl md:text-4xl">
      a single song review
    </span>
  </div>

  <div class="mt-4 max-w-lg mx-auto">
    <h1 class="font-bold text-3xl">want to find your new favourite band?</h1>
  </div>

  <div class="mt-8 max-w-lg mx-auto text-xl font-semibold">
    <p class="text-xl">
      join the hot weekly newsletter for underground music lovers, finding the
      best new music one song at a time
    </p>
    <div class="flex mt-8">
      <input
        type="email"
        class="p-2 rounded-md border-4 border-white flex-auto bg-transparent"
        placeholder="email" bind:value={email}/>
      <button class="bg-white hover:bg-gray-200 shadow-md rounded-md px-4 py-2" on:click={addToEmailList}>
        try it
      </button>
    </div>
  </div>
  <div
    class="mt-8 max-w-lg mx-auto flex justify-between text-xl text-gray-600
    font-semibold">
    <button
      href="/"
      class="bg-white hover:bg-gray-200 shadow-md rounded-md px-4 py-2">
      subscribe with facebook
    </button>
    <button
      href="/"
      class="bg-white hover:bg-gray-200 shadow-md rounded-md px-4 py-2">
      subscribe with google
    </button>
  </div>

</div>
