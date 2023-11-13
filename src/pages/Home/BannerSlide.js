import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

// icon
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';

import slideShowItems from '../../constants/slideShowItems';
import styles from './BannerSlide.module.scss';

function BannerSlide() {
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
            setSlideIndex((prevIndex) => (prevIndex === slideShowItems.length - 1 ? 0 : prevIndex + 1));
        }, 5000);
        return () => {
            resetTimeOut();
        };
    }, [slideIndex]);

    const handleNextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === slideShowItems.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === 0 ? slideShowItems.length - 1 : prevIndex - 1));
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.imgSection)}>
                <div
                    className={clsx(styles.slideImages)}
                    style={{ transform: `translate3d(${-slideIndex * 100}%,0,0)` }}
                >
                    {slideShowItems.map((slide, index) => {
                        return <img key={index} src={slide.img} alt={slide.title} width="700" />;
                    })}
                </div>
                <div className={clsx(styles.nextButton)} onClick={handleNextSlide}>
                    <MdOutlineKeyboardArrowRight className={clsx(styles.btnIcon)} />
                </div>
                <div className={clsx(styles.prevButton)} onClick={handlePrevSlide}>
                    <MdOutlineKeyboardArrowLeft className={clsx(styles.btnIcon)} />
                </div>
            </div>

            <div className={clsx(styles.contentsSection)}>
                <div
                    className={clsx(styles.slideContents)}
                    style={
                        slideIndex > 6
                            ? { transform: `translate3d(-110%,0,0)` }
                            : { transform: `translate3d(${-slideIndex * 15}%,0,0)` }
                    }
                >
                    {slideShowItems.map((slide, index) => {
                        let isActive = false;
                        if (index === slideIndex) {
                            isActive = true;
                        }
                        return (
                            <div
                                key={index}
                                className={clsx(styles.slideContent, {
                                    [styles.active]: isActive,
                                })}
                                onClick={() => setSlideIndex(index)}
                            >
                                <p>{slide.title}</p>
                                <p>{slide.subTitle}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default BannerSlide;
