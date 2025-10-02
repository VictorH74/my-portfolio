'use client';
import { technologieService } from '@/di/container';
import { SetStateType } from '@/types/generic';
import { TechnologyType } from '@/types/technology';
import {
    QueryObserverResult,
    RefetchOptions,
    useQuery,
} from '@tanstack/react-query';
import React from 'react';


type TechnologyListCtxType = {
    technologyList: TechnologyType[];
    setTechnologyList: SetStateType<TechnologyListCtxType['technologyList']>;
    isLoading: boolean;
    isEmpty: boolean;
    isError: boolean;
    refetch: (
        options?: RefetchOptions
    ) => Promise<QueryObserverResult<null | undefined, Error>>;
};

export const TechnologyListCtx =
    React.createContext<TechnologyListCtxType | null>(null);

export const TechnologyListProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [technologyList, setTechnologyList] = React.useState<
        TechnologyListCtxType['technologyList']
    >([]);
    const [isEmpty, setIsEmpty] = React.useState(false);

    const { isLoading, isError, refetch } = useQuery({
        queryKey: ['technology-list'],
        queryFn: () => getTechnologyList(),
        refetchOnWindowFocus: false,
    });

    const getTechnologyList = async () => {
        try {
            const list = await technologieService.getTechnologyList();

            setTechnologyList(list);

            return null;
        } catch (err) {
            console.error(err);
        }
    };

    React.useEffect(() => {
        if (!isLoading) setIsEmpty(technologyList.length == 0);
    }, [technologyList, isLoading]);

    return (
        <TechnologyListCtx.Provider
            value={{
                technologyList,
                isLoading,
                isEmpty,
                isError,
                setTechnologyList,
                refetch,
            }}
        >
            {children}
        </TechnologyListCtx.Provider>
    );
};
