<script>
	import Nav from '../components/Nav.svelte';
	 import { onMount } from 'svelte';

	// export let segment;
</script>
<style>
	:global(body) {
		background-color: #68D391;
	}

</style>

<!-- <Nav {segment}/> -->

<main>
	<slot></slot>
</main>