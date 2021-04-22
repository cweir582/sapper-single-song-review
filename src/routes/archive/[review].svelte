<script>
	import { onMount, onDestroy } from 'svelte';
	import { goto, stores } from '@sapper/app';
	import * as api from 'api.js';

	const { preloading, page, session } = stores();
	const { host, path, params, query } = $page;

	let review, points, previous, next;

	const getReview = async () => {
		const { status, body } = await api.get('reviews/' + $page.params.review);

		return body;
	};

	async function fetchReview() {
		review = undefined;
		const data = await getReview();
		previous = data.previous;
		next = data.next;
		review = data.current;
		console.log(review);
		points = Object.keys(review.review || {});
	}

	onMount(async () => {
		await fetchReview();
	});
</script>

<div class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12">
	<div class="flex justify-center items-center mx-auto max-w-lg">
		<span class="mr-6">
			<img class="mx-auto w-20 sm:w-26" src="./logo.png" alt="" />
		</span>
	</div>

	{#if review}
		<div class="bg-pink-200 p-4 mt-12 rounded-md shadow-md text-center">
			<h2 class="text-2xl font-semibold text-center mb-8">
				a single song review
			</h2>
			{#if review.press_photo}
				<a href={review.streaming_link} class="flex justify-center"
					><img
						src={review.press_photo.formats.thumbnail.url}
						class="w-64 object--cover"
						alt=""
					/></a
				>
			{/if}

			<div class="m-8">
				<a
					href={review.streaming_link}
					class="px-8 py-4 bg-white rounded-lg shadow-md text-2xl">Play</a
				>
			</div>
		</div>
		{#each points as point}
			<div class="bg-pink-200 p-4 mt-12 rounded-md shadow-md">
				<h1 class="text-2xl font-semibold text-center">{point}</h1>
				<p class="text-xl mt-4">{review.review[point]}</p>
			</div>
		{/each}
		<div class="bg-pink-200 p-4 mt-12 rounded-md shadow-md">
			<p class="text-xl mt-4">this review was written by → {review.reviewer}</p>
		</div>

		<div class="m-8 flex justify-between">
			<a
				href="/archive/{previous}"
				on:click={async () => await fetchReview()}
				class="px-8 py-4 block bg-white rounded-lg shadow-md text-2xl"
				>Previous</a
			>
			<a
				href="/archive/{next}"
				on:click={async () => await fetchReview()}
				class="px-8 py-4 block bg-white rounded-lg shadow-md text-2xl">Next</a
			>
		</div>
	{/if}
</div>
