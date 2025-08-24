import React from 'react';
import { Edit2, Camera } from 'lucide-react';
import Link from 'next/link';

const Profile = () => {

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <h1 className="text-lg font-medium text-gray-900 text-center mt-[50px]">Профиль</h1>

            {/* Content */}
            <div className="flex-1 px-4 py-6 flex flex-col">
                {/* Avatar Section */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                        </div>
                        {/* Camera icon for avatar change */}
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200">
                            <Camera className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Name Input */}
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                            placeholder="email"
                        />
                        <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <Edit2 className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Additional fields can be added here */}

                {/* Spacer to push button to bottom */}
                <div className="flex-1"></div>
            </div>

            {/* Save Button - Fixed at bottom */}
            <div className="p-4 bg-white border-t border-gray-100">
                <Link href={"/dashboard"}>
                    <button
                        className="w-full py-4 rounded-lg font-medium text-white transition-colors"
                        style={{ backgroundColor: '#012248' }}
                    >
                        Сохранить
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Profile;