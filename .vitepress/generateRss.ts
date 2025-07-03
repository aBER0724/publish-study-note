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

// 清理和转换内容为适合RSS的格式
function cleanContent(content: string): { excerpt: string; cleanContent: string } {
  // 移除frontmatter分隔符
  let cleaned = content.replace(/^---[\s\S]*?---/, '').trim()
  
  // 处理数学公式 - 将LaTeX转换为文本说明
  cleaned = cleaned.replace(/\$\$[\s\S]*?\$\$/g, '[数学公式]')
  cleaned = cleaned.replace(/\$[^$]*?\$/g, '[公式]')
  
  // 移除markdown语法但保留内容结构
  cleaned = cleaned
    .replace(/#+\s/g, '') // 移除标题标记
    .replace(/\*\*([^*]+)\*\*/g, '$1') // 移除加粗标记
    .replace(/\*([^*]+)\*/g, '$1') // 移除斜体标记
    .replace(/`([^`]+)`/g, '$1') // 移除代码标记
    .replace(/```[\s\S]*?```/g, '[代码块]') // 替换代码块
    .replace(/!\[.*?\]\([^)]+\)/g, '[图片]') // 替换图片
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接标记保留文本
    .replace(/>\s/g, '') // 移除引用标记
    .replace(/\|.*?\|/g, '') // 移除表格
    .replace(/[-*+]\s/g, '') // 移除列表标记
    .replace(/\d+\.\s/g, '') // 移除有序列表标记
  
  // 清理多余的空白字符
  cleaned = cleaned
    .replace(/\n{3,}/g, '\n\n') // 最多保留两个换行
    .replace(/\s{2,}/g, ' ') // 多个空格合并为一个
    .trim()
  
  // 生成摘要（前200个字符）
  const excerpt = cleaned.substring(0, 200).trim()
  const finalExcerpt = excerpt.length < cleaned.length ? excerpt + '...' : excerpt
  
  // 返回适合RSS的HTML内容（简单的段落分割）
  const htmlContent = cleaned
    .split('\n\n')
    .filter(para => para.trim())
    .map(para => `<p>${para.trim()}</p>`)
    .join('\n')
  
  return {
    excerpt: finalExcerpt,
    cleanContent: htmlContent || '<p>内容正在处理中...</p>'
  }
}

export async function generateRSSFeed(config: any) {
  const baseUrl = 'https://publish-study-note.vercel.app' // 根据你的Vercel项目名自动生成
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
      
      // 清理和处理内容
      const { excerpt, cleanContent } = cleanContent(content)
      
      // 使用frontmatter的描述或生成的摘要
      const finalExcerpt = frontmatter.description || excerpt

      posts.push({
        title: frontmatter.title || relativePath.split('/').pop()?.replace(/^\d+x\d+-/, '') || 'Untitled',
        url,
        date: frontmatter.published ? new Date(frontmatter.published) : new Date(),
        excerpt: finalExcerpt,
        content: cleanContent,
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
    posts.forEach(post => {
      console.log(`  📄 ${post.title} (${post.date.toISOString().split('T')[0]})`)
    })
  } catch (error) {
    console.error('❌ Error writing RSS files:', error)
  }
} 