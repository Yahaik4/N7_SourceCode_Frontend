import clsx from 'clsx';
import { useState } from 'react';

import slideShowItems from '../../constants/slideShowItems';
import styles from './BannerSlide.module.scss';

import SlideScrollable from '../../components/SlideScrollable';

function BannerSlide() {
    const [slideIndex, setSlideIndex] = useState(0);

    const handleUpdateSlideIndex = (index) => {
        setSlideIndex(index);
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.imgSection)}>
                <SlideScrollable
                    slideShowItemLength={slideShowItems.length}
                    translatePercent={100}
                    forceTranslateTo={slideIndex}
                    updateThumbnailIndex={handleUpdateSlideIndex}
                    settingSlideLayout={{
                        display: 'flex',
                    }}
                >
                    {slideShowItems.map((slide, index) => {
                        return <img key={index} src={slide.img} alt={slide.title} width="" />;
                    })}
                </SlideScrollable>
            </div>

            <div className={clsx(styles.contentsSection)}>
                <div className={clsx(styles.slideContents)}>
                    <SlideScrollable
                        slideShowItemLength={slideShowItems.length}
                        translatePercent={20}
                        showBtn={false}
                        scrollable={true}
                        forceTranslateTo={slideIndex}
                        settingSlideLayout={{
                            display: 'flex',
                            height: '100%',
                        }}
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
                    </SlideScrollable>
                </div>
            </div>
        </div>
    );
}

export default BannerSlide;
