import React, { useState, useEffect, useCallback, useRef } from "react";
import Billboard from './Billboard';

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
    const [activeAutoplay, setActiveAutoplay] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const autoplayRef = useRef<number | undefined>();

    const settings = {
        maxItems: items.length,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const goTo = useCallback(
        (index: number) => {
            if (!isAnimating) {
                setCurrentIndex(index);
                setIsAnimating(true);

                setTimeout(() => {
                    setIsAnimating(false);
                }, settings.speed);
            }
        },
        [isAnimating, currentIndex]
    );

    const goNext = () => {
        goTo(currentIndex >= settings.maxItems - 1 ? 0 : currentIndex + 1);
    };

    useEffect(() => {
        if (settings.autoplay && activeAutoplay) {
            clearTimeout(autoplayRef.current);
            autoplayRef.current = window.setTimeout(() => {
                goNext();
            }, settings.autoplaySpeed);
        }
        return () => clearTimeout(autoplayRef.current);

    }, [currentIndex, activeAutoplay, isAnimating]);

    return (
        <div className="slider">
            <Billboard featuredItems={items[currentIndex]} />
        </div>
    );
};

export default Slider;
