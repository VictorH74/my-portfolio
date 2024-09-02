import './globals.css';
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
    title: 'Victor Almeida',
    description: 'Personal web portfolio',
    icons: '/icons/favicon.svg',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <AppRouterCacheProvider>
                <body>
                    <Providers>{children}</Providers>
                </body>
            </AppRouterCacheProvider>
        </html>
    );
}
