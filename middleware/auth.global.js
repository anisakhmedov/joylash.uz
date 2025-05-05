export default defineNuxtRouteMiddleware((to, from) => {
    // Проверка только на клиенте (localStorage есть только в браузере)
    if (process.client) {
      const userId = localStorage.getItem("user")
  
      // Если нет userId и пользователь не на странице регистрации — редирект
      if (!userId && to.path !== '/register') {
        return navigateTo('/register')
    } 
    }
  })