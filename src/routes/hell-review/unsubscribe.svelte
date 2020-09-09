<script>
    import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import { loadStripe } from "@stripe/stripe-js";

  const { preloading, page, session } = stores();

  const { host, path, params, query } = $page;

  let state = "normal";
  $: currState = state;

  let black;

  $: currentState = state;
  $: turnBlack = black;

  let form = {
    email: ""
  };

  async function turnButtonBlack() {
    black = this.value.length > 0;
  }

  async function sendVerificationMail() {
    state = "loading";
    try {
      const res = await fetch(
        "http://127.0.0.1:1337/subscribers/hell-review/unsubscribeEmail",
        {
          method: "POST",
          body: JSON.stringify(form)
        }
      );

      state = "email";

      const data = await res.json();
    } catch (error) {
      state = "normal";
    }
  }

  onMount(async () => {
    const confirm = query["confirm"];

    if(confirm) {
      await unsubcribeFromHR()
    }
  })

  async function unsubcribeFromHR() {
    state = "loading"
    try {
          const res = await fetch("http://127.0.0.1:1337/products/unsubscribehr", {
      method: "POST",
      body: JSON.stringify({ token: query["confirm"] })
    });

    const data = await res.json();
    state = "ubsubscribed";
    } catch (error) {
      state = "normal";
    }

  }
</script>

<style>

</style>

<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12 red
  py-12 uppercase shadow-md text-white">

  {#if currState === 'ubsubscribed'}
    <div class="flex justify-start items-center mx-auto max-w-lg">
      <span class="mr-6">
        <img class="mx-auto w-20 sm:w-26" src="./logo.png" alt="" />
      </span>
      <span class="font-bold text-2xl sm:text-4xl md:text-4xl">
        UNSUBSCRIBED
      </span>
    </div>

    <div class="mt-2 max-w-lg mx-auto">
      <h1 class="font-bold text-3xl">OK BYE, PAYMENTS HAVE STOPPED</h1>
    </div>

    <div class="h-64">&nbsp</div>
  {:else if state === "email"}
<div class="flex justify-start items-center mx-auto max-w-lg">
      <span class="mr-6">
        <img class="mx-auto w-20 sm:w-26" src="./logo.png" alt="" />
      </span>
      <span class="font-bold text-2xl sm:text-4xl md:text-4xl">
        PLEASE CHECK YOUR EMAIL.
      </span>
    </div>

    <div class="h-64">&nbsp</div>
  {:else if state === "loading"}
<div class="flex justify-start items-center mx-auto max-w-lg">
      <span class="mr-6">
        <img class="mx-auto w-20 sm:w-26" src="./logo.png" alt="" />
      </span>
      <div class="flex justify-start items-center mx-auto max-w-lg">Loading</div>
    </div>


    <div class="h-64">&nbsp</div>
  {:else}
    <div class="flex flex-col justify-start items-center mx-auto max-w-lg">
      <span class="mr-6">
        <img class="mx-auto w-20 sm:w-26" src="./logo.png" alt="" />
      </span>
      <span class="font-bold text-xl sm:text-xl md:text-2xl">
        UNSUBSCRIBE FROM HELLREVIEW
      </span>
      <div class="flex mt-8 w-full">
        <input
          type="email"
          class="p-2 rounded-md border-4 border-white flex-auto bg-transparent
          outline-none focus:border-black"
          placeholder="EMAIL"
          bind:value={form.email}
          on:input={turnButtonBlack} />
        <button
          class="{turnBlack ? 'bg-black hover:bg-gray-900 text-white' : 'bg-white hover:bg-gray-200 text-black'}
          shadow-md rounded-md px-4 py-2 uppercase text-black ml-2"
          on:click={sendVerificationMail}>
          UNSUBSCRIBE
        </button>
      </div>
    </div>
  {/if}

</div>
