// components/slider-section.tsx (Client Component)
'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SlideData } from '@/app/page';
import Image from 'next/image';

// Context для слайдера
interface SliderContextType {
    currentSlide: number;
    totalSlides: number;
    nextSlide: () => void;
    prevSlide: () => void;
    goToSlide: (index: number) => void;
}

const SliderContext = createContext<SliderContextType | undefined>(undefined);

function useSliderContext() {
    const context = useContext(SliderContext);
    if (!context) {
        throw new Error('useSliderContext must be used within SliderProvider');
    }
    return context;
}

// Провайдер слайдера
function SliderProvider({ children, totalSlides }: { children: React.ReactNode; totalSlides: number }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 4000);

        return () => clearInterval(timer);
    }, [totalSlides, isAutoPlaying]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    return (
        <SliderContext.Provider value={{ currentSlide, totalSlides, nextSlide, prevSlide, goToSlide }}>
            {children}
        </SliderContext.Provider>
    );
}

// Прогресс-бар
function ProgressHeader() {
    const { currentSlide, totalSlides } = useSliderContext();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Сброс прогресса при смене слайда
        setProgress(0);

        // Плавный прогресс от 0 до 100 за 4 секунды
        const startTime = Date.now();
        const duration = 4000; // 4 секунды

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);

            setProgress(newProgress);

            if (newProgress < 100) {
                requestAnimationFrame(updateProgress);
            }
        };

        requestAnimationFrame(updateProgress);
    }, [currentSlide]);

    return (
        <header className="absolute top-0 left-0 right-0 z-20 px-6 pt-6 pb-4">
            <div className="flex items-center space-x-2">
                {Array.from({ length: totalSlides }, (_, index) => (
                    <div key={index} className="flex-1 h-0.5 bg-transparent rounded-full overflow-hidden">
                        {index < currentSlide ? (
                            // Завершенные слайды - полный коричневый
                            <div className="w-full h-full" style={{ backgroundColor: '#4A180B' }} />
                        ) : index === currentSlide ? (
                            // Активный слайд - плавный прогресс
                            <div className="w-full h-full bg-white rounded-full relative">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        backgroundColor: '#4A180B',
                                        width: `${progress}%`,
                                        transition: 'none' // Убираем CSS transition для плавности через JS
                                    }}
                                />
                            </div>
                        ) : (
                            // Будущие слайды - белый полупрозрачный
                            <div className="w-full h-full bg-white rounded-full" />
                        )}
                    </div>
                ))}
            </div>
        </header>
    );
}

function CoffeeSlider({ slides }: { slides: SlideData[] }) {
    const { currentSlide, nextSlide, prevSlide, goToSlide } = useSliderContext();

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Контент слайдов */}
            <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className="w-full h-full flex-shrink-0 flex justify-center items-end px-6 pt-20 relative"
                        style={{
                            background: `radial-gradient(50% 50% at 50% 50%, #2B2929 0.48%, #151010 96.63%), linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 41.35%)`
                        }}
                    >
                        <h2
                            className="absolute top-16 left-6 right-6 text-white font-normal leading-tight text-center z-10"
                            style={{ fontSize: '17px' }}
                        >
                            {slide.title}
                        </h2>

                        {/* Картинка фиксированного размера */}
                        <div
                            className="relative"
                            style={{ marginBottom: index === 0 ? '-50px' : '0px' }}
                        >
                            <Image
                                src={slide.image}
                                alt='coffee'
                                width={430}
                                height={548}
                                className="object-cover rounded-lg"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Главный компонент секции слайдера
interface SliderSectionProps {
    slides: SlideData[];
}

export function SliderSection({ slides }: SliderSectionProps) {
    return (
        <SliderProvider totalSlides={slides.length}>
            <div className="relative w-full h-full">
                <ProgressHeader />
                <CoffeeSlider slides={slides} />
            </div>
        </SliderProvider>
    );
}