'use client';

export const PROJECT_GRADIENT_COLORS = [
    'bg-linear-[135deg,rgba(67,148,255,1)_30%,rgba(107,206,255,1)_90%]',
    'bg-linear-[45deg,rgba(154,255,208,1)_30%,rgba(20,165,157,1)_90%]',
    'bg-linear-[135deg,rgba(126,148,255,1)_30%,rgba(255,191,243,1)_90%]',
    'bg-linear-[45deg,rgba(255,154,154,1)_30%,rgba(254,60,53,1)_90%]',
    'bg-linear-[135deg,rgba(154,194,255,1)_30%,rgba(147,162,255,1)_90%]',
    'bg-linear-[45deg,rgba(255,181,154,1)_30%,rgba(242,101,13,1)_90%]',
    'bg-linear-[135deg,rgba(173,154,255,1)_30%,rgba(13,78,242,1)_90%]',
];

export const BRAZIL_PHONE_PATTERN = '\\d{13}';

export const EMAILJS_SERVICE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
    (() => {
        throw new Error('EMAILJS_SERVICE_ID not defined');
    })();

export const EMAILJS_TEMPLATE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
    (() => {
        throw new Error('EMAILJS_TEMPLATE_ID not defined');
    })();

export const EMAILJS_PUBLIC_KEY =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
    (() => {
        throw new Error('EMAILJS_PUBLIC_KEY not defined');
    })();
