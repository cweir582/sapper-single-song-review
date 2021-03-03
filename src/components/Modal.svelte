<script>
	export let show = false;
  export let message = "";

	function closeModal(e) {
    if(e.target.id !== "modal") {
      show = false;
    }
  }
</script>

{#if show}
	<div
		class="flex justify-center items-center fixed top-0 right-0 w-screen h-screen bg-black bg-opacity-25"
		on:click={closeModal}
	>
		<div class="p-8 w-11/12 max-w-2xl text-lg bg-pink-300 shadow-md rounded-md" id="modal">
			<h3 class="text-4xl font-semibold">success!</h3>

			<p class="mt-4">{message}</p>
		</div>
	</div>
{/if}
