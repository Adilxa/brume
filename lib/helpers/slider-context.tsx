'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SliderContextType {
  currentSlide: number;
  totalSlides: number;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
}

const SliderContext = createContext<SliderContextType | undefined>(undefined);

interface SliderProviderProps {
  children: ReactNode;
  totalSlides: number;
}

export function SliderProvider({ children, totalSlides }: SliderProviderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Автоматическая смена слайдов
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const value = {
    currentSlide,
    totalSlides,
    nextSlide,
    prevSlide,
    goToSlide,
  };

  return (
    <SliderContext.Provider value={value}>
      {children}
    </SliderContext.Provider>
  );
}

export function useSliderContext() {
  const context = useContext(SliderContext);
  if (context === undefined) {
    throw new Error('useSliderContext must be used within a SliderProvider');
  }
  return context;
}

// ===================================================================

// lib/types.ts (Типы)
export interface SlideData {
  id: number;
  title: string;
  image: string;
  cups: number;
}

export interface PhoneFormData {
  phoneNumber: string;
}