<script>
	import Nav from '../components/Nav.svelte';
	 import { onMount } from 'svelte';

	export let segment;

</script>
<style>
	:global(body) {
		background-color: #68D391;
	}

</style>

<!-- <Nav {segment}/> -->

<main>
	<slot></slot>
	<div class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto
   rounded lowercase flex justify-end mb-24">
		<nav class="p-4 bg-pink-200 text-gray-700 rounded-lg ml-4 shadow-md font-semibold"><a href="/shop">shop</a></nav>
		<nav class="p-4 bg-pink-200 text-gray-700 rounded-lg ml-4 shadow-md font-semibold"><a href="/submit-song">submit song</a></nav>
		<nav class="p-4 bg-pink-200 text-gray-700 rounded-lg ml-4 shadow-md font-semibold"><a href="/privacy-policy">privacy policy</a></nav>
	</div>
</main>