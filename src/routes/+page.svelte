<script>
    import Container from "$lib/components/Container/Container.svelte";
    import {Heading} from "flowbite-svelte";
    import SocietyBox from "$lib/components/SocietyBox/SocietyBox.svelte";
</script>

<Container class="mt-8">
<section id="society-list">
    <Heading level="2" class="mb-4">Societies</Heading>
    <!-- Define list of societies -->
    <section class="mt-10 grid gap-4 grid-cols-4">
        <SocietyBox />
        <SocietyBox />
        <SocietyBox />
        <SocietyBox />
        <SocietyBox />
        <SocietyBox />
        <SocietyBox />
        <SocietyBox />
        <SocietyBox />
        <SocietyBox />
        <SocietyBox />
        <SocietyBox />
    </section>
    <!-- End list of societies-->
</section>
</Container>
