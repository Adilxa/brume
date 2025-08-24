'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useVerifyOTP, useSendOTP } from '../../lib/hooks/use-auth';
import { toast } from 'react-toastify';

export default function OTPPage() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(120);
    const [canResend, setCanResend] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const verifyOTPMutation = useVerifyOTP();
    const sendOTPMutation = useSendOTP();

    // Получаем email из localStorage
    const email = typeof window !== 'undefined' ? localStorage.getItem('userEmail') || '' : '';

    // Таймер обратного отсчета
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const submitOTP = useCallback((otpCode: string) => {
        if (email && !verifyOTPMutation.isPending) {
            verifyOTPMutation.mutate({ email, otpCode });
        }
    }, [email, verifyOTPMutation.isPending]);

    // Автоматическая отправка при заполнении всех полей
    useEffect(() => {
        const isOtpComplete = otp.every(digit => digit !== '');
        if (isOtpComplete && !isSubmitted) {
            const otpCode = otp.join('');
            submitOTP(otpCode);
        }
    }, [otp, isSubmitted]);

    // Сброс флага при ошибке для возможности повторной отправки
    useEffect(() => {
        if (verifyOTPMutation.isError) {
            setIsSubmitted(false);
        }
    }, [verifyOTPMutation.isError]);

    // Форматирование времени в MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Обработка ввода OTP
    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Автоматический переход к следующему полю
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Обработка клавиш
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Отправка повторного OTP
    const handleResendOTP = () => {
        if (email) {
            // Отправляем новый OTP
            sendOTPMutation.mutate(email);

            // Сбрасываем состояние
            setTimeLeft(120);
            setCanResend(false);
            setOtp(['', '', '', '', '', '']);
            setIsSubmitted(false);
            inputRefs.current[0]?.focus();
        }
    };

    // Возврат назад
    const handleBack = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Шапка с кнопкой назад */}
            <header className="px-6 py-4 flex items-center">
                <button
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
            </header>

            {/* Основной контент */}
            <div className="flex-1 flex flex-col justify-center px-6 pb-20">
                <div className="text-center mb-12">
                    <h1
                        className="mb-4"
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '24px',
                            fontWeight: 500,
                            color: '#000000',
                            lineHeight: '100%'
                        }}
                    >
                        Введите код
                    </h1>
                    <p
                        className="text-gray-600"
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '14px',
                            lineHeight: '120%'
                        }}
                    >
                        На Ваш номер отправлен SMS с<br />
                        6-значным кодом
                    </p>
                </div>

                {/* Показать ошибку если есть */}
                {verifyOTPMutation.isError && (
                    <div className="text-red-500 text-sm text-center mb-4">
                        Неверный код. Попробуйте еще раз.
                    </div>
                )}

                {/* Показать загрузку */}
                {verifyOTPMutation.isPending && (
                    <div className="text-gray-500 text-sm text-center mb-4">
                        Проверка кода...
                    </div>
                )}

                {/* Поля для ввода OTP */}
                <div className="flex justify-center gap-3 mb-12">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el;
                            }}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center text-xl font-medium border-2 rounded-xl focus:outline-none transition-colors"
                            style={{
                                backgroundColor: '#F7E7D8',
                                borderColor: '#E5E5E5',
                                color: '#000000'
                            }}
                            onFocus={(e) => {
                                e.target.style.border = '3px solid #012147';
                            }}
                            onBlur={(e) => {
                                e.target.style.border = '2px solid #E5E5E5';
                            }}
                            maxLength={1}
                            inputMode="numeric"
                            disabled={verifyOTPMutation.isPending}
                        />
                    ))}
                </div>

                {/* Таймер и кнопка повторной отправки */}
                <div className="text-center">
                    {!canResend ? (
                        <p
                            className="text-gray-500"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '14px'
                            }}
                        >
                            Отправить заново {formatTime(timeLeft)}
                        </p>
                    ) : (
                        <button
                            onClick={handleResendOTP}
                            disabled={sendOTPMutation.isPending}
                            className="text-gray-800 underline disabled:text-gray-400"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '14px',
                                fontWeight: 500
                            }}
                        >
                            {sendOTPMutation.isPending ? 'Отправляется...' : 'Отправить еще раз'}
                        </button>
                    )}

                    {/* Показать статус повторной отправки */}
                    {sendOTPMutation.isSuccess && (
                        <p className="text-green-500 text-xs mt-1">
                            Новый код отправлен!
                        </p>
                    )}

                    {sendOTPMutation.isError && (
                        <p className="text-red-500 text-xs mt-1">
                            Ошибка отправки. Попробуйте снова.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}