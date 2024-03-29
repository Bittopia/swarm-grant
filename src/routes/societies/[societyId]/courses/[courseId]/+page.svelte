<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte';
	import { page } from '$app/stores';
	import { Button, Spinner } from 'flowbite-svelte';
	import ProfilePopover from '$lib/components/ProfilePopover/ProfilePopover.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import { CirclePlusOutline } from 'flowbite-svelte-icons';
	import { Badge } from 'flowbite-svelte';
	import { toggleCourseEnroll } from '$lib/utils/course.js';

	export let data;
	export let { societyId, courseId } = $page.params;

	let joinLoading = false;

	$: course = data.course;
	$: canCreateModules = data.canCreateModules;
	$: members = course?.members ?? [];
	$: isMemberOfSociety = data.isMemberOfSociety;
</script>

<Container>
	{#if course}
		<div class="w-full">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<BackButton href={`/societies/${societyId}`} />
				</div>
			</div>
		</div>
		<div class="w-full flex gap-8 mt-8">
			<div class="w-1/3">
				<section class="w-full p-8 rounded-xl" style="border: 1px solid #424148">
					<h1 class="text-slate-950 dark:text-white text-3xl font-bold">{course.name}</h1>
					<p class="text-slate-800 dark:text-gray-500 mt-4">{course.description}</p>
					<p class="text-slate-800 dark:text-gray-500 mt-4">Start Date: {course.startDate}</p>

					<div class="flex gap-4 mt-8 mb-6">
						<span class="text-slate-800 dark:text-gray-500">Educator: </span>
						<ProfilePopover
							triggeredBy={`educator-${course.id}-${course.educator}`}
							address={course.educator}
						/>
					</div>
					<div class="flex flex-col gap-4 mt-2">
						<span class="text-slate-800 dark:text-gray-500"
							>Members <Badge color="dark">{members?.length ?? 0}</Badge></span
						>
						<div
							class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2 w-max"
						>
							{#each members.slice(0, 9) as member}
								<ProfilePopover
									triggeredBy={`member-${course.id}-${member}`}
									address={member}
									showWalletAddress={false}
									size="sm"
								/>
							{/each}

							{#if members?.length >= 9}
								<span class="mt-auto underline text-primary-500 cursor-pointer">
									{members.length - 9} more
								</span>
							{/if}
						</div>

						{#if isMemberOfSociety}
							<div class="flex justify-center">
								<Button
									class="mt-8 max-w-full px-10 text-md rounded-full"
									disabled={joinLoading}
									on:click={async () => {
										try {
											joinLoading = true;
											if (course != null) {
												await toggleCourseEnroll({
													user: data?.user,
													societyId,
													courseId: course.id,
													alreadyMember: data?.isMember ?? false
												});
											}
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
									{:else if data.isMember}
										Leave
									{:else}
										Enroll
									{/if}
								</Button>
							</div>
						{/if}
					</div>
				</section>
			</div>
			<div class="w-2/3">
				<section class="w-full p-8 rounded-lg">
					<div class="w-full flex items-center justify-between mb-8">
						<h2 class="text-3xl font-bold">Modules</h2>
						{#if canCreateModules}
							<Button
								as="a"
								href={`/societies/${societyId}/courses/${courseId}/modules/new`}
								color="primary"
								size="sm"
								class="rounded-full"
							>
								<div class="flex gap-2 items-center">
									<CirclePlusOutline />
									<span>Add new module</span>
								</div>
							</Button>
						{/if}
					</div>

					{#if course.modules && Object.keys(course.modules).length > 0}
						<section class="flex flex-col items-center gap-4">
							{#each Object.keys(course.modules) as id}
								<a
									class="w-full rounded-xl"
									href={`/societies/${societyId}/courses/${courseId}/modules/${id}`}
									style="border: 1px solid #424148"
								>
									<div class="w-full p-8 rounded-lg">
										<h3 class="text-slate-900 dark:text-white text-xl font-bold">
											{course.modules[id].name}
										</h3>
										<p class="text-slate-700 dark:text-gray-500 mt-4">
											{course.modules[id].description}
										</p>
									</div>
								</a>
							{/each}
						</section>
					{:else}
						<p class="w-full text-slate-700 dark:text-gray-500">No modules created yet.</p>
					{/if}
				</section>
			</div>
		</div>
	{/if}
</Container>
