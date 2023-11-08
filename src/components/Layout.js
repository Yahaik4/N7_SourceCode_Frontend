import clsx from 'clsx';

import styles from './Layout.module.scss';
import Header from './Header';

function Layout({ children }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <Header />
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.content)}>{children}</div>
            </div>
        </div>
    );
}

export default Layout;
