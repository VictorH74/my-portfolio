import Providers from '@/components/Providers';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';

export const metadata: Metadata = {
    title: 'Victor Leal',
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
