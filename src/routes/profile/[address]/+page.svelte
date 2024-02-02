<script lang="ts">
	import type { PageData } from './$types.js';
	import { enhance } from '$app/forms';

	import {
		Avatar,
		Button,
		DropdownDivider,
		Heading,
		Input,
		Label,
		Textarea,
		Spinner
	} from 'flowbite-svelte';
	import { UserEditOutline, BookSolid } from 'flowbite-svelte-icons';

	import CopyToClipboard from '$lib/components/ProfilePopover/CopyToClipboard.svelte';
	import MarkdownContent from '$lib/components/MarkdownContent/MarkdownContent.svelte';

	import snarkdown from 'snarkdown';

	import truncateWalletAddress from '$lib/utils/truncateWalletAddress.js';

	let selectedTab = 'about';
	let editingBio = false;
	let savingBio = false;

	let editingInterests = false;
	let savingInterests = false;

	let editingLocation = false;
	let savingLocation = false;

	let editingName = false;
	let savingName = false;

	export let data: PageData;

	let bioContent = data.user?.bio || '';
	let interestsContent = data.user?.interests || '';
	let locationContent = data.user?.location || '';
	let nameContent = data.user?.name || '';
</script>

<div class="w-full flex flex-col justify-center items-center">
	<div class="flex flex-col md:flex-row gap-8 w-8/12 h-full py-4">
		<section class="w-full max-w-full md:w-[30%] md:max-w-[30%]">
			<div class="flex flex-col gap-4 p-8 rounded-xl w-full" style="border: 1px solid #424148">
				<Avatar />
				<div class="flex gap-2 items-center">
					{#if editingName}
						<form
							class="flex gap-2"
							method="POST"
							action="?/saveName"
							use:enhance={() => {
								savingName = true;

								return async ({ update }) => {
									await update();
									savingName = false;
									editingName = false;
								};
							}}
						>
							<Input
								name="name"
								class="w-full"
								value={nameContent}
								on:input={(e) => (nameContent = e.target.value)}
								autoFocus
							/>

							<Button
								type="submit"
								outline
								size="xs"
								disabled={savingName}
								class="max-w-max max-h-max"
							>
								{#if savingName}
									<Spinner class="w-[1.2rem] h-[1.2rem]" />
								{:else}
									<BookSolid size="md" />
								{/if}
							</Button>
						</form>
					{:else}
						<div class="max-w-[10rem] truncate">
							{#if nameContent && nameContent.length > 0}
								<span class="text-slate-900 dark:text-white profile-heading">
									{nameContent}
								</span>
							{:else}
								<span class="text-slate-600 dark:text-gray-400 profile-heading">No name yet</span>
							{/if}
						</div>
						{#if data.canEdit}
							<Button type="button" outline size="xs" on:click={() => (editingName = true)}>
								<UserEditOutline size="xs" />
							</Button>
						{/if}
					{/if}
				</div>
				<Label class="flex items-center gap-4">
					{truncateWalletAddress(data.user?.web3Address)}
					<CopyToClipboard text={data.user?.web3Address} />
				</Label>

				<div class="mt-4">
					<ul
						class="mr-4 flex list-none flex-col flex-wrap pl-0 gap-4"
						role="tablist"
						data-te-nav-ref
					>
						<li role="presentation" on:click={() => (selectedTab = 'about')}>
							<span
								class={`cursor-pointer hover:text-slate-900 pl-2 text-slate-700 dark:text-gray-400 ${
									selectedTab === 'about'
										? 'border-s-2 border-primary-500 text-slate-800 dark:ktext-white'
										: ''
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
		<section class="flex flex-col gap-4 w-full md:w-[70%] md:max-w-[70%]">
			<div class="flex flex-col gap-4 p-8 rounded-xl w-full" style="border: 1px solid #424148">
				<div>
					<header class="flex items-center justify-between py-4">
						<Heading level="2" class="text-xl profile-heading">Bio</Heading>
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
					<body>
						{#if editingBio}
							<Textarea
								class="w-full"
								rows={10}
								value={bioContent}
								on:input={(e) => (bioContent = e.target.value)}
								autoFocus
							/>
						{:else if data.user?.bio}
							<section class="flex flex-col gap-4 text-slate-700 dark:text-gray-400 py-2">
								<MarkdownContent content={snarkdown(data.user?.bio)} />
							</section>
						{:else}
							<p class="w-full text-gray-400">User bio is empty yet</p>
						{/if}
					</body>
				</div>
			</div>
			<div class="flex flex-col gap-4 p-8 rounded-xl w-full" style="border: 1px solid #424148">
				<header class="flex items-center justify-between py-4">
					<Heading level="2" class="text-xl profile-heading">Interests</Heading>
					{#if data.canEdit}
						{#if editingInterests}
							<form
								method="POST"
								action="?/saveInterests"
								use:enhance={() => {
									savingInterests = true;

									return async ({ update }) => {
										await update();
										savingInterests = false;
										editingInterests = false;
									};
								}}
							>
								<input type="hidden" name="interests" value={interestsContent} />
								<Button type="submit" disabled={savingInterests}>
									{#if savingInterests}
										Saving...
									{:else}
										Save
									{/if}
								</Button>
							</form>
						{:else}
							<Button on:click={() => (editingInterests = !editingInterests)}>Edit</Button>
						{/if}
					{/if}
				</header>
				<DropdownDivider class="my-3" />
				<body>
					{#if editingInterests}
						<Textarea
							class="w-full"
							rows={10}
							value={interestsContent}
							on:input={(e) => (interestsContent = e.target.value)}
							autoFocus
						/>
					{:else if data.user?.interests}
						<section class="flex flex-col gap-4 text-slate-700 dark:text-gray-400 py-2">
							<MarkdownContent content={snarkdown(data.user?.interests)} />
						</section>
					{:else}
						<p class="w-full text-gray-400">User interests is empty yet</p>
					{/if}
				</body>
			</div>
			<div class="flex flex-col gap-4 p-8 rounded-xl w-full" style="border: 1px solid #424148">
				<header class="flex items-center justify-between py-4">
					<Heading level="2" class="text-xl profile-heading">Location</Heading>
					{#if data.canEdit}
						{#if editingLocation}
							<form
								method="POST"
								action="?/saveLocation"
								use:enhance={() => {
									savingLocation = true;

									return async ({ update }) => {
										await update();
										savingLocation = false;
										editingLocation = false;
									};
								}}
							>
								<input type="hidden" name="location" value={locationContent} />
								<Button type="submit" disabled={savingLocation}>
									{#if savingLocation}
										Saving...
									{:else}
										Save
									{/if}
								</Button>
							</form>
						{:else}
							<Button on:click={() => (editingLocation = !editingLocation)}>Edit</Button>
						{/if}
					{/if}
				</header>
				<DropdownDivider class="my-3" />
				<body>
					{#if editingLocation}
						<Textarea
							class="w-full"
							rows={10}
							value={locationContent}
							on:input={(e) => (locationContent = e.target.value)}
							autoFocus
						/>
					{:else if data.user?.location}
						<section class="flex flex-col gap-4 text-slate-700 dark:text-gray-400 py-2">
							<MarkdownContent content={snarkdown(data.user?.location)} />
						</section>
					{:else}
						<p class="w-full text-gray-400">User location is empty yet</p>
					{/if}
				</body>
			</div>
		</section>
	</div>
</div>
