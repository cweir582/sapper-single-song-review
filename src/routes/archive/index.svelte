<script>
  import { onMount } from "svelte";
  let reviews = [];

  const getReviews = async () => {
    return [
      {
        title: "Lorem ipsum dolor, sit amet consectetur",
        slug: 'Lorem-ipsum-dolor-sit-amet-consectetur',
      },
      {
        title: "Lorem ipsum dolor, sit amet consectetur",
        slug: 'Lorem-ipsum-dolor-sit-amet-consectetu',
      },
      {
        title: "Lorem ipsum dolor, sit amet consectetur",
        slug: 'Lorem-ipsum-dolor-sit-amet-consecteturr',
      },
      {
        title: "Lorem ipsum dolor, sit amet consectetur",
        slug: 'Lorem-ipsum-dolor-sit-amet-consecteturrrr',
      },
    ];
  };

  onMount(async () => {
    reviews = await getReviews();
  });
</script>
<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md">
  <div class="flex justify-start items-center mx-auto max-w-lg">
    <span class="mr-6">
      <img class="mx-auto w-20" src="./logo.png" alt="" />
    </span>
    <span class="font-bold text-2xl sm:text-4xl md:text-5xl">archive</span>
  </div>
  <div class="mt-4 max-w-lg mx-auto">
    <input
      class="p-4 text-xl shadow-md rounded-md bg-white w-full"
      placeholder="search"
      type="text" />
  </div>

  <div class="mt-4 max-w-lg mx-auto">
    <h1 class="font-bold text-3xl">want to read some reviews? they’re
all here: </h1>
  </div>

  <div class="max-w-lg mx-auto">
    {#if reviews.length > 0}
      {#each reviews as review}
          <div class="shadow-md bg-white rounded-md text-center p-2 text-xl font-semibold mt-4">
              <a class="no-underline hover:underline" href="/archive/{review.slug}">
                {review.title}
              </a>
            </div>

      {/each}
    {:else}
      <p>No Prodcuts</p>
    {/if}
  </div>

</div>
