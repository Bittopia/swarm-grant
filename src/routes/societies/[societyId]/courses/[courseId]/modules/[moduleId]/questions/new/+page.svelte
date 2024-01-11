<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte';
	import { Alert, Button, Heading, Input, Label, Radio } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import BackButton from '$lib/components/BackButton.svelte';
	const { societyId, courseId, moduleId } = $page.params;

	let requesting = false;

	let question = '';
	let option = '';
	let questionOptions: string[] = [];
	let rightOption = '';

	export let form;

	function addOption(value: string) {
		questionOptions.push(value);
		questionOptions = questionOptions;
		option = '';
	}
</script>

<Container>
	<div class="w-full mb-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4">
				<BackButton href={`/societies/${societyId}/courses/${courseId}/modules/${moduleId}`} />
			</div>
		</div>
	</div>
	<form
		method="POST"
		action="?/newQuestionnarie"
		use:enhance={() => {
			requesting = true;

			return async ({ update }) => {
				await update();
				requesting = false;
			};
		}}
	>
		<div
			class="mt-8 p-4 rounded-xl grid gap-6 mb-6 md:grid-cols-1"
			style="border: 1px solid #424148"
		>
			<Heading tag="h2">Adding a question to your module</Heading>
			<div>
				<Label for="question" class="mb-2">What's the question?</Label>
				<Input
					bind:value={question}
					name="question"
					disabled={requesting}
					type="text"
					id="question"
					placeholder="Write your question here"
					required
				/>
			</div>

			<form
				on:submit={(e) => {
					e.preventDefault();

					if (option) addOption(option);
				}}
			>
				<Label for="option" class="mb-2">What are the available options?</Label>
				<div class="w-full flex items-center gap-4">
					<Input
						bind:value={option}
						disabled={requesting}
						type="text"
						id="option"
						placeholder="Write your option here"
						required
					/>
					<Button class="rounded-full" type="submit">Add</Button>
				</div>
			</form>

			<div class="p-4 rounded-lg">
				<h3>Question: {question}</h3>
				{#each questionOptions as option}
					<input type="hidden" name={`options[]`} value={option} />
				{/each}

				{#each questionOptions as option, index}
					<div class="flex gap-2 mt-2">
						<Button
							on:click={() => {
								questionOptions = questionOptions.filter((_, i) => i !== index);
							}}
							color="red"
							outline
							size="xs"
							class="mr-4 p-0 px-2 rounded-xl">X</Button
						>
						<Radio
							on:select={(e) => {
								rightOption = e.target?.value;
							}}
							bind:value={questionOptions[index]}
							name={`rightAnswer`}>{option}</Radio
						>
					</div>
				{/each}
			</div>

			<Button disabled={requesting} type="submit" class="rounded-full">Submit</Button>

			{#if form?.error}
				<Alert color="red">
					{form.error}
				</Alert>
			{/if}
		</div>
	</form>
</Container>
