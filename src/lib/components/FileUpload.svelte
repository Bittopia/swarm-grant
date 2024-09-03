<script lang="ts">
	import { EditOutline } from 'flowbite-svelte-icons';
	export let onFileSelected: (file: File | undefined) => void;
	export let ref: HTMLInputElement;
</script>

<div class="relative max-w-max">
	<label class="cursor-pointer">
		<slot />
		<input
			type="file"
			accept="image/*"
			class="absolute inset-0 opacity-0"
			on:change={(e) => onFileSelected(e.currentTarget.files?.[0])}
			bind:this={ref}
		/>
		<div class="absolute bottom-0 right-0">
			<EditOutline class="dark:text-white text-primary-900" size="sm" />
		</div>
	</label>
</div>
