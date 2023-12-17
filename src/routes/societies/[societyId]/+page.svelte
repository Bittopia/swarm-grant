<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte';
	import { Avatar, Button, Spinner } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { SocietyType } from '$lib/types/society';
	import { invalidateAll } from '$app/navigation';
	import { modal } from '$lib/web3/modal';
	import ProfilePopover from '$lib/components/ProfilePopover/ProfilePopover.svelte';
	import truncateWalletAddress from '$lib/utils/truncateWalletAddress';
	import type { PageData } from '../../$types';

	interface Data extends SocietyType {
		isMember: boolean;
	}

	let joinLoading = false;

	async function joinSociety() {
		if (!data?.user) {
			return modal.open();
		}

		try {
			joinLoading = true;
			const url = data?.isMember ? '/societies/leave' : '/societies/join';

			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ societyId })
			});

			if (response.ok) {
				const data = await response.json();

				if (data.success) {
					await invalidateAll();
				}
			}
		} catch (error) {
			console.log('error', error);
		} finally {
			joinLoading = false;
		}
	}

	export let data: PageData & Data;
	export let { societyId } = $page.params;
</script>

<Container class="mt-8">
	{#if data}
		<div class="w-full">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<Button as="a" href="/" color="primary" size="sm" outline={true}>Back</Button>
				</div>
			</div>
		</div>
		<div class="w-full flex gap-8 mt-8">
			<div class="w-1/3">
				<section class="w-full bg-slate-700 p-8 rounded-lg">
					<h1 class="text-3xl font-bold">{data.name}</h1>
					<p class="text-gray-500 mt-4">{data.description}</p>
					<p class="text-gray-500 mt-4">{data.members?.length ?? 0} members</p>
					<div class="flex justify-center">
						<Button class="mt-8 px-16 max-w-full" disabled={joinLoading} on:click={joinSociety}>
							{#if joinLoading}
								<Spinner />
							{:else if data?.isMember}
								Leave
							{:else}
								Join
							{/if}
						</Button>
					</div>
				</section>
			</div>
			<div class="w-2/3">
				<section class="w-full bg-slate-700 p-8 rounded-lg">
					<div class="w-full flex items-center justify-between mb-8">
						<h2 class="text-2xl font-bold">Courses</h2>
						{#if data?.isMember}
							<Button as="a" href={`/societies/${societyId}/courses/new`} color="primary" size="sm"
								>Add new course</Button
							>
						{/if}
					</div>

					{#if data.courses}
						<section class="flex flex-col items-center gap-4">
							{#each Object.keys(data.courses) as id}
								{#if data?.courses[id]}
									<a class="w-full" href={`/societies/${data.id}/courses/${id}`}>
										<div class="w-full bg-slate-600 p-4 rounded-lg">
											{#if data.courses[id]?.educator}
												<div id={`profile-popover-${id}`} class="flex gap-2 mb-6 relative">
													<Avatar size="xs" />
													<span>{truncateWalletAddress(data.courses[id].educator)}</span>
												</div>
											{/if}
											<h3 class="text-xl font-bold">{data.courses[id].name}</h3>
											<p class="text-gray-500 mt-4">{data.courses[id].description}</p>
										</div>
									</a>
									<ProfilePopover
										triggeredBy={`#profile-popover-${id}`}
										address={data.courses[id].educator}
									/>
								{/if}
							{/each}
						</section>
					{:else}
						<p class="w-full text-gray-500">No courses created yet.</p>
					{/if}
				</section>
			</div>
		</div>
	{/if}
</Container>
