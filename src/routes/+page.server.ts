import {fail} from "@sveltejs/kit";
import societyService from "$lib/services/SocietyService";

export const load = async () => {
  return await societyService.all()
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
