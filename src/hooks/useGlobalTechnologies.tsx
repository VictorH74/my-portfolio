import { TechnologiesCtx } from '@/contexts/TechnologiesContext';
import { use } from 'react';

export const useGlobalTechnologies = () => {
    const ctx = use(TechnologiesCtx);
    if (!ctx)
        throw new Error(
            'useGlobalTechnologies must be into a TechnologiesProvider'
        );
    return ctx;
};
