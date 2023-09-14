<script lang="ts">
    let className = ''
    export { className as class }
</script>

<section class={"w-full"}>
    <div class={["max-w-[1200px] w-full mx-auto", className].join(" ")}>
        <slot></slot>
    </div>
</section>
