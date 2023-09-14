<script lang="ts">
    let className = ''
    export { className as class }
</script>

<section class={"w-full"}>
    <div class={["container mx-auto", className].join(" ")}>
        <slot></slot>
    </div>
</section>
