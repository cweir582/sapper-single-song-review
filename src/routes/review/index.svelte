<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
import Modal from "../../components/Modal.svelte";

  const inputArr = [
    {
      label: "Introduction",
      desc:
        "An introduction, a bit about the song, encourage readers to give it a listen",
      bind: "introduction"
    },
    {
      label: "What I Like",
      desc:
        "What are your highlights? anything stick out that’s really good? what’s your favourite part?",
      bind: "like"
    },
    {
      label: "What I don't Like",
      desc:
        "Any criticisms? anything you think they could improve? anything that’s just not up to scratch?",
      bind: "dontLike"
    },
    {
      label: "My Drunken Opinion",
      desc:
        "Please note this section is optional and you do not have to drink for it, a single sentance describing the song ina funny way, spelling mistakes encouraged",
      bind: "opinion"
    },
    {
      label: "For Fans of",
      desc:
        "What artist does this song sound like? please past a song links below your paragraph",
      bind: "forfansof"
    },
    {
      label: "Should You Listen to More",
      desc:
        "Should the reader listen to more of this artist? why? why not? any song recommendations by this artist you can give? if you found a good album or ep please paste a link below",
      bind: "shouldtheylistenmore"
    }
  ];

  const form = {
    introduction: "",
    like: "",
    dontLike: "",
    opinion: "",
    forfansof: "",
    shouldtheylistenmore: "",
    reviewer: "",
    song: {},
    category: "songreview"
  };
  let userData, song = null, showModal = false;
  $: pickedSong = song;

  onMount(async () => {
    userData = JSON.parse(localStorage.getItem("user"));
    if (!(userData && userData.jwt)) {
      await goto("/auth");
    }

    if(userData) {
      form.reviewer = userData.user.username;
    }
  });

  function handleSelect() {
    const LINK_INPUT = "streaming-link";
    const el = this.id === LINK_INPUT ? this : this.previousElementSibling;

    el.select();
    document.execCommand("copy");

    const btn = el.id !== LINK_INPUT ? el : el.nextElementSibling;
    btn.innerText = "copied!";
  }

  function handleInput() {
    form[this.dataset.forminput] = this.value;
  }

  async function handleSubmit() {
    try {
      const res = await fetch(
        "https://single-song-review.herokuapp.com/reviews",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await res.json();

    } catch (error) {
      
    }
  }

  async function handleSaveReview() {
    try {
      const res = await fetch(
        "https://single-song-review.herokuapp.com/draft-reviews",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await res.json();
      console.log(data)

    } catch (error) {
    
    }
  }

  async function pickASong() {
    const res = await fetch("https://single-song-review.herokuapp.com/songs/random", {
      headers: {
        'Authorization': "Bearer " + userData.jwt
      }
    });

    if(res.status === 200) {
      song = await res.json();
      form.song = song.id;
    }

    this.style.display = "none";

    // console.log();
  }
</script>

<svelte:head>
	<title>Review Portal</title>
</svelte:head>

<div
	class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md"
>
	<div class="flex justify-center items-center">
		<span class="mr-6">
			<img class="mx-auto w-20 sm:w-32" src="./profile.svg" alt="" />
		</span>
		<span class="font-semibold text-2xl sm:text-4xl md:text-5xl">
			Writers portal
		</span>
	</div>
	<div class="text-center flex flex-col my-4">
		<div class="">
			<button
				id="copy-btn"
				class="bg-green-400 hover:bg-green-500 text-2xl cursor-pointer rounded
        shadow-md p-3 px-7"
				on:click={pickASong}
			>
				pick a song
			</button>
		</div>

		{#if pickedSong}
			<div class="flex mx-auto w-full max-w-lg shadow-md my-8">
				<img
					class="h-full sm:w-1/3 object-fit rounded-lg rounded-r-none pb-5/6
        hidden sm:block"
					src={song.press_photo.formats.thumbnail.url ||
						'https://dummyimage.com/600x400/000/fff'}
					alt="bag"
				/>
				<div
					class="text-left flex flex-col justify-around w-full sm:w-2/3 px-4 py-4
        bg-white rounded-lg sm:rounded-l-none leading-loose"
				>
					<div class="py-1 flex flex-wrap">
						<p class="w-1/2">{song.song_name}</p>
						<a
							href={song.streaming_link}
							target="_blank"
							class="underline w-1/2 text-green-600"
						>
							Streaming Link
						</a>
						<p class="">{song.artist_name}</p>
					</div>
					<div class="flex justify-start w-full">
						<input
							id="streaming-link"
							type="text"
							class="bg-gray-200 w-10/12 p-2 rounded-md rounded-r-none border
            cursor-pointer"
							on:click={handleSelect}
							value={song.streaming_link}
						/>
						<button
							class="bg-green-400 text-black text-sm px-2 py-2 rounded-md
            rounded-l-none flex items-center"
							on:click={handleSelect}
						>
							copy
							<img class="w-6" src="./copy.svg" alt="" />
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
	<form class="mt-8" on:submit|preventDefault={handleSubmit}>
		<div class="mx-auto max-w-lg">
			<!-- Inputs -->
			<div class="pt-8">
				<label class="text-2xl" for="cat">writing for: </label>
				<select name="cat" class="p-3" bind:value={form.category}>
					<option value="songreview">song review</option>
					<option value="hellreview">hell review</option>
				</select>
			</div>
			{#each inputArr as input}
				<div class="pt-8">
					<h3 class="text-3xl font-bold">{input.label}</h3>
					<div class="text-xl py-4">{input.desc}</div>
					<textarea
						class="text-md block px-3 py-3 rounded-lg w-full bg-white border-2
            border-gray-300 placeholder-gray-600 shadow-md
            focus:placeholder-gray-500 focus:bg-white focus:border-green-400
            focus:outline-none resize-y h-40"
						placeholder="You text here"
						data-forminput={input.bind}
						on:input={handleInput}
					/>
				</div>
			{/each}
			<div class="pt-10 pb-5 text-center">
				<input
					type="submit"
					class="bg-green-400 hover:bg-green-500 text-2xl cursor-pointer rounded
          shadow-md p-3 px-7 mr-8"
					value="Submit Review"
				/>

				<button
					class="bg-green-400 hover:bg-green-500 text-2xl cursor-pointer rounded
          shadow-md p-3 px-7"
          on:click={handleSaveReview}
					>Save Review</button
				>
			</div>
		</div>
	</form>
</div>

<Modal message="Review is submitted successfully!" bind:show={showModal} />
