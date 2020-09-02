<script>
  import { onMount } from "svelte";

  let state = "normal";
  let form = {
    email: ""
  };

  $: currentState = state;

  onMount(async () => {});

  async function sendConfirmationEmail(params) {
    const res = await fetch("https://single-song-review.herokuapp.com/subscribers/hell-review", {
      method: "POST",
      body: JSON.stringify(form)
    });

    const data = await res.json();
    // console.log(data);
    if (res.status === 200) {
      state = "sent_mail";
    }
  }
</script>

<style>

</style>

<div
  class="red mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
   py-12 uppercase shadow-md text-white">
  <div class="flex justify-center items-center mx-auto max-w-lg">
    <span class="mr-6">
      <img class="mx-auto w-20 sm:w-26" src="./logo.png" alt="" />
    </span>
    <span class="font-bold text-2xl sm:text-4xl md:text-4xl">
      The Hell Review
    </span>
  </div>

  {#if currentState === 'sent_mail'}
    <div class="mt-4 max-w-lg mx-auto">
      <div class="mt-8 max-w-lg mx-auto text-xl font-semibold">
        <p class="text-xl">Please check your email for a confirmation link</p>

      </div>
    </div>
  {:else}
    <div class="mt-4 max-w-lg mx-auto">
      <h1 class="font-bold text-3xl">
        WANT TO HEAR THE WORST FUCKING MUSIC EVER?
      </h1>
    </div>

    <div class="mt-8 max-w-lg mx-auto text-xl font-semibold">
      <p class="text-xl">
        JOIN THE PREMIUM MUSIC NEWSLETTER WHERE WE TAKE UNSUSPECTING SONGS AND
        PUT THEM THROUGH THE THUNDERDOME, JUST £1.50 A MONTH:
      </p>
      <div class="flex mt-8">
        <input
          type="email"
          class="p-2 rounded-md border-4 border-white flex-auto bg-transparent"
          placeholder="EMAIL"
          bind:value={form.email} />
        <button
          class="bg-white hover:bg-gray-200 shadow-md rounded-md px-4 py-2
          uppercase text-black"
          on:click={sendConfirmationEmail}>
          try it
        </button>
      </div>
    </div>
    <div class="font-bold text-center mt-4">
      <h1>OR</h1>
    </div>
    <div
      class="mt-4 max-w-lg mx-auto flex justify-between text-lg text-gray-600
      font-semibold uppercase">
      <button
        href="/"
        class="bg-white hover:bg-gray-200 shadow-md rounded-md px-4 py-2
        uppercase">
        subscribe with facebook
      </button>
      <button
        href="/"
        class="bg-white hover:bg-gray-200 shadow-md rounded-md px-4 py-2
        uppercase">
        subscribe with google
      </button>
    </div>
  {/if}

</div>
