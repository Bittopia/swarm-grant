<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte';
	import { page } from '$app/stores';
	import { Alert, Button, DropdownDivider, Radio } from 'flowbite-svelte';
	import snarkdown from 'snarkdown';
	import MarkdownContent from '$lib/components/MarkdownContent/MarkdownContent.svelte';

	export let data;
	export let { societyId, courseId, moduleId } = $page.params;

	const module = data.module;
	const canAddQuestions = data.canAddQuestions;

	const questions = module?.questions;

	let answers: Record<string, string> = {};
	let questionnarieError = '';
	let incorrectAnswers: Record<string, string> = {};
	let correctAnswers: Record<string, string> = {};

	function onQuestionnarieSubmit() {
		questionnarieError = '';
		correctAnswers = {};

		if (!questions) return;

		if (questions && Object.keys(answers).length !== Object.keys(questions).length) {
			questionnarieError = 'Please answer all questions.';
			return;
		}

		for (const [key, value] of Object.entries(answers)) {
			if (questions[key].rightOption !== value) {
				incorrectAnswers[key] = questions[key].rightOption;
			} else {
				correctAnswers[key] = questions[key].rightOption;
			}
		}
	}

	function handleAnswerSelection(id: string, value: string) {
		answers[id] = value;
	}
</script>

<Container>
	<Container>
		{#if data}
			<div class="w-full">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-4">
						<Button
							as="a"
							href={`/societies/${societyId}/courses/${courseId}`}
							color="primary"
							size="sm"
							outline={true}>Back</Button
						>
					</div>
				</div>
			</div>
			<div class="w-full flex gap-8 mt-8">
				<div class="w-full">
					<section class="w-full bg-slate-700 p-8 rounded-lg">
						<div class="w-full flex items-center justify-between">
							<h1 class="text-3xl font-bold">{module?.name}</h1>
							{#if canAddQuestions}
								<Button
									as="a"
									href={`/societies/${societyId}/courses/${courseId}/modules/${module?.id}/questions/new`}
									color="primary"
									size="sm">Add questions</Button
								>
							{/if}
						</div>
						<p class="text-gray-500 mt-4 mb-8">{module?.description}</p>

						{#if module?.content}
							<section class="flex flex-col items-center gap-4">
								<MarkdownContent content={snarkdown(module?.content)} />
							</section>
						{:else}
							<p class="w-full text-gray-500">No content created yet.</p>
						{/if}
					</section>
				</div>
			</div>
		{/if}
	</Container>

	{#if questions}
		<Container class="mt-8">
			<h1 class="text-xl">Questionnarie</h1>
			<section class="w-full bg-slate-700 p-8 rounded-lg mt-4">
				{#each Object.keys(questions) as id}
					<Container>
						<h3>- {questions[id].question}</h3>

						<div class="flex flex-col gap-2 mt-4">
							{#each questions[id].questionOptions as option}
								<Radio
									name={id}
									value={option}
									label={option}
									on:click={() => handleAnswerSelection(id, option)}
								>
									<span
										class={incorrectAnswers[id] === option || correctAnswers[id] === option
											? 'text-green-500'
											: incorrectAnswers[id]
											? 'text-red-500'
											: ''}
									>
										{option}
									</span></Radio
								>
							{/each}
						</div>
					</Container>
					<DropdownDivider class="my-6" />
				{/each}

				{#if questionnarieError}
					<Alert color="red" class="my-4">{questionnarieError}</Alert>
				{/if}
				<Button on:click={onQuestionnarieSubmit}>Submit</Button>
			</section>
		</Container>
	{/if}
</Container>
