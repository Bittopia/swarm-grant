<script lang="ts">
	import '../app.postcss';

	import { Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import '$lib/web3/modal';
</script>

<main class="w-full h-full overflow-hidden bg-white dark:bg-[#191820]">
	<Navbar let:hidden let:toggle class="bg-[#181624]">
		<NavBrand href="/">
			<img src="/Logo.png" alt="Bittopia's logo" style="width: 220px" />
		</NavBrand>
		<div class="flex items-center">
			{#if $page.status !== 401}
				<w3m-button size="sm" balance="hide" />
			{/if}
			<NavUl {hidden}>
				{#if $page.data.user}
					<NavLi href={`/profile/${$page.data.user.web3Address}`} style="font-size: 1rem;"
						>Profile</NavLi
					>
				{/if}
				<NavLi href="/" style="font-size: 1rem;">Home</NavLi>
				<!-- <NavLi href="/about">About</NavLi> -->
			</NavUl>
			<NavHamburger on:click={toggle} />
		</div>
	</Navbar>
	<div class="w-full py-8 overflow-auto" style="height: calc(100% - 4.5rem)">
		<slot />
	</div>
</main>
