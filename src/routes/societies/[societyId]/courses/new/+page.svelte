<script lang="ts">
	import { base } from '$app/paths';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import Container from '$lib/components/Container/Container.svelte';
	import { Alert, Button, Heading, Input, Label, Textarea, Datepicker } from 'flowbite-svelte';

	let requesting = false;
	export let form;
</script>

<Container class="mt-8">
	<section id="society-new">
		<Heading level="2" class="mb-4">New course</Heading>
		<section class="mt-10">
			<form
				method="post"
				action="?/newCourse"
				use:enhance={() => {
					requesting = true;

					return async ({ update, result }) => {
						await update();
						if (result?.data?.success) {
							goto(`/societies/${$page.params.societyId}`);
						}
						requesting = false;
					};
				}}
			>
				{#if form?.error}
					<Alert color="red">
						{form.error}
					</Alert>
				{/if}
				<div
					class="w-full mt-8 p-4 rounded-lg bg-slate-300 dark:bg-slate-700 grid gap-6 mb-6 md:grid-cols-1"
				>
					<div>
						<Label for="name" class="mb-2">What's the course name?</Label>
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
						<Label for="description" class="mb-2">Give a description for your course.</Label>
						<Textarea
							class="resize-none"
							rows="8"
							name="description"
							disabled={requesting}
							type="text"
							id="description"
							placeholder="Write a description about your course"
						/>
					</div>
					<div>
						<Label for="startDate" class="mb-2">Course date</Label>
						<Datepicker name="startDate" datepickerOrientation="top" required />
					</div>
					<div>
						<Label for="description" class="mb-2">Educator wallet address</Label>
						<Input
							id="wallet-address"
							name="educator"
							disabled={requesting}
							type="text"
							placeholder="Wallet address"
							required
						/>
					</div>
					<div class="flex items-center justify-end w-full gap-4">
						<Button
							class="dark:bg-primary-200 hover:dark:bg-primary-300 text-primary-500"
							disabled={requesting}
							on:click={() => goto(`/societies/${$page.params.societyId}`)}
							>Back to courses list</Button
						>
						<Button disabled={requesting} type="submit">Submit</Button>
					</div>
				</div>
			</form>
		</section>
		<!-- End list of societies-->
	</section>
</Container>
