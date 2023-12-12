<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte';
	import { Button, Heading } from 'flowbite-svelte';
	import SocietyBox from '$lib/components/SocietyBox/SocietyBox.svelte';
	import type { SocietyType } from '$lib/types/society';

	import { modal } from '$lib/web3/modal';

	import { getAccount } from '@wagmi/core';
	import { goto } from '$app/navigation';

	function newSociety() {
		// const account = getAccount();
		//
		// if (!account || !account.address) {
		// 	modal.open();
		// 	return;
		// }
		goto('/societies/new');
	}

	export let data: Record<string, SocietyType>;
	console.log(data);
</script>

<Container class="mt-8">
	<section id="society-list">
		<div class="w-full flex items-center justify-between">
			<Heading level="2" class="mb-4">Societies</Heading>
			<Button class="w-[200px]" on:click={newSociety}>New society</Button>
		</div>
		<!-- Define list of societies -->
		{#if data}
			<section class="mt-10 grid gap-4 grid-cols-4">
				{#each Object.keys(data) as societyId}
					<SocietyBox society={data[societyId]} />
				{/each}
			</section>
		{:else}
			<p>No societies found</p>
		{/if}
		<!-- End list of societies-->
	</section>
</Container>
