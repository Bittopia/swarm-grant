<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import type { SocietyType } from '$lib/types/society';

	export let society: SocietyType;
</script>

<a href={`/societies/${society.id}`}>
	<div
		class="p-8 rounded-xl dark:hover:bg-slate-700 shadow-gray transition-shadow h-full"
		style="border: 1px solid #424148"
	>
		<Heading tag="h4">{society.name}</Heading>
		<p class="mt-4 line-clamp-3 text-gray-800 dark:text-white">{society.description}</p>
	</div>
</a>
