<script lang="ts">
	import { Spinner } from 'flowbite-svelte';

	export let phrase: string;
</script>

<div class="absolute top-0 bottom-0 right-0 left-0">
	<div class="flex flex-col gap-4 items-center justify-center h-full bg-gray-900/40">
		<Spinner size="12" />

		{#if phrase}
			<span class="mt-8 text-sm dark:text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_80%)]"
				>{phrase}</span
			>
		{/if}
	</div>
</div>
