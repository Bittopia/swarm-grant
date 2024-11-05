<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { ChevronLeftSolid } from 'flowbite-svelte-icons';

	export let href: string;
	export let text: string = 'Back';
	export let disabled: boolean = false;
	export let className = '';
</script>

<Button
	as="a"
	{href}
	color="dark"
	outline={true}
	{disabled}
	class={'py-2 text-md rounded-full ' + className}
	style="border: 1px solid #424148"
>
	<div class="flex gap-2 items-center">
		<ChevronLeftSolid size="xs" />
		<span>{text}</span>
	</div>
</Button>
