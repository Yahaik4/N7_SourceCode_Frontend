import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';

import styles from './Slide.module.scss';

function Slide(props) {
    const {
        slideShowItemLength,
        translatePercent = 100,
        showHandleSlideBtn = true,
        settingStyles = '',
        children,
    } = props;

    // passing props to props.children does not specify component
    // const renderChildren = () => {
    //     return Children.map(props.children, (child) => {
    //         return cloneElement(child, {
    //             index: slideIndex,
    //             translatePercent: translatePercent,
    //         });
    //     });
    // };

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
    
    const handleNextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === slideShowItemLength ? 0 : prevIndex + 1));
    };

    const handlePrevSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === 0 ? slideShowItemLength : prevIndex - 1));
    };

    const handleOnScroll = () => {
        setSlideIndex(0);
        resetTimeOut();
    };
    
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.slideShow)} ref={slideShowRef} onScroll={handleOnScroll}>
                <div
                    className={clsx(styles.slide)}
                    style={{ transform: `translateX(-${slideIndex * translatePercent}%)`, ...settingStyles }}
                >
                    {/* {renderChildren()} */}
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

export default Slide;
