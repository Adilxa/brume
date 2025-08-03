'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export function InfoSection() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <>
            {/* Информационный блок */}
            <div
                className="rounded-2xl p-6 mb-8"
                style={{ backgroundColor: '#F3E7DD', marginTop: "50px" }}
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

            {/* Overlay */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeDrawer}
                />
            )}

            {/* Информационный Drawer */}
            <div
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 transform transition-transform duration-300 ${isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
                    }`}
                style={{ height: '65vh' }}
            >
                {/* Шапка drawer'а */}
                <div className="flex justify-between items-center p-6 border-b border-gray-300">
                    <button
                        onClick={closeDrawer}
                        className="w-8 h-8 rounded-full border border-black flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <X className="w-4 h-4 text-black" strokeWidth={4} />
                    </button>
                </div>

                {/* Контент drawer'а */}
                <div className="p-6 overflow-y-auto">
                    <div className="flex flex-col h-full">
                        {/* Раздел 1 */}
                        <div className='flex-1 p-6 overflow-y-auto'>
                            <h3
                                className="mb-3"
                                style={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontSize: '16px',
                                    color: '#141414',
                                    lineHeight: '22px'
                                }}
                            >
                                В подарок — кофе объемом 350 мл
                            </h3>
                            <ul className="space-y-2">
                                <li
                                    className="flex items-start"
                                    style={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '16px',
                                        color: '#141414',
                                        lineHeight: '22px'
                                    }}
                                >
                                    <span className="w-1 h-1 rounded-full bg-black mt-2 mr-3 flex-shrink-0"></span>
                                    Капучино
                                </li>
                                <li
                                    className="flex items-start"
                                    style={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '14px',
                                        color: '#333333'
                                    }}
                                >
                                    <span className="w-1 h-1 rounded-full bg-black mt-2 mr-3 flex-shrink-0"></span>
                                    Латте
                                </li>
                                <li
                                    className="flex items-start"
                                    style={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '14px',
                                        color: '#333333'
                                    }}
                                >
                                    <span className="w-1 h-1 rounded-full bg-black mt-2 mr-3 flex-shrink-0"></span>
                                    Американо
                                </li>
                            </ul>
                        </div>

                        {/* Раздел 2 */}
                        <ul className="space-y-2 ml-4">
                            <li
                                className="flex items-start"
                                style={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontSize: '16px',
                                    color: '#141414',
                                    marginLeft: "20px"
                                }}
                            >
                                <span className="w-1 h-1 rounded-full bg-black mt-2 mr-3 flex-shrink-0"></span>
                                Получить айс кофе можно при доплате - 40 сомов
                            </li>

                            <li
                                className="flex items-start"
                                style={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontSize: '16px',
                                    color: '#141414',
                                    marginLeft: "20px"
                                }}
                            >
                                <span className="w-1 h-1 rounded-full bg-black mt-2 mr-3 flex-shrink-0"></span>
                                Получить лимонад можно при доплате - 150 сомов
                            </li>
                        </ul>

                    </div>

                </div>
                <div className='px-4'>
                    <button
                        onClick={closeDrawer}
                        className="w-full mt-8 py-4 rounded-2xl text-white font-medium"
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