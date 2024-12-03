<script>
	import { Button, Modal, Spinner } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	export let open = false;
	export let onConfirm = async () => {};
	export let onClose = () => {};
	export let text = 'Are you sure you want to delete this?';

	let confirming = false;
</script>

<Modal bind:open size="xs" autoclose>
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			{text}
		</h3>
		<Button
			color="red"
			class="me-2"
			on:click={async () => {
				confirming = true;
				await onConfirm();
				confirming = false;
			}}
			disabled={confirming}
		>
			<div>
				{#if confirming}
					<Spinner size="4" />
				{/if}
				Yes
			</div>
		</Button>
		<Button color="alternative" on:click={onClose}>No</Button>
	</div>
</Modal>
