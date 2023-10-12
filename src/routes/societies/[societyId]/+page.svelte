<script lang="ts">
    import Container from "$lib/components/Container/Container.svelte";
    import type {SocietyType} from "$lib/types/society";
    import {Button} from "flowbite-svelte";
    import {page} from "$app/stores";

    export let data: SocietyType | null = null
    export let { societyId } = $page.params

    console.log(societyId)
</script>

<Container class="mt-8">
    {#if data}
        <div class="w-full">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <Button as="a" href="/" color="primary" size="sm" outline={true}>Back</Button>
                </div>
            </div>
        </div>
        <div class="w-full flex gap-8 mt-8">
            <div class="w-1/3">
                <section class="w-full bg-slate-700 p-8 rounded-lg">
                    <h1 class="text-3xl font-bold">{data.name}</h1>
                    <p class="text-gray-500 mt-4">{data.description}</p>
                </section>
            </div>
            <div class="w-2/3">
                <section class="w-full bg-slate-700 p-8 rounded-lg">
                    <div class="w-full flex items-center justify-between mb-8">
                        <h2 class="text-2xl font-bold">Courses</h2>
                        <Button as="a" href={`/societies/${societyId}/courses/new`} color="primary" size="sm">Add new course</Button>
                    </div>

                    {#if data.courses}
                        <section class="flex flex-col items-center gap-4">
                            {#each Object.keys(data.courses) as id}
                                <a class="w-full" href={`/societies/${data.id}/courses/${id}`}>
                                    <div class="w-full bg-slate-600 p-4 rounded-lg">
                                        <h3 class="text-xl font-bold">{data.courses[id].name}</h3>
                                        <p class="text-gray-500 mt-4">{data.courses[id].description}</p>
                                    </div>
                                </a>
                            {/each}
                        </section>
                    {:else}
                        <p class="w-full text-gray-500">No courses created yet.</p>
                    {/if}
                </section>
            </div>
        </div>
    {/if}
</Container>
