<script lang="ts">
	import '../app.postcss';

	import { Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import '$lib/web3/modal';

	console.log('page', $page);
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
				{#if $page.data.user}
					<NavLi href={`/profile/${$page.data.user.web3Address}`}>Profile</NavLi>
				{/if}
				<NavLi href="/">Home</NavLi>
				<NavLi href="/about">About</NavLi>
			</NavUl>
			<NavHamburger on:click={toggle} />
		</div>
	</Navbar>
	<slot />
</main>
