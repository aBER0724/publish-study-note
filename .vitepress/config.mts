import { defineConfig } from 'vitepress'
import { nav, sidebar } from './nav'
import mathjax3 from 'markdown-it-mathjax3'
import { generateRSSFeed } from './generateRss'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "aBER's Study Note",
  description: "Publish study notes and record some processes.",
  lastUpdated: true,
  cleanUrls: true,
  head: [
    // Favicon配置 - 使用URL
    ['link', { rel: 'icon', type: 'image/jpeg', href: 'https://imgbed.aberrrrrrr.space/file/1749883355977_5B703F00-1A9F-4C08-8D33-81040E00AAC7_1_105_c.jpeg' }],
    ['link', { rel: 'apple-touch-icon', href: 'https://imgbed.aberrrrrrr.space/file/1749883355977_5B703F00-1A9F-4C08-8D33-81040E00AAC7_1_105_c.jpeg' }],
    
    // RSS feed links with enhanced readability support
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: '/feed.xml' }],
    ['link', { rel: 'alternate', type: 'application/atom+xml', title: 'Atom Feed', href: '/atom.xml' }],
    ['link', { rel: 'alternate', type: 'application/json', title: 'JSON Feed', href: '/feed.json' }],
    
    // Enhanced meta tags for better content discovery
    ['meta', { name: 'author', content: 'aBER' }],
    ['meta', { name: 'keywords', content: '学习笔记,线性代数,信息论,计算机网络,形式语言与自动机' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: "aBER's Study Note" }],
    ['meta', { property: 'og:url', content: 'https://publish-study-note.vercel.app' }],
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
      md.use(mathjax3);
      md.use(MermaidMarkdown);
    },
  },
  vite: {
    publicDir: 'public',
    plugins: [MermaidPlugin()],
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
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
          svg: '<svg fill="#FFA500" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>RSS</title><path d="M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415c1.814 0 3.293 1.479 3.293 3.295 0 1.813-1.485 3.29-3.301 3.29C1.47 24 0 22.526 0 20.71s1.475-3.294 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z"/></svg>' 
        }, 
        link: '/feed.xml', 
        ariaLabel: 'RSS订阅 - 支持完整内容阅读' 
      }
    ],

    outline: {
      level: 'deep',
      label: '本页大纲'
    },

    search: {
      provider: 'local'
    },

    footer: {
      message: '学习笔记分享 | RSS订阅支持',
      copyright: 'Copyright © 2025-present aBER'
    }
  }
})
