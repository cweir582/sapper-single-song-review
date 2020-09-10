<script>
  import { goto, stores } from "@sapper/app";
    import { onMount } from "svelte";
  const { preloading, page, session } = stores();

  const { host, path, params, query } = $page;

  const { slug } = params;

  let artist = {
    referral: "",
    referred: ""
  }

  onMount(async () => {
    const res = await fetch('https://single-song-review.herokuapp.com/artists/referral/' + slug);
    const data = await res.json();

    artist = {
      referral: host + '?ref=' + data.referral,
      referred:  data.referred,
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
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md">
  <div class="flex justify-center items-center max-w-lg mx-auto">
    <span class="mr-6">
      <img class="mx-auto w-20 sm:w-32" src="./logo.png" alt="" />
    </span>
    <span class="font-bold text-2xl sm:text-4xl md:text-5xl">
      refer fans -> get reviewed
    </span>
  </div>

  <div class="mt-8 max-w-2xl mx-8 lg:mx-auto">
    <h1
      class="text-3xl font-semibold p-2 bg-white rounded-md shadow-md
      text-center max-w-md mx-auto">
      You have {artist.referred || 'X'} referrals
    </h1>
    <div class="text-2xl font-semibold mt-4">share your link</div>
    <div class="text-2xl mt-2">
      share your referral link with your fans and get rewards!
    </div>
    <div class="flex justify-center w-full mt-4">
      <input
        id="referral-link"
        type="text"
        class="bg-white shadow-md w-9/12 p-4 rounded-md border cursor-pointer"
        value="{artist.referral || 'loading..'}" on:click={handleSelect}/>
      <button
        class="bg-green-400 shadow-md text-black text-sm px-4 py-4 ml-4
        rounded-md flex items-center" on:click={handleSelect}>
        copy
      </button>
    </div>
    <div class="text-xl font-semibold mt-4">
      your fans have to subscribe using this link, if they subscribe without
      clicking on it then they won’t be counted!
    </div>
    <div class="text-2xl font-bold mt-4">share with email</div>
    <div class="text-2xl mt-2">
      send an email to your contacts asking them to subscribe, we’ll add your
      referral link automatically
    </div>
    <div class="flex flex-col md:flex-row mt-8">
      <div class="w-full md:w-7/12">
        <form action="">
          <div class=""><input type="text" class="p-4 w-full rounded-md shadow-md" placeholder="to: (enter your contacts email)"></div>
          <div class="mt-4"><textarea class="p-4 h-56 resize-y w-full rounded-md shadow-md" placeholder="lorem ipsum"></textarea></div>
          <div class="mt-4"><input type="submit" class="px-4 py-2 w-full md:w-40 text-xl bg-green-400 shadow-md rounded-md" value="send!"></div>
        </form>
      </div>
      <div class="w-full md:w-5/12 ml-0 mt-4 md:mt-0 md:ml-4">
        <button class="px-4 py-2 text-xl bg-green-400 shadow-md rounded-md ">add from contacts</button>
        <div class="mt-4 text-2xl">feel free to customise your message</div>
      </div>
    </div>
  <div class="mt-8">
    <div class="font-bold text-2xl">share on social</div>
    <div class="flex mt-4">
      <div class="w-20 h-20 flex justify-center items-center bg-blue-700 rounded-md text-3xl shadow-md mr-4">f</div>
      <div class="w-20 h-20 flex justify-center items-center bg-blue-400 rounded-md text-3xl shadow-md mr-4">t</div>
      <div class="w-20 h-20 flex justify-center items-center bg-blue-600 rounded-md text-3xl shadow-md mr-4">l</div>
    </div>
  </div>
  </div>

</div>
