<script lang="ts">
	import { Button, Input, Modal, Textarea, Dropzone, StepIndicator } from 'flowbite-svelte';
	import FormSpinner from './FormSpinner.svelte';
	import { ChevronLeftOutline } from 'flowbite-svelte-icons';

	export let open = false;
	export let onClose = () => {};
	export let dismissable = true;
	export let onUpload: (file: File, thumbnail: File, title: string, description: string) => void;
	export let uploadLoading = false;

	let currentStep = 1;
	let steps = ['1. Upload video', '2. Upload thumbnail (optional)'];
	let video_value = '';
	let thumbnail_value = '';
	let selected_video_file: File;
	let selected_thumbnail_file: File;
	let video_title = '';
	let video_description = '';

	const loading_phrases = [
		'Empowering knowledge without borders—decentralized education gives learning back to the people.',
		'Learning reimagined: Where knowledge flows freely, without gatekeepers or limits.',
		'In a decentralized world, education is a right, not a privilege. Unlock your potential, one byte at a time.'
	];

	let current_loading_phrase = loading_phrases[0];

	$: {
		console.log('upload loading', uploadLoading);
		if (uploadLoading) {
			const interval = setInterval(() => {
				if (!uploadLoading) {
					clearInterval(interval);
				}
				console.log('holaaaa');
				current_loading_phrase =
					loading_phrases[Math.floor(Math.random() * loading_phrases.length)];
			}, 30000);
		}
	}

	$: uploadDisabled = !video_value || !video_title || uploadLoading;

	$: {
		if (selected_video_file) {
			currentStep = 2;
		}
	}

	const handleVideoChange = (event) => {
		const files = event.target.files;
		if (files.length > 0) {
			video_value = files[0].name;
			video_value = video_value;
			selected_video_file = files[0];
		}
	};

	const handleThumbnailChange = (event) => {
		const files = event.target.files;
		if (files.length > 0) {
			thumbnail_value = files[0].name;
			thumbnail_value = thumbnail_value;
			selected_thumbnail_file = files[0];
		}
	};

	const videoDropHandle = (event) => {
		event.preventDefault();
		if (event.dataTransfer.items) {
			const item = event.dataTransfer.items[0];
			if (item.kind === 'file') {
				const file = item.getAsFile();
				video_value = file.name;
				video_value = video_value;
				selected_video_file = file;
			}
		} else {
			const file = event.dataTransfer.files[0];
			video_value = file.name;
			video_value = video_value;
			selected_video_file = file;
		}
	};

	const thumbnailDropHandle = (event) => {
		event.preventDefault();
		if (event.dataTransfer.items) {
			const item = event.dataTransfer.items[0];
			if (item.kind === 'file') {
				const file = item.getAsFile();
				thumbnail_value = file.name;
				thumbnail_value = thumbnail_value;
				selected_thumbnail_file = file;
			}
		} else {
			const file = event.dataTransfer.files[0];
			thumbnail_value = file.name;
			thumbnail_value = thumbnail_value;
			selected_thumbnail_file = file;
		}
	};

	const showVideoFile = (file) => {
		let concat = '';
		concat += file;
		concat += ',';
		concat += ' ';

		if (concat.length > 40) concat = concat.slice(0, 40);
		concat += '...';
		return concat;
	};

	const showThumbnailFile = (file) => {
		let concat = '';
		concat += file;
		concat += ',';
		concat += ' ';

		if (concat.length > 40) concat = concat.slice(0, 40);
		concat += '...';
		return concat;
	};
</script>

<Modal
	bind:open
	class="w-full h-auto max-w-lg md:max-w-xl lg:max-w-3xl px-4"
	style="background: rgb(35, 0, 138) !important;"
	{dismissable}
	title="Upload video"
	outsideclose={dismissable}
	size="lg"
>
	<form>
		<div class="flex flex-col md:flex-row gap-8">
			<div class="w-full flex flex-col gap-2">
				<label for="video-title">Enter video title</label>
				<Input
					id="video-title"
					name="video-title"
					placeholder="Title"
					style="background: rgb(35, 0, 138) !important;"
					required
					autoFocus
					bind:value={video_title}
				/>

				<div class="flex flex-col gap-2">
					<label for="video-description">Description (optional)</label>

					<Textarea
						id="video-description"
						name="video-description"
						style="background: rgb(35, 0, 138) !important;"	
						placeholder="Description"
						class="h-36"
						bind:value={video_description}
						required
					/>
				</div>
			</div>
			<div class="w-full">
				{#if currentStep === 1}
					<Dropzone
						name="file"
						accept="video/*"
						on:drop={videoDropHandle}
						on:dragover={(event) => {
							event.preventDefault();
						}}
						on:change={handleVideoChange}
					>
						<h2 class="mb-4">Select video file</h2>
						<svg
							aria-hidden="true"
							class="mb-3 w-10 h-10 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
							/></svg
						>
						{#if !video_value}
							<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
								<span class="font-semibold">Click to upload</span> or drag and drop
							</p>
						{:else}
							<p>{showVideoFile(video_value)}</p>
						{/if}
					</Dropzone>
				{:else}
					<div class="mb-2">
						<Button color="alternative" on:click={() => (currentStep = 1)} class="border-none ps-0">
							<ChevronLeftOutline />
						</Button>
					</div>
					<Dropzone
						name="file"
						accept="image/*"
						on:drop={thumbnailDropHandle}
						on:dragover={(event) => {
							event.preventDefault();
						}}
						on:change={handleThumbnailChange}
					>
						<h2 class="mb-4">Select thumbnail (optional)</h2>
						<svg
							aria-hidden="true"
							class="mb-3 w-10 h-10 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
							/></svg
						>
						{#if !thumbnail_value}
							<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
								<span class="font-semibold">Click to upload</span> or drag and drop
							</p>
						{:else}
							<p>{showThumbnailFile(video_value)}</p>
						{/if}
					</Dropzone>
				{/if}

				<div class="mt-4">
					<StepIndicator {currentStep} {steps} />
				</div>
			</div>
		</div>
		<div class="pt-4 mt-8">
			<div class="flex justify-end w-full gap-4">
				<Button
					on:click={() => {
						if (selected_video_file) {
							onUpload(
								selected_video_file,
								selected_thumbnail_file,
								video_title,
								video_description
							);
						}
					}}
					disabled={uploadDisabled}
				>
					<div class="flex gap-4">
						{#if uploadLoading}
							<FormSpinner bind:phrase={current_loading_phrase} />
						{/if}

						<span> Upload</span>
					</div>
				</Button>
				<Button color="alternative" on:click={onClose}>Cancel</Button>
			</div>
		</div>
	</form>
</Modal>

<style>
.text-gray-900 {
	color: rgb(255, 255, 255);
}
</style>
