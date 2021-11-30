<script>
  import { onMount } from 'svelte';
  import * as api from 'api.js';

  let review = {press_photo:"", song_name:"", artist_name:""}
  const getReview = async () => {
		const {status, body} = await api.get("reviews/");
		return body[0];
	}

	onMount(async () => {
		review = await getReview();
	});


</script>
<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md">
  <div class="flex justify-center items-center">
    <span class="mr-6">
      <img class="mx-auto w-20 sm:w-32" src="./profile.svg" alt="" />
    </span>
    <span class="font-semibold text-2xl sm:text-4xl md:text-5xl">
      You're all set
    </span>
  </div>

  <div class="mt-8 max-w-lg mx-auto">
    <h1 class="text-3xl font-semibold">welcome to a single song review!</h1>
    <div class="text-xl font-semibold">here’s what to expect:</div>
    <div class="text-xl mt-4">
      <div class="">
        - every tuesday morning, a review of a song you’ve never heard in your
        inbox
      </div>
      <div class="">- a re-send every friday if you miss that one</div>
      <div class="">- goodies if you tell your friends to sign up too</div>
    </div>
    <p class="text-xl font-semibold mt-4">
      don’t forget! add us to your trusted contacts and feel free to reply to
      any email telling us what you think, we love a good chat!
    </p>
  </div>
  <!-- Latest Review Start -->
  <div
			class="mt-8 max-w-lg mx-auto
      text-xl text-gray-600 font-semibold"
		>
  <h3>latest review: </h3>
		<div
			class="shadow-md flex items-center bg-white rounded-md text-center p-4 text-xl font-semibold mt-4 mb-2"
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
		<p class="text-xl">
			<a href="/archive/{review.id}">subscribe to read</a>
		</p>
  </div>
  <!-- Latest Review E N D-->
</div>
