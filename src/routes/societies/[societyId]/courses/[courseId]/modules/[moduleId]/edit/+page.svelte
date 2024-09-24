<script lang="ts">
	import { enhance } from '$app/forms';
	import Container from '$lib/components/Container/Container.svelte';
	import { Alert, Button, Fileupload, Heading, Input, Label, Textarea } from 'flowbite-svelte';
	import snarkdown from 'snarkdown';
	import MarkdownContent from '$lib/components/MarkdownContent/MarkdownContent.svelte';
	import { page } from '$app/stores';
	import BackButton from '$lib/components/BackButton.svelte';
	import FormSpinner from '$lib/components/FormSpinner.svelte';
	import { uploadVideo } from '$lib/utils/file.js';
	import VideoUploadModal from '$lib/components/VideoUploadModal.svelte';
	import { uuid } from 'uuidv4';
	const { societyId, courseId, moduleId } = $page.params;

	let requesting = false;
	let files: FileList;
	let showVideoUploadModal = false;
	let videos = [];
	let uploadLoading = false;

	export let form;
	let content = $page.data.module.content;

	async function handleVideoUpload(
		video_file: File,
		thumbnail_file: File,
		title: string,
		description: string
	) {
		if (!video_file) return;

		const abortController = new AbortController();

		let thumbnail_url = '';
		let video_url = '';

		uploadLoading = true;
		try {
			const { url } = await uploadVideo(video_file, $page.data.user.jwt, abortController);
			video_url = url;
		} catch (error) {
			console.log(error);
			uploadLoading = false;
			return;
		}

		if (thumbnail_file) {
			const formData = new FormData();
			formData.append('file', thumbnail_file);

			const thumbnail_response = await fetch('/file', {
				method: 'POST',
				body: formData
			});

			if (!thumbnail_response.ok) {
				throw new Error('Failed to upload thumbnail');
			}

			const { url: thumb_url } = await thumbnail_response.json();

			thumbnail_url = thumb_url;
		}

		videos.push({
			id: uuid(),
			url: video_url,
			title,
			description,
			thumbnail: thumbnail_url
		});

		uploadLoading = false;
		showVideoUploadModal = false;

		content += `\n### ${title}\n<video controls ${
			thumbnail_url ? `poster="${thumbnail_url}"` : ''
		}><source src="${video_url}" type="video/mp4"> Your browser does not support the video tag. </video>\n`;
	}
</script>

<Container>
	<div class="w-full mb-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4">
				<BackButton href={`/societies/${societyId}/courses/${courseId}`} />
			</div>
		</div>
	</div>
	<section id="society-new">
		<Heading level="2" class="mb-4">Update module</Heading>
		<!-- Define list of societies -->
		<section class="mt-10 grid gap-8 grid-cols-2">
			<section id="module-form">
				<form
					method="post"
					action="?/editModule"
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
					class="relative"
				>
					{#if requesting}
						<FormSpinner />
					{/if}
					<Input type="hidden" name="id" value={moduleId} />
					<Input type="hidden" name="societyId" value={societyId} />
					<Input type="hidden" name="courseId" value={courseId} />
					<div
						class="w-full p-4 rounded-xl grid gap-6 mb-6 md:grid-cols-1"
						style="border: 1px solid #424148"
					>
						<div>
							<Label for="image" class="mb-2">What's the module image?</Label>
							<Fileupload
								name="image"
								disabled={requesting}
								accept="image/*"
								on:change={(e) => (files = e.target.files)}
							/>
						</div>
						<div>
							<Label for="name" class="mb-2">What's the module name?</Label>
							<Input
								name="name"
								disabled={requesting}
								type="text"
								id="name"
								placeholder="Eg.: Introduction"
								value={$page.data.module.name}
								required
							/>
						</div>
						<div>
							<Label for="description" class="mb-2">Give a description the module.</Label>
							<Textarea
								rows="8"
								name="description"
								disabled={requesting}
								type="text"
								id="description"
								placeholder="Write your option here"
								value={$page.data.module.description}
								required
							/>
						</div>
						<div>
							<div class="flex items-end justify-between gap-4 mb-4">
								<Label for="content" class="mb-2">Write down the module content.</Label>
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
								on:input={(e) => (content = e.target.value)}
								rows="20"
								name="content"
								disabled={requesting}
								type="text"
								id="content"
								placeholder="Module content in markdown"
								required
							/>
						</div>

						{#if form?.error}
							<Alert color="red">
								{form.error}
							</Alert>
						{/if}

						<div class="flex items-center justify-end w-full gap-4">
							<BackButton
								href={`/societies/${societyId}/courses/${courseId}`}
								disabled={requesting}
								text="Back to modules"
							/>
							<Button disabled={requesting} type="submit" class="rounded-full px-8">Save</Button>
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
