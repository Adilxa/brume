'use client';

import { useState } from 'react';
import { useSendOTP } from '@/lib/hooks/use-auth';

// Форма почты
function PhoneForm() {
    const [email, setEmail] = useState('');
    const sendOTPMutation = useSendOTP();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = () => {
        if (!validateEmail(email)) return;
        sendOTPMutation.mutate(email);
    };

    return (
        <div className="space-y-4">
            <div>
                <label
                    className="block mb-3"
                    style={{
                        color: '#000000',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 550,
                        fontSize: '20px',
                        lineHeight: '100%',
                        letterSpacing: '0%'
                    }}
                >
                    Введите адрес электронной почты
                </label>
                <div className="relative">
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="example@mail.com"
                        className="w-full border-0 rounded-2xl py-4 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all text-sm"
                        style={{ backgroundColor: '#F3E7DD' }}
                        disabled={sendOTPMutation.isPending}
                    />
                </div>
            </div>

            {sendOTPMutation.isError && (
                <div className="text-red-500 text-sm text-center">
                    Произошла ошибка. Попробуйте снова.
                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={!validateEmail(email) || sendOTPMutation.isPending}
                className="w-full text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 text-sm"
                style={{
                    backgroundColor: (!validateEmail(email) || sendOTPMutation.isPending) ? '#CABCB2' : '#151010',
                    cursor: (!validateEmail(email) || sendOTPMutation.isPending) ? 'not-allowed' : 'pointer'
                }}
            >
                {sendOTPMutation.isPending ? 'Отправка...' : 'Далее'}
            </button>
        </div>
    );
}
function Footer() {
    return (
        <footer className="text-center mt-6 px-6 pb-6 text-xs space-y-2">
            <p style={{ color: '#94877E' }}>
                Продолжая Вы соглашаетесь с <span style={{ color: '#1F1F1F', fontWeight: 'bold' }}>Политикой конфиденциальности</span> и <span style={{ color: '#1F1F1F', fontWeight: 'bold' }}>Пользовательским соглашением</span>
            </p>
        </footer>
    );
}

export function FormSection() {
    return (
        <div className="px-6 pt-8 h-full">
            <PhoneForm />
            <Footer />
        </div>
    );
}