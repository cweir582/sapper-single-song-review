<script>
  import { onMount, onDestroy } from "svelte";
  import { goto, stores } from "@sapper/app";
  const { preloading, page, session } = stores();
  const { host, path, params, query } = $page;

  let review;

  const getReview = async () => {
    const res = await fetch("http://127.0.0.1:1337/reviews/" + params.review);
    let data = await res.json();
    return data;
  };

  onMount(async () => {
    review = await getReview();
    console.log(review);
  });
</script>

<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md">
  <div class="flex justify-center items-center mx-auto max-w-lg">
    <span class="mr-6">
      <img class="mx-auto w-20 sm:w-26" src="./logo.png" alt="" />
    </span>
  </div>

  {#if review}
    <div class="mt-8 max-w-lg mx-auto shadow-md bg-white p-4 rounded-md">
        <h2 class="text-xl text-center mb-8">a single song review</h2>
      <div class="w-64 h-64" style='background: url("http://127.0.0.1:1337");'>

      </div>
    </div>
    <div class="mt-8 max-w-lg mx-auto shadow-md bg-white p-4 rounded-md">
        <h2 class="text-xl text-center mb-8">introduction</h2>
      <p class="text-xl">
        {review.introduction}
      </p>
    </div>
    <div class="mt-8 max-w-lg mx-auto shadow-md bg-white p-4 rounded-md">
        <h2 class="text-xl text-center mb-8">what i like</h2>
      <p class="text-xl">
        {review.like}
      </p>
    </div>
    <div class="mt-8 max-w-lg mx-auto shadow-md bg-white p-4 rounded-md">
        <h2 class="text-xl text-center mb-8">what i don't like</h2>
      <p class="text-xl">
        {review.dontLike}
      </p>
    </div>
    <div class="mt-8 max-w-lg mx-auto shadow-md bg-white p-4 rounded-md">
        <h2 class="text-xl text-center mb-8">my drunk opinion</h2>
      <p class="text-xl">
        {review.opinion}
      </p>
    </div>
    <div class="mt-8 max-w-lg mx-auto shadow-md bg-white p-4 rounded-md">
        <h2 class="text-xl text-center mb-8">for fans of</h2>
      <p class="text-xl">
        {review.shouldtheylistenmore}
      </p>
    </div>
    <div class="mt-8 max-w-lg mx-auto shadow-md bg-white p-4 rounded-md">
        <h2 class="text-xl text-center mb-8">should you listen to more</h2>
      <p class="text-xl">
        {review.forfansof}
      </p>
    </div>
  {/if}

</div>
