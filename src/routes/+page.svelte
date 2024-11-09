<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte';
	import { Heading, Button } from 'flowbite-svelte';
	import { CirclePlusOutline } from 'flowbite-svelte-icons';
	import SocietyBox from '$lib/components/SocietyBox/SocietyBox.svelte';
	import { goto } from '$app/navigation';

	export let data;
	const societies = data?.societies;

	function newSociety() {
		goto('/societies/new');
	}
</script>
<svelte:head>
    <title>Bittopia | Swarm Grant</title>
</svelte:head>
<Container>
	<section id="society-list">
		<div class="w-full flex items-center justify-between pb-12">
			<Heading level="2" class="mb-4 mt-5">Decentralized Autonomous Societies</Heading>
			<Button class="w-[200px] rounded-full px-0" on:click={newSociety}>
				<div class="flex gap-2 items-center">
					<CirclePlusOutline />
					<span>New society</span>
				</div>
			</Button>
		</div>
		<!-- Define list of societies -->
		{#if data}
			<section class="mt-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
				{#each Object.keys(societies) as societyId}
					<SocietyBox society={societies[societyId]} />
				{/each}
			</section>
		{:else}
			<p>No societies found</p>
		{/if}
		<!-- End list of societies-->
	</section>
</Container>
