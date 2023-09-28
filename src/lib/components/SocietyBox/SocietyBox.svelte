<script lang="ts">
    import {Heading} from "flowbite-svelte";
    import type {SocietyType} from "$lib/types/society";

    export let society: SocietyType
</script>

<a href={`/societies/${society.id}`}>
    <div class="p-8 rounded-lg bg-slate-300 dark:bg-slate-700 hover:shadow-lg shadow-black transition-shadow">
        <Heading tag="h4">{society.name}</Heading>
        <p class="mt-4 line-clamp-3">{society.description}</p>
    </div>
</a>
