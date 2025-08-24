import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const Notifications = () => {
    const notifications = [
        {
            id: 1,
            text: "Ты собрался 5 раунде подряд – вот и в подарок! Заглянь в раздел с наградами своей боец! 🏆"
        },
        {
            id: 2,
            text: "Ты собрался 5 раунде подряд – вот и в подарок! Заглянь в раздел с наградами своей боец! 🏆"
        },
        {
            id: 3,
            text: "Ты собрался 5 раунде подряд – вот и в подарок! Заглянь в раздел с наградами своей боец! 🏆"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-[30px]">
            {/* Header */}
            <div className="px-4 py-4 flex items-center justify-center w-full relative">
                <Link href={"/dashboard"}>
                    <button className="mr-3 p-1 absolute left-[15px] top-[13px]">
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                </Link>
                <h1 className="text-lg font-medium text-gray-900 text-center">Уведомления</h1>
            </div>

            {/* Notifications List */}
            <div className="px-4 py-6 space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="p-4 rounded-2xl shadow-sm"
                        style={{ backgroundColor: '#F4EAE1' }}
                    >
                        <p className="text-sm text-gray-800 leading-relaxed">
                            {notification.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;