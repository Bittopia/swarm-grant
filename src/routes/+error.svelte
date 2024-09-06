<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from 'flowbite-svelte';
	import { preloadData, goto } from '$app/navigation';
	import { onMount } from 'svelte';

	$: backPathname = '';

	onMount(() => {
		const referrer = document.location.href;
		const url = new URL(referrer);
		const searchParams = new URLSearchParams(url.search);
		const returnTo = searchParams.get('returnTo');

		if (returnTo) {
			backPathname = returnTo;
		} else {
			const url = referrer.split('?')[0];
			backPathname = url.split('/').slice(0, -1).join('/');
		}
	});

	$: console.log(backPathname);
</script>

<div class="h-full flex flex-col justify-center items-center gap-4">
	<h1>{$page.error?.message || 'You must be logged in to access this page'}</h1>
	<Button
		on:click={() => goto(backPathname)}
		on:mouseover={async () => await preloadData(backPathname)}
	>
		Go back
	</Button>
	<w3m-button size="sm" balance="hide" />
</div>
