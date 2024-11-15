<script lang="ts">
	import '../app.postcss';
	import { Navbar, NavBrand, NavHamburger, NavLi, NavUl, DarkMode } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import '$lib/web3/modal';
</script>

<main class="w-full h-full overflow-hidden bg-white dark:bg-[#0A090D]">
	<Navbar let:hidden let:toggle class="bg-[#000111]">
		<NavBrand href="/">
			<img src="/Logo.png" alt="Bittopia's logo" style="width: 300px" />
		</NavBrand>
		<div class="flex items-center">
			<div class="me-2">
				<DarkMode size="sm" />
			</div>
			{#if $page.status !== 401}
				<w3m-button size="sm" balance="hide" />
			{/if}
			<NavUl {hidden}>
				{#if $page.data.user}
					<NavLi
						href={`/profile/${$page.data?.user?.web3Address}`}
						style="font-size: 1rem;"
						class="text-white dark:text-gray-400">Profile</NavLi
					>
				{/if}
				<NavLi href="/" style="font-size: 1rem;" class="text-white dark:text-gray-400">Home</NavLi>
				<!-- <NavLi href="/about">About</NavLi> -->
			</NavUl>
			<NavHamburger on:click={toggle} />
		</div>
	</Navbar>
	<div class="w-full p-8 md:p-14 overflow-auto" style="height: calc(100% - 4.5rem); padding-bottom:300px; padding-top:50px;">
		<slot />
	</div>
</main>
