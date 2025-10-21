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

// 改进的内容处理函数, 支持readability
function processContentForReadability(content: string, frontmatter: NoteFrontmatter): { 
  excerpt: string; 
  fullContent: string; 
  textContent: string 
} {
  // 移除frontmatter分隔符
  let cleaned = content.replace(/^---[\s\S]*?---/, '').trim()
  
  // 保存原始内容用于完整显示
  let fullHtmlContent = cleaned
  
  // 将Markdown转换为更好的HTML格式
  fullHtmlContent = fullHtmlContent
    // 处理标题
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // 处理加粗和斜体
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // 处理行内代码
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 处理代码块
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    // 处理引用
    .replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>')
    // 处理链接
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // 处理图片
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    // 处理列表
    .replace(/^[-*+] (.*)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    // 处理数学公式 - 保留但添加说明
    .replace(/\$\$([\s\S]*?)\$\$/g, '<div class="math-formula" title="数学公式">$$1$$</div>')
    .replace(/\$([^$]*?)\$/g, '<span class="math-inline" title="数学公式">$$$1$$</span>')
  
  // 转换段落
  const paragraphs = fullHtmlContent.split('\n\n').filter(p => p.trim())
  fullHtmlContent = paragraphs.map(p => {
    p = p.trim()
    // 如果已经是HTML标签, 保持不变
    if (p.startsWith('<') && p.endsWith('>')) {
      return p
    }
    // 否则包装成段落
    return `<p>${p}</p>`
  }).join('\n')
  
  // 生成纯文本内容用于摘要
  let textContent = cleaned
    .replace(/```[\s\S]*?```/g, '[代码块]')
    .replace(/\$\$[\s\S]*?\$\$/g, '[数学公式]')
    .replace(/\$[^$]*?\$/g, '[公式]')
    .replace(/#+\s/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[.*?\]\([^)]+\)/g, '[图片]')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/>\s/g, '')
    .replace(/\|.*?\|/g, '')
    .replace(/[-*+]\s/g, '')
    .replace(/\d+\.\s/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s{2,}/g, ' ')
    .trim()
  
  // 生成摘要
  const excerpt = textContent.substring(0, 200).trim()
  const finalExcerpt = excerpt.length < textContent.length ? excerpt + '...' : excerpt
  
  return {
    excerpt: finalExcerpt,
    fullContent: fullHtmlContent,
    textContent: textContent
  }
}

export async function generateRSSFeed(config: any) {
  const baseUrl = 'https://publish-study-note.vercel.app'
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

  // 查找所有markdown文件
  const files = await fg(['Note/**/*.md', 'Record/**/*.md', 'Essay/**/*.md'], {
    cwd: resolve(__dirname, '../'),
    absolute: true,
    ignore: ['README.md', 'index.md']
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
      
      // 处理内容以支持readability
      const { excerpt, fullContent, textContent } = processContentForReadability(content, frontmatter)
      
      // 使用frontmatter的描述或生成的摘要
      const finalExcerpt = frontmatter.description || excerpt
      
      // 清理标题（移除文件名中的编号前缀）
      const cleanTitle = frontmatter.title || 
        relativePath.split('/').pop()?.replace(/^\d+x\d+-/, '') || 
        'Untitled'

      posts.push({
        title: cleanTitle,
        url,
        date: frontmatter.published ? new Date(frontmatter.published) : new Date(),
        excerpt: finalExcerpt,
        content: fullContent,
        category: frontmatter.category,
        tags: frontmatter.tags
      })
    } catch (error) {
      console.warn(`⚠️  Error processing ${file}:`, error)
    }
  }

  // 按日期排序, 最新的在前
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
    console.log('📖 Readability features enabled:')
    console.log('   • Full content preservation')
    console.log('   • HTML formatting for better display')
    console.log('   • Math formula handling')
    console.log('   • Smart excerpt generation')
    
    posts.slice(0, 5).forEach(post => {
      console.log(`  📄 ${post.title} (${post.date.toISOString().split('T')[0]})`)
    })
    if (posts.length > 5) {
      console.log(`  ... and ${posts.length - 5} more posts`)
    }
  } catch (error) {
    console.error('❌ Error writing RSS files:', error)
  }
} 