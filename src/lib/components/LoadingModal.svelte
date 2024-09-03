<script lang="ts">
	import { Button, Modal, Spinner } from 'flowbite-svelte';

	export let open = false;
	export let onClose = () => {};
	export let dismissable = true;
	export let title = 'Loading...';
</script>

<Modal bind:open class="w-full max-w-[30rem]" {dismissable}>
	<div class="flex flex-col gap-4">
		<div class="flex justify-center items-center">
			<Spinner class="w-12 h-12" />
		</div>
		<div class="text-center">
			<p class="text-lg text-slate-700 dark:text-gray-400">
				{title}
			</p>
		</div>
		{#if dismissable}
			<div class="flex justify-center items-center gap-4">
				<Button on:click={() => (open = false)}>Close</Button>
			</div>
		{/if}
	</div>
</Modal>
