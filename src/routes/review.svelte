<script>
  const inputArr = [
    {
      label: "Introduction",
      desc: "An introduction, a bit about the song, encourage readers to give it a listen"
    },
    {
      label: "What I Like",
      desc: "What are your highlights? anything stick out that’s really good? what’s your favourite part?"
    },
    {
      label: "What I don't Like",
      desc: "Any criticisms? anything you think they could improve? anything that’s just not up to scratch?"
    },
    {
      label: "My Drunken Opinion",
      desc: "Please note this section is optional and you do not have to drink for it, a single sentance describing the song ina funny way, spelling mistakes encouraged"
    },
    {
      label: "For Fans of",
      desc: "What artist does this song sound like? please past a song links below your paragraph"
    },
    {
      label: "Should You Listen to More",
      desc: "Should the reader listen to more of this artist? why? why not? any song recommendations by this artist you can give? if you found a good album or ep please paste a link below"
    },
  ]
</script>

<svelte:head>
  <title>Review Portal</title>
</svelte:head>

<div class="container md:w-6/12 mx-auto my-12 bg-pink-200 rounded py-12">
      <div class="flex justify-center items-center">
        <span class="mr-6">
          <img class="mx-auto w-32" src="./logo.png" alt="">
        </span>
        <span class="font-semibold text-5xl">Writers portal</span>
      </div>
      <form class="mt-8">
        <div class="mx-auto max-w-lg ">
        <!-- Inputs -->
        {#each inputArr as input}
          <div class="pt-8">
            <h3 class="text-3xl font-bold">{input.label}</h3>
            <div class="text-xl py-4">{input.desc}</div>
            <textarea
              class="text-md block px-3 py-3 rounded-lg w-full bg-white border-2
              border-gray-300 placeholder-gray-600 shadow-md
              focus:placeholder-gray-500 focus:bg-white focus:border-green-400
              focus:outline-none resize-y h-40" placeholder="You text here"></textarea>
          </div>
        {/each}
        <div class="pt-10 pb-5 text-center">
        <input type="submit" class="bg-green-400 hover:bg-green-500 text-2xl cursor-pointer rounded shadow-md p-3 px-7 " value="Submit Review">
        </div>
        </div>
      </form>
</div>
