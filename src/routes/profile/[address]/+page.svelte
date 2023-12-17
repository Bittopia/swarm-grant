<script lang="ts">
	import type { PageData } from './$types.js';
	import { enhance } from '$app/forms';

	import { Avatar, Button, DropdownDivider, Textarea } from 'flowbite-svelte';

	import CopyToClipboard from '$lib/components/ProfilePopover/CopyToClipboard.svelte';
	import MarkdownContent from '$lib/components/MarkdownContent/MarkdownContent.svelte';

	import snarkdown from 'snarkdown';

	import truncateWalletAddress from '$lib/utils/truncateWalletAddress.js';

	let selectedTab = 'about';
	let editingBio = false;
	let savingBio = false;

	export let data: PageData;

	let bioContent = data.user?.bio || '';
</script>

<div class="w-full flex flex-col justify-center items-center">
	<div class="flex gap-8 w-8/12 h-full py-4">
		<section style="flex-grow: 1;">
			<div class="flex flex-col gap-4 bg-slate-700 p-4 rounded-xl w-full">
				<Avatar />
				<div class="flex items-center gap-4">
					{truncateWalletAddress(data.user?.web3Address)}
					<CopyToClipboard text={data.user?.web3Address} />
				</div>

				<div class="mt-4">
					<ul
						class="mr-4 flex list-none flex-col flex-wrap pl-0 gap-4"
						role="tablist"
						data-te-nav-ref
					>
						<li role="presentation" on:click={() => (selectedTab = 'about')}>
							<span
								class={`cursor-pointer hover:text-white pl-2 text-gray-400 ${
									selectedTab === 'about' ? 'border-s-2 border-primary-500 text-white' : ''
								}`}>About</span
							>
						</li>

						<!-- 
						<li role="presentation" on:click={() => (selectedTab = 'activity')}>
							<span
								class={`cursor-pointer hover:border-s-2 border-primary-500 pl-2 text-gray-400 ${
									selectedTab === 'activity' ? 'border-s-2 border-primary-500 text-white' : ''
								}`}>Activity</span
							>
						</li>
            -->
					</ul>
				</div>
			</div>
		</section>
		<section class="" style="flex-grow: 10;">
			<div class="flex flex-col gap-4 bg-slate-700 p-4 rounded-xl w-full">
				<div>
					<header class="flex items-center justify-between">
						<h2 class="text-xl text-bold">Bio</h2>
						{#if data.canEdit}
							{#if editingBio}
								<form
									method="POST"
									action="?/saveBio"
									use:enhance={() => {
										savingBio = true;

										return async ({ update }) => {
											await update();
											savingBio = false;
											editingBio = false;
										};
									}}
								>
									<input type="hidden" name="bio" value={bioContent} />
									<Button type="submit" disabled={savingBio}>
										{#if savingBio}
											Saving...
										{:else}
											Save
										{/if}
									</Button>
								</form>
							{:else}
								<Button on:click={() => (editingBio = !editingBio)}>Edit</Button>
							{/if}
						{/if}
					</header>
					<DropdownDivider class="my-4" />
					<body>
						{#if editingBio}
							<Textarea
								class="w-full"
								rows={10}
								value={bioContent}
								on:input={(e) => (bioContent = e.target.value)}
							/>
						{:else if data.user?.bio}
							<section class="flex flex-col items-center gap-4">
								<MarkdownContent content={snarkdown(data.user?.bio)} />
							</section>
						{:else}
							<p class="w-full text-gray-400">User bio is empty yet</p>
						{/if}
					</body>
				</div>
			</div>
		</section>
	</div>
</div>
