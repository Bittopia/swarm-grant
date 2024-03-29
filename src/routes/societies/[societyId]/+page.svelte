<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte';
	import { Spinner, Button } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { SocietyType } from '$lib/types/society';
	import ProfilePopover from '$lib/components/ProfilePopover/ProfilePopover.svelte';
	import type { PageData } from '../../$types';
	import { toggleSociety } from '$lib/utils/society';
	import BackButton from '$lib/components/BackButton.svelte';
	import { CirclePlusOutline } from 'flowbite-svelte-icons';

	interface Data extends SocietyType {
		isMember: boolean;
	}

	let joinLoading = false;

	export let data: PageData & Data;
	export let { societyId } = $page.params;
</script>

<Container>
	{#if data}
		<div class="w-full">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<BackButton href="/" />
				</div>
			</div>
		</div>
		<div class="w-full flex gap-8 mt-8">
			<div class="w-1/3">
				<section class="w-full p-8 rounded-xl" style="border: 1px solid #424148">
					<h1 class="text-slate-950 dark:text-white text-3xl font-bold">{data.name}</h1>
					<p class="text-slate-800 dark:text-gray-500 mt-4">{data.description}</p>
					<p class="text-slate-800 dark:text-gray-500 mt-4">{data.members?.length ?? 0} members</p>
					<div class="flex justify-center">
						<Button
							class="mt-8 max-w-full px-10 text-md rounded-full"
							disabled={joinLoading}
							on:click={async () => {
								try {
									joinLoading = true;
									await toggleSociety({
										user: data?.user,
										societyId,
										alreadyMember: data?.isMember
									});
								} catch (error) {
									//TODO: Handle error
									console.log({ error });
								} finally {
									joinLoading = false;
								}
							}}
						>
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
				<section class="w-full p-8 rounded-xl">
					<div class="w-full flex items-center justify-between mb-8">
						<h2 class="text-slate-900 dark:text-white text-3xl font-bold">Courses</h2>
						{#if data?.isMember}
							<Button as="a" href={`/societies/${societyId}/courses/new`} class="rounded-full px-4">
								<div class="flex gap-2 items-center">
									<CirclePlusOutline />
									<span>Add new course</span>
								</div>
							</Button>
						{/if}
					</div>

					{#if data.courses}
						<section class="flex flex-col items-center gap-4">
							{#each Object.keys(data.courses) as id}
								{#if data?.courses[id]}
									<a class="w-full" href={`/societies/${data.id}/courses/${id}`}>
										<div class="w-full p-8 rounded-xl" style="border: 1px solid #424148">
											{#if data.courses[id]?.educator}
												<ProfilePopover
													triggeredBy={`profile-popover-${id}`}
													address={data.courses[id].educator}
												/>
											{/if}
											<h3 class="text-slate-900 dark:text-white text-xl font-bold mt-6">
												{data.courses[id].name}
											</h3>
											<p class="text-slate-700 dark:text-gray-500 mt-4">
												{data.courses[id].description}
											</p>
										</div>
									</a>
								{/if}
							{/each}
						</section>
					{:else}
						<p class="w-full text-slate-500 dark:text-gray-500">No courses created yet.</p>
					{/if}
				</section>
			</div>
		</div>
	{/if}
</Container>
