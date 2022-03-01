<script>
  import isEmail from "validator/lib/isEmail";
  import { onMount, onDestroy } from "svelte";
  import { goto } from "@sapper/app";
  import Modal from "../../components/Modal.svelte";

  const inputArr = [
    {
      label: "artist",
      bind: "artist_name",
    },
    {
      label: "song title",
      bind: "song_name",
    },
    {
      label: "streaming link",
      bind: "streaming_link",
    },
    {
      label: "contact email",
      bind: "contact_email",
    },
  ];

  let submittedto = "",
    state = "normal",
    showModal = false;
  $: selectedCategory = submittedto;
  $: currentState = state;

  const form = {
    data: {
      song_name: "",
      artist_name: "",
      streaming_link: "",
      contact_email: "",
      submittedto,
    },
    press_photo: "",
  };
  let userData;
  let isDataOk = false;

  $: if (selectedCategory) {
    if (submittedto === "hellreview") {
      document.body.classList.add("red-bg");
    } else if (submittedto === "songreview") {
      document.body.classList.remove("red-bg");
    }
  }

  onMount(async () => {
    submittedto = "songreview";
  });

  onDestroy(async () => {
    try {
      document.body.classList.remove("red-bg");
    } catch (error) {}
  });

  function checkIfDataIsOk() {
    isDataOk =
      form.song_name?.length > 1 &&
      form.artist_name?.length > 1 &&
      form.streaming_link?.length > 1 &&
      isEmail(form.contact_email) &&
      form.press_photo.length > 0;
  }

  function handleInput() {
    if (this.dataset.forminput) form[this.dataset.forminput] = this.value;
    console.log(isDataOk, this.dataset.forminput, form);
    checkIfDataIsOk();
    setTimeout(checkIfDataIsOk, 300);
  }

  async function handleSubmit() {
    state = "loading";
    try {
      const request = new XMLHttpRequest();

      const formData = new FormData();

      const formElements = this.elements;

      const data = {
        submittedto: submittedto,
      };

      for (let i = 0; i < formElements.length; i++) {
        const currentElement = formElements[i];
        if (!["submit", "file"].includes(currentElement.type)) {
          data[currentElement.name] = currentElement.value;
        } else if (currentElement.type === "file") {
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

      formData.append("data", JSON.stringify(data));

      // request.open('POST', `https://single-song-review.herokuapp.com/songs`);

      // request.send(formData);

      const res = await fetch(
        "https://single-song-review.herokuapp.com/songs",
        {
          method: "POST",
          body: formData,
        }
      );

      const song = await res.json();

      state = "normal";

      if (!song.artistId.confirm) {
        showModal = true;
      } else {
        await goto("/referral/" + song.artistId.referral);
      }
    } catch (error) {}
  }
</script>

<svelte:head>
  <title>Submit Song</title>
</svelte:head>

<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12 py-12 {selectedCategory ===
  'hellreview'
    ? 'red uppercase text-white white-shadow'
    : 'bg-pink-200 rounded lowercase shadow-md'}"
>
  {#if currentState === "loading"}
    <div class="loader w-full mx-auto" />
  {:else}
    <div class="flex justify-center items-center">
      <span class="mr-6">
        <a href="/" class="inline-block">
          {#if selectedCategory === "hellreview"}
            <img class="mx-auto h-48 sm:h-64" src="./Devil Boi.png" alt="" />
          {:else}
            <img class="mx-auto w-20 sm:w-32" src="./profile.svg" alt="" />
          {/if}
        </a>
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
    <form
      class="mt-8 max-w-lg mx-auto"
      enctype="multipart/form-data"
      on:submit|preventDefault={handleSubmit}
    >
      <div class="flex justify-between">
        <button
          class="border-2 border-white p-4 w-1/2 bg-pink-300 font-semibold
          rounded-lg"
          on:click|preventDefault={() => (submittedto = "songreview")}
        >
          a single song review
        </button>
        <button
          class="border-2 border-black p-4 w-1/2 ml-4 red font-semibold"
          on:click|preventDefault={() => (submittedto = "hellreview")}
        >
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
              focus:outline-none text-black"
              name={input.bind}
              placeholder={input.label}
              data-forminput={input.bind}
              on:input={handleInput}
            />
          </div>
        {/each}
        <div class="pt-6">
          <label class="p-2 text-lg normal-case" for="press_photo">
            Press Shot
          </label>
          <input
            type="file"
            class="text-md block px-3 py-3 rounded-lg w-full bg-white
            bg-opacity-0 border-2 border-white placeholder-gray-600
            focus:placeholder-gray-500 focus:bg-white focus:border-green-400
            focus:outline-none mt-2"
            name="press_photo"
            on:input={handleInput}
            bind:value={form.press_photo}
          />
        </div>
        <div class="pt-10 pb-5 text-center">
          <input
            type="submit"
            class="{isDataOk
              ? 'bg-green-400'
              : 'bg-white'} hover:bg-gray-100 w-full text-2xl text-gray-700
            cursor-pointer rounded p-3 px-7"
            :disabled={!isDataOk}
            value="submit song"
          />
        </div>
      </div>
    </form>
  {/if}
</div>

<Modal
  message="successfully submitted song! Please confirm your email."
  bind:show={showModal}
/>

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
