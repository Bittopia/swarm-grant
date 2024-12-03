<script lang="ts">
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { DotsHorizontalOutline, EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import ConfirmDialog from './ConfirmDialog.svelte';

	export let className = '';
	export let editHref = '';
	export let onDelete = async () => {};
	export let deleteMessage = 'Are you sure you want to delete this?';

	let confirmDialogOpen = false;
</script>

<div class="absolute right-0 top-0 z-50">
	<div class="p-4" role="button">
		<DotsHorizontalOutline class={`text-black dark:text-white ${className}`} />
	</div>
	<Dropdown trigger="click" class="z-50">
		<DropdownItem class="flex items-center gap-2 z-50" href={editHref}>
			<EditOutline class="w-4 h-4" />
			Edit
		</DropdownItem>
		<DropdownItem class="flex items-center gap-2 z-50" on:click={() => (confirmDialogOpen = true)}>
			<TrashBinOutline class="w-4 h-4" />
			Delete
		</DropdownItem>
	</Dropdown>
	<ConfirmDialog
		bind:open={confirmDialogOpen}
		onConfirm={async () => {
			await onDelete();
			confirmDialogOpen = false;
		}}
		onClose={() => (confirmDialogOpen = false)}
		text={deleteMessage}
	/>
</div>
