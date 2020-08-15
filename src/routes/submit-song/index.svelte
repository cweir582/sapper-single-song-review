<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  const inputArr = [
    {
      label: "artist",
    },
    {
      label: "song title",
    },
    {
      label: "streaming link",
    },
    {
      label: "contact email",
    }
  ];

  const form = {
    introduction: "",
    like: "",
    dontLike: "",
    opinion: "",
    forfansof: "",
    shouldtheylistenmore: ""
  };
  let userData;

  onMount(async () => {});

  function handleInput() {
    form[this.dataset.forminput] = this.value;
  }

  async function handleSubmit() {}
</script>

<svelte:head>
  <title>Review Portal</title>
</svelte:head>

<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase">
  <div class="flex justify-center items-center">
    <span class="mr-6">
      <img class="mx-auto w-20 sm:w-32" src="./logo.png" alt="" />
    </span>
    <span class="font-semibold text-2xl sm:text-4xl md:text-5xl">
      submit a song
    </span>
  </div>
  <div class="mt-8 max-w-lg mx-auto">
    <h1 class="text-3xl font-semibold">
      want to get your song heard by thousands of people for free?
    </h1>
    <div class="text-xl">
      <p class=" pt-4">
        it’s easy! we just need a little bit of information from you below
      </p>
      <p class="">before you submit, there’s something you should know:</p>
      <div class="">
        - we choose what song gets reviewed using a random lottery
      </div>
      <div class="">
        - you can increase the chance your song will get picked by referring
        your fans to the newsletter
      </div>
      <p class="pt-4">
        we also have a second, premium monthly newsletter called THE HELL
        REVIEW, where we’ll review your song but go out of our way to be mean
        about it. you can only submit your song to one newsletter:
      </p>
    </div>
  </div>
  <form class="mt-8 max-w-lg mx-auto" on:submit|preventDefault={handleSubmit}>
    <div class="flex justify-between">
          <button class="border-2 border-white p-4 w-1/2 bg-pink-300 font-semibold rounded-lg">a single song review</button>
          <button class="border-2 border-black p-4 w-1/2 ml-4 bg-bright-red font-semibold">THE HELL REVIEW</button>
    </div>
    <div class="">
      <!-- Inputs -->
      {#each inputArr as input}
        <div class="pt-8">
          <input
            type="text"
            class="text-md block px-3 py-3 rounded-lg w-full bg-white
            bg-opacity-0 border-2 border-white placeholder-gray-600
            focus:placeholder-gray-500 focus:bg-white focus:border-green-400
            focus:outline-none"
            placeholder={input.label}
            data-forminput={input.bind}
            on:input={handleInput} />
        </div>
      {/each}
      <div class="pt-8">
        <input
          type="file"
          class="text-md block px-3 py-3 rounded-lg w-full bg-white bg-opacity-0
          border-2 border-white placeholder-gray-600 focus:placeholder-gray-500
          focus:bg-white focus:border-green-400 focus:outline-none"
          />
      </div>
      <div class="pt-10 pb-5 text-center">
        <input
          type="submit"
          class="bg-white hover:bg-gray-100 w-full text-2xl text-gray-700 cursor-pointer rounded
          p-3 px-7"
          value="Submit Review" />
      </div>
    </div>
  </form>
</div>
