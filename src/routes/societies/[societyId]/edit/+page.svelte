<script lang="ts">
	import { enhance } from '$app/forms';
	import Container from '$lib/components/Container/Container.svelte';
	import { Alert, Button, Fileupload, Heading, Input, Label, Textarea } from 'flowbite-svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import FormSpinner from '$lib/components/FormSpinner.svelte';
	import { page } from '$app/stores';
	import { modal } from '$lib/web3/modal';
	import { uploadFile } from '$lib/utils/file.js';

	const user = $page.data.user;

	if (!user) {
		modal.open();
	}

	let requesting = false;
	let files: FileList;
	export let form;

	let name = $page.data.society.name;
	let description = $page.data.society.description;
</script>

<Container>
	<div class="w-full mb-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4 mb-5">
				<BackButton href={`/societies/${$page.params.societyId}`} />
			</div>
		</div>
	</div>
	<section id="society-new">
		<Heading level="2" class="mb-4">Edit Society</Heading>
		<section class="mt-10 relative">
			{#if requesting}
				<FormSpinner />
			{/if}
			<form
				method="post"
				action="?/editSociety"
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
				<Input type="hidden" name="id" value={$page.data.society.id} />
				<div class="mt-8 p-8 rounded-xl grid gap-6 mb-6 md:grid-cols-1" id="module" style="background: #fff;">

					<div>
						<Label for="name" class="mt-3 mb-4 text-lg">Name Your Society</Label>
						<Input
							maxlength="25"
							name="name"
							disabled={requesting}
							type="text"
							id="name"
							placeholder="Eg.: EdTech DAS"
							value={name}
							required
						/>
					</div>
					<div>
						<Label for="description" class="mt-3 mb-4 text-lg">Add a Description for Your Society</Label>
						<Textarea
							class="resize-none"
							rows="8"
							name="description"
							disabled={requesting}
							type="text"
							id="description"
							placeholder="Describe the purpose and vision of your society..."
							value={description}
							required
						/>
					</div>
					<div class="flex items-center gap-4">
						{#if files && files.length}
							<img
								src={URL.createObjectURL(files[0])}
								alt="selected banner"
								class="w-72 h-72 object-cover rounded"
							/>
						{:else if $page.data.society.image}
							<img
								src={$page.data.society.image}
								alt="selected banner"
								class="w-72 h-72 object-cover rounded"
							/>
						{/if}
						<div class="w-full">
							<Label for="image" class="mt-3 mb-1 text-lg">🖼 Upload an Image for Your Society</Label>
 							<p class="text-md text-gray-500 mb-4">(Recommended 4:3 Ratio)</p>
							<Fileupload
								name="image"
								class="image-button"
								id="upload-button"
								disabled={requesting}
								accept="image/*"
								on:change={(e) => (files = e.target.files)}
							/>
						</div>
					</div>

					{#if form?.error}
						<Alert color="red">
							{form.error}
						</Alert>
					{/if}

					<div class="flex items-center justify-end w-full gap-4">
						<BackButton
							href={`/societies/${$page.params.societyId}`}
							disabled={requesting}
							text="Back to society"
						/>
						<Button disabled={requesting} type="submit" class="rounded-full cta">Update</Button>
					</div>
				</div>
			</form>
		</section>
		<!-- End list of societies-->
	</section>
</Container>
