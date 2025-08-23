import React, { useState, useRef, useEffect } from 'react';


interface Cup {
    id: number;
    createdAt: string;
}

interface LoyaltyCardData {
    id: number;
    cupsCount: number;
    isComplete: boolean;
    isUsed: boolean;
    isActive: boolean;
    createdAt: string;
    usedAt?: string;
    cups: Cup[];
}

interface LoyaltyCardProps {
    userData: {
        id: number;
        email: string;
        currentProgress: number;
        maxCups: number;
        canAddCup: boolean;
        availableFreeCoffees: number;
        createdAt: string;
        loyaltyCards: LoyaltyCardData[];
    };
    onClaimFreeCoffee?: (cardId: number) => void;
}

export function LoyaltyCard({ userData, onClaimFreeCoffee }: LoyaltyCardProps) {
    const cupImages = [
        "/images/cofee_icons/image_1.svg",
        "/images/cofee_icons/image_2.svg",
        "/images/cofee_icons/image_3.svg",
        "/images/cofee_icons/image_4.svg",
        "/images/cofee_icons/image_5.svg",
        "/images/cofee_icons/image_6.png",
    ];

    // Если нет карточек, создаем пустую "виртуальную" карточку для отображения
    const cardsToDisplay = userData.loyaltyCards.length > 0
        ? userData.loyaltyCards
        : [{
            id: 0,
            cupsCount: 0,
            isComplete: false,
            isUsed: false,
            isActive: true,
            createdAt: new Date().toISOString(),
            cups: []
        }];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Обработчики для мыши
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        if (!sliderRef.current || !isDragging) return;
        setIsDragging(false);

        // Определяем текущий слайд после перетаскивания
        const cardWidth = sliderRef.current.offsetWidth;
        const newSlide = Math.round(sliderRef.current.scrollLeft / cardWidth);
        setCurrentSlide(Math.max(0, Math.min(newSlide, cardsToDisplay.length - 1)));

        // Плавно перемещаем к ближайшему слайду
        sliderRef.current.scrollTo({
            left: newSlide * cardWidth,
            behavior: 'smooth'
        });
    };

    // Обработчики для touch событий
    const handleTouchStart = (e: React.TouchEvent) => {
        if (!sliderRef.current) return;
        setIsDragging(true);
        setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || !sliderRef.current) return;
        const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        if (!sliderRef.current || !isDragging) return;
        setIsDragging(false);

        // Определяем текущий слайд после свайпа
        const cardWidth = sliderRef.current.offsetWidth;
        const newSlide = Math.round(sliderRef.current.scrollLeft / cardWidth);
        setCurrentSlide(Math.max(0, Math.min(newSlide, cardsToDisplay.length - 1)));

        // Плавно перемещаем к ближайшему слайду
        sliderRef.current.scrollTo({
            left: newSlide * cardWidth,
            behavior: 'smooth'
        });
    };

    // Переход к конкретному слайду по клику на индикатор
    const goToSlide = (index: number) => {
        if (!sliderRef.current) return;
        setCurrentSlide(index);
        const cardWidth = sliderRef.current.offsetWidth;
        sliderRef.current.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
    };

    // Обработчик скролла для синхронизации индикаторов
    const handleScroll = () => {
        if (!sliderRef.current || isDragging) return;
        const cardWidth = sliderRef.current.offsetWidth;
        const newSlide = Math.round(sliderRef.current.scrollLeft / cardWidth);
        setCurrentSlide(newSlide);
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            slider.addEventListener('scroll', handleScroll);
            return () => slider.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div className="w-full">
            {/* Слайдер карточек */}
            <div
                ref={sliderRef}
                className="flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {cardsToDisplay.map((card, cardIndex) => (
                    <div
                        key={card.id || cardIndex}
                        className="flex-shrink-0 w-full snap-center"
                    >
                        <div
                            className={`rounded-3xl p-8 mx-4 relative`}
                            style={{
                                backgroundColor: card.isUsed ? '#4a5568' : '#012248',
                                opacity: card.isUsed ? 0.7 : 1
                            }}
                        >
                            {/* Статус карточки */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    {card.isActive && (
                                        <span className="bg-green-400 text-black px-2 py-1 rounded-full text-xs font-semibold">
                                            Активная
                                        </span>
                                    )}
                                    {card.isComplete && !card.isUsed && (
                                        <span className="bg-green-400 text-black px-2 py-1 rounded-full text-xs font-semibold">
                                            Готова к обмену
                                        </span>
                                    )}
                                    {card.isUsed && (
                                        <span className="bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                            Использована
                                        </span>
                                    )}
                                </div>

                                {/* Дата использования */}
                                {card.usedAt && (
                                    <span className="text-gray-300 text-xs">
                                        Использована: {new Date(card.usedAt).toLocaleDateString('ru-RU')}
                                    </span>
                                )}
                            </div>

                            {/* Сетка чашек */}
                            <div className="grid grid-cols-3 gap-6 mb-8 justify-items-center">
                                {Array.from({ length: 6 }, (_, index) => (
                                    <div
                                        key={index}
                                        className="rounded-full flex items-center justify-center overflow-hidden relative"
                                        style={{
                                            backgroundColor: "#F3F3F3",
                                            width: "78px",
                                            height: "78px"
                                        }}
                                    >
                                        {index < card.cupsCount && (
                                            <img
                                                src={cupImages[index]}
                                                alt={`Cup ${index + 1}`}
                                                width={78}
                                                height={78}
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Текст и кнопка */}
                            <div className="text-center">
                                {card.isActive && (
                                    <p
                                        className="text-white text-center text-base mb-2"
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 400,
                                            lineHeight: '1.2'
                                        }}
                                    >
                                        {card.cupsCount === 6
                                            ? 'Карточка заполнена! Получите бесплатный кофе!'
                                            : `Получите 6-ой кофе в подарок${card.cupsCount > 0 ? ` (${card.cupsCount}/6)` : ''}`
                                        }
                                    </p>
                                )}

                                {card.isComplete && !card.isUsed && (
                                    <>
                                        <p
                                            className="text-white text-center text-base mb-4"
                                            style={{
                                                fontFamily: 'Roboto, sans-serif',
                                                fontWeight: 400,
                                                lineHeight: '1.2'
                                            }}
                                        >
                                            🎉 Карточка готова! Получите бесплатный кофе!
                                        </p>

                                        {onClaimFreeCoffee && (
                                            <button
                                                onClick={() => onClaimFreeCoffee(card.id)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full transition-colors"
                                            >
                                                Получить бесплатный кофе
                                            </button>
                                        )}
                                    </>
                                )}

                                {card.isUsed && (
                                    <p
                                        className="text-gray-300 text-center text-base"
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 400,
                                            lineHeight: '1.2'
                                        }}
                                    >
                                        ✅ Бесплатный кофе получен
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Индикаторы точек */}
            {cardsToDisplay.length > 1 && (
                <div className="flex justify-center space-x-3 mt-6 pb-4">
                    {cardsToDisplay.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${currentSlide === index
                                ? 'border-gray-800'
                                : 'border-gray-400 hover:border-gray-600'
                                }`}
                            aria-label={`Перейти к карточке ${index + 1}`}
                        >
                            {currentSlide === index && (
                                <div className="w-2 h-2 bg-gray-800 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Общая статистика */}
            {userData.availableFreeCoffees > 0 && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center mx-4">
                    <strong>
                        У вас {userData.availableFreeCoffees} доступных бесплатных кофе! ☕
                    </strong>
                </div>
            )}

            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}