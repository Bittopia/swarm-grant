<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { CopySolid } from 'flowbite-svelte-icons';

	export let text: string | undefined;
</script>

<Button outline class="border-none" size="xs" on:click={() => navigator.clipboard.writeText(text)}
	><CopySolid /></Button
>
