<script>
    import { goto, stores } from "@sapper/app";
    import { onMount } from "svelte";
  const { preloading, page, session } = stores();

  const { host, path, params, query } = $page;

  let state = 'none', data;

  $: resState = state

  onMount(async() => {
    if(!query['token']) return;

    state = 'loading';

    console.log(query['token']);

    try {
      const res = await fetch('https://single-song-review.herokuapp.com/artists/confirm/' + query['token'], {
      method: 'GET',
    });

    if(res.status === 200) {
      data = await res.json();
      state = data.confirm ? 'confirmed' : 'loading'; 
    }
    } catch (error) {
      state = 'failed' 
    }
  })

    function handleSelect() {
    const LINK_INPUT = "referral-link";
    const el = this.id === LINK_INPUT ? this : this.previousElementSibling;
    
    el.select();
    document.execCommand("copy");

    const btn = el.id !== LINK_INPUT ? el : el.nextElementSibling;
    btn.innerText = 'copied!'
  }

</script>

<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md">
    {#if resState === 'confirmed'}
  <div class="flex justify-center items-center">
    <span class="mr-6">
      <img class="mx-auto w-20 sm:w-32" src="./logo.png" alt="" />
    </span>
    <span class="font-semibold text-2xl sm:text-4xl md:text-5xl">
      You're all set
    </span>
  </div>

  <div class="mt-8 max-w-lg mx-auto">
    <h1 class="text-3xl font-semibold">your song is submitted!</h1>
    <div class="text-xl font-semibold">
      we’ll send you a notification if your song gets picked. you can boost the
      likelihood your song gets picked by sharing the following link:
    </div>
    <div class="flex justify-start w-full mt-4">
      <input
        id="referral-link"
        type="text"
        class="bg-gray-200 w-10/12 p-2 rounded-md rounded-r-none border
        cursor-pointer"
        value="https://asinglesongreview.com?ref={data.referral}" on:click={handleSelect}/>
      <button
        class="bg-white text-black text-sm px-2 py-2 rounded-md rounded-l-none
        flex items-center" on:click={handleSelect}>
        copy
      </button>
    </div>
    <div class="text-xl font-semibold mt-4">
      your fans have to subscribe using this link, if they subscribe without
      clicking on it then they won’t be counted!
    </div>
  </div>
    {:else if resState === 'loading'}
      <div class="text-xl font-semibold mt-4 p-10">
        loading
      </div>
    {:else}
    <div class="text-xl font-semibold mt-4 p-10">
      Please confirm your email
    </div>
    {/if}

</div>
