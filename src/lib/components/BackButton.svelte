<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { ChevronLeftSolid } from 'flowbite-svelte-icons';

	export let href: string;
	export let text: string = 'Back';
	export let disabled: boolean = false;
	export let className = '';
</script>

<Button as="a" {href} color="primary" size="sm" outline={true} {disabled} class={className}>
	<div class="flex gap-2 items-center">
		<ChevronLeftSolid size="xs" />
		<span>{text}</span>
	</div>
</Button>
