'use client';

import { useEffect, useState } from 'react';
import { useUserData } from '@/lib/hooks/use-auth';
import { LoyaltyCard } from '@/components/loyalty-card';
import { InfoSection } from '@/components/info-section';
import { QRButton } from '@/components/qr-button';

export function LoyaltyPageClient() {
    const [userId, setUserId] = useState<string | null>(null);

    // Получаем userId из localStorage
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
    }, []);

    // Используем хук для получения данных
    const { data: response, isLoading, isError, error } = useUserData(userId);

    const userData = response?.user || response;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                    <p>Загрузка данных...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-2">Ошибка загрузки данных</p>
                    <p className="text-sm text-gray-500">{error?.message}</p>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p>Данные пользователя не найдены</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <header className="flex justify-center items-center px-6 py-6">
                <div className="text-center">
                    <h1
                        className="font-bold"
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '40px',
                            color: '#090F15',
                            fontWeight: 600
                        }}
                    >
                        Brume
                    </h1>
                    <p
                        className="text-xs text-gray-500"
                        style={{ fontFamily: 'Roboto, sans-serif', fontSize: "12px" }}
                    >
                        coffee
                    </p>
                </div>
            </header>

            {/* Основной контент */}
            <div className="px-6">
                <LoyaltyCard userData={userData} />
                <InfoSection />
                <QRButton />
            </div>
        </div>
    );
}