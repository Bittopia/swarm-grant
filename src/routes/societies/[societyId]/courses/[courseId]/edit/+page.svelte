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
	const { societyId, courseId } = $page.params;

	const returnTo = $page.url.searchParams.get('returnTo');

	let requesting = false;
	let files: FileList;
	export let form;
</script>

<Container>
	<div class="w-full mb-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4 mb-5">
				<BackButton href={returnTo || `/societies/${societyId}/courses/${courseId}`} />
			</div>
		</div>
	</div>
	<section id="society-new">
		<Heading level="2" class="mb-4">Update course</Heading>
		<section class="mt-10 relative">
			{#if requesting}
				<FormSpinner />
			{/if}
			<form
				method="post"
				action="?/editCourse"
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
					<Input type="hidden" name="id" value={courseId} />
					<Input type="hidden" name="societyId" value={societyId} />


					<div>
						<Label for="name" class="mt-3 mb-4 text-lg">Name Your Course</Label>
						<Input
							name="name"
							disabled={requesting}
							type="text"
							id="name"
							placeholder="Eg.: Linear algebra basics"
							value={$page.data.course.name}
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
							value={$page.data.course.description}
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
							value={$page.data.course.startDate}
							required
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
							value={$page.data.course.educator}
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
						{:else if $page.data.course.image}
							<img
								src={$page.data.course.image}
								alt="selected banner"
								class="w-48 h-48 object-cover rounded"
							/>
						{/if}
						<div class="w-full">
							<Label for="image" class="mb-2">What's the course image?</Label>
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
							href={returnTo || `/societies/${$page.params.societyId}`}
							disabled={requesting}
							text={returnTo ? 'Back to courses list' : 'Back to course'}
						/>
						<Button disabled={requesting} type="submit" class="rounded-full px-8 cta">Update</Button>
					</div>
				</div>
			</form>
		</section>
		<!-- End list of societies-->
	</section>
</Container>
