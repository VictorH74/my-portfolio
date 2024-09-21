import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
    title: 'Victor Almeida',
    description: 'Personal web portfolio',
};

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: { locale: string };
}

export default async function LocaleLayout({
    children,
    params: { locale },
}: LocaleLayoutProps) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <AppRouterCacheProvider>
                <body>
                    <NextIntlClientProvider messages={messages}>
                        <Providers>{children}</Providers>
                    </NextIntlClientProvider>
                </body>
            </AppRouterCacheProvider>
        </html>
    );
}
