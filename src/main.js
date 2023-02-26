import { createPinia } from 'pinia'
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { i18n } from './i18n'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App)
  
  // i18n config
  const i18nRoute = (to) => {
    return {
      ...to,
      name: `${i18n.global.locale.value || i18n.global.locale}__${to.name}`,
    }
  }
  app.config.globalProperties.$i18nRoute = i18nRoute
  app.use(i18n)
  // i18n config end
  
  app.config.globalProperties.$scrollToTop = (behavior = 'auto') => window?.scrollTo({ top: 0, behavior });
  const pinia = createPinia()
  app.use(pinia)
  const router = createRouter()
  app.use(router)
  return { app, router }
}
