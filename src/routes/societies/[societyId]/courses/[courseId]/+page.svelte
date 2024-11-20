<script lang="ts">
	import Container from '$lib/components/Container/Container.svelte';
	import { page } from '$app/stores';
	import { Avatar, Button, Spinner } from 'flowbite-svelte';
	import ProfilePopover from '$lib/components/ProfilePopover/ProfilePopover.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import { CirclePlusOutline } from 'flowbite-svelte-icons';
	import { Badge } from 'flowbite-svelte';
	import { toggleCourseEnroll } from '$lib/utils/course.js';
	import DotsMenu from '$lib/components/DotsMenu.svelte';

	export let data;
	export let { societyId, courseId } = $page.params;

	let joinLoading = false;

	$: course = data.course;
	$: canCreateModules = data.canCreateModules;
	$: members = course?.users ?? [];
	$: isMemberOfSociety = data.isMemberOfSociety;
</script>

<Container>
	{#if course}
		<div class="w-full">
			<div class="flex flex-col md:flex-row items-center justify-between">
				<div class="flex items-center gap-4">
					<BackButton href={`/societies/${societyId}`} />
				</div>
			</div>
		</div>

		<!-- Responsive Layout -->
		<div class="w-full flex flex-col md:flex-row gap-8 mt-16">
			<!-- Sidebar Section -->
			<div class="w-full md:w-1/3">
				<section class="w-full p-8 rounded-xl relative" id="module" style="background: #fff;">
					{#if data.canEditCourse}
						<DotsMenu
							editHref={`${$page.url.pathname}/edit`}
							onDelete={() => console.log('delete')}
						/>
					{/if}
					{#if course.image}
						<div class="my-4">
							<Avatar
								src={course.image}
								alt="Society image"
								size="xl"
								class="w-full rounded-xl h-48 object-cover aspect-[4/3]"
							/>
						</div>
					{/if}

					<h1 class="text-slate-950 dark:text-white text-3xl font-bold mt-8">{course.name}</h1>
					<p class="text-slate-800 dark:text-gray-500 mt-4">{course.description}</p>
					<p class="text-slate-800 dark:text-gray-500 mt-4">Start Date: {course.startDate}</p>

					<div class="flex gap-4 mt-8 mb-6">
						<span class="text-slate-800 dark:text-gray-500">Educator: </span>
						<ProfilePopover
							triggeredBy={`educator-${course.id}-${course.educator}`}
							avatar={course.educator_user?.avatar}
							name={course.educator_user?.name}
							web3Address={course.educator}
						/>
					</div>
					<div class="flex flex-col gap-4 mt-2">
						<span class="text-slate-800 dark:text-gray-500">
							Members <Badge color="dark">{members?.length ?? 0}</Badge>
						</span>
						<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2 w-max">
							{#each members.slice(0, 9) as member}
								<ProfilePopover
									triggeredBy={`member-${course.id}-${member?.web3Address}`}
									name={member?.name}
									web3Address={member?.web3Address}
									avatar={member?.avatar}
									showName={false}
									size="sm"
								/>
							{/each}

							{#if members?.length >= 9}
								<span class="mt-auto underline text-primary-500 cursor-pointer">
									{members.length - 9} more
								</span>
							{/if}
						</div>

						{#if isMemberOfSociety}
							<div class="flex justify-center mt-4 mb-8 cta-blue">
								<Button
									class="mt-8 max-w-full px-10 text-md rounded-full {data?.isMember ? '' : 'enroll'}"
									disabled={joinLoading}
									on:click={async () => {
										try {
											joinLoading = true;
											if (course != null) {
												await toggleCourseEnroll({
													user: data?.user,
													societyId,
													courseId: course.id,
													alreadyMember: data?.isMember ?? false
												});
											}
										} catch (error) {
											console.log(
												'[LS] -> src/routes/societies/[societyId]/courses/[courseId]/+page.svelte:106 -> error: ',
												error
											);
										} finally {
											joinLoading = false;
										}
									}}
								>
									{#if joinLoading}
										<Spinner />
									{:else if data.isMember}
										Opt Out
									{:else}
										Get Started
									{/if}
								</Button>
							</div>
						{/if}
					</div>
				</section>
			</div>

			<!-- Main Content Section -->
			<div class="w-full md:w-2/3">
				<section class="w-full p-8 rounded-lg">
					<div class="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
						<h2 class="text-slate-900 dark:text-white text-3xl mb-4 font-bold">🗂️ Modules</h2>
						{#if canCreateModules}
							<Button
								as="a"
								href={`/societies/${societyId}/courses/${courseId}/modules/new`}
								color="primary"
								size="sm"
								class="rounded-full"
							>
								<div class="flex gap-2 items-center">
									<CirclePlusOutline />
									<span>Add new module</span>
								</div>
							</Button>
						{/if}
					</div>

					{#if course.modules && Object.keys(course.modules).length > 0}
						<section class="flex flex-col items-center gap-4">
							{#each Object.keys(course.modules) as id}
								<a
									class="w-full p-1 rounded-xl relative"
									href={`/societies/${societyId}/courses/${courseId}/modules/${id}`}
									id="module" style="background: #fff;">
									{#if course.creator === data.user?.web3Address}
										<DotsMenu
											editHref={`/societies/${societyId}/courses/${courseId}/modules/${id}/edit`}
										/>
									{/if}

									<div class="flex flex-col md:flex-row w-full gap-4 p-8 rounded-lg md:justify-start">
										<div class="flex justify-start md:w-1/3">
											{#if course.modules[id].image}
												<img
													src={course.modules[id].image + '?img-format=webp'}
													alt="Module banner"
													class="w-full h-auto object-cover rounded-lg aspect-[4/3]"
												/>
											{:else}
												<div class="w-full h-32 bg-slate-900 rounded-lg aspect-[4/3]" />
											{/if}
										</div>

										<div class="text-left ml-4 md:w-2/3">
											<h3 class="text-slate-900 dark:text-white mb-4 text-2xl font-bold">
												{course.modules[id].name}
											</h3>
											<p class="text-slate-700 dark:text-gray-500 mt-4 mb-4">
												{course.modules[id].description}
											</p>
										</div>
									</div>
								</a>
							{/each}
						</section>
					{:else}
						<p class="w-full text-slate-700 dark:text-gray-500">No modules created yet.</p>
					{/if}
				</section>
			</div>
		</div>
	{/if}
</Container>
