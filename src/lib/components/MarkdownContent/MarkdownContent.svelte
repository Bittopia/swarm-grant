<script lang="ts">
    import snarkdown from "snarkdown";
    export let content: string
</script>

<section id="module-content">
    {@html snarkdown(content)}
</section>

<style>
    @import "$lib/styles/markdown_modest.scss";
</style>
