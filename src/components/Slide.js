import clsx from 'clsx';
import { useState, useRef, useEffect, Children, cloneElement } from 'react';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';

import styles from './Slide.module.scss';

function Slide(props) {
    const slideShowItemLength = props.slideShowItemLength;
    const translatePercent = props.translatePercent;

// passing props to props.children does not specify component
    const renderChildren = () => {
        return Children.map(props.children, (child) => {
            return cloneElement(child, {
                index: slideIndex,
                translatePercent: translatePercent,
            });
        });
    };

    const [slideIndex, setSlideIndex] = useState(0);
    const timeOutRef = useRef(null);

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
        setSlideIndex((prevIndex) => (prevIndex === slideShowItemLength - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === 0 ? slideShowItemLength - 1 : prevIndex - 1));
    };

    return (
        <div className={clsx(styles.slideShow)}>
            <div className={clsx(styles.slide)}>{renderChildren()}</div>

            <div className={clsx(styles.nextButton)} onClick={handleNextSlide}>
                <MdOutlineKeyboardArrowRight className={clsx(styles.btnIcon)} />
            </div>
            <div className={clsx(styles.prevButton)} onClick={handlePrevSlide}>
                <MdOutlineKeyboardArrowLeft className={clsx(styles.btnIcon)} />
            </div>
        </div>
    );
}

export default Slide;
