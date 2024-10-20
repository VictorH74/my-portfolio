'use client';
import { TechnologiesProvider } from '@/contexts/TechnologiesContext';
import { ThemeProvider } from '@/contexts/ThemeColor';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const log = (msg: string) =>
    console.log('%c' + msg, 'color: #20f8ff;font-weight:bold');

const lineText = [
    ' ||     //         //     //',
    ' ||    //         //     //',
    ' ||   //         //=====//',
    ' ||  //         //     //',
    ' ||_//    [=]  //     //',
];

export default function Providers(props: PropsWithChildren) {
    console.clear();
    log(lineText.join('\n'));

    return (
        <QueryClientProvider client={queryClient}>
            <TechnologiesProvider>
                <ThemeProvider>{props.children}</ThemeProvider>
            </TechnologiesProvider>
        </QueryClientProvider>
    );
}
