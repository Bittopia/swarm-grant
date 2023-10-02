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
                <h1 class="text-3xl font-bold">{data.name}</h1>
                <div class="flex items-center gap-4">
                    <Button as="a" href="/societies" color="primary" size="sm" outline={true}>Back</Button>
                    <Button as="a" href={`/societies/${societyId}/courses/new`} color="primary" size="sm">Add new course</Button>
                </div>
            </div>
            <div>
                <p class="text-gray-500 mt-4">{data.description}</p>
            </div>
        </div>
    {/if}
</Container>
