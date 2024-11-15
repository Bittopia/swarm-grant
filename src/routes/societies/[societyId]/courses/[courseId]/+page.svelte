<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte';
	import { page } from '$app/stores';
	import { Avatar, Button, Spinner } from 'flowbite-svelte';
	import ProfilePopover from '$lib/components/ProfilePopover/ProfilePopover.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import { CirclePlusOutline } from 'flowbite-svelte-icons';
	import { Badge } from 'flowbite-svelte';
	import { toggleCourseEnroll } from '$lib/utils/course.js';
	import DotsMenu from '$lib/components/DotsMenu.svelte';

	export let data;
	export let { societyId, courseId } = $page.params;

	let joinLoading = false;

	$: course = data.course;
	$: canCreateModules = data.canCreateModules;
	$: members = course?.users ?? [];
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
		<div class="w-full flex flex-col md:flex-row gap-8 mt-8">
			<!-- Sidebar Section -->
			<div class="w-full md:w-1/3">
				<section class="w-full p-8 rounded-xl relative" id="module" style="background: #fff;">
					<!-- Sidebar Content Here -->
				</section>
			</div>

			<!-- Main Content Section -->
			<div class="w-full md:w-2/3">
				<section class="w-full p-8 rounded-lg">
					<div class="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
						<h2 class="text-slate-900 dark:text-white text-3xl font-bold">🗂️ Modules</h2>
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
									class="w-full rounded-xl relative"
									href={`/societies/${societyId}/courses/${courseId}/modules/${id}`}
									id="module" style="background: #fff;">

									{#if course.creator === data.user?.web3Address}
										<DotsMenu
											editHref={`/societies/${societyId}/courses/${courseId}/modules/${id}/edit`}
										/>
									{/if}

									<!-- Module Content with Responsive Stacking and 4:3 Aspect Ratio -->
									<div class="flex flex-col md:flex-row w-full gap-4 p-4 rounded-xl md:justify-start" style="background: #fff;">
										<div class="flex justify-start md:w-1/3">
											{#if course.modules[id].image}
												<img
													src={course.modules[id].image + '?img-format=webp'}
													alt="Module banner"
													class="w-full h-auto object-cover rounded-xl aspect-[4/3]"
												/>
											{:else}
												<div class="w-full h-32 bg-slate-900 rounded-xl aspect-[4/3]" />
											{/if}
										</div>

										<div class="text-center md:text-left md:w-2/3 flex flex-col justify-start">
											<h3 class="text-slate-900 dark:text-white text-2xl font-bold mt-4 md:mt-0">
												{course.modules[id].name}
											</h3>
											<p class="text-slate-700 dark:text-gray-500 mt-4 mb-4">
												{course.modules[id].description}
											</p>
										</div>
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

