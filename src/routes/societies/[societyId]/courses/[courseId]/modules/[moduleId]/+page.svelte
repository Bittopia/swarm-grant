<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import {Alert, Button, Heading, Input, Label, Radio} from "flowbite-svelte";
  import { enhance } from "$app/forms";

  let requesting = false
  let form: {error: any}
  let question = ''
  let option = ''
  let questionOptions: string[] = []
  let rightOption = ''

  function addOption (value: string) {
    questionOptions.push(value)
    questionOptions = questionOptions
    option = ''
  }
</script>

<Container>
    {#if form?.error}
        <Alert color="red">
            {form.error}
        </Alert>
    {/if}
    <form method="post" action="?/hello" use:enhance={() => {
        requesting = true

        return async ({ update }) => {
            await update()
            requesting = false
        }
    }}>
        <div class="mt-8 p-4 rounded-lg bg-slate-500 grid gap-6 mb-6 md:grid-cols-1">
            <Heading class="text-white" tag="h2">Adding a question for Swarm module</Heading>
            <div>
                <Label for="question" class="mb-2">What's the question?</Label>
                <Input bind:value={question} name="question" disabled={requesting} type="text" id="question" placeholder="Write your question here" required />
            </div>
            <div>
                <Label for="option" class="mb-2">What are the available options?</Label>
                <div class="w-full flex items-center gap-4">
                    <Input bind:value={option} name="option" disabled={requesting} type="text" id="option" placeholder="Write your option here"/>
                    <Button on:click={() => addOption(option)}>Add</Button>
                </div>
            </div>

            <div class="p-4 rounded-lg bg-slate-300">
                <h3>Question: {question}</h3>
                {#each questionOptions as option}
                    <input type="hidden" name={`options[]`} value={option} />
                {/each}
                {#each questionOptions as option, index}
                    <div>
                        <Radio on:select={(e) => { rightOption = e.target?.value }} bind:value={questionOptions[index]} name={`rightAnswer`}>{option}</Radio>
                    </div>
                {/each}
            </div>

            <Button disabled={requesting} type="submit">Submit</Button>
        </div>
    </form>
</Container>
