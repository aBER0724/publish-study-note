<template>
  <div class="meta-info" v-if="hasMeta">
    <div class="meta-section">
      <div class="meta-item" v-if="frontmatter.published">
        <span class="meta-value">{{ formatDate(frontmatter.published) }} 发布</span>
      </div>
    </div>
    
    <div class="meta-tags" v-if="frontmatter.tags && frontmatter.tags.length > 0">
      <div class="tags-container">
        <span 
          v-for="tag in frontmatter.tags" 
          :key="tag" 
          class="tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="meta-description" v-if="frontmatter.description">
      <p class="description-text">{{ frontmatter.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import type { NoteFrontmatter } from '../types'

const { frontmatter, page } = useData<NoteFrontmatter>()

const hasMeta = computed(() => {
  // 如果明确设置了隐藏meta，则不显示
  if (frontmatter.value.hideMeta) {
    return false
  }
  
  return frontmatter.value.published || 
         frontmatter.value.lang || 
         frontmatter.value.author ||
         frontmatter.value.category ||
         frontmatter.value.description ||
         frontmatter.value.draft ||
         frontmatter.value.tags?.length > 0 ||
         page.value.lastUpdated
})

const lastUpdated = computed(() => {
  return page.value.lastUpdated
})

const formatDate = (dateString: string | number) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getLanguageDisplay = (lang: string) => {
  const languages: Record<string, string> = {
    'zh': '中文',
    'en': 'English',
    'ja': '日本語',
    'ko': '한국어'
  }
  return languages[lang] || lang
}
</script>

<style scoped>
.meta-info {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0 24px 0;
  font-size: 14px;
}

.meta-section {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.meta-label {
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.meta-value {
  color: var(--vp-c-text-1);
  font-weight: 400;
}

.meta-value.draft {
  color: var(--vp-c-warning-1);
  font-weight: 500;
}

.meta-description {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 16px;
  margin: 16px 0 8px 0;
}

.meta-description .meta-label {
  display: block;
  margin-bottom: 8px;
}

.description-text {
  margin: 0;
  color: var(--vp-c-text-1);
  font-style: italic;
  line-height: 1.5;
}

.meta-tags {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 16px;
  margin-top: 8px;
}

.meta-tags .meta-label {
  display: block;
  margin-bottom: 8px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid var(--vp-c-brand-1);
  transition: all 0.2s ease;
  display: inline-block;
  line-height: 1.2;
}

.tag:hover {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .meta-section {
    flex-direction: column;
    gap: 8px;
  }
  
  .meta-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}

/* 暗色主题适配 */
.dark .meta-info {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
}

.dark .tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.dark .tag:hover {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}
</style> 