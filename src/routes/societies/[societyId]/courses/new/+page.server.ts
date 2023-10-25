import {fail, redirect} from "@sveltejs/kit";
import type {CourseType} from "$lib/types/course";
import ObjectPathResolverUtil from "$lib/utils/ObjectPathResolver";
import courseRepository from "$lib/repository/CourseReporitory";

export const actions = {
  newCourse: async ({ request }: any) => {
    const [, societyId,] = ObjectPathResolverUtil.getObjectPathFromUrl(request.url) as string[]
    const data: FormData = await request?.formData()

    try {
      const course = (Object.fromEntries(data) as unknown) as CourseType
      await courseRepository.save({...course, societyId })
      redirect(301, `/societies/${societyId}`)
    } catch (error: any) {
      return fail(500, {
        description: data.get('description'),
        error: error.message
      })
    }
  }
}
