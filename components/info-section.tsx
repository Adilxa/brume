'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export function InfoSection() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    const closeDrawer = () => setIsDrawerOpen(false);
    const openDrawer = () => setIsDrawerOpen(true);

    return (
        <>
            {/* Информационный блок */}
            <div
                className="rounded-2xl p-6 mb-8"
                style={{ backgroundColor: '#F3E7DD', marginTop: "30px" }}
            >
                <h3
                    className="mb-2"
                    style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '20px',
                        fontWeight: 550,
                        color: '#000000',
                        textAlign: "center"
                    }}
                >
                    Как это работает ?
                </h3>
                <p
                    className="text-sm mb-4"
                    style={{
                        fontFamily: 'Roboto, sans-serif',
                        color: '#595959',
                        lineHeight: '140%',
                        fontSize: "15px",
                        textAlign: "center"
                    }}
                >
                    Вся подробная информация про кофе и подарки
                </p>
                <button
                    onClick={openDrawer}
                    className="text-sm underline"
                    style={{
                        fontFamily: 'Roboto, sans-serif',
                        color: '#000000',
                        fontWeight: 500,
                        width: "100%",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "17px",
                        padding: "16px",
                        textDecoration: "none"
                    }}
                >
                    Посмотреть
                </button>
            </div>

            {/* Overlay - полупрозрачный */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 z-40"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                    onClick={closeDrawer}
                />
            )}

            {/* Информационный Drawer */}
            <div
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 transform transition-transform duration-300 flex flex-col ${isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
                    }`}
                style={{ height: '65vh' }}
            >
                {/* Шапка drawer'а */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
                    <button
                        onClick={closeDrawer}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <X className="w-4 h-4 text-gray-600" strokeWidth={2} />
                    </button>
                </div>

                {/* Контент drawer'а - растягивается */}
                <div className="p-6 overflow-y-auto flex-1">
                    {/* Заголовок раздела */}
                    <h3
                        className="mb-4"
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#141414',
                            lineHeight: '22px'
                        }}
                    >
                        В подарок — кофе объёмом 350 мл
                    </h3>

                    {/* Список основных напитков */}
                    <ul className="space-y-3 mb-6">
                        <li
                            className="flex items-center"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '16px',
                                color: '#141414',
                                lineHeight: '22px'
                            }}
                        >
                            <span className="w-2 h-2 rounded-full bg-black mr-3 flex-shrink-0"></span>
                            Капучино
                        </li>
                        <li
                            className="flex items-center"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '16px',
                                color: '#141414',
                                lineHeight: '22px'
                            }}
                        >
                            <span className="w-2 h-2 rounded-full bg-black mr-3 flex-shrink-0"></span>
                            Латте
                        </li>
                        <li
                            className="flex items-center"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '16px',
                                color: '#141414',
                                lineHeight: '22px'
                            }}
                        >
                            <span className="w-2 h-2 rounded-full bg-black mr-3 flex-shrink-0"></span>
                            Американо
                        </li>
                    </ul>

                    {/* Дополнительные условия */}
                    <ul className="space-y-3">
                        <li
                            className="flex items-start"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '16px',
                                color: '#141414',
                                lineHeight: '22px'
                            }}
                        >
                            <span className="w-2 h-2 rounded-full bg-black mr-3 flex-shrink-0 mt-2"></span>
                            Получить айс кофе можно при доплате - 40 сомов
                        </li>
                        <li
                            className="flex items-start"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '16px',
                                color: '#141414',
                                lineHeight: '22px'
                            }}
                        >
                            <span className="w-2 h-2 rounded-full bg-black mr-3 flex-shrink-0 mt-2"></span>
                            Получить лимонад можно при доплате - 150 сомов
                        </li>
                    </ul>
                </div>

                {/* Кнопка закрытия - зафиксирована внизу */}
                <div className="px-6 pb-6 flex-shrink-0">
                    <button
                        onClick={closeDrawer}
                        className="w-full py-4 rounded-2xl text-white font-medium"
                        style={{
                            backgroundColor: '#012248',
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '16px'
                        }}
                    >
                        Понятно
                    </button>
                </div>
            </div>
        </>
    );
}