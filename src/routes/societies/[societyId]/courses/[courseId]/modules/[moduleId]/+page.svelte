<script lang="ts">
  import Container from "$lib/components/Container/Container.svelte";
  import {page} from "$app/stores";
  import type {ModuleType} from "$lib/types/module";
  import {Button} from "flowbite-svelte";
  import snarkdown from "snarkdown";
  import MarkdownContent from "$lib/components/MarkdownContent/MarkdownContent.svelte";

  export let data: ModuleType | null = null
  export let { societyId, courseId, moduleId } = $page.params
</script>

<Container class="mt-8">
    {#if data}
        <div class="w-full">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <Button as="a" href={`/societies/${societyId}/courses/${courseId}`} color="primary" size="sm" outline={true}>Back</Button>
                </div>
            </div>
        </div>
        <div class="w-full flex gap-8 mt-8">
            <div class="w-full">
                <section class="w-full bg-slate-700 p-8 rounded-lg">
                    <div class="w-full flex items-center justify-between">
                        <h1 class="text-3xl font-bold">{data.name}</h1>
                        <Button as="a" href={`/societies/${societyId}/courses/${courseId}/modules/${data.id}/questions/new`} color="primary" size="sm">Add questions</Button>
                    </div>
                    <p class="text-gray-500 mt-4 mb-8">{data.description}</p>

                    {#if data.content}
                        <section class="flex flex-col items-center gap-4">
                            <MarkdownContent content={snarkdown(data.content)} />
                        </section>
                    {:else}
                        <p class="w-full text-gray-500">No content created yet.</p>
                    {/if}
                </section>
            </div>
        </div>
    {/if}
</Container>
