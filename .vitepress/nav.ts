import { readdirSync, statSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import type { DefaultTheme } from 'vitepress'
import matter from 'gray-matter'

const DIR_ROOT = resolve(__dirname, '../')

interface NoteFrontmatter {
  title?: string
  published?: string
  description?: string
  tags?: string[]
  category?: string
  draft?: boolean
}

interface FileInfo {
  title: string
  link: string
  frontmatter: NoteFrontmatter
  filePath: string
  published?: Date
}

// 通用标签, 不作为科目分类
const GENERIC_TAGS = ['笔记', '记录', '随笔', 'note', 'record', 'essay', 'Essay', 'example', '示例']

// 从 markdown 文件中提取完整信息
function getFileInfo(filePath: string, relativePath: string): FileInfo | null {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const { data: frontmatter } = matter(content) as { data: NoteFrontmatter }
    
    // 跳过草稿
    if (frontmatter.draft) return null
    
    const link = `/${relativePath.replace(/\.md$/, '')}`
    
    // 生成显示标题, 去掉科目前缀
    let title = frontmatter.title || relativePath.split('/').pop()?.replace(/\.md$/, '') || 'Untitled'
    title = cleanTitlePrefix(title)
    
    return {
      title,
      link,
      frontmatter,
      filePath,
      published: frontmatter.published ? new Date(frontmatter.published) : undefined
    }
  } catch (error) {
    console.warn(`Error reading ${filePath}:`, error)
    return null
  }
}

// 清理标题, 去掉科目前缀
function cleanTitlePrefix(title: string): string {
  // 匹配 "任何内容 | " 格式, 去掉前缀
  return title.replace(/^[^|]+\|\s*/, '').trim() || title
}

// 从tags中提取科目名称
function extractSubjectFromTags(tags: string[]): string | null {
  for (const tag of tags) {
    if (!GENERIC_TAGS.includes(tag)) {
      return tag
    }
  }
  return null
}

// 扫描指定目录下的markdown文件
function scanFilesInDirectory(targetDir: string): Map<string, FileInfo[]> {
  const subjectMap = new Map<string, FileInfo[]>()
  
  function scanDirectory(dir: string, baseDir: string = ''): void {
    const fullPath = baseDir ? join(DIR_ROOT, baseDir, dir) : join(DIR_ROOT, dir)
    
    // 检查目录是否存在
    try {
      const files = readdirSync(fullPath)

  for (const file of files) {
        const filePath = join(fullPath, file)
        const relativePath = baseDir ? `${baseDir}/${dir}/${file}` : `${dir}/${file}`
    const stat = statSync(filePath)

    if (stat.isDirectory()) {
          // 跳过系统目录
          if (['.vitepress', 'node_modules'].includes(file)) continue
          const newBaseDir = baseDir ? `${baseDir}/${dir}` : dir
          scanDirectory(file, newBaseDir)
        } else if (file.endsWith('.md')) {
          // 跳过索引文件，它们不应该出现在sidebar中
          if (file === 'index.md') continue
          
          const fileInfo = getFileInfo(filePath, relativePath)
          if (!fileInfo) continue
          
          // 从tags中提取科目
          let subject: string
          if (fileInfo.frontmatter.tags) {
            subject = extractSubjectFromTags(fileInfo.frontmatter.tags) || '其他'
          } else {
            // 如果没有科目信息, 使用目录名
            const pathParts = relativePath.split('/')
            if (pathParts.length > 1) {
              subject = pathParts[pathParts.length - 2] // 使用父目录名
            } else {
              subject = '其他'
      }
    }
          
          // 过滤掉顶级目录分组，但保留具体的分类
          if (['Note', 'Record', 'Essay'].includes(subject)) {
            continue
          }
          
          // 对于Record目录的example，改为更友好的名称
          if (subject === 'example' && relativePath.startsWith('Record/')) {
            subject = '开发示例'
          }
          
          if (!subjectMap.has(subject)) {
            subjectMap.set(subject, [])
          }
          subjectMap.get(subject)!.push(fileInfo)
        }
      }
    } catch (error) {
      console.warn(`Error scanning directory ${fullPath}:`, error)
    }
  }
  
  // 只扫描指定的目录
  const targetPath = join(DIR_ROOT, targetDir)
  try {
    if (statSync(targetPath).isDirectory()) {
      scanDirectory(targetDir)
    }
  } catch (error) {
    console.warn(`Target directory ${targetDir} not found:`, error)
  }

  return subjectMap
}

