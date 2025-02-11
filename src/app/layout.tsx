import type { Metadata } from 'next';
import './globals.css';

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
