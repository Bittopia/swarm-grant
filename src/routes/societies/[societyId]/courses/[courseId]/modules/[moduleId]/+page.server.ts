import ModuleRepository from '$lib/repository/ModuleRepository';

export async function load({ params }: never) {
	const { societyId, courseId, moduleId } = params;

	const module = await ModuleRepository.get(societyId, courseId, moduleId);

	if (module) {
		return module;
	}

	return {
		status: 404,
		error: new Error(`Module with id ${moduleId} not found`)
	};
}
