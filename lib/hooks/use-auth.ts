// hooks/use-auth.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authAPI, userAPI } from '../api/api';

export const useSendOTP = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: authAPI.sendOTP,
        onSuccess: (data, email) => {
            if (data.userId) {
                localStorage.setItem('userId', data.userId.toString());
            }
            localStorage.setItem('userEmail', email);
            localStorage.setItem('otpSent', 'true');

            console.log('OTP sent successfully:', data);
            router.push('/otp');
        },
        onError: (error) => {
            console.error('Error sending OTP:', error);
        },
    });
};

export const useVerifyOTP = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: ({ email, otpCode }: { email: string; otpCode: string }) =>
            authAPI.verifyOTP(email, otpCode),
        onSuccess: (data) => {
            console.log('OTP verified successfully:', data);
            if (data.userId) {
                localStorage.setItem('userId', data.user.id.toString());
            }
            router.push('/dashboard');
        },
        onError: (error) => {
            console.error('Error verifying OTP:', error);
            // Показать ошибку пользователю
        },
    });
};

// Новый хук для получения данных пользователя
export const useUserData = (userId: string | null) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userAPI.getUserData(userId!),
    enabled: !!userId, // Запрос выполняется только если есть userId
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 3,
  });
};