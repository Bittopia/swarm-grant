<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.status === 401}
	<div class="h-full flex flex-col justify-center items-center gap-4">
		<h1>You need to sign in to view this page</h1>
		<w3m-button size="sm" balance="hide" />
	</div>
{/if}
