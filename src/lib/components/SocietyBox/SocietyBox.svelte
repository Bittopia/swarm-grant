<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import type { SocietyType } from '$lib/types/society';

	export let society: SocietyType;
</script>

<a href={`/societies/${society.id}`}>
	<div class="p-8 rounded-xl dark:hover:bg-slate-700 shadow-gray transition-shadow h-full societies-box" id="module" style="background: #fff;" >
		{#if typeof society.image === 'string' && society.image !== ''}
			<img
				src={society.image + '?img-format=webp'}
				alt="Society banner"
				class="w-full h-72 object-cover bg-gray-100 dark:bg-gray-600 rounded-lg mt-5"
			/>

			<hr class="my-4 border-[#424148] mt-8 mb-8" />
		{:else}
			<div class="w-full h-72 bg-auto rounded-xl" />
		{/if}

		<Heading tag="h4" className="mt-8">{society.name}</Heading>
		<p class="mt-4 line-clamp-3 text-gray-800 dark:text-white das-des mb-3">{society.description}</p>
	</div>
</a>
