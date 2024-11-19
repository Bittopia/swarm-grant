<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import BackButton from '$lib/components/BackButton.svelte';

	import Container from '$lib/components/Container/Container.svelte';
	import FormSpinner from '$lib/components/FormSpinner.svelte';
	import { uploadFile } from '$lib/utils/file.js';
	import {
		Alert,
		Button,
		Heading,
		Input,
		Label,
		Textarea,
		Datepicker,
		Fileupload
	} from 'flowbite-svelte';
	const { societyId } = $page.params;

	let requesting = false;
	let files: FileList;
	export let form;
</script>

<Container>
	<div class="w-full mb-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4 mb-5">
				<BackButton href={`/societies/${societyId}`} />
			</div>
		</div>
	</div>
	<section id="society-new">
		<Heading level="2" class="mb-4">New course</Heading>
		<section class="mt-10 relative">
			{#if requesting}
				<FormSpinner />
			{/if}
			<form
				method="post"
				action="?/newCourse"
				use:enhance={async ({ formData }) => {
					requesting = true;

					// if (files && files.length) {
					// 	const { url } = await uploadFile(files[0], $page.data?.user?.jwt);
					// 	formData.set('image', url);
					// }

					return async ({ update }) => {
						await update();
						requesting = false;
					};
				}}
			>
				<div class="mt-8 p-8 rounded-xl grid gap-6 mb-6 md:grid-cols-1" id="module" style="background: #fff;">
					
					<div>
						<Label for="name" class="mt-3 mb-4 text-lg">Name Your Course</Label>
						<Input
							name="name"
							disabled={requesting}
							type="text"
							id="name"
							placeholder="Eg.: Linear algebra basics"
							required
						/>
					</div>
					<div>
						<Label for="description" class="mt-3 mb-4 text-lg">Explain What Makes Your Course Unique and Impactful</Label>
						<Textarea
							class="resize-none"
							rows="8"
							name="description"
							disabled={requesting}
							type="text"
							id="description"
							placeholder="Provide a brief overview of your course content and goals..."
							required
						/>
					</div>
					<div>
						<Label for="startDate" class="mt-3 mb-4 text-lg">Choose a Date to Launch Your Course</Label>
						<Datepicker
							name="startDate"
							datepickerOrientation="top"
							datepickerFormat="dd/mm/yyyy"
							datepickerTitle=""
							placeholder="dd/mm/yyyy"
							required
							show-icon={false}
						/>
					</div>
					<div>
						<Label for="description" class="mt-3 mb-4 text-lg">Provide the Wallet Address for the Course Educator</Label>
						<Input
							id="wallet-address"
							name="educator"
							disabled={requesting}
							type="text"
							placeholder="Wallet address"
							required
						/>
					</div>
					<div class="flex items-center gap-4">
						{#if files && files.length}
							<img
								src={URL.createObjectURL(files[0])}
								alt="selected banner"
								class="w-48 h-48 object-cover rounded"
							/>
						{/if}
						<div class="w-full">
							<Label for="image" class="mt-3 mb-4 text-lg">📤 Upload an Image for Your Course</Label>
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
							text="Back to courses list"
						/>
						<Button disabled={requesting} type="submit" class="rounded-full px-8 cta">Submit</Button>
					</div>
				</div>
			</form>
		</section>
		<!-- End list of societies-->
	</section>
</Container>
