<script>
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import * as firebase from "firebase/app";
  import "firebase/auth";

  const { preloading, page, session } = stores();

  const { host, path, params, query } = $page;

  let sentConfirmation = false;

  let email = "";
  let green;
  let loading = false;
  $: changeToGreen = green;
  ///
  async function addToEmailList() {
    loading = true;
    const ref = query["ref"];
    const res = await fetch(
      "https://single-song-review.herokuapp.com/subscribers",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          ref
        })
      }
    );

    if (res.status === 200) {
      await goto("subscribe/check-mail");
    }

    loading = false;
  }

  async function turnButtonGreen() {
    green = this.value.length > 0;
  }

  function checkRecaptcha() {
    grecaptcha.ready(function() {
      grecaptcha
        .execute("6LcGmsoZAAAAAAKLJknO7S6FAZZ20GNhU057sXhC", {
          action: "submit"
        })
        .then(async function(token) {
          const res = await fetch("http://127.0.0.1:1337/subscribers/verify", {
            method: "POST",
            body: JSON.stringify(token)
          });

          const data = await res.json();

          if(data.data.succees) {
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
      .then(async function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        email = result.user.email;
        await addToEmailList();
        // ...
      })
      .catch(function(error) {
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
      .then(async function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        email = result.user.email;
        await addToEmailList();
      })
      .catch(function(error) {
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

{#if !loading}
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
      <div class="flex flex-col md:flex-row mt-8">
        <input
          type="email"
          class="p-2 rounded-md border-4 border-white flex-auto bg-transparent
          outline-none focus:border-green-400"
          placeholder="email"
          bind:value={email}
          on:input={turnButtonGreen} />
        <button
          class="{changeToGreen ? 'bg-green-400' : 'bg-white'} hover:bg-gray-200
          shadow-md rounded-md px-4 py-2 mt-4 md:mt-0 md:ml-2"
          on:click={checkRecaptcha}>
          try it
        </button>
      </div>
    </div>
    <div
      class="mt-8 max-w-lg mx-auto flex flex-col md:flex-row justify-between
      text-xl text-gray-600 font-semibold">
      <button
        href="/"
        class="bg-white hover:bg-gray-200 shadow-md rounded-md px-4 py-2"
        on:click={signInWithFacebook}>
        subscribe with facebook
      </button>
      <button
        href="/"
        class="bg-white hover:bg-gray-200 shadow-md rounded-md px-4 py-2 mt-4
        md:mt-0"
        on:click={signInWithGoogle}>
        subscribe with google
      </button>
    </div>

  </div>
{:else}
  <div
    class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
    bg-pink-200 rounded py-12 lowercase shadow-md">
    <div class="loader w-full mx-auto" />
  </div>
{/if}
