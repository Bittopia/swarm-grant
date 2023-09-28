<script lang="ts">
    import Container from "$lib/components/Container/Container.svelte";
    import {Button, Heading} from "flowbite-svelte";
    import SocietyBox from "$lib/components/SocietyBox/SocietyBox.svelte";
    import type {SocietyType} from "$lib/types/society";

    export let data: Record<string, SocietyType>
</script>

<Container class="mt-8">
<section id="society-list">
    <div class="w-full flex items-center justify-between">
        <Heading level="2" class="mb-4">Societies</Heading>
        <Button class="w-[200px]" as="a" href="/societies/new">New society</Button>
    </div>
    <!-- Define list of societies -->
    {#if data}
        <section class="mt-10 grid gap-4 grid-cols-4">
            {#each Object.keys(data) as societyId}
                <SocietyBox society={data[societyId]}></SocietyBox>
            {/each}
        </section>
    {:else}
        <p>No societies found</p>
    {/if}
    <!-- End list of societies-->
</section>
</Container>
