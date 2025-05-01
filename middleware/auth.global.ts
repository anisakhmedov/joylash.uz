export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token')?.value;
    if (!token && to.path !== '/register') {
        return navigateTo('/register');
    }
});