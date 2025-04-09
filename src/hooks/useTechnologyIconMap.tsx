import React from 'react';
import { useGlobalTechnologyList } from './useGlobalTechnologyList';
import { TechnologyType } from '@/types';

export type IconMapType = Record<TechnologyType['name'], TechnologyType>;

export const useTechnologyIconMap = () => {
    const { isEmpty, technologyList } = useGlobalTechnologyList();

    const map = React.useMemo(() => {
        if (isEmpty) return undefined;
        const map: IconMapType = {};
        technologyList.map((icon) => {
            map[icon.id] = icon;
        });
        return map;
    }, [isEmpty, technologyList]);

    return map;
};
