'use client';

import { TechnologyListProvider } from '@/contexts/TechnologyListCtx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import Aos from 'aos';

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

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    console.clear();
    log(lineText.join('\n'));

    React.useEffect(() => {
        Aos.init();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <TechnologyListProvider>{children}</TechnologyListProvider>
        </QueryClientProvider>
    );
};
