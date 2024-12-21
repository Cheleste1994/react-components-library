import { Link } from 'react-router-dom';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { useModal } from '@/hooks/useModal';

import Modal from '@components/base/modal/Modal';
import ModalTemplate from '@components/base/modal/ModalTemplate';

import { Post } from '@api/index';

import styles from './posts-modal.module.scss';

type PostsModalProps = {
  posts: Post[];
  username: string;
};

export default function PostsModal(props: PostsModalProps) {
  const { posts, username } = props;
  const [open, toogleModal] = useModal();

  return (
    <div className={styles.wrapper}>
      <input
        readOnly
        value={posts.map(({ title }) => title).join(', ')}
        onMouseDown={toogleModal}
      />
      <Modal open={open} handleClose={toogleModal}>
        <ModalTemplate
          btnClose={toogleModal}
          title={`Посты пользователя ${username}`}
          titleAlign="center"
        >
          <div className={styles.posts}>
            {posts.map(({ id, title }) => (
              <Link
                to={`${DASHBOARD_PAGES.POSTS.path}/${id}`}
                key={id}
                className={styles.post}
                state={{ username }}
              >
                {title}
              </Link>
            ))}
          </div>
        </ModalTemplate>
      </Modal>
    </div>
  );
}
