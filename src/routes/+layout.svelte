<script lang="ts">
	import '../app.postcss';

	import { Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import '$lib/web3/modal';
</script>

<main class="w-full h-full bg-slate-800">
	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>Bittopia</span
			>
		</NavBrand>
		<div class="flex items-center">
			<w3m-button size="sm" balance="hide" />
			<NavUl {hidden}>
				<NavLi href="/">Home</NavLi>
				<NavLi href="/about">About</NavLi>
			</NavUl>
			<NavHamburger on:click={toggle} />
		</div>
	</Navbar>
	<slot />
</main>
