<script lang="ts">
	import { enhance } from '$app/forms';
	import Container from '$lib/components/Container/Container.svelte';
	import { Alert, Button, Fileupload, Heading, Input, Label, Textarea } from 'flowbite-svelte';
	import snarkdown from 'snarkdown';
	import MarkdownContent from '$lib/components/MarkdownContent/MarkdownContent.svelte';
	import { page } from '$app/stores';
	import BackButton from '$lib/components/BackButton.svelte';
	import FormSpinner from '$lib/components/FormSpinner.svelte';
	import VideoUploadModal from '$lib/components/VideoUploadModal.svelte';
	const { societyId, courseId } = $page.params;
	import { uploadVideo } from '$lib/utils/file';
	import { uuid } from 'uuidv4';

	let requesting = false;
	let files: FileList;
	let showVideoUploadModal = false;
	let videos = [];
	let uploadLoading = false;

	export let form;
	let content = '';

	async function handleVideoUpload(
		video_file: File,
		thumbnail_file: File,
		title: string,
		description: string
	) {
		if (!video_file) return;

		const abortController = new AbortController();

		let video_url = '';

		uploadLoading = true;
		try {
			const { url } = await uploadVideo({
				video_file,
				thumbnail_file,
				jwt: $page.data.user.jwt,
				title,
				description,
				abortController
			});
			video_url = url;
		} catch (error) {
			console.log(error);
			uploadLoading = false;
			return;
		}

		// if (thumbnail_file) {
		// 	const formData = new FormData();
		// 	formData.append('file', thumbnail_file);
		//
		// 	const thumbnail_response = await fetch('/file', {
		// 		method: 'POST',
		// 		body: formData
		// 	});
		//
		// 	if (!thumbnail_response.ok) {
		// 		throw new Error('Failed to upload thumbnail');
		// 	}
		//
		// 	const { url: thumb_url } = await thumbnail_response.json();
		//
		// 	thumbnail_url = thumb_url;
		// }

		videos.push({
			id: uuid(),
			url: video_url,
			title,
			description
		});

		uploadLoading = false;
		showVideoUploadModal = false;

		content += `\n### ${title}\n<iframe src="${video_url}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen width="720" height="480"></iframe>\n`;
	}
</script>

<Container>
	<div class="w-full mb-4">
		<div class="flex flex-col md:flex-row items-center justify-between">
			<div class="flex items-center gap-4 mb-5">
				<BackButton href={`/societies/${societyId}/courses/${courseId}`} />
			</div>
		</div>
	</div>
	<section id="society-new">
		<Heading level="2" class="mb-4">Create a Module for Your Course</Heading>
		<!-- Define list of societies -->
		<section class="mt-10 grid gap-8 grid-cols-1 md:grid-cols-2">
			<section id="module-form">
				<form
					method="post"
					action="?/newModule"
					use:enhance={({ formData }) => {
						requesting = true;

						if (videos?.length > 0) {
							formData.append('videos', JSON.stringify(videos));
						}

						return async ({ update }) => {
							await update();

							requesting = false;
						};
					}}
					class="relative"
				>
					{#if requesting}
						<FormSpinner />
					{/if}
					<Input type="hidden" name="societyId" value={societyId} />
					<Input type="hidden" name="courseId" value={courseId} />
					<div
						class="mt-8 p-8 rounded-xl grid gap-6 mb-6"
						id="module"
						style="background: #fff;"
					>
						<div>
							<Label for="name" class="mt-3 mb-4 text-lg">Enter a Title for Your Module</Label>
							<Input
								name="name"
								disabled={requesting}
								type="text"
								id="name"
								placeholder="Eg.: Getting Started"
								required
							/>
						</div>
						<div>
							<Label for="description" class="mt-3 mb-4 text-lg">What Will Learners Gain From This Module?</Label>
							<Textarea
								rows="8"
								name="description"
								disabled={requesting}
								type="text"
								id="description"
								placeholder="Write a brief summary of this module..."
								required
							/>
						</div>
						<div>
							<div class="flex flex-col sm:flex-row items-end justify-between gap-4 mb-4">
								<Label for="content" class="mt-3 mb-4 text-lg">Write the Content for Your Module</Label>
								<Button
									on:click={() => {
										showVideoUploadModal = true;
									}}
									class="mt-4"
								>
									Upload video
								</Button>
							</div>
							<Textarea
								bind:value={content}
								rows="20"
								name="content"
								disabled={requesting}
								type="text"
								id="content"
								placeholder="Write your module content (Markdown supported)..."
								required
							/>
						</div>
						<div>
							<Label for="image" class="mt-3 mb-4 text-lg">🖼 Add an Image to Highlight This Module</Label>
							<Fileupload 
								name="image" 
								class="image-button"
								id="upload-button"
								disabled={requesting} 
								accept="image/*" bind:files 
							/>
						</div>

						{#if form?.error}
							<Alert color="red">
								{form.error}
							</Alert>
						{/if}

						<div class="flex flex-col sm:flex-row items-center justify-end w-full gap-4">
							<BackButton
								href={`/societies/${societyId}/courses/${courseId}`}
								disabled={requesting}
								text="Back to modules"
							/>
							<Button disabled={requesting} type="submit" class="rounded-full px-8 cta">Save</Button>
						</div>
					</div>
				</form>
			</section>
			<section class="text-slate-700 dark:text-white">
				<Heading tag="h2" class="mb-8">Preview</Heading>
				{#if content}
					<MarkdownContent content={snarkdown(content)} />
				{/if}
			</section>
		</section>
		<!-- End list of societies-->
	</section>
	{#if showVideoUploadModal}
		<VideoUploadModal
			bind:open={showVideoUploadModal}
			onClose={() => (showVideoUploadModal = false)}
			onUpload={handleVideoUpload}
			{uploadLoading}
		/>
	{/if}
</Container>

