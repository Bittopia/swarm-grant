<script lang="ts">
	import { Button, type ButtonType } from 'flowbite-svelte';

	export let className: string = '';
	export let onClick: () => void = () => {};
	export let as: string = '';
	export let href: string = '';
	export let disabled: boolean = false;
	export let type: ButtonType = 'button';
</script>

<Button class={className} on:click={onClick} {as} {href} {disabled} {type}>
	<slot />
</Button>
