const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 学科映射表
const subjectMapping = {
  '线性代数': {
    description: '线性代数基础理论与应用',
    keywords: ['线性代数', '向量', '矩阵', '线性变换'],
    series: '线性代数基础'
  },
  '计算机网络': {
    description: '计算机网络原理与协议',
    keywords: ['计算机网络', '网络协议', '网络架构'],
    series: '计算机网络基础'
  },
  '信息论': {
    description: '信息论基础概念与应用',
    keywords: ['信息论', '信息熵', '编码理论'],
    series: '信息论基础'
  },
  '形式语言与自动机': {
    description: '形式语言理论与自动机原理',
    keywords: ['形式语言', '自动机', '编译原理'],
    series: '形式语言与自动机理论'
  }
};

// 从标签中提取学科名称
function extractSubject(tags) {
  if (!Array.isArray(tags)) return null;
  
  const genericTags = ['笔记', '记录', '随笔'];
  return tags.find(tag => !genericTags.includes(tag)) || null;
}

// 根据路径判断分类
function determineCategory(filePath) {
  if (filePath.includes('/Note/')) return 'note';
  if (filePath.includes('/Record/')) return 'record';
  if (filePath.includes('/Essay/')) return 'essay';
  return 'note'; // 默认为笔记
}

// 生成描述
function generateDescription(title, subject, content) {
  if (subjectMapping[subject]) {
    return subjectMapping[subject].description;
  }
  
  // 基于标题生成描述
  const titlePart = title.split('|')[1]?.trim() || title;
  return `${subject}相关内容：${titlePart}`;
}

// 生成关键词
function generateKeywords(subject, tags, title) {
  const keywords = [];
  
  if (subject) keywords.push(subject);
  if (subjectMapping[subject]) {
    keywords.push(...subjectMapping[subject].keywords);
  }
  
  // 从标题提取关键词
  const titlePart = title.split('|')[1]?.trim() || title;
  const titleWords = titlePart.match(/[\u4e00-\u9fa5]+/g) || [];
  keywords.push(...titleWords.slice(0, 3));
  
  return [...new Set(keywords)].slice(0, 6);
}

// 判断难度等级
function determineDifficulty(title, order) {
  if (title.includes('0x0') || order === 1) return 'basic';
  if (title.includes('0x1') || title.includes('0x2')) return 'intermediate';
  return 'basic'; // 默认为基础
}

// 更新单个文件
function updateFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);
    const frontmatter = parsed.data;
    
    // 如果没有frontmatter, 跳过
    if (!frontmatter || Object.keys(frontmatter).length === 0) {
      console.log(`⏭️  Skipping ${filePath} (no frontmatter)`);
      return;
    }
    
    // 提取现有信息
    const subject = extractSubject(frontmatter.tags) || frontmatter.subject;
    const category = frontmatter.category || determineCategory(filePath);
    
    // 构建新的frontmatter
    const newFrontmatter = {
      // 基础信息 (保留原有)
      title: frontmatter.title,
      published: frontmatter.published,
      lang: frontmatter.lang || 'zh',
      
      // 分类信息
      category: category,
      subject: subject,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      
      // 内容信息 (新增或更新)
      description: frontmatter.description || generateDescription(frontmatter.title, subject, parsed.content),
      keywords: frontmatter.keywords || generateKeywords(subject, frontmatter.tags, frontmatter.title),
      difficulty: frontmatter.difficulty || determineDifficulty(frontmatter.title, 1),
    };
    
    // 可选字段 (如果原有就保留)
    if (frontmatter.author) newFrontmatter.author = frontmatter.author;
    if (frontmatter.updated) newFrontmatter.updated = frontmatter.updated;
    if (frontmatter.version) newFrontmatter.version = frontmatter.version;
    if (frontmatter.status) newFrontmatter.status = frontmatter.status;
    
    // 系列信息
    if (subject && subjectMapping[subject]) {
      newFrontmatter.series = frontmatter.series || subjectMapping[subject].series;
      
      // 尝试从文件名提取顺序
      const orderMatch = frontmatter.title.match(/0x(\d+)/);
      if (orderMatch) {
        newFrontmatter.order = frontmatter.order || parseInt(orderMatch[1]) + 1;
      }
    }
    
    // 生成新的文件内容
    const newContent = matter.stringify(parsed.content, newFrontmatter);
    
    // 写入文件
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ Updated ${filePath}`);
    
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

// 递归遍历目录
function walkDirectory(dir, callback) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDirectory(filePath, callback);
    } else if (file.endsWith('.md')) {
      callback(filePath);
    }
  });
}

// 主函数
function main() {
  console.log('🚀 Starting frontmatter update...\n');
  
  const noteDir = path.join(__dirname, '../Note');
  const recordDir = path.join(__dirname, '../Record');
  const essayDir = path.join(__dirname, '../Essay');
  
  // 更新Note目录
  if (fs.existsSync(noteDir)) {
    console.log('📚 Updating Note directory...');
    walkDirectory(noteDir, updateFile);
  }
  
  // 更新Record目录  
  if (fs.existsSync(recordDir)) {
    console.log('\n📝 Updating Record directory...');
    walkDirectory(recordDir, updateFile);
  }

  // 更新Essay目录
  if (fs.existsSync(essayDir)) {
    console.log('\n📜 Updating Essay directory...');
    walkDirectory(essayDir, updateFile);
  }
  
  console.log('\n🎉 Frontmatter update completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Review the changes with git diff');
  console.log('2. Test the build: npm run build');
  console.log('3. Check RSS generation and navigation');
  console.log('4. Commit changes if everything looks good');
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { updateFile, walkDirectory }; 