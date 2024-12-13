<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte';
	import { Spinner, Button, Avatar } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import ProfilePopover from '$lib/components/ProfilePopover/ProfilePopover.svelte';
	import { toggleSociety } from '$lib/utils/society';
	import BackButton from '$lib/components/BackButton.svelte';
	import { CirclePlusOutline } from 'flowbite-svelte-icons';
	import DotsMenu from '$lib/components/DotsMenu.svelte';
	import { goto, invalidateAll } from '$app/navigation';

	export let { societyId } = $page.params;

	export let data;

	let joinLoading = false;

	async function handleDeleteSociety() {
		if (!societyId) return;

		const response = await fetch(`/societies/${societyId}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			goto('/');
		}
	}

	async function handleDeleteCourse(courseId: string) {
		if (!courseId) return;

		const response = await fetch(`/societies/${societyId}/courses/${courseId}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			await invalidateAll();
		}
	}
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

		<!-- Responsive grid layout -->
		<div class="w-full grid gap-8 mt-16 grid-cols-1 md:grid-cols-3">
			<!-- Sidebar (1/3 on larger screens) -->
			<div class="md:col-span-1">
				<section class="w-full p-8 rounded-xl relative" id="module" style="background: #fff;">
					{#if data.canEditSociety}
						<DotsMenu editHref={$page.url.pathname + '/edit'} onDelete={handleDeleteSociety} />
					{/if}

					{#if data.image}
						<div class="my-4">
							<Avatar
								src={data.image + '?img-format=webp'}
								alt="Society image"
								size="xl"
								class="w-full rounded-xl h-48 object-cover aspect-[4/3]"
							/>
						</div>
					{/if}
					<h1 class="text-slate-950 dark:text-white text-3xl font-bold mt-8 ml-1">{data.name}</h1>
					<p class="text-slate-800 dark:text-gray-500 mt-4 ml-1">{data.description}</p>
					<p class="text-slate-800 dark:text-gray-500 mt-4 ml-1">
						{data.members?.length ?? 0} members
					</p>
					<div class="flex justify-center mt-4 mb-8 cta-blue">
						<Button
							class="mt-8 max-w-full px-10 text-md rounded-full {data?.isMember ? '' : 'join'}"
							disabled={joinLoading}
							on:click={async () => {
								try {
									joinLoading = true;
									await toggleSociety({
										user: data?.user,
										societyId,
										alreadyMember: data?.isMember ?? false
									});
								} catch (error) {
									// TODO: Handle error
									console.log({ error });
								} finally {
									joinLoading = false;
								}
							}}
						>
							{#if joinLoading}
								<Spinner />
							{:else if data?.isMember}
								Leave Society
							{:else}
								Join Society
							{/if}
						</Button>
					</div>
				</section>
			</div>

			<!-- Main content (2/3 on larger screens) -->
			<div class="md:col-span-2">
				<section class="w-full p-8 rounded-xl">
					<div
						class="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4"
					>
						<h2 class="text-slate-900 dark:text-white text-3xl mb-4 font-bold">🎓 Courses</h2>
						{#if data.isMember || data.creator === data.user?.web3Address}
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
									<div class="w-full relative">
										<a href={`/societies/${data.id}/courses/${id}`}>
											<!-- Responsive layout -->
											<div
												class="flex flex-col md:flex-row w-full gap-4 p-8 rounded-xl"
												id="module"
												style="background: #fff;"
											>
												<div class="flex justify-center md:w-1/3">
													{#if data.courses[id].image}
														<img
															src={data.courses[id].image + '?img-format=webp'}
															alt="Course banner"
															class="h-32 object-cover rounded-xl aspect-[4/3]"
														/>
													{:else}
														<div class="h-32 bg-slate-900 rounded-xl aspect-[4/3]" />
													{/if}
												</div>

												<div class="text-left md:w-2/3">
													<h3 class="text-slate-900 dark:text-white text-2xl font-bold">
														{data.courses[id].name}
													</h3>
													{#if data.courses[id]?.educator}
														<div
															class="text-slate-900 dark:text-white flex gap-2 items-center justify-start mt-4 text-md"
														>
															<span>Educator: </span>
															<ProfilePopover
																triggeredBy={`profile-popover-${id}`}
																avatar={data.courses[id].educator_user?.avatar}
																name={data.courses[id].educator_user?.name}
																web3Address={data.courses[id].educator}
															/>
														</div>
													{/if}
													<p class="text-slate-700 dark:text-gray-500 mt-4 mb-4">
														{data.courses[id].description}
													</p>
												</div>
											</div>
										</a>
										{#if data.courses[id].creator === data.user?.web3Address || data.canEditSociety}
											<DotsMenu
												editHref={`${$page.url.pathname}/courses/${id}/edit?returnTo=${$page.url.pathname}`}
												onDelete={() => handleDeleteCourse(id)}
											/>
										{/if}
									</div>
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
