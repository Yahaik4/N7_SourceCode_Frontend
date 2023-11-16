import clsx from 'clsx';
import { useState, useEffect } from 'react';

import { IoIosArrowUp } from 'react-icons/io';

import styles from './Layout.module.scss';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
    const [goToTop, setGoToTop] = useState(false);
    useEffect(() => {
        const handleScroll = () => setGoToTop(window.scrollY >= 200);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <Header />
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.content)}>{children}</div>
            </div>
            {goToTop && (
                <button id={clsx(styles.backToTop)} onClick={handleScrollToTop}>
                    <IoIosArrowUp className={clsx(styles.icon)} />
                    <strong>Lên đâu</strong>
                </button>
            )}
            <Footer />
        </div>
    );
}

export default Layout;
