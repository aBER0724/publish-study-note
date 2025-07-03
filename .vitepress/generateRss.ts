import { Feed } from 'feed'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { readFileSync } from 'node:fs'

interface NoteFrontmatter {
  title?: string
  published?: string
  description?: string
  tags?: string[]
  category?: string
  author?: string
  draft?: boolean
}

export async function generateRSSFeed(config: any) {
  const baseUrl = 'https://blog.aberrrrrrr.space' // 根据你的Vercel项目名自动生成
  const siteTitle = "aBER's Study Note"
  const siteDescription = "Publish study notes and record some processes."
  
  const feed = new Feed({
    title: siteTitle,
    description: siteDescription,
    id: baseUrl,
    link: baseUrl,
    language: 'zh-CN',
    image: `${baseUrl}/favicon.ico`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `Copyright (c) ${new Date().getFullYear()}, aBER`,
    updated: new Date(),
    feedLinks: {
      rss2: `${baseUrl}/feed.xml`,
      json: `${baseUrl}/feed.json`,
      atom: `${baseUrl}/atom.xml`
    },
    author: {
      name: 'aBER',
      link: baseUrl
    }
  })

  // 查找所有markdown文件，排除根目录的指南文档
  const files = await fg(['Note/**/*.md', 'Record/**/*.md'], {
    cwd: resolve(__dirname, '../'),
    absolute: true,
    ignore: ['RSS-GUIDE.md', 'README.md', 'index.md']
  })

  const posts: Array<{
    title: string
    url: string
    date: Date
    excerpt: string
    content: string
    category?: string
    tags?: string[]
  }> = []

  // 处理每个文件
  for (const file of files) {
    try {
      const raw = readFileSync(file, 'utf-8')
      const { data: frontmatter, content } = matter(raw) as {
        data: NoteFrontmatter
        content: string
      }

      // 跳过草稿
      if (frontmatter.draft) continue

      // 生成URL路径
      const relativePath = file
        .replace(resolve(__dirname, '../'), '')
        .replace(/\.md$/, '')
        .replace(/\\/g, '/')

      const url = `${baseUrl}${relativePath}`
      
      // 提取摘要（前150个字符或description）
      const excerpt = frontmatter.description || 
        content.replace(/[#*`]/g, '').substring(0, 150) + '...'

      posts.push({
        title: frontmatter.title || relativePath.split('/').pop() || 'Untitled',
        url,
        date: frontmatter.published ? new Date(frontmatter.published) : new Date(),
        excerpt,
        content,
        category: frontmatter.category,
        tags: frontmatter.tags
      })
    } catch (error) {
      console.warn(`Error processing ${file}:`, error)
    }
  }

  // 按日期排序，最新的在前
  posts.sort((a, b) => b.date.getTime() - a.date.getTime())

  // 添加到RSS feed
  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.url,
      link: post.url,
      description: post.excerpt,
      content: post.content,
      author: [{
        name: 'aBER',
        link: baseUrl
      }],
      date: post.date,
      category: post.category ? [{ name: post.category }] : undefined,
      ...(post.tags && { 
        category: post.tags.map(tag => ({ name: tag }))
      })
    })
  })

  // 生成RSS文件
  const outDir = resolve(__dirname, '../.vitepress/dist')
  
  try {
    writeFileSync(resolve(outDir, 'feed.xml'), feed.rss2())
    writeFileSync(resolve(outDir, 'atom.xml'), feed.atom1())
    writeFileSync(resolve(outDir, 'feed.json'), feed.json1())
    
    console.log(`✅ RSS feeds generated successfully with ${posts.length} posts`)
  } catch (error) {
    console.error('Error writing RSS files:', error)
  }
} 