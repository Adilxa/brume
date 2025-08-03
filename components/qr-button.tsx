// components/qr-button.tsx (Client Component)
'use client';

import { useState, useEffect } from 'react';
import { QrCode } from 'lucide-react';
import QrIcon from ".././public/images/qr_icon.png";
import Image from 'next/image';
import QRCode from 'qrcode';

export function QRButton() {
    const [isQRDrawerOpen, setIsQRDrawerOpen] = useState(false);
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
    }, []);

    useEffect(() => {
        if (userId) {
            generateQRCode(userId);
        }
    }, [userId]);

    const generateQRCode = async (id: string) => {
        try {
            const dataUrl = await QRCode.toDataURL(id, {
                width: 160,
                margin: 1,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                },
                errorCorrectionLevel: 'M'
            });

            setQrCodeDataUrl(dataUrl);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    const openQRDrawer = () => setIsQRDrawerOpen(true);
    const closeQRDrawer = () => setIsQRDrawerOpen(false);

    return (
        <>
            {/* QR код кнопка */}
            <div className="flex justify-center">
                <button
                    onClick={openQRDrawer}
                    className="w-[80px] h-[80px] rounded-full border-[1px] border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-2xl"
                >
                    <Image src={QrIcon} alt='icon' style={{ width: '30px', height: '30px' }} />
                </button>
            </div>

            {/* Overlay для QR drawer */}
            {isQRDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeQRDrawer}
                />
            )}

            {/* QR Drawer */}
            <div
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 transform transition-transform duration-300 ${isQRDrawerOpen ? 'translate-y-0' : 'translate-y-full'
                    }`}
                style={{ maxHeight: '90vh' }}
            >
                {/* Контент QR drawer'а */}
                <div className="p-6 text-center">
                    {/* Заголовок */}
                    <h2
                        className="mb-6"
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '20px',
                            fontWeight: 500,
                            color: '#141414'
                        }}
                    >
                        Мой QR
                    </h2>

                    {/* Описание */}
                    <p
                        className="mb-8 text-gray-600 px-4 py-3 rounded-xl"
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '14px',
                            lineHeight: '140%',
                            border: "1px dashed #434343"
                        }}
                    >
                        Покажите QR для начисления <br /> баллов
                    </p>

                    {/* QR код */}
                    <div className="mb-8 flex justify-center">
                        <div
                            className="w-48 h-48 border border-gray-300 rounded-2xl flex items-center justify-center relative p-4"
                            style={{ backgroundColor: '#FFFFFF' }}
                        >
                            {qrCodeDataUrl ? (
                                <img
                                    src={qrCodeDataUrl}
                                    alt="QR Code"
                                    className="w-full h-full object-contain"
                                />
                            ) : userId ? (
                                <div className="text-gray-500 text-sm">
                                    Генерация QR кода...
                                </div>
                            ) : (
                                <div className="text-gray-500 text-sm">
                                    ID пользователя не найден
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Кнопка "Закрыть" */}
                    <button
                        onClick={closeQRDrawer}
                        className="w-full py-4 rounded-2xl text-white font-medium"
                        style={{
                            backgroundColor: '#012248',
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '16px'
                        }}
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </>
    );
}