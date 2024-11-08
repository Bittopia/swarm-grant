<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { ChevronLeftSolid } from 'flowbite-svelte-icons';

	export let href: string | undefined = undefined;
	export let text: string = 'Back';
	export let disabled: boolean = false;
	export let className = '';
	export let onClick: () => void = () => {};
</script>

<Button
	as="a"
	{href}
	color="dark"
	outline={true}
	{disabled}
	style="border: 1px solid #424148"
	on:click={onClick}
	class={'py-2 text-md rounded-full cursor-pointer' + className}
>
	<div class="flex gap-2 items-center cursor-pointer">
		<ChevronLeftSolid size="xs" />
		<span>{text}</span>
	</div>
</Button>
