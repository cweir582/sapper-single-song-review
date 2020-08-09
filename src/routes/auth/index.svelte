<script>
  import { goto } from '@sapper/app';

  let registerInputs = [
    {
      label: 'Username',
      type: 'text',
      bind: 'username'
    },
    {
      label: 'Email',
      type: 'email',
      bind: 'email'
    },
    {
      label: 'Password',
      type: 'password',
      bind: 'password'
    },
    {
      label: 'Confirm Password',
      type: 'password',
      bind: 'confirmpassword'
    },
  ];

  let loginInputs = [
    {
      label: 'Email',
      type: 'email',
      bind: 'email'
    },
    {
      label: 'Password',
      type: 'password',
      bind: 'password'
    }
  ]

  let isLogginIn = true, inputArr = loginInputs;

  function changeInputs() {
    isLogginIn = !isLogginIn;
    inputArr = isLogginIn ? loginInputs : registerInputs
  }

  const form = {
    username: '',
    password: '',
    email: '',
  }

  async function register() {
    return await fetch("https://single-song-review.herokuapp.com/auth/local/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
  }

    async function login() {
    form.identifier = form.email;
    return await fetch("https://single-song-review.herokuapp.com/auth/local", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
  }

  async function handleSubmit() {
    try {
    const res = isLogginIn ? await login() : await register();
      const data = await res.json();

      if(isLogginIn) {
        localStorage.setItem('user', JSON.stringify(data));
        await goto('/review');
      }else {
        if(res.status === 400) {
          console.log("Wait for an admin to approve")
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  async function handleInput() {
    form[this.dataset.forminput] = this.value;
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
              focus:outline-none" autocomplete="on" data-forminput={input.bind} on:input={handleInput}/>
          </div>
        {/each}
        <input type="submit" class="bg-green-400 hover:bg-green-500 cursor-pointer rounded shadow-md p-3 mt-2 " value="{isLogginIn ? 'Login' : 'Signup'}">
        </div>
      </form>
      <div class="cursor-pointer text-green-700 hover:underline py-2" on:click={changeInputs}>{isLogginIn ? 'Not a member? Signup' : 'Already have an account? Login'}</div>
    </div>
  </div>
