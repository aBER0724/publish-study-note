import { defineConfig } from 'vitepress'
import { nav, sidebar } from './nav'
import mathjax3 from 'markdown-it-mathjax3'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "aBER's Study Note",
  description: "Publish study notes and record some processes.",
  lastUpdated: true,
  markdown: {
    config: (md) => {
      md.use(mathjax3)
    },
  },
  vue: {
    template: {
      compilerOptions: {
        // 将MathJax的自定义元素视为自定义元素
        isCustomElement: (tag) => tag.startsWith('mjx-')
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    sidebar: sidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
