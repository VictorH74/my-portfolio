'use client';
import { TechnologiesProvider } from '@/contexts/TechnologiesContext';
import { ThemeProvider } from '@/contexts/ThemeColor';
import { Poppins } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const inter = Poppins({ weight: '500', subsets: ['latin'] });

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
            <style jsx global>{`
                html {
                    font-family: ${inter.style.fontFamily};
                }
            `}</style>
            <TechnologiesProvider>
                <ThemeProvider>{props.children}</ThemeProvider>
            </TechnologiesProvider>
        </QueryClientProvider>
    );
}
