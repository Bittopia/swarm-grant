<script lang="ts">
	import truncateWalletAddress from '$lib/utils/truncateWalletAddress';
	import { Popover, Button, Avatar } from 'flowbite-svelte';
	import CopyToClipboard from './CopyToClipboard.svelte';

	export let address: string;
</script>

<Popover
	triggeredBy={`#profile-popover-${address}`}
	class="w-86 text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
	style="z-index: 9999;"
	placement="bottom-start"
>
	<div class="flex p-3 gap-2">
		<div class="mb-2">
			<Avatar src="" alt="Jese Leos" />
		</div>
		<div class="flex items-center gap-4">
			{truncateWalletAddress(address)}
			<CopyToClipboard text={address} />
		</div>
	</div>
	<div class="flex justify-center">
		<Button as="a" href={`/profile/${address}`} class="rounded-3xl px-8">View Profile</Button>
	</div>
</Popover>
