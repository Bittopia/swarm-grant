import {fail} from "@sveltejs/kit";
import ObjectPathResolverUtil from "$lib/utils/ObjectPathResolver";
import type {ModuleType} from "$lib/types/module";
import moduleRepository from "$lib/repository/ModuleRepository";

export const actions = {
  newModule: async ({ request }: any) => {
    const [, societyId, ,courseId] = ObjectPathResolverUtil.getObjectPathFromUrl(request.url) as string[]

    const data: FormData = await request?.formData()

    try {
      const module = (Object.fromEntries(data) as unknown) as ModuleType
      await moduleRepository.save({...module, societyId, courseId })
      return {
        status: 302,
        redirect: `/societies/${societyId}/courses/${courseId}`
      }
    } catch (error: any) {
      return fail(500, {
        description: data.get('description'),
        error: error.message
      })
    }
  }
}
