<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import BackButton from '$lib/components/BackButton.svelte';

	import Container from '$lib/components/Container/Container.svelte';
	import { Alert, Button, Heading, Input, Label, Textarea, Datepicker } from 'flowbite-svelte';
	const { societyId } = $page.params;

	let requesting = false;
	export let form;
</script>

<Container>
	<div class="w-full mb-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4">
				<BackButton href={`/societies/${societyId}`} />
			</div>
		</div>
	</div>
	<section id="society-new">
		<Heading level="2" class="mb-4">Update course</Heading>
		<section class="mt-10">
			<form
				method="post"
				action="?/editCourse"
				use:enhance={() => {
					requesting = true;

					return async ({ update }) => {
						await update();
						requesting = false;
					};
				}}
			>
				<div
					class="w-full mt-8 p-4 rounded-xl grid gap-6 mb-6 md:grid-cols-1"
					style="border: 1px solid #424148"
				>
					<Input type="hidden" name="id" value={$page.data.course.id} />
					<Input type="hidden" name="societyId" value={societyId} />
					<div>
						<Label for="name" class="mb-2">What's the course name?</Label>
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
						<Label for="description" class="mb-2">Give a description for your course.</Label>
						<Textarea
							class="resize-none"
							rows="8"
							name="description"
							disabled={requesting}
							type="text"
							id="description"
							placeholder="Write a description about your course"
							value={$page.data.course.description}
							required
						/>
					</div>
					<div>
						<Label for="startDate" class="mb-2">Course date</Label>
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
						<Label for="description" class="mb-2">Educator wallet address</Label>
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
						<Button disabled={requesting} type="submit" class="rounded-full px-8">Submit</Button>
					</div>
				</div>
			</form>
		</section>
		<!-- End list of societies-->
	</section>
</Container>
