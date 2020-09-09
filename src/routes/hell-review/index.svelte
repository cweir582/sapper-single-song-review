<script>
  import { onMount } from "svelte";

  let state = "normal";
  let form = {
    email: ""
  };
  let black;

  $: currentState = state;
  $: turnBlack = black;

  onMount(async () => {});

  async function sendConfirmationEmail(params) {
    state = "loading";
    const res = await fetch("https://single-song-review.herokuapp.com/subscribers/hell-review", {
      method: "POST",
      body: JSON.stringify(form)
    });

    const data = await res.json();
    // console.log(data);
    if (res.status === 200) {
      state = "sent_mail";
    }else {
      state = "normal";
    }

  }

  async function turnButtonBlack() {
    black = this.value.length > 0;
  }
</script>

<style>
.loader {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #000; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

<div
  class="red mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
   py-12 uppercase shadow-md text-white white-shadow">
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
  {:else if currentState === 'loading'}
    <div class="mt-4 max-w-lg mx-auto">
      <div class="loader w-full mx-auto"></div>
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
          class="p-2 rounded-md border-4 border-white flex-auto bg-transparent outline-none focus:border-black"
          placeholder="EMAIL"
          bind:value={form.email} on:input={turnButtonBlack}/>
        <button
          class="{ turnBlack ? 'bg-black hover:bg-gray-900 text-white' : 'bg-white hover:bg-gray-200 text-black' } shadow-md rounded-md px-4 py-2
          uppercase text-black ml-2"
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
