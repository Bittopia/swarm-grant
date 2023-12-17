<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte';
	import { Button } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { CourseType } from '$lib/types/course';

	export let data: CourseType | null = null;
	export let { societyId, courseId } = $page.params;

	console.log(data);
</script>

<Container class="mt-8">
	{#if data}
		<div class="w-full">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<Button as="a" href={`/societies/${societyId}`} color="primary" size="sm" outline={true}
						>Back</Button
					>
				</div>
			</div>
		</div>
		<div class="w-full flex gap-8 mt-8">
			<div class="w-1/3">
				<section class="w-full bg-slate-700 p-8 rounded-lg">
					<h1 class="text-3xl font-bold">{data.name}</h1>
					<p class="text-gray-500 mt-4">{data.description}</p>
					<p class="mt-4">Start Date: {data.startDate}</p>
				</section>
			</div>
			<div class="w-2/3">
				<section class="w-full bg-slate-700 p-8 rounded-lg">
					<div class="w-full flex items-center justify-between mb-8">
						<h2 class="text-2xl font-bold">Modules</h2>
						<Button
							as="a"
							href={`/societies/${societyId}/courses/${courseId}/modules/new`}
							color="primary"
							size="sm">Add new module</Button
						>
					</div>

					{#if data.modules && Object.keys(data.modules).length > 0}
						<section class="flex flex-col items-center gap-4">
							{#each Object.keys(data.modules) as id}
								<a
									class="w-full"
									href={`/societies/${societyId}/courses/${courseId}/modules/${id}`}
								>
									<div class="w-full bg-slate-600 p-4 rounded-lg">
										<h3 class="text-xl font-bold">{data.modules[id].name}</h3>
										<p class="text-gray-500 mt-4">{data.modules[id].description}</p>
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
