<script>
  const mileStone = Array(8).fill({ 
    image: './logo.png',
    title: 'title',
    goal: 5,
   });
</script>

<div
  class="mx-4 px-6 md:px-0 md:w-9/12 lg:w-7/12 xl:w-6/12 md:mx-auto my-12
  bg-pink-200 rounded py-12 lowercase shadow-md">
  <div class="flex justify-center items-center max-w-lg mx-auto">
    <span class="mr-6">
      <img class="mx-auto w-20 sm:w-32" src="./logo.png" alt="" />
    </span>
    <span class="font-bold text-2xl sm:text-4xl md:text-5xl">
      refer a friend -> get goodies
    </span>
  </div>

  <div class="mt-8 max-w-3xl mx-auto">
    <div class="grid grid-cols-2 xs:grid-cols-4 md:grid-cols-8 gap-2 w-full mt-8 max-w-lg md:max-w-none row-auto">
      {#each mileStone as item}
        <div class="flex flex-col">
                <div class="p-4 shadow-md bg-white rounded-md">
          <img src={item.image} alt="">
          <div class="text-xl text-center"><h1>{item.title}</h1></div>
        </div>
        <div class="text-center font-bold text-2xl mt-4"><h1>{item.goal}</h1></div>
        </div>
      {/each}
    </div>
    <div class="flex items-center mt-8">
      <div class="w-2/3">
        <h1
          class="text-2xl font-semibold p-2 bg-white rounded-md shadow-md
          text-center max-w-md mx-auto">
          You have X referrals
        </h1>
      </div>
      <div class="text-3xl font-bold ml-4">
        you only need [Y] more referrals to get [Z REWARD]
      </div>
    </div>
    <div class="text-2xl font-semibold mt-4">share your link</div>
    <div class="text-2xl mt-2">
      share your referral link with your fans and get rewards!
    </div>
    <div class="flex justify-center w-full mt-4">
      <input
        id="streaming-link"
        type="text"
        class="bg-white shadow-md w-9/12 p-4 rounded-md border cursor-pointer"
        value="https://dummyimage.com/900x800/000/fff" />
      <button
        class="bg-green-400 shadow-md text-black text-sm px-4 py-4 ml-4
        rounded-md flex items-center">
        copy
      </button>
    </div>
    <div class="text-xl font-semibold mt-4">
      your fans have to subscribe using this link, if they subscribe without
      clicking on it then they won’t be counted!
    </div>
    <div class="text-2xl font-bold mt-4">share with email</div>
    <div class="text-2xl mt-2">
      send an email to your contacts asking them to subscribe, we’ll add your
      referral link automatically
    </div>
    <div class="flex flex-col md:flex-row mt-8">
      <div class="w-full md:w-7/12">
        <form action="">
          <div class="">
            <input
              type="text"
              class="p-4 w-full rounded-md shadow-md"
              placeholder="to: (enter your contacts email)" />
          </div>
          <div class="mt-4">
            <textarea
              class="p-4 h-56 resize-y w-full rounded-md shadow-md"
              placeholder="lorem ipsum" />
          </div>
          <div class="mt-4">
            <input
              type="submit"
              class="px-4 py-2 w-full md:w-40 text-xl bg-green-400 shadow-md
              rounded-md"
              value="send!" />
          </div>
        </form>
      </div>
      <div class="w-full md:w-5/12 ml-4">
        <button class="px-4 py-2 text-xl bg-green-400 shadow-md rounded-md">
          add from contacts
        </button>
        <div class="mt-4 text-2xl">feel free to customise your message</div>
      </div>
    </div>
    <div class="mt-8">
      <div class="font-bold text-2xl">share on social</div>
      <div class="flex mt-4">
        <div
          class="w-20 h-20 flex justify-center items-center bg-blue-700
          rounded-md text-3xl shadow-md mr-4">
          f
        </div>
        <div
          class="w-20 h-20 flex justify-center items-center bg-blue-400
          rounded-md text-3xl shadow-md mr-4">
          t
        </div>
        <div
          class="w-20 h-20 flex justify-center items-center bg-blue-600
          rounded-md text-3xl shadow-md mr-4">
          l
        </div>
      </div>
    </div>
  </div>

</div>
