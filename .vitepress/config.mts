import { defineConfig } from 'vitepress'
import { nav, sidebar } from './nav'
import mathjax3 from 'markdown-it-mathjax3'
import { generateRSSFeed } from './generateRss'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "aBER's Study Note",
  description: "Publish study notes and record some processes.",
  lastUpdated: true,
  cleanUrls: true,
  head: [
    // RSS feed links with enhanced readability support
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: '/feed.xml' }],
    ['link', { rel: 'alternate', type: 'application/atom+xml', title: 'Atom Feed', href: '/atom.xml' }],
    ['link', { rel: 'alternate', type: 'application/json', title: 'JSON Feed', href: '/feed.json' }],
    
    // Enhanced meta tags for better content discovery
    ['meta', { name: 'author', content: 'aBER' }],
    ['meta', { name: 'keywords', content: '学习笔记,线性代数,信息论,计算机网络,形式语言与自动机' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: "aBER's Study Note" }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    
    // RSS readability enhancements
    ['meta', { name: 'syndication-source', content: 'https://publish-study-note.vercel.app/feed.xml' }],
    ['meta', { name: 'feed-finder-verification', content: 'enabled' }]
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
      { icon: 'github', link: 'https://github.com/aBER0724/publish-study-note' },
      { 
        icon: { 
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.429 2.571c-.794 0-1.439.645-1.439 1.439v15.98c0 .794.645 1.439 1.439 1.439h17.143c.794 0 1.439-.645 1.439-1.439V4.01c0-.794-.645-1.439-1.439-1.439H3.429zm8.571 3.858c1.588 0 2.878 1.29 2.878 2.878s-1.29 2.878-2.878 2.878S9.122 10.895 9.122 9.307s1.29-2.878 2.878-2.878zM6.643 16.929v-1.439c0-1.588 1.29-2.878 2.878-2.878h5.758c1.588 0 2.878 1.29 2.878 2.878v1.439H6.643z"/></svg>' 
        }, 
        link: '/feed.xml', 
        ariaLabel: 'RSS订阅 - 支持完整内容阅读' 
      }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: '学习笔记分享 | RSS订阅支持',
      copyright: 'Copyright © 2025-present aBER'
    }
  }
})
