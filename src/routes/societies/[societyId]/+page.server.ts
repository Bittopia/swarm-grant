import societyService from "$lib/services/SocietyService";
export async function load({ params }: never) {
  const { societyId } = params
  const societies = await societyService.all()
  if (societies[societyId]) {
    return societies[societyId]
  }
  return {
    status: 404,
    error: new Error(`Society ${societyId} not found`)
  }
}
