// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import MetaInfo from './components/MetaInfo.vue'
import { inject } from '@vercel/analytics'
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

export default {
  extends: DefaultTheme,

  setup() {
    const route = useRoute();
    const initZoom = async () => {
      try {
        // 动态导入 Fancybox
        const { Fancybox } = await import('@fancyapps/ui');
        
        // 清理之前的实例
        Fancybox.destroy();
        
        // 为图片添加 data-caption 属性
        const images = document.querySelectorAll('.main img');
        images.forEach(img => {
          const alt = img.getAttribute('alt');
          if (alt) {
            img.setAttribute('data-caption', alt);
          }
        });
        
        // 为所有主内容区域的图片启用 Fancybox
        Fancybox.bind('.main img', {
          Toolbar: {
            display: {
              left: ['infobar'],
              middle: [],
              right: ['slideshow', 'fullscreen', 'thumbs', 'close']
            }
          },
          Images: {
            zoom: true
          }
        });
      } catch (error) {
        console.error('Failed to load Fancybox:', error);
      }
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },

  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-before': () => h(MetaInfo)
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('MetaInfo', MetaInfo)
    
    // 初始化 Vercel Analytics
    if (typeof window !== 'undefined') {
      inject()
    }
  }
} satisfies Theme
