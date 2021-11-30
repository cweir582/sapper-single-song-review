<script>
	import { onMount } from 'svelte';
	import * as api from 'api.js';

	let reviews = [];

	function stringToSlug(str) {
		return str.replace(/\s+/g, '-').toLowerCase();
	}

	const getReviews = async () => {
		const { status, body } = await api.get("reviews/");
		return body;
	};

	onMount(async () => {
		reviews = await getReviews();
	});
</script>

<div
	class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md"
>
	<div class="flex justify-start items-center mx-auto max-w-lg">
		<span class="mr-6">
			<a href="/" class="inline-block">
				<img class="mx-auto w-20" src="./profile.svg" alt="" />
			</a>
		</span>
		<span class="font-bold text-2xl sm:text-4xl md:text-5xl">archive</span>
	</div>

	<div class="mt-4 max-w-lg mx-auto">
		<h1 class="font-bold text-3xl">
			want to read some reviews? they’re all here:
		</h1>
	</div>

	<div class="max-w-lg mx-auto">
		{#if reviews.length > 0}
			{#each reviews as review}
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
					<a
						class="ml-2 no-underline hover:underline"
						href="/archive/{review.id}"
					>
						{review.song_name} - {review.artist_name}
					</a>
				</div>
			{/each}
		{:else}
			<p>No Reviews</p>
		{/if}
	</div>
</div>
