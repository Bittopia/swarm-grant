import {fail} from "@sveltejs/kit";

export const load = () => {
  return { title: 'Something healer' }
}

export const actions = {
  hello: async ({ request }: any) => {
    await new Promise((fulfil) => setTimeout(fulfil, 1000))
    const data: FormData = await request?.formData()

    try {
      console.log(request.body)
      console.log(Object.fromEntries(data))
    } catch (error: any) {
      return fail(500, {
        description: data.get('description'),
        error: error.message
      })
    }
  }
}