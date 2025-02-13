import type { Metadata } from 'next';
import '../globals.css';
import { Providers } from '@/components/Providers';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
    title: 'Victor Leal - Portfolio',
    description: 'Victor Leal - Portfolio',
    icons: [
        {
            rel: 'icon',
            url: '/me-logo-v2.svg',
        },
    ],
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const messages = await getMessages();

    return (
        <html lang="en">
            <body>
                <NextIntlClientProvider messages={messages}>
                    <Providers>{children}</Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
