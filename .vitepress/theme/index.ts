// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import MetaInfo from './components/MetaInfo.vue'
import { inject } from '@vercel/analytics'

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
    
    // 初始化 Vercel Analytics
    if (typeof window !== 'undefined') {
      inject()
    }
  }
} satisfies Theme
