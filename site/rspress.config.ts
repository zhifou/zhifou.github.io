import * as path from 'path'
import { defineConfig, UserConfig } from 'rspress/config'
import { DefaultThemeConfig } from '@rspress/shared'

import { blogPostResolver } from '@zhifou/rspress-plugin-post-resolver'
import { postReadingInfoPlugin } from '@zhifou/rspress-plugin-reading-info'
import { markdownPresetsPlugin } from '@zhifou/rspress-plugin-markdown-presets'

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'zhifou',
  description: '知否 Blog',
  icon: '/favicon.ico',
  outDir: '../docs',
  builderConfig: {
    source: {
      alias: {
        '@docs': path.join(__dirname, 'docs'),
        '@source': path.join(__dirname, 'source'),
        '@theme': path.join(__dirname, 'theme'),
      },
    },
  },
  themeConfig: {
    friendLinks: [
      {
        name: '知否知否',
        link: 'https://github.com/zhifou',
      },
    ],
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/zhifou/' },
      { icon: 'twitter', mode: 'link', content: 'https://twitter.com/' },
    ],
    // 关闭所有页面的左侧菜单栏
    sidebar: {},
    // 顶部导航栏
    nav: [
      {
        text: '未来指引',
        link: '/guide/',
        activeMatch: '/guide/',
      },
      {
        text: '友情链接',
        link: '/blog/flinks/',
        activeMatch: '/blog/flinks/',
      },
      {
        text: '归档',
        link: '/blog/archives/',
        activeMatch: '/blog/archives/',
      },
      {
        text: '分类',
        link: '/blog/categories/',
        activeMatch: '/blog/categories/',
      },
      {
        text: '标签',
        link: '/blog/tags/',
        activeMatch: '/blog/tags/',
      },
      {
        text: '关于我',
        link: '/about/',
        activeMatch: '/about/',
      },
    ],
    lastUpdated: true,
    lastUpdatedText: '最后编辑时间',
    prevPageText: '上一篇',
    nextPageText: '下一篇',
    outlineTitle: '目录',
    editLink: {
      text: '📝 在 GitHub 上编辑此页',
      docRepoBaseUrl:
        'https://github.com/zhifou/zhifou-rspress/blob/main/source/',
    },
    searchPlaceholderText: '搜索...',
  },
  globalUIComponents: [],
  route: {
    cleanUrls: false,
  },
  mediumZoom: {
    selector: '.rspress-doc img',
  },
  plugins: [
    blogPostResolver({
      postsDir: path.join(__dirname, 'source/_posts'),
    }),
    postReadingInfoPlugin(),
    markdownPresetsPlugin(),
  ],
} as UserConfig<DefaultThemeConfig>)
