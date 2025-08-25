'use client';

import { useEffect, useState } from 'react';
import { useUserData } from '@/lib/hooks/use-auth';
import { LoyaltyCard } from '@/components/loyalty-card';
import { InfoSection } from '@/components/info-section';
import { QRButton } from '@/components/qr-button';
import Brume from '../public/images/Brume.svg';


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
            <header className="flex justify-center items-center px-3 py-6">
                {/* <Link href={"/profile"}>
                    <Image
                        src={'/images/User.svg'}
                        alt='profile'
                        width={26}
                        height={26}
                    />
                </Link> */}
                <div className="text-center">
                    <img src={Brume.src} alt="logo" className='mb-1' />
                    <p
                        className="text-xs text-gray-500"
                        style={{ fontFamily: 'Roboto, sans-serif', fontSize: "12px" }}
                    >
                        coffee
                    </p>
                </div>
                {/* <Link href={"/notification"}>
                    <Image
                        src={'/images/Bell.svg'}
                        alt='notification'
                        width={26}
                        height={26}
                    />
                </Link> */}
            </header>

            {/* Основной контент */}
            <div className="px-4">
                <LoyaltyCard userData={userData} />
                <InfoSection />
                <QRButton />
            </div>
        </div>
    );
}