<script>
	import Nav from '../components/Nav.svelte';
	import { goto, stores } from '@sapper/app';
	import { onMount } from 'svelte';
	import CartStore from '../stores/cart';

	const { preloading, page, session } = stores();

	const { host, path, params, query } = $page;

	export let segment;

	const showArchive = ['archive', 'referral', 'milestone', 'subscriber'];

	onMount(() => {
		const cart = JSON.parse(localStorage.getItem('cart'));
		CartStore.set(cart);
	});
</script>

<!-- <Nav {segment}/> -->

<svelte:head>
	<title>A Single Song Review</title>
</svelte:head>

<main class="relative">
  <div class="z-10">
    <slot />
  </div>
	{#if segment !== 'hell-review'}
		<div
			class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto rounded
      lowercase flex justify-end mb-24"
		>
			<nav
				class="p-4 bg-pink-200 text-gray-700 rounded-lg ml-4 shadow-md
        font-semibold"
			>
				<a href="/shop">shop</a>
			</nav>
			<nav
				class="p-4 bg-pink-200 text-gray-700 rounded-lg ml-4 shadow-md
        font-semibold"
			>
				<a href="/submit-song">submit song</a>
			</nav>
			<nav
				class="p-4 bg-pink-200 text-gray-700 rounded-lg ml-4 shadow-md
        font-semibold"
			>
				<a href="/privacy-policy">privacy policy</a>
			</nav>
			{#if showArchive.includes(segment)}
				<nav
					class="p-4 bg-pink-200 text-gray-700 rounded-lg ml-4 shadow-md
        font-semibold"
				>
					<a href="/archive">archive</a>
				</nav>
			{/if}
		</div>
	{:else}
		<div
			class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto rounded
      lowercase flex justify-end mb-24"
		>
			<nav class="p-4 red text-white rounded-lg ml-4 shadow-md font-semibold">
				<a href="/shop">shop</a>
			</nav>
			<nav class="p-4 red text-white rounded-lg ml-4 shadow-md font-semibold">
				<a href="/submit-song">submit song</a>
			</nav>
			<nav class="p-4 red text-white rounded-lg ml-4 shadow-md font-semibold">
				<a href="/privacy-policy">privacy policy</a>
			</nav>
		</div>
	{/if}
</main>

<style>
	
</style>
