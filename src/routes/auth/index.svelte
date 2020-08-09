<script>
  let registerInputs = [
    {
      label: 'Username',
      type: 'text'
    },
    {
      label: 'Email',
      type: 'email'
    },
    {
      label: 'Password',
      type: 'password'
    },
    {
      label: 'Confirm Password',
      type: 'password'
    },
  ];

  let loginInputs = [
    {
      label: 'Email',
      type: 'email'
    },
    {
      label: 'Password',
      type: 'password'
    }
  ]

  let isLogginIn = true, inputArr = loginInputs;

  function changeInputs() {
    isLogginIn = !isLogginIn;
    inputArr = isLogginIn ? loginInputs : registerInputs
  }

  function handleSubmit() {
    console.log("Here");
  }

</script>


<svelte:head>
  <title>Authentication</title>
</svelte:head>
<div class="container max-w-full md:mx-auto py-12 md:py-24">
  <div class="max-w-lg xs:max-w-sm mx-4 xs:mx-auto p-6 rounded bg-pink-200">
      <div class="flex justify-center items-center">
        <span class="">
          <img class="mx-auto w-20" src="./logo.png" alt="">
        </span>
        <span class="font-semibold text-xl">A single song review</span>
      </div>

      <form class="mt-8" on:submit|preventDefault={handleSubmit}>
        <div class="mx-auto max-w-lg ">
        <!-- Inputs -->
        {#each inputArr as input}
          <div class="py-2">
            <input
              placeholder="{input.label}"
              type="{input.type}"
              class="text-md block px-3 py-3 rounded-lg w-full bg-white border-2
              border-gray-300 placeholder-gray-600 shadow-md
              focus:placeholder-gray-500 focus:bg-white focus:border-green-400
              focus:outline-none" autocomplete="on"/>
          </div>
        {/each}
        <input type="submit" class="bg-green-400 hover:bg-green-500 cursor-pointer rounded shadow-md p-3 mt-2 " value="{isLogginIn ? 'Login' : 'Signup'}">
        </div>
      </form>
      <div class="cursor-pointer text-green-700 hover:underline py-2" on:click={changeInputs}>{isLogginIn ? 'Not a member? Signup' : 'Already have an account? Login'}</div>
    </div>
  </div>
