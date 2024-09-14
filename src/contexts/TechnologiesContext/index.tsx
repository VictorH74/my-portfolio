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

const TechnologiesProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const { isLoading } = useQuery({
        queryKey: ['techs'],
        queryFn: () => getTechnologies(),
        refetchOnWindowFocus: false,
    });

    const [empty, setNotTechnologies] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [technologyArray, setTechnologyArray] = React.useState<
        TechnologieType[]
    >([]);

    const getTechnologies = React.useCallback(async () => {
        try {
            const q = query(
                collection(db, 'technologies'),
                orderBy('index', 'asc')
            );
            const querySnapshot = await getDocs(q);
            // querySnapshot.docs.forEach((doc) => console.log(doc.data()));
            setTechnologyArray(
                querySnapshot.docs.map((doc) => doc.data() as TechnologieType)
            );
        } catch (err) {
            console.error(err);
            setError(true);
        }
    }, []);

    React.useEffect(() => {
        if (!isLoading) setNotTechnologies(technologyArray.length == 0);
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

export default TechnologiesProvider;
