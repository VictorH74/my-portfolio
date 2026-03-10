'use client';
import { downloadResume } from '@/utils/resume';
import React from 'react';

export const resumeFileName = 'VICTOR HUGO LEAL.pdf';

export const useDownloadResumeBtn = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = async () => {
        setIsLoading(true);

        try {
            await downloadResume();
        } catch (err) {
            console.error(err);
            alert('Error trying download resume! Try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        handleClick,
        isLoading,
    };
};
