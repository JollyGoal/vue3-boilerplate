import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
} from 'vue-router'
import {
  SUPPORT_LOCALES,
  DEFAULT_LOCALE
} from './utils/constants'
import { 
  getBrowserLocale,
  setI18nLanguage,
  i18n
} from './i18n'
// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
// const pages = import.meta.glob('./pages/*.vue')

// const routes = Object.keys(pages).map((path) => {
//   const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase()
//   const nameLow = name.toLowerCase()
//   return {
//     path: nameLow === '/home' ? '/' : nameLow,
//     name: name,
//     component: pages[path], // () => import('./pages/*.vue')
//   }
// })

const routes = []

const childRoutes = [
  {
    path: '',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ './pages/Home.vue'),
    // children: [
    //   {
    //     path: 'about',
    //     name: 'About',
    //     component: () => import(/* webpackChunkName: "home" */ './pages/About.vue')
    //   }
    // ]
  },
  {
    path: 'about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ './pages/About.vue')
  },
  {
    path: 'external',
    name: 'External',
    component: () => import(/* webpackChunkName: "external" */ './pages/External.vue')
  },
  {
    path: 'store',
    name: 'Store',
    component: () => import(/* webpackChunkName: "store" */ './pages/Store.vue')
  },
]


const renameRoutes = (routes, locale) => {
  const newRoutes = []
  routes.forEach((route) => {
    newRoutes.push({
      ...route,
      name: `${locale}__${route.name}`,
      children: route.children ? renameRoutes(route.children, locale) : []
    })
  })
  return newRoutes
}

SUPPORT_LOCALES.forEach((locale) => {
  const localePath = locale === DEFAULT_LOCALE ? '' : `${locale}/`
  childRoutes.forEach((child) => {
    routes.push({
      ...child,
      name: `${locale}__${child.name}`,
      path: `/${localePath}${child.path}`,
      children: child.children ? renameRoutes(child.children, locale) : []
    })
  })
})

const beforeEach = async (to, from, next) => {
  // const { i18n } = useLanguage()
  if (!import.meta.env.SSR) {
    window?.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  let paramsLocale;
  SUPPORT_LOCALES.forEach((locale) => {
    const regex = new RegExp(`/${locale}/${locale.length + 1 === to.path.length ? `|/${locale}` : ''}`);
    let m;
    if ((m = regex.exec(to.path)) !== null) {
      paramsLocale = m[0].slice(1, locale.length + 1)
    }
  })

  paramsLocale = paramsLocale === undefined ? DEFAULT_LOCALE : paramsLocale

  // use locale if paramsLocale is not in SUPPORT_LOCALES
  if (!SUPPORT_LOCALES.includes(paramsLocale)) {
    const newLocale = getBrowserLocale()
    return next({
      name: `${newLocale}__Home`,
    })
  }

  // set i18n language
  await setI18nLanguage(i18n, paramsLocale)

  return next()
}

export function createRouter() {
  const router = _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR
      ? createMemoryHistory('/')
      : createWebHistory('/'),
    routes,
    beforeEach
  })
  router.beforeEach(beforeEach)
  return router
}
