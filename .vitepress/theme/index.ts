// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import MetaInfo from './components/MetaInfo.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-before': () => h(MetaInfo)
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('MetaInfo', MetaInfo)
  }
} satisfies Theme
