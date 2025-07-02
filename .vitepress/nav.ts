import { readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import type { DefaultTheme } from 'vitepress'

const DIR_ROOT = resolve(__dirname, '../')

function getFiles(dir: string): DefaultTheme.SidebarItem[] {
  const dirPath = join(DIR_ROOT, dir)
  const files = readdirSync(dirPath)
  const result: DefaultTheme.SidebarItem[] = []

  for (const file of files) {
    const filePath = join(dirPath, file)
    const stat = statSync(filePath)

    if (stat.isDirectory()) {
      const children = getFiles(join(dir, file))
      if (children.length > 0) {
        result.push({
          text: file,
          items: children,
          collapsed: true,
        })
      }
    }
    else if (file.endsWith('.md')) {
      const link = `/${join(dir, file.replace(/\.md$/, ''))}`
      result.push({
        text: file.replace(/\.md$/, ''),
        link,
      })
    }
  }

  return result
}

function findFirstLink(items: DefaultTheme.SidebarItem[]): string | undefined {
  for (const item of items) {
    if (item.link)
      return item.link

    if (item.items) {
      const link = findFirstLink(item.items)
      if (link)
        return link
    }
  }
}

export const nav = (): DefaultTheme.NavItem[] => {
  const files = readdirSync(DIR_ROOT)
  const result: DefaultTheme.NavItem[] = [
    { text: 'Home', link: '/' },
  ]

  for (const file of files) {
    const filePath = join(DIR_ROOT, file)
    const stat = statSync(filePath)

    if (stat.isDirectory()) {
      if (['.vitepress', 'node_modules'].includes(file))
        continue

      const children = getFiles(file)
      const link = findFirstLink(children)
      if (link) {
        result.push({
          text: file,
          link,
        })
      }
    }
  }
  return result
}

export const sidebar = (): DefaultTheme.Sidebar => {
  const files = readdirSync(DIR_ROOT)
  const result: DefaultTheme.Sidebar = {}

  for (const file of files) {
    const filePath = join(DIR_ROOT, file)
    const stat = statSync(filePath)

    if (stat.isDirectory()) {
      if (['.vitepress', 'node_modules'].includes(file))
        continue

      result[`/${file}/`] = getFiles(file)
    }
  }

  return result
}