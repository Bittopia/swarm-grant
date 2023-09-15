<script lang="ts">
  import {enhance} from "$app/forms";
  import Container from "$lib/components/Container/Container.svelte";
  import {Alert, Button, Heading, Input, Label, Textarea} from "flowbite-svelte";
  import snarkdown from 'snarkdown'
  import MarkdownContent from "$lib/components/MarkdownContent/MarkdownContent.svelte";

  let requesting = false
  let form: { error: any } = { error: null }
  let content = ''
</script>

<Container class="mt-8">
    <section id="society-new">
        <Heading level="2" class="mb-4">New module for course XYZ</Heading>
        <!-- Define list of societies -->
        <section class="mt-10 grid gap-8 grid-cols-2">
            <section id="module-form">
                <form method="post" action="?/hello" use:enhance={() => {
                requesting = true

                return async ({ update }) => {
                    await update()
                    requesting = false
                }
          }}>
                    {#if form?.error}
                        <Alert color="red">
                            {form.error}
                        </Alert>
                    {/if}
                    <div class="w-full p-4 rounded-lg bg-slate-300 dark:bg-slate-700 grid gap-6 mb-6 md:grid-cols-1">
                        <div>
                            <Label for="name" class="mb-2">What's the module name?</Label>
                            <Input name="name" disabled={requesting} type="text" id="name" placeholder="Eg.: Introduction" required />
                        </div>
                        <div>
                            <Label for="description" class="mb-2">Give a description the module.</Label>
                            <Textarea rows="8" name="description" disabled={requesting} type="text" id="description" placeholder="Write your option here"/>
                        </div>
                        <div>
                            <Label for="content" class="mb-2">Write down the module content.</Label>
                            <Textarea bind:value={content} rows="20" name="content" disabled={requesting} type="text" id="content" placeholder="Module content in markdown"/>
                        </div>
                        <div class="flex items-center justify-end w-full gap-4">
                            <Button class="dark:bg-primary-200 hover:dark:bg-primary-300 text-primary-500" disabled={requesting} type="submit">Back to courses</Button>
                            <Button disabled={requesting} type="submit">Save</Button>
                        </div>
                    </div>
                </form>
            </section>
            <section>
                <Heading tag="h2" class="mb-8">Preview</Heading>
                {#if content}
                    <MarkdownContent content={snarkdown(content)} />
                {/if}
            </section>
        </section>
        <!-- End list of societies-->
    </section>
</Container>
