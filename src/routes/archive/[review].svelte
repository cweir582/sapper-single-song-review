<script>
  import { onMount, onDestroy } from "svelte";
  import { goto, stores } from "@sapper/app";
  const { preloading, page, session } = stores();
  const { host, path, params, query } = $page;

  let review, points;

  const getReview = async () => {
    const res = await fetch("http://127.0.0.1:1337/reviews/" + params.review);
    let data = await res.json();
    return data;
  };

  onMount(async () => {
    review = await getReview();
    points = Object.keys(review.review);
    console.log(review);
  });
</script>

<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12">
  <div class="flex justify-center items-center mx-auto max-w-lg">
    <span class="mr-6">
      <img class="mx-auto w-20 sm:w-26" src="./logo.png" alt="" />
    </span>
  </div>

  {#if review}
    <div class="bg-pink-200 p-4 mt-12 rounded-md shadow-md text-center">
        <h2 class="text-2xl font-semibold text-center mb-8">a single song review</h2>
        <a href="{review.streaming_link}" class="flex justify-center"><img src="{review.press_photo.formats.thumbnail.url}" class="w-64 object--cover" alt=""></a>
        <div class="m-8">
          <a href="{review.streaming_link}" class="px-8 py-4 bg-white rounded-lg shadow-md text-2xl">Play</a>
        </div>
    </div>
    {#each points as point}
      <div class="bg-pink-200 p-4 mt-12 rounded-md shadow-md">
        <h1 class="text-2xl font-semibold text-center">{point}</h1>
        <p class="text-xl mt-4">{review.review[point]}</p>
      </div>
    {/each}
      <div class="bg-pink-200 p-4 mt-12 rounded-md shadow-md">
        <p class="text-xl mt-4">this review was written by → {review.reviewer} </p>
      </div>


  {/if}

</div>
