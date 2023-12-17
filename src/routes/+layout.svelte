<script lang="ts">
	import '../app.postcss';

	import { Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import '$lib/web3/modal';
</script>

<main class="w-full h-full bg-slate-800 overflow-hidden">
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
	<div class="w-full py-8 overflow-auto" style="height: calc(100% - 4.5rem)">
		<slot />
	</div>
</main>
