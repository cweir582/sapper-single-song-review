<script>
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import { loadStripe } from "@stripe/stripe-js";

  const { preloading, page, session } = stores();

  const { host, path, params, query } = $page;

  let state = "not";
  $: currentState = state;

  onMount(async () => {

    if(query['token']) {
      const res = await fetch(
        "http://127.0.0.1:1337/subscribers/hell-review/" + query["token"],
        {
          method: "GET"
        }
      );
  
      const data = await res.json();
  
      console.log(data);
  
      if (res.status === 200) {
        state = "pay";
        await redirectToStripe();
      }
    } else if(query['confirm']) {
            const res = await fetch(
        "http://127.0.0.1:1337/subscribers/hell-review/confirm/" + query["confirm"],
        {
          method: "GET"
        }
      );
  
      const data = await res.json();
  
      console.log(data);
  
      if (res.status === 200) {
        state = "confirmed";
      }
    }

  });

  async function redirectToStripe() {
    const stripe = await loadStripe(
      "pk_test_JMR0cpIhdGda0d2iqs5FEJpk00bvVGUNNf"
    );
    const res = await fetch("https://single-song-review.herokuapp.com/products/hrsubscribe", {
      method: "POST",
      body: JSON.stringify({ token: query["token"] })
    });

    const session = await res.json();

    return stripe.redirectToCheckout({ sessionId: session.id });
  }
</script>

<style>

</style>

<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  red py-12 uppercase shadow-md text-white">

  {#if currentState === 'confirmed'}
    <div class="flex justify-start items-center mx-auto max-w-lg">
      <span class="mr-6">
        <img class="mx-auto w-20 sm:w-26" src="./logo.png" alt="" />
      </span>
      <span class="font-bold text-2xl sm:text-4xl md:text-4xl">CONFIRMED</span>
    </div>

    <div class="mt-2 max-w-lg mx-auto">
      <h1 class="font-bold text-3xl">YOU’RE ALL SET, GOOD JOB</h1>
    </div>

    <div class="h-64">&nbsp</div>
  {:else}
    <div class="flex justify-start items-center mx-auto max-w-lg">Loading</div>
  {/if}

</div>
