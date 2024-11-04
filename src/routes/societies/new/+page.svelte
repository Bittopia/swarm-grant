<script lang="ts">
	import { enhance } from '$app/forms';
	import Container from '$lib/components/Container/Container.svelte';
	import { Alert, Button, Fileupload, Heading, Input, Label, Textarea } from 'flowbite-svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import FormSpinner from '$lib/components/FormSpinner.svelte';
	import { page } from '$app/stores';
	import { modal } from '$lib/web3/modal';
	import { uploadFile } from '$lib/utils/file';

	const user = $page.data.user;

	if (!user) {
		modal.open();
	}

	let requesting = false;
	let files: FileList;
	console.log('[LS] -> src/routes/societies/new/+page.svelte:18 -> files: ', files);
	export let form;
</script>

<Container>
	<div class="w-full mb-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4">
				<BackButton href="/" />
			</div>
		</div>
	</div>
	<section id="society-new">
		<Heading level="2" class="mb-4">New Society</Heading>
		<section class="mt-10 relative">
			{#if requesting}
				<FormSpinner />
			{/if}
			<form
				method="post"
				action="?/newSociety"
				use:enhance={async ({ formData }) => {
					requesting = true;

					// if (files && files.length) {
					// 	const { url } = await uploadFile(files[0], user?.jwt);
					// 	formData.set('image', url);
					// }

					return async ({ update }) => {
						await update();

						requesting = false;
					};
				}}
			>
				<div
					class="w-full mt-8 p-4 rounded-xl grid gap-6 mb-6 md:grid-cols-1"
					style="border: 1px solid #424148"
				>
					<div class="flex items-center gap-4">
						{#if files && files.length}
							<img
								src={URL.createObjectURL(files[0])}
								alt="selected banner"
								class="w-72 h-72 object-cover rounded"
							/>
						{/if}
						<div class="w-full">
							<Label for="image" class="mb-2">What's the society image?</Label>
							<Fileupload
								name="image"
								disabled={requesting}
								accept="image/*"
								on:change={(e) => (files = e.target.files)}
							/>
						</div>
					</div>
					<div>
						<Label for="name" class="mb-2">What's the society name?</Label>
						<Input
							maxlength="25"
							name="name"
							disabled={requesting}
							type="text"
							id="name"
							placeholder="Eg.: Mathematics Society"
							required
						/>
					</div>
					<div>
						<Label for="description" class="mb-2">Give a description for your society.</Label>
						<Textarea
							class="resize-none"
							rows="8"
							name="description"
							disabled={requesting}
							type="text"
							id="description"
							placeholder="Write a description for your society"
							required
						/>
					</div>

					{#if form?.error}
						<Alert color="red">
							{form.error}
						</Alert>
					{/if}

					<div class="flex items-center justify-end w-full gap-4">
						<BackButton href="/" disabled={requesting} text="Back to society list" />
						<Button disabled={requesting} type="submit" class="rounded-full">Submit</Button>
					</div>
				</div>
			</form>
		</section>
		<!-- End list of societies-->
	</section>
</Container>
