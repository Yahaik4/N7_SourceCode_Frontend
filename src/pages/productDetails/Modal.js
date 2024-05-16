import clsx from 'clsx';

import { IoCloseOutline } from 'react-icons/io5';
import styles from './Modal.module.scss';

function Modal(props) {
    const { modalTitle = '', handleShowModal, children } = props;

    return (
        <div className={clsx(styles.overlay)} onClick={() => handleShowModal(false)}>
            <div
                className={clsx(styles.wrapper)}
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <div className={clsx(styles.container)}>
                    <div className={clsx(styles.header)}>
                        {modalTitle}
                        <div onClick={() => handleShowModal(false)}>
                            <IoCloseOutline dClose className={clsx(styles.icon)} />
                        </div>
                    </div>
                    <div className={clsx(styles.body)}>{children}</div>
                    <div className={clsx(styles.footer)}>
                        <div className={clsx(styles.CloseBtn)} onClick={() => handleShowModal(false)}>
                            <IoCloseOutline />
                            Đóng
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
