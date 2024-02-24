import { normalizeHrefInRuntime } from '@rspress/runtime'
import { PostInfo } from '@zhifou/rspress-plugin-post-resolver'
import classnames from 'classnames'
import { Link } from '@rspress/theme-default'
import styles from './index.module.scss'

interface PostListProps {
  posts: PostInfo[]
}

const PostList = ({ posts = [] }: PostListProps) => {
  return (
    <div className={`${styles.postList}`}>
      {posts.map((post, index) => (
        <div key={index} className={classnames('mb-6')}>
          <div
            className={classnames(
              styles.postItem,
              'max-w-4xl px-10 py-6 mx-auto rounded-lg'
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-light text-gray-600">
                {(post.date || '').slice(0, 10)}
              </span>
              <Link
                className={classnames(
                  styles.postCategories,
                  'px-2 py-1 text-gray-100'
                )}
                href={`/blog/categories/index.html?category=${encodeURIComponent(
                  post.categories?.join('/') || ''
                )}`}
              >
                # {(post.categories || []).join(' / ')}
              </Link>
            </div>
            <div className="mt-2">
              <Link
                className={classnames(
                  styles.postTitle,
                  'text-2xl',
                  'font-bold'
                )}
                href={normalizeHrefInRuntime(post.route)}
              >
                {post.title}
              </Link>
              <p className="mt-2 text-gray-600"></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList
