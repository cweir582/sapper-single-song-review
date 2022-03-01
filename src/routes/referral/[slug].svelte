<script>
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";

  const { preloading, page, session } = stores();
  const { host, path, params, query } = $page;
  const { slug } = params;

  let artist = {
    referral: "",
    referred: ""
  };

  let mail = {
    to: "",
    message: "",
    from: ""
  };

    let mailMessage = "";
  $: mMessage = mailMessage;

  onMount(async () => {
    const res = await fetch(
      "https://single-song-review.herokuapp.com/artists/referral/" + slug
    );
    const data = await res.json();

    artist = {
      referral: host + "?ref=" + data.referral,
      referred: data.referred
    };
  });

  function handleSelect() {
    const LINK_INPUT = "referral-link";
    const el = this.id === LINK_INPUT ? this : this.previousElementSibling;

    el.select();
    document.execCommand("copy");

    const btn = el.id !== LINK_INPUT ? el : el.nextElementSibling;
    btn.innerText = "copied!";
  }

 async function sendMailToContact() {
    try {
    mail.message += " " +  `<a href='https://${artist.referral}'>Click here</a>` ;
    mailMessage = "sending...";
    const res = await fetch("https://single-song-review.herokuapp.com/artists/sendrefmail", {
      method: "POST",
      body: JSON.stringify(mail)
    });

    if (res.status === 200) {
      const data = await res.json();
      mailMessage = "sent";
      console.log(data);
    }
      
    } catch (error) {
      mailMessage = "something went wrong";
    }

    setInterval(() => {
      mailMessage = "";
    }, 2000)
  }
</script>

<div
  class="mx-4 px-8 md:px-0 md:w-8/12 lg:w-8/12 xl:w-7/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md">
  <div class="flex justify-center items-center max-w-lg mx-auto">
    <span class="mr-6">
      <img class="mx-auto w-20 sm:w-32" src="./profile.svg" alt="" />
    </span>
    <span class="font-bold text-2xl sm:text-4xl md:text-5xl">
      refer fans -> get reviewed
    </span>
  </div>

  <div class="mt-8 max-w-2xl mx-8 lg:mx-auto">
    <h1
      class="text-3xl font-semibold p-2 bg-white rounded-md shadow-md
      text-center max-w-md mx-auto">
      You have {artist.referred || '0'} referrals
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
        value={artist.referral || 'loading..'}
        on:click={handleSelect} />
      <button
        class="bg-green-400 shadow-md text-black text-sm px-4 py-4 ml-4
        rounded-md flex items-center"
        on:click={handleSelect}>
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
        <form action="" on:submit|preventDefault={sendMailToContact}>
          <div class="">
            <input
              type="text"
              class="p-4 w-full rounded-md shadow-md"
              placeholder="to: (enter your contacts email)"
              bind:value={mail.to} />
          </div>
          <div class="mt-4">
            <label for="">let your friends know who is contacting them</label>
            <input
              type="text"
              class="mt-2 p-4 w-full rounded-md shadow-md"
              placeholder="from: (sender name)"
              bind:value={mail.from} />
          </div>
          <div class="mt-4">
            <textarea
              class="p-4 h-56 resize-y w-full rounded-md shadow-md"
              placeholder="lorem ipsum"
              bind:value={mail.message} />
          </div>
           <div class="">{mMessage}</div>
          <div class="mt-4">
            <input
              type="submit"
              class="px-4 py-2 w-full md:w-40 text-xl bg-green-400 shadow-md
              rounded-md"
              value="send!" />
          </div>
        </form>
      </div>
      <div class="w-full md:w-5/12 ml-0 mt-4 md:mt-0 md:ml-4">
        <!-- <button class="px-4 py-2 text-xl bg-green-400 shadow-md rounded-md ">add from contacts</button> -->
        <div class="mt-4 text-2xl">feel free to customise your message</div>
      </div>
    </div>
    <div class="mt-8">
      <div class="font-bold text-2xl">share on social</div>
      {#if artist}
        <div class="flex mt-4">
          <div
            class="w-20 h-20 flex justify-center items-center bg-blue-700
            rounded-md text-3xl shadow-md mr-4">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u={artist.referral}"
              target="_blank">
              f
            </a>
          </div>
          <div
            class="w-20 h-20 flex justify-center items-center bg-blue-400
            rounded-md text-3xl shadow-md mr-4">
            <a href="https://twitter.com/intent/tweet?url={artist.referral}&text={"Subscribe to asinglesongreview"}" target="_blank">t</a>
          </div>
          <div
            class="w-20 h-20 flex justify-center items-center bg-blue-600
            rounded-md text-3xl shadow-md mr-4">
            <a href="https://www.linkedin.com/shareArticle?mini=true&url={artist.referral}&title={'asinglesongreview.com'}&source={artist.referral}">
            l
            </a>
          </div>
        </div>
      {/if}

    </div>
  </div>

</div>
