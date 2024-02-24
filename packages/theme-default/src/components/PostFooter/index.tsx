import styles from './index.module.scss'

import GiscusComments from '@/GiscusComments'
import PrevNextPage from '@/components/PrevNextPage'

const PostFooter = () => {
  return (
    <div className={`${styles.postFooter} flex flex-col`}>
      <PrevNextPage />
      <GiscusComments />
    </div>
  )
}

export default PostFooter
