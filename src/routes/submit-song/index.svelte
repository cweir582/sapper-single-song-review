<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  const inputArr = [
    {
      label: "artist",
      bind: "artist_name"
    },
    {
      label: "song title",
      bind: "song_name"
    },
    {
      label: "streaming link",
      bind: "streaming_link"
    },
    {
      label: "contact email",
      bind: "contact_email"
    }
  ];

  const form = {
    data: {
      song_name: "",
      artist_name: "",
      streaming_link: "",
      contact_email: "",
    },
    press_photo: ""
  };
  let userData;

  onMount(async () => {});

  function handleInput() {
    form[this.dataset.forminput] = this.value;
  }

  async function handleSubmit() {

    const request = new XMLHttpRequest();

    const formData = new FormData();

    const formElements = this.elements;

    const data = {};

    for (let i = 0; i < formElements.length; i++) {
      const currentElement = formElements[i];
      if (!['submit', 'file'].includes(currentElement.type)) {
        data[currentElement.name] = currentElement.value;
      } else if (currentElement.type === 'file') {
        if (currentElement.files.length === 1) {
          const file = currentElement.files[0];
          formData.append(`files.${currentElement.name}`, file, file.name);
        } else {
          for (let i = 0; i < currentElement.files.length; i++) {
            const file = currentElement.files[i];

            formData.append(`files.${currentElement.name}`, file, file.name);
          }
        }
      }
    }

    formData.append('data', JSON.stringify(data));

    // request.open('POST', `http://127.0.0.1:1337/songs`);

    // request.send(formData);

    const res = await fetch('https://single-song-review.herokuapp.com/songs', {
      method: 'POST',
      body: formData
    })

    const song = await res.json();

    if(!song.artistId.confirm) {
      await goto('submit-song/confirmation');
    }

  }
</script>

<svelte:head>
  <title>Submit Song</title>
</svelte:head>

<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md">
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
  <form class="mt-8 max-w-lg mx-auto" enctype="multipart/form-data" on:submit|preventDefault={handleSubmit}>
    <div class="flex justify-between">
      <button
        class="border-2 border-white p-4 w-1/2 bg-pink-300 font-semibold
        rounded-lg">
        a single song review
      </button>
      <button
        class="border-2 border-black p-4 w-1/2 ml-4 bg-bright-red font-semibold">
        THE HELL REVIEW
      </button>
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
            name={input.bind}
            placeholder={input.label}
            data-forminput={input.bind}
            on:input={handleInput} />
        </div>
      {/each}
      <div class="pt-6">
        <label class="p-2 text-lg normal-case" for="press_photo">Press Shot</label>
        <input
          type="file"
          class="text-md block px-3 py-3 rounded-lg w-full bg-white bg-opacity-0
          border-2 border-white placeholder-gray-600 focus:placeholder-gray-500
          focus:bg-white focus:border-green-400 focus:outline-none mt-2" name="press_photo" bind:value={form.press_photo}/>
      </div>
      <div class="pt-10 pb-5 text-center">
        <input
          type="submit"
          class="bg-white hover:bg-gray-100 w-full text-2xl text-gray-700
          cursor-pointer rounded p-3 px-7"
          value="submit song" />
      </div>
    </div>
  </form>
</div>
