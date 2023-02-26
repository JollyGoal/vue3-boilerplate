// import {i18n} from 'vue-i18n'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { SUPPORT_LOCALES } from './constants'


export const useLanguage = () => {
  const i18n = useI18n()
  const router = useRouter()
  const switchLanguage = async (inner = false) => {
    let defaultName
    const to = router.resolve({})
    SUPPORT_LOCALES.forEach((locale) => {
      if (to.name.slice(0, locale.length) === locale) {
        defaultName = to.name.slice(locale.length + 2, to.name.length)
      }
    })
    if (!defaultName) return

    if (!inner) {
      for (const lang in SUPPORT_LOCALES) {
        if (SUPPORT_LOCALES[lang] === i18n.locale.value) {
          let newLangId = parseInt(lang) + 1
          if (newLangId >= SUPPORT_LOCALES.length) {
            newLangId = 0
          }

          router.push({
            ...to,
            name: `${SUPPORT_LOCALES[newLangId]}__${defaultName}`
          })
        }
      }
    } else {
      router.push({
        ...to,
        name: `${inner}__${defaultName}`
      })
    }
  }

  const i18nRoute = (to) => {
    return {
      ...to,
      name: `${i18n.locale.value || i18n.locale}__${to.name}`,
    }
  }


  return { i18n, switchLanguage, SUPPORT_LOCALES, i18nRoute }
}