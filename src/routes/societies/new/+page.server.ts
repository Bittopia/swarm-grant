import {fail, redirect} from "@sveltejs/kit";
import type {SocietyType} from "$lib/types/society";
import societyService from "$lib/services/SocietyService";

export const actions = {
  newSociety: async ({ request }: any) => {
    await new Promise((fulfil) => setTimeout(fulfil, 1000))
    const data: FormData = await request?.formData()

    try {
      const society = (Object.fromEntries(data) as unknown) as SocietyType
      await societyService.save(society)
      redirect(301, `/`)
    } catch (error: any) {
      return fail(500, {
        description: data.get('description'),
        error: error.message
      })
    }
  }
}
