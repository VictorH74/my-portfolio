import React from 'react';
import { useTechnologyList } from './useTechnologyList';
import { TechnologyType } from '@/types';

export const useTechnologyIconMap = () => {
    const { isEmpty, technologyList } = useTechnologyList();

    const map = React.useMemo(() => {
        if (isEmpty) return undefined;
        const map: Record<TechnologyType['name'], TechnologyType> = {};
        technologyList.map((icon) => {
            map[icon.id] = icon;
        });
        return map;
    }, [isEmpty, technologyList]);

    return map;
};
