<script lang="ts">
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { DotsHorizontalOutline, EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';

	export let className = '';
	export let editHref = '';
	export let onDelete = () => {};
</script>

<div class="absolute right-0 top-0">
	<div class="p-4" role="button">
		<DotsHorizontalOutline class={`text-black dark:text-white ${className}`} />
	</div>
	<Dropdown trigger="hover">
		<DropdownItem class="flex items-center gap-2" href={editHref}>
			<EditOutline class="w-4 h-4" />
			Edit
		</DropdownItem>
		<DropdownItem class="flex items-center gap-2" on:click={onDelete}>
			<TrashBinOutline class="w-4 h-4" />
			Delete
		</DropdownItem>
	</Dropdown>
</div>
