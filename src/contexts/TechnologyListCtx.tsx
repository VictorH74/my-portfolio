'use client';
import { db } from '@/configs/firebaseConfig';
import { TechnologType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React from 'react';

type TechnologyListCtxType = {
    technologyList: TechnologType[];
    isLoading: boolean;
    isEmpty: boolean;
    isError: boolean;
};

export const TechnologyListCtx =
    React.createContext<TechnologyListCtxType | null>(null);

export const TechnologyListProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [technologyList, setTechnologyList] = React.useState<TechnologType[]>(
        []
    );
    const [isEmpty, setIsEmpty] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    const { isLoading } = useQuery({
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

            const tempArray: TechnologType[] = [];
            querySnapshot.docs.forEach((doc) => {
                tempArray.push(doc.data() as TechnologType);
            });

            setTechnologyList(tempArray);

            return null;
        } catch (err) {
            console.error(err);
            setIsError(true);
        }
    };

    React.useEffect(() => {
        if (!isLoading) setIsEmpty(technologyList.length == 0);
    }, [technologyList, isLoading]);

    return (
        <TechnologyListCtx.Provider
            value={{ technologyList, isLoading, isEmpty, isError }}
        >
            {children}
        </TechnologyListCtx.Provider>
    );
};
