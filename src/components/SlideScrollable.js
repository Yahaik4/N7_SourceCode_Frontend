import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import styles from './Slide.module.scss';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import productItems from '../constants/productItems';

function SlideScrollable(props) {
    const {
        slideShowItemLength = Math.round(productItems.length / 2 - 5),
        translatePercent = 20,
        showHandleSlideBtn = true,
        settingStyles = '',
        children,
    } = props;

    const [slideIndex, setSlideIndex] = useState(0);
    const timeOutRef = useRef(null);
    const slideShowRef = useRef();

    function resetTimeOut() {
        if (timeOutRef) {
            clearTimeout(timeOutRef.current);
        }
    }

    useEffect(() => {
        resetTimeOut();
        timeOutRef.current = setTimeout(() => {
            setSlideIndex((prevIndex) => (prevIndex === slideShowItemLength ? 0 : prevIndex + 1));
        }, 5000);
        return () => {
            resetTimeOut();
        };
    }, [slideIndex, slideShowItemLength]);

    useEffect(() => {
        slideShowRef.current.scroll({ left: `${slideIndex * 240}`, behavior: 'smooth' });
    }, [slideIndex]);

    const handleNextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === slideShowItemLength ? 0 : prevIndex + 1));
    };

    const handlePrevSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === 0 ? slideShowItemLength : prevIndex - 1));
    };

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.slideShow)} ref={slideShowRef}>
                <div
                    className={clsx(styles.slide)}
                    style={{
                        // transform: `translateX(-${slideIndex * translatePercent}%)`,
                        ...settingStyles,
                    }}
                >
                    {children}
                </div>
            </div>

            <div
                className={clsx(styles.nextButton, { [styles.disabled]: !showHandleSlideBtn })}
                onClick={handleNextSlide}
            >
                <MdOutlineKeyboardArrowRight className={clsx(styles.btnIcon)} />
            </div>
            <div
                className={clsx(styles.prevButton, { [styles.disabled]: !showHandleSlideBtn })}
                onClick={handlePrevSlide}
            >
                <MdOutlineKeyboardArrowLeft className={clsx(styles.btnIcon)} />
            </div>
        </div>
    );
}

export default SlideScrollable;
