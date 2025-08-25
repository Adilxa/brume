import React, { useState, useRef, useEffect, useCallback } from 'react';

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
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const [animationId, setAnimationId] = useState<number>(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Получаем ширину слайда
    const getSlideWidth = useCallback(() => {
        return containerRef.current?.offsetWidth || 0;
    }, []);

    // Анимация слайдера
    const animation = useCallback(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(${currentTranslate}px)`;
        }
        if (isDragging) {
            const id = requestAnimationFrame(animation);
            setAnimationId(id);
        }
    }, [currentTranslate, isDragging]);

    // Установка позиции слайдера по индексу
    const setSliderPosition = useCallback(() => {
        const slideWidth = getSlideWidth();
        const translate = currentSlide * -slideWidth;
        setCurrentTranslate(translate);
        setPrevTranslate(translate);
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(${translate}px)`;
        }
    }, [currentSlide, getSlideWidth]);

    // Получение позиции из события
    const getPositionX = (event: React.TouchEvent | React.MouseEvent) => {
        if ('touches' in event) {
            return event.touches[0].clientX;
        }
        return event.clientX;
    };

    const getPositionY = (event: React.TouchEvent | React.MouseEvent) => {
        if ('touches' in event) {
            return event.touches[0].clientY;
        }
        return event.clientY;
    };

    // Начало перетаскивания
    const dragStart = (event: React.TouchEvent | React.MouseEvent) => {
        if ('touches' in event && event.touches.length > 1) return;

        setStartPos({
            x: getPositionX(event),
            y: getPositionY(event)
        });
        setIsDragging(true);

        if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
        }

        const id = requestAnimationFrame(animation);
        setAnimationId(id);
    };

    // Процесс перетаскивания
    const dragMove = (event: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;

        event.preventDefault();

        const currentX = getPositionX(event);
        const currentY = getPositionY(event);
        const diffX = currentX - startPos.x;
        const diffY = Math.abs(currentY - startPos.y);

        // Если вертикальное движение больше горизонтального, не обрабатываем
        if (diffY > Math.abs(diffX) * 1.5) {
            return;
        }

        const slideWidth = getSlideWidth();
        const maxTranslate = -(cardsToDisplay.length - 1) * slideWidth;

        let newTranslate = prevTranslate + diffX;

        // Ограничиваем перетаскивание с rubber band эффектом
        if (newTranslate > 0) {
            newTranslate = diffX * 0.3;
        } else if (newTranslate < maxTranslate) {
            newTranslate = maxTranslate + (diffX - (maxTranslate - prevTranslate)) * 0.3;
        }

        setCurrentTranslate(newTranslate);
    };

    // Конец перетаскивания
    const dragEnd = () => {
        if (!isDragging) return;

        setIsDragging(false);
        cancelAnimationFrame(animationId);

        const slideWidth = getSlideWidth();
        const movedBy = currentTranslate - prevTranslate;

        // Определяем направление свайпа
        if (Math.abs(movedBy) > slideWidth * 0.25) {
            if (movedBy < 0 && currentSlide < cardsToDisplay.length - 1) {
                setCurrentSlide(prev => prev + 1);
            } else if (movedBy > 0 && currentSlide > 0) {
                setCurrentSlide(prev => prev - 1);
            }
        }

        // Включаем transition для плавной анимации
        if (sliderRef.current) {
            sliderRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
    };

    // Переход к конкретному слайду
    const goToSlide = (index: number) => {
        if (index < 0 || index >= cardsToDisplay.length) return;
        setCurrentSlide(index);
    };

    // Обработчики событий мыши
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        dragStart(e);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        dragMove(e);
    };

    const handleMouseUp = () => {
        dragEnd();
    };

    const handleMouseLeave = () => {
        dragEnd();
    };

    // Обработчики touch событий
    const handleTouchStart = (e: React.TouchEvent) => {
        dragStart(e);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        dragMove(e);
    };

    const handleTouchEnd = () => {
        dragEnd();
    };

    // Эффект для установки позиции при изменении текущего слайда
    useEffect(() => {
        setSliderPosition();
    }, [currentSlide, setSliderPosition]);

    // Эффект для пересчета позиции при изменении размера окна
    useEffect(() => {
        const handleResize = () => {
            setSliderPosition();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setSliderPosition]);

    // Предотвращаем выделение текста при перетаскивании
    useEffect(() => {
        const preventSelect = (e: Event) => {
            if (isDragging) {
                e.preventDefault();
            }
        };

        document.addEventListener('selectstart', preventSelect);
        return () => document.removeEventListener('selectstart', preventSelect);
    }, [isDragging]);

    return (
        <div className="w-full" ref={containerRef}>
            {/* Слайдер карточек */}
            <div className="overflow-hidden">
                <div
                    ref={sliderRef}
                    className="flex will-change-transform"
                    style={{
                        transform: `translateX(${currentTranslate}px)`,
                        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {cardsToDisplay.map((card, cardIndex) => (
                        <div
                            key={card.id || cardIndex}
                            className="flex-shrink-0 w-full"
                            style={{ userSelect: 'none' }}
                        >
                            <div
                                className="rounded-3xl p-8 mx-4 relative"
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
                                                    draggable={false}
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
                                                className="text-white text-center text-base"
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 400,
                                                    lineHeight: '1.2'
                                                }}
                                            >
                                                🎉 Карточка заполнена!
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
                                            Бесплатный кофе получен
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center mx-1">
                    <strong>
                        У вас {userData.availableFreeCoffees} доступных бесплатных кофе! ☕
                    </strong>
                </div>
            )}
        </div>
    );
}