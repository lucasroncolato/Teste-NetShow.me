import React, { useState, useEffect, useCallback, useRef } from "react";
import Billboard from './Billboard';
import '../stylesheets/HeroSection.css';

type FeaturedItem = {
    title: string;
    billboard: { url: string };
    billboardLogo: { url: string };
    contextualSynopsis: { text: string };
    contentAdvisory?: { certificationValue: string };
};

type SliderProps = {
    items: FeaturedItem[];
};

const Slider: React.FC<SliderProps> = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [progress, setProgress] = useState(0);

    const settings = {
        maxItems: items.length,
        speed: 1000,
        autoplaySpeed: 3000,
    };

    const goTo = useCallback((index: number) => {
        if (!isAnimating) {
            setCurrentIndex(index);
            setIsAnimating(true);
            setProgress(0);

            setTimeout(() => {
                setIsAnimating(false);
            }, settings.speed);
        }
    }, [isAnimating]);

    const goNext = () => {
        goTo(currentIndex >= settings.maxItems - 1 ? 0 : currentIndex + 1);
    };

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 10000000000) {
                    goNext();
                    return 0;
                }
                return prevProgress + 1;
            });
        }, settings.autoplaySpeed / 100);

        return () => clearInterval(progressInterval);
    }, [currentIndex, goNext, settings.autoplaySpeed]);

    return (
        <div className="slider">
            <Billboard featuredItems={items[currentIndex]} />

            <div className="loadingBanners">
                {items.map((_, index) => (
                    <div
                        key={index}
                        className={`loadingBanner ${index === currentIndex ? 'loadingBannerActive' : ''}`}
                    >
                        {index === currentIndex && (
                            <div
                                className="progress-Bar"
                                style={{ width: `${progress}%` }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;
