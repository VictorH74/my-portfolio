import { TechnologyListCtx } from '@/contexts/TechnologyListCtx';
import React from 'react';

export const useGlobalTechnologyList = () => {
    const ctx = React.use(TechnologyListCtx);

    if (!ctx)
        throw new Error(
            'useTechnologyList must be into a TechnologyListProvider'
        );

    return ctx;
};
