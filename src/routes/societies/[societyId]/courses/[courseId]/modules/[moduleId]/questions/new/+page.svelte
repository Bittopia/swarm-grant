<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte';
	import { Alert, Button, Heading, Input, Label, Radio } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
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
	{#if form?.error}
		<Alert color="red">
			{form.error}
		</Alert>
	{/if}
	<div class="w-full mb-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4">
				<Button
					as="a"
					href={`/societies/${societyId}/courses/${courseId}/modules/${moduleId}`}
					color="primary"
					size="sm"
					outline={true}>Back</Button
				>
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
		<div class="mt-8 p-4 rounded-lg bg-slate-700 grid gap-6 mb-6 md:grid-cols-1">
			<Heading class="text-white" tag="h2">Adding a question for Swarm module</Heading>
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
			<div>
				<Label for="option" class="mb-2">What are the available options?</Label>
				<div class="w-full flex items-center gap-4">
					<Input
						bind:value={option}
						disabled={requesting}
						type="text"
						id="option"
						placeholder="Write your option here"
					/>
					<Button
						on:click={() => {
							if (option) addOption(option);
						}}>Add</Button
					>
				</div>
			</div>

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
							size="xs"
							class="p-0 px-1">X</Button
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

			<Button disabled={requesting} type="submit">Submit</Button>
		</div>
	</form>
</Container>
