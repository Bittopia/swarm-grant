<script lang="ts">
	import { enhance } from '$app/forms';
	import Container from '$lib/components/Container/Container.svelte';
	import { Alert, Button, Heading, Input, Label, Textarea } from 'flowbite-svelte';
	import { modal } from '$lib/web3/modal';

	import { page } from '$app/stores';
	console.log({ page: $page });

	const user = $page.data.props.user;

	if (!user) {
		modal.open();
	}

	let requesting = false;
	let form: { error: any } = { error: null };
</script>

<Container class="mt-8">
	<section id="society-new">
		<Heading level="2" class="mb-4">New Society</Heading>
		<!-- Define list of societies -->
		<section class="mt-10">
			<form
				method="post"
				action="?/newSociety"
				use:enhance={() => {
					requesting = true;

					return async ({ update }) => {
						await update();
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
						<Label for="name" class="mb-2">What's the society name?</Label>
						<Input
							maxlength="25"
							name="name"
							disabled={requesting}
							type="text"
							id="name"
							placeholder="Eg.: Mathematics Society"
							required
						/>
					</div>
					<div>
						<Label for="description" class="mb-2">Give a description for your society.</Label>
						<Textarea
							class="resize-none"
							rows="8"
							name="description"
							disabled={requesting}
							type="text"
							id="description"
							placeholder="Write a description for your society"
						/>
					</div>
					<div class="flex items-center justify-end w-full gap-4">
						<Button
							as="a"
							href="/"
							class="dark:bg-primary-200 hover:dark:bg-primary-300 text-primary-500"
							disabled={requesting}
						>
							>Back to society list</Button
						>
						<Button disabled={requesting} type="submit">Submit</Button>
					</div>
				</div>
			</form>
		</section>
		<!-- End list of societies-->
	</section>
</Container>
