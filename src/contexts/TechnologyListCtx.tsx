'use client';
import { db } from '@/configs/firebaseConfig';
import { SetStateType, TechnologyType } from '@/types';
import {
    QueryObserverResult,
    RefetchOptions,
    useQuery,
} from '@tanstack/react-query';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
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
            const q = query(
                collection(db, 'technologies'),
                orderBy('index', 'asc')
            );
            const querySnapshot = await getDocs(q);

            const tempArray: TechnologyType[] = [];
            querySnapshot.docs.forEach((doc) => {
                tempArray.push(doc.data() as TechnologyType);
            });

            setTechnologyList(tempArray);

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
