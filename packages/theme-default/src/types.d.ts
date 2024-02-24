declare module 'virtual-post-data' {
  import { PostInfo } from '@zhifou/rspress-plugin-post-resolver'

  const postInfos: PostInfo[]
}

declare module 'virtual-post-tags' {
  import { PostTag } from '@zhifou/rspress-plugin-post-resolver'

  export const postTags: PostTag[]
}

declare module 'virtual-post-categories' {
  import { PostCategory } from '@zhifou/rspress-plugin-post-resolver'

  export const postCategories: PostCategory[]
}
