'use client';

import { TechnologyListProvider } from '@/contexts/TechnologyListCtx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

const log = (msg: string) =>
    console.log('%c' + msg, 'color: #20f8ff;font-weight:bold');

const lineText = [
    ' t88888S%%            ;8 8@888888888@%;¨¨',
    ' t88888S¨            ;8 8@888888888@%¨ 8S',
    ' t888              .t@X%%     ;88X8; .88%',
    ' t88S            .tX@X%%     S888@; .8888',
    ' t88;           .tX@X%     XS885t  .:X88X',
    ' t@8;         .tXX%%     .8@@88   ;@8888@',
    ' t88S        tX@X%:    .8X@X%   .S88S S8@',
    ' t8t;      .tX@X%    ..8888%   .888t  S8@',
    ' t@8t   .::X88%.   ;.8888%     :888   S8@',
    ' t@8:  .tX@X%     .88S8%       :88@   S88',
    ' t88: :@tX@     .t%8@X:        :888   %@8',
    ' t88: .;;     .X%SX:  .t888888888%S   %8@',
    ' t@8;       ..888:.   t@@88888888@%   S8@',
    ' t88:     .;X88t.     . .     .. .    S88',
    ' t88%. ...;X88;  .;  .%SSSSSSSSSS%:   %88',
    ' t@8% .8 t%8X; .S8:  .88888888888t    %88',
    ' t88;@8% %t:   %88;  .888S%S%%%%:     S88',
    ' t8@SX%X@      X88t  .8X@             %8@',
    ' t88S X        X88t  :88@             %88',
    ' t888          X88t...888         ....%88',
    ' t;.           X8S8888X88       .%8888888',
];

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    console.clear();
    log(lineText.join('\n'));

    return (
        <QueryClientProvider client={queryClient}>
            <TechnologyListProvider>{children}</TechnologyListProvider>
        </QueryClientProvider>
    );
};
