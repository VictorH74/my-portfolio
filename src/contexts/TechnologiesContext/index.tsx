'use client';
import { db } from '@/configs/firebaseConfig';
import { TechnologieType } from '@/types';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React from 'react';
import { useQuery } from 'react-query';

interface CtxValue {
    technologyArray: TechnologieType[];
    setTechnologyArray: React.Dispatch<React.SetStateAction<TechnologieType[]>>;
    empty: boolean;
    error: boolean;
    isLoading: boolean;
}

export const TechnologiesCtx = React.createContext<CtxValue | null>(null);

export const TechnologiesProvider = ({ children }: React.PropsWithChildren) => {
    const { isLoading } = useQuery({
        queryKey: ['techs'],
        queryFn: () => getTechnologies(),
        refetchOnWindowFocus: false,
    });

    const [empty, setEmpty] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [technologyArray, setTechnologyArray] = React.useState<
        TechnologieType[]
    >([]);

    const getTechnologies = async () => {
        try {
            const q = query(
                collection(db, 'technologies'),
                orderBy('index', 'asc')
            );
            const querySnapshot = await getDocs(q);

            const tempArray: TechnologieType[] = [];
            querySnapshot.docs.forEach((doc) => {
                tempArray.push(doc.data() as TechnologieType);
            });
            setTechnologyArray(tempArray);
        } catch (err) {
            console.error(err);
            setError(true);
        }
    };

    React.useEffect(() => {
        if (!isLoading) setEmpty(technologyArray.length == 0);
    }, [technologyArray, isLoading]);

    return (
        <TechnologiesCtx.Provider
            value={{
                technologyArray,
                setTechnologyArray,
                empty,
                error,
                isLoading,
            }}
        >
            {children}
        </TechnologiesCtx.Provider>
    );
};
