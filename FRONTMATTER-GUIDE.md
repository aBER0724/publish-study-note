# Frontmatter 规范指南

## 🎯 标准格式

```yaml
---
# 基础信息 (必需)
title: "学科名称 | 章节编号_具体标题"
published: YYYY-MM-DD
lang: zh

# 分类信息 (必需)
category: "note" | "record"
subject: "具体学科名称"
tags: [系统标签, 内容标签]

# 内容信息 (推荐)
description: "简短的内容描述"
keywords: ["关键词1", "关键词2"]
difficulty: "basic" | "intermediate" | "advanced"

# 管理信息 (可选)
author: "作者名"
updated: YYYY-MM-DD
version: "1.0"
status: "draft" | "published" | "archived"

# 关联信息 (可选)
series: "系列名称"
order: 1
prerequisites: ["前置知识1"]
related: ["相关文章路径1"]
---
```

## 📋 字段说明

### 必需字段
- **title**: 统一格式, 便于识别和排序
- **published**: 发布日期, 用于RSS和时间排序
- **lang**: 语言标识, 主要为 `zh`
- **category**: 主分类 (`note`/`record`)
- **subject**: 学科名称, 用于自动分组
- **tags**: 标签数组, 第一个通常为分类标签

### 推荐字段
- **description**: 内容简介, 用于RSS和SEO
- **keywords**: 关键词, 便于搜索
- **difficulty**: 难度等级, 便于筛选

### 管理字段
- **series**: 系列文章组织
- **order**: 系列中的顺序
- **prerequisites**: 前置要求
- **related**: 相关文章链接

## 🔄 现有文件迁移

### 当前格式
```yaml
---
title: "线性代数 | 0x0_线性系统"
published: 2025-05-09
lang: zh
tags:
 
   - 线性代数
---
```

### 建议格式
```yaml
---
title: "线性代数 | 0x0_线性系统"
published: 2025-05-09
lang: zh

category: "note"
subject: "线性代数"
tags: ["笔记", "线性代数", "基础"]

description: "线性系统的基本概念, 包括向量、矩阵运算和线性方程组"
keywords: ["向量", "矩阵", "线性方程组"]
difficulty: "basic"

series: "线性代数基础"
order: 1
---
```

## 🎨 标准化建议

### Title格式
- 学习笔记: `"学科名称 | 章节编号_具体标题"`
- 记录文档: `"分类 | 具体标题"`

### Category分类
- `note`: 学习笔记
- `record`: 记录文档

### Subject学科
- 使用中文全称
- 保持一致性 (如: "线性代数", "计算机网络")

### Tags规范
- 第一个标签：分类标签 ("笔记"/"记录")
- 第二个标签：学科标签 (与subject一致)
- 其他标签：内容特征标签

### Difficulty等级
- `basic`: 基础
- `intermediate`: 进阶  
- `advanced`: 高级

## 🚀 迁移步骤

1. **保持现有功能**: 当前基于tags的分组继续工作
2. **逐步添加字段**: 新文章使用完整格式
3. **批量更新**: 使用脚本批量更新现有文件
4. **验证功能**: 确保RSS、导航等功能正常

## 🔍 验证清单

- [ ] title格式统一
- [ ] category和subject添加
- [ ] tags格式标准化
- [ ] description和keywords添加
- [ ] 导航和RSS功能正常
- [ ] 搜索功能工作正常 