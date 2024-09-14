'use client';
import TechnologiesProvider from '@/contexts/TechnologiesContext';
import ThemeProvider from '@/contexts/ThemeColor';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function Providers(props: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            <TechnologiesProvider>
                <ThemeProvider>{props.children}</ThemeProvider>
            </TechnologiesProvider>
        </QueryClientProvider>
    );
}
