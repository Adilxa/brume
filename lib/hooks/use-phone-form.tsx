'use client';

import { useState } from 'react';

export function usePhoneForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log('Phone submitted:', phoneNumber);
      // await submitPhone(phoneNumber);
    } catch (error) {
      console.error('Error submitting phone:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    phoneNumber,
    isSubmitting,
    handlePhoneChange,
    handleSubmit,
  };
}