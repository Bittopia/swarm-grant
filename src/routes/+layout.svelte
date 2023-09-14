<script lang="ts">
	import '../app.postcss';
	import { Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
</script>

<main class="w-full min-h-screen bg-slate-800">
	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>Bittopia</span
			>
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl {hidden}>
			<NavLi href="/">Home</NavLi>
			<NavLi href="/about">About</NavLi>
		</NavUl>
	</Navbar>
	<slot />
</main>
