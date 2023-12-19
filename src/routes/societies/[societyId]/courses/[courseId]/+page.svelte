<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte';
	import { Avatar, Button } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import ProfilePopover from '$lib/components/ProfilePopover/ProfilePopover.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import { CirclePlusOutline } from 'flowbite-svelte-icons';

	export let data;
	export let { societyId, courseId } = $page.params;

	const course = data.course;
	const canCreateModules = data.canCreateModules;
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
				<section class="w-full bg-slate-700 p-8 rounded-lg">
					<h1 class="text-3xl font-bold">{course.name}</h1>
					<p class="text-gray-500 mt-4">{course.description}</p>
					<p class="mt-4">Start Date: {course.startDate}</p>

					<div class="flex gap-4 mt-8">
						<span>Educator: </span>
						<ProfilePopover
							triggeredBy={`educator-${course.id}-${course.educator}`}
							address={course.educator}
						/>
					</div>
				</section>
			</div>
			<div class="w-2/3">
				<section class="w-full bg-slate-700 p-8 rounded-lg">
					<div class="w-full flex items-center justify-between mb-8">
						<h2 class="text-2xl font-bold">Modules</h2>
						{#if canCreateModules}
							<Button
								as="a"
								href={`/societies/${societyId}/courses/${courseId}/modules/new`}
								color="primary"
								size="sm"
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
									class="w-full"
									href={`/societies/${societyId}/courses/${courseId}/modules/${id}`}
								>
									<div class="w-full bg-slate-600 p-4 rounded-lg">
										<h3 class="text-xl font-bold">{course.modules[id].name}</h3>
										<p class="text-gray-500 mt-4">{course.modules[id].description}</p>
									</div>
								</a>
							{/each}
						</section>
					{:else}
						<p class="w-full text-gray-500">No modules created yet.</p>
					{/if}
				</section>
			</div>
		</div>
	{/if}
</Container>
