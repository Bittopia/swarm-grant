<script lang="ts">
	import truncateWalletAddress from '$lib/utils/truncateWalletAddress';
	import { Popover, Button, Avatar } from 'flowbite-svelte';
	import CopyToClipboard from './CopyToClipboard.svelte';

	export let name: string | undefined;
	export let web3Address: string | undefined;
	export let avatar: string | undefined;
	export let triggeredBy: string;
	export let showName: boolean = true;
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'xs';

	console.log({ name, avatar, triggeredBy, showName, size });
</script>

<div>
	<div id={triggeredBy} class="text-slate-800 dark:text-white flex gap-2 relative">
		<Avatar src={avatar} {size} />
		{#if showName}
			{name ?? truncateWalletAddress(web3Address)}
		{/if}
	</div>

	<Popover
		triggeredBy={`#${triggeredBy}`}
		class="w-86 text-sm font-light bg-white text-slate-800 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
		style="z-index: 9999;"
		placement="bottom-start"
	>
		<div class="flex p-3 gap-2">
			<div class="mb-2">
				<Avatar src={avatar} alt="Jese Leos" />
			</div>
			<div class="flex items-center gap-4">
				{truncateWalletAddress(web3Address)}
				<CopyToClipboard text={web3Address} />
			</div>
		</div>
		<div class="flex justify-center">
			<Button as="a" href={`/profile/${web3Address}`} class="rounded-3xl px-8">View Profile</Button>
		</div>
	</Popover>
</div>
