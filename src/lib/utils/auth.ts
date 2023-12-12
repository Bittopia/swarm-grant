export const isAuthenticated = (locals: App.Locals) => {
	return locals.jwt !== undefined;
};