function findFirstLink(items: DefaultTheme.SidebarItem[]): string | undefined {
  for (const item of items) {
    if (item.link) return item.link
    if (item.items) {
      const link = findFirstLink(item.items)
      if (link) return link
    }
  }
}

export const nav = (): DefaultTheme.NavItem[] => {
  return [
    { text: 'Home', link: '/' },
    { text: '学习笔记', link: '/Note/' },
    { text: '记录文档', link: '/Record/' },
    { text: '随笔', link: '/Essay/' }
  ]
}

// 生成特定目录的侧边栏结构
function generateSidebarForDirectory(targetDir: string): DefaultTheme.SidebarItem[] {
  const subjectMap = scanFilesInDirectory(targetDir)
  const sidebarStructure: DefaultTheme.SidebarItem[] = []
  
  // 为每个科目创建侧边栏组
  for (const [subject, files] of subjectMap) {
    if (files.length === 0) continue
    
    // 按文件名中的编号排序 (0x0 -> 0x1 -> 0x2)
    files.sort((a, b) => {
      // 提取文件名中的编号 (例如: 0x0, 0x1, 0x2)
      const extractNumber = (title: string): number => {
        const match = title.match(/0x(\w+)/i)
        if (match) {
          // 支持十六进制编号转换为十进制
          return parseInt(match[1], 16)
        }
        return 999 // 没有编号的文件排在最后
      }
      
      const numA = extractNumber(a.title)
      const numB = extractNumber(b.title)
      
      // 先按编号排序
      if (numA !== numB) {
        return numA - numB
      }
      
      // 编号相同时按标题字典序排序
      return a.title.localeCompare(b.title, 'zh-CN', { numeric: true })
    })
    
    const sidebarItems: DefaultTheme.SidebarItem[] = files.map(file => ({
      text: file.title,
      link: file.link
    }))
    
    sidebarStructure.push({
      text: subject,
      items: sidebarItems,
      collapsed: false
        })
      }
  
  // 如果没有找到任何文件，添加一个占位项
  if (sidebarStructure.length === 0) {
    sidebarStructure.push({
      text: '目录',
      items: [
        {
          text: '暂无内容',
          link: `/${targetDir}/`
        }
      ]
    })
  }
  
  return sidebarStructure
}

export const sidebar = (): DefaultTheme.Sidebar => {
  const result: DefaultTheme.Sidebar = {}

  // 为Note目录生成专门的侧边栏
  const noteSidebar = generateSidebarForDirectory('Note')
  const notePaths = ['/Note/', '/Note/linear-algebra/', '/Note/information-theory/', '/Note/computer-internet/', '/Note/formal-languages-and-automata-theory/']
  notePaths.forEach(path => {
    result[path] = noteSidebar
  })
  
  // 为Record目录生成专门的侧边栏
  const recordSidebar = generateSidebarForDirectory('Record')
  const recordPaths = ['/Record/', '/Record/example/']
  recordPaths.forEach(path => {
    result[path] = recordSidebar
  })

  // 为Essay目录生成专门的侧边栏
  const essaySidebar = generateSidebarForDirectory('Essay')
  const essayPaths = ['/Essay/']
  essayPaths.forEach(path => {
    result[path] = essaySidebar
  })

  return result
}