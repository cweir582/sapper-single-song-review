<script>
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import firebase from "firebase/app";
  import "firebase/auth";
  import * as api from "api.js";
  import isEmail from "validator/lib/isEmail";

  const { preloading, page, session } = stores();

  const { host, path, params, query } = $page;

  let sentConfirmation = false;

  let email = "";
  let lowerEmail = "";
  let green;
  let lowerGreen;
  let loading = false;
  $: changeToGreen = green;
  $: lowerChangeToGreen = lowerGreen;
  ///
  let review = { press_photo: "", song_name: "", artist_name: "" };
  let vinyl = { name: "", streaming_link: "", artist_name: "" };

  const getReview = async () => {
    const { status, body } = await api.get("reviews/");
    return body[0];
  };

  onMount(async () => {
    review = await getReview();
    vinyl = await getVinyl();
  });

  async function getVinyl() {
    const data = await fetch("https://single-song-review.herokuapp.com/monthly-vinyl-draw");
    return data.json();
  }

  async function addToEmailList() {
    loading = true;
    const ref = query["ref"];
    console.log("addToEmailList");
    console.log(email);
    console.log(ref);
    const res = await fetch(
      "https://single-song-review.herokuapp.com/subscribers",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          ref,
        }),
      }
    );

    if (res.status === 200) {
      await goto("subscribe/check-mail");
    }

    loading = false;
  }

  async function turnButtonGreen() {
    green = this.value.length > 0 && isEmail(this.value);
  }

  async function lowerTurnButtonGreen() {
    lowerGreen = this.value.length > 0 && isEmail(this.value);
  }

  function checkRecaptcha() {
    grecaptcha.ready(function () {
      grecaptcha
        .execute("6Ler9MoZAAAAAIVf_ClJ921NN0_EoVjFLZRHiCLd", {
          action: "submit",
        })
        .then(async function (token) {
          const res = await fetch(
            "https://single-song-review.herokuapp.com/subscribers/verify",
            {
              method: "POST",
              body: JSON.stringify(token),
            }
          );
          const data = await res.json();
          //if (data.data.score >= 0.5)
          {
            await addToEmailList();
          }
        });
    });
  }

  async function signInWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        email = result.user.email;
        await addToEmailList();
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  async function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        email = result.user.email;
        await addToEmailList();
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error);
      });
  }
</script>

{#if !loading}
  <div
    class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
    bg-pink-200 rounded border-black border-8 py-12 lowercase shadow-md"
  >
    <div class="flex justify-center items-center mx-auto max-w-lg">
      <span class="mr-6">
        <a href="/" class="inline-block">
          <img class="mx-auto w-20 sm:w-26" src="./profile.svg" alt="" />
        </a>
      </span>
      <span class="font-bold text-2xl sm:text-3xl md:text-3xl bg-white">
        a single song review
      </span>
    </div>

    <div class="mt-4 max-w-lg mx-auto">
      <h1 class="font-bold text-3xl bg-white">
        want to find your new favourite band?
      </h1>
    </div>

    <div class="mt-8 max-w-lg mx-auto text-xl font-semibold">
      <p class="text-xl">
        join the hot weekly newsletter for underground music lovers, finding the
        best new music one song at a time
      </p>
      <div class="flex flex-col md:flex-row mt-8">
        <input
          type="email"
          class="p-2 rounded-md border-4 border-white flex-auto bg-transparent
          outline-none hover:bg-white focus:bg-white focus:border-green-400"
          placeholder="email"
          bind:value={email}
          on:input={turnButtonGreen}
        />
        <button
          class="{changeToGreen ? 'bg-green-400' : 'bg-white disabled'} hover:bg-gray-200
          shadow-md rounded-md px-4 py-2 mt-4 md:mt-0 md:ml-2"
          :disabled={!green}
          on:click={checkRecaptcha}
        >
          try it
        </button>
      </div>
    </div>

    <div class="mt-4 max-w-lg mx-auto">
      <h1 class="font-bold text-3xl bg-white">3 (more) reasons to join:</h1>
      <h1 class="font-bold text-xl mt-8">
        1. our subscribers love us, join to see why
      </h1>
      <div class="bg-white rounded flex justify-center py-8 mt-8">
        <a
          href="https://uk.trustpilot.com/review/asinglesongreview.com"
          target="_blank"
        >
          <img class="h-8" src="/trust.svg" alt="" /></a
        >
      </div>
      <h1 class="font-bold text-xl mt-8">
        2. find new music now, join to read
      </h1>
      <!-- Latest Review Start -->
      <div
        class="shadow-md flex items-center bg-white rounded-md text-center p-4 text-xl font-semibold mt-4"
      >
        {#if review.press_photo}
          <img
            class="w-10 rounded-md"
            src={review.press_photo.formats.thumbnail.url}
            alt={review.song_name}
          />
        {:else}
          <img
            class="w-10 rounded-md"
            src="https://dummyimage.com/600x400/000/fff"
            alt={review.song_name}
          />
        {/if}
        <p class="ml-2">{review.song_name} - {review.artist_name}</p>
      </div>
      <!-- Latest Review E N D-->
    </div>

    {#if vinyl.artist_name}
      <div
        class="mt-8 max-w-lg mx-auto
      text-xl text-gray-600 font-semibold"
      >
        <h1 class="font-bold text-black text-xl mt-8">
          3. monthly vinyl prize draw, join to enter
        </h1>
        <div class="flex mx-auto w-full max-w-lg shadow-md my-8">
          <img
            class="w-1/3 rounded-l-md"
            src={vinyl.image?.url}
            alt=""
          />
          <div
            class="text-left flex flex-col justify-around w-full sm:w-2/3 px-4 py-4
      bg-white rounded-lg sm:rounded-l-none leading-loose"
          >
            <div class="py-1 flex flex-wrap">
              <p>win: {vinyl.artist_name} - {vinyl.album_name}</p>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <div class="mt-8 max-w-lg mx-auto text-xl font-semibold">
        <h1 class="font-bold text-black text-xl mt-8">
          join
        </h1>
      <div class="flex flex-col md:flex-row mt-8">
        <input
          type="email"
          class="p-2 rounded-md border-4 border-white flex-auto bg-transparent
          outline-none hover:bg-white focus:bg-white focus:border-green-400"
          placeholder="email"
          bind:value={lowerEmail}
          on:input={lowerTurnButtonGreen}
        />
        <button
          class="{lowerChangeToGreen ? 'bg-green-400' : 'bg-whited'} hover:bg-gray-200
          shadow-md rounded-md px-4 py-2 mt-4 md:mt-0 md:ml-2"
          :disabled={!lowerChangeToGreen}
          on:click={checkRecaptcha}
        >
          try it
        </button>
      </div>
    </div>
  </div>
{:else}
  <div
    class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
    bg-pink-200 rounded py-12 lowercase shadow-md"
  >
    <div class="loader w-full mx-auto" />
  </div>
{/if}

<style>
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #68d391;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
