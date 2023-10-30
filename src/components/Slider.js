import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

// icon
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';

import slideShowItems from '../constants/slideShowItems';
import styles from './Slider.module.scss';

function Slider() {
    const [slideIndex, setSlideIndex] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            setSlideIndex((prevIndex) => (prevIndex === slideShowItems.length - 1 ? 0 : prevIndex + 1));
        }, 5000);
    }, [slideIndex]);
    

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.imgsSection)}>
                <div
                    className={clsx(styles.slideImages)}
                    style={{ transform: `translate3d(${-slideIndex * 100}%,0,0)` }}
                >
                    {slideShowItems.map((slide, index) => {
                        return <img key={index} src={slide.img} alt={slide.title} width="690" height="300" />;
                    })}
                </div>
                <div className={clsx(styles.nextButton)}>
                    <MdOutlineKeyboardArrowRight className={clsx(styles.btnIcon)} />
                </div>
                <div className={clsx(styles.prevButton)}>
                    <MdOutlineKeyboardArrowLeft className={clsx(styles.btnIcon)} />
                </div>
            </div>

            <div className={clsx(styles.contentsSection)}>
                <div
                    className={clsx(styles.slideContents)}
                    style={slideIndex > 6?{ transform: `translate3d(-125%,0,0)` }:{ transform: `translate3d(${-slideIndex * 15}%,0,0)` }}
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

export default Slider;
