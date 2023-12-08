import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

// icon
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';

import styles from './ProductImagesSlide.module.scss';

function ProductImagesSlide(props) {
    const { slideImages, thumbnailData } = props;

    console.log(thumbnailData);
    const [slideIndex, setSlideIndex] = useState(0);

    const timeOutRef = useRef(null);

    function resetTimeOut() {
        if (timeOutRef) {
            clearTimeout(timeOutRef.current);
        }
    }

    // useEffect(() => {
    //     resetTimeOut();
    //     timeOutRef.current = setTimeout(() => {
    //         setSlideIndex((prevIndex) => (prevIndex === slideShowItems.length - 1 ? 0 : prevIndex + 1));
    //     }, 5000);
    //     return () => {
    //         resetTimeOut();
    //     };
    // }, [slideIndex]);

    const handleNextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === 0 ? slideImages.length - 1 : prevIndex - 1));
    };

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.imgSection)}>
                <div className={clsx(styles.wrapper)}>
                    <div
                        className={clsx(styles.slideImages)}
                        style={{ transform: `translate3d(${-slideIndex * 100}%,0,0)` }}
                    >
                        {slideImages.map((slide, index) => {
                            return <img key={index} src={slide} alt={''} />;
                        })}
                    </div>
                    <div className={clsx(styles.nextButton)} onClick={handleNextSlide}>
                        <MdOutlineKeyboardArrowRight className={clsx(styles.btnIcon)} />
                    </div>
                    <div className={clsx(styles.prevButton)} onClick={handlePrevSlide}>
                        <MdOutlineKeyboardArrowLeft className={clsx(styles.btnIcon)} />
                    </div>
                </div>
            </div>
            <div className={clsx(styles.contentsSection)}>
                <div
                    className={clsx(styles.slideContents)}
                    style={
                        slideIndex > 10
                            ? { transform: `translate3d(${-slideIndex * 2}%,0,0)` }
                            : { transform: `translate3d(${-slideIndex * 0}%,0,0)` }
                    }
                >
                    {thumbnailData.map((slide, index) => {
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
                                <img key={index} src={slide} alt={''} height={50} width={50} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProductImagesSlide;
