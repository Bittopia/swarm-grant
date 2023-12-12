export const publicRoutes = [
	'/',
	'/auth',
	'/auth/nonce',
	'/auth/validate',
	'/societies/[societyId]',
	'/societies/[societyId]/courses/[courseId]',
	'/societies/[societyId]/courses/[courseId]/modules/[moduleId]',
	'/about'
];

export const isPublicPage = (pathname: string) => publicRoutes.includes(pathname);
