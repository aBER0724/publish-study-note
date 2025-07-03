import { defineConfig } from 'vitepress'
import { nav, sidebar } from './nav'
import mathjax3 from 'markdown-it-mathjax3'
import { generateRSSFeed } from './generateRss'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "aBER's Study Note",
  description: "Publish study notes and record some processes.",
  lastUpdated: true,
  head: [
    // RSS feed links
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: '/feed.xml' }],
    ['link', { rel: 'alternate', type: 'application/atom+xml', title: 'Atom Feed', href: '/atom.xml' }],
    ['link', { rel: 'alternate', type: 'application/json', title: 'JSON Feed', href: '/feed.json' }]
  ],
  buildEnd: async (config) => {
    await generateRSSFeed(config)
  },
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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0zm9-7a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/><circle cx="12" cy="12" r="2"/></svg>' }, link: '/feed.xml', ariaLabel: 'RSS Feed' }
    ]
  }
})
