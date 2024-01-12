<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte';
	import { page } from '$app/stores';
	import { Alert, Button, DropdownDivider, Radio, Spinner } from 'flowbite-svelte';
	import snarkdown from 'snarkdown';
	import MarkdownContent from '$lib/components/MarkdownContent/MarkdownContent.svelte';
	import { toggleSociety } from '$lib/utils/society';
	import BackButton from '$lib/components/BackButton.svelte';
	import { CirclePlusOutline } from 'flowbite-svelte-icons';

	export let data;
	export let { societyId, courseId, moduleId } = $page.params;

	const module = data.module;
	const canAddQuestions = data.canAddQuestions;

	const questions = module?.questions;

	let answers: Record<string, string> = {};
	let questionnarieError = '';
	let incorrectAnswers: Record<string, string> = {};
	let correctAnswers: Record<string, string> = {};
	let joinSocietyLoading = false;

	function onQuestionnarieSubmit() {
		questionnarieError = '';
		correctAnswers = {};

		if (!$page.data.isMemberOfSociety) return;

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
						<BackButton href={`/societies/${societyId}/courses/${courseId}`} />
					</div>
				</div>
			</div>
			<div class="w-full flex gap-8 mt-8">
				<div class="w-full">
					<section class="w-full p-12 rounded-xl" style="border: 1px solid #424148">
						<div class="w-full flex items-center justify-between">
							<h1 class="text-slate-900 dark:text-white text-3xl font-bold">{module?.name}</h1>
							{#if canAddQuestions}
								<Button
									as="a"
									href={`/societies/${societyId}/courses/${courseId}/modules/${module?.id}/questions/new`}
									color="primary"
									size="sm"
									class="rounded-full"
								>
									<div class="flex gap-2 items-center">
										<CirclePlusOutline />
										<span>Add questions</span>
									</div>
								</Button>
							{/if}
						</div>
						<p class="text-slate-700 dark:text-gray-500 mt-4 mb-8">{module?.description}</p>

						{#if module?.content}
							<section class="flex flex-col items-center gap-4 text-slate-700 dark:text-white">
								<MarkdownContent content={snarkdown(module?.content)} />
							</section>
						{:else}
							<p class="w-full text-slate-700 dark:text-gray-500">No content created yet.</p>
						{/if}
					</section>
				</div>
			</div>
		{/if}
	</Container>

	{#if questions}
		<Container class="mt-8 relative">
			<h1 class="text-xl">Questionnarie</h1>
			{#if !$page.data?.isMemberOfSociety}
				<div
					class="absolute w-full h-full backdrop-blur-xs flex flex-col items-center justify-center gap-4"
				>
					<h2>You need to join society to be able to do this</h2>
					<Button
						disabled={joinSocietyLoading}
						on:click={async () => {
							try {
								joinSocietyLoading = true;
								await toggleSociety({
									societyId,
									alreadyMember: $page.data?.isMemberOfSociety,
									user: $page.data?.user
								});
							} catch (error) {
								console.log(error);
							} finally {
								joinSocietyLoading = false;
							}
						}}
					>
						{#if joinSocietyLoading}
							<Spinner />
						{:else}
							Join Society
						{/if}
					</Button>
				</div>
			{/if}
			<section class="w-full p-8 rounded-xl mt-4" style="border: 1px solid #424148">
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
