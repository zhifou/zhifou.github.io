import Giscus from '@giscus/react'
import { useLocation } from '@rspress/runtime'

export default function Comments() {
  const location = useLocation()
  /**
 * <script src="https://giscus.app/client.js"
        data-repo="zhifou/zhifou.github.io"
        data-repo-id="R_kgDOLUeEGw"
        data-category="Announcements"
        data-category-id="DIC_kwDOLUeEG84CdbEY"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
 */
  return (
    <Giscus
      id="comments"
      repo="zhifou/zhifou.github.io"
      repoId="R_kgDOLUeEGw"
      category="Announcements"
      categoryId="DIC_kwDOLUeEG84CdbEY"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="zh-CN"
      term={location.pathname}
    />
  )
}
