import societyService from "$lib/services/SocietyService";
export async function load({ params }: never) {
  const { societyId, courseId } = params
  const societies = await societyService.all()
  if (societies[societyId] && societies[societyId as string].courses?.[courseId] && societies[societyId as string].courses?.[courseId].modules) {
    return societies[societyId as string].courses?.[courseId].modules
  }
  return {
    status: 404,
    error: new Error(`Course ${courseId} not found`)
  }
}
