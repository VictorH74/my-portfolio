"use client";
import { db } from "@/configs/firebaseConfig";
import { TechnologieType } from "@/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React from "react";
import { useQuery } from "react-query";

interface CtxValue {
  technologyArray: TechnologieType[];
  setTechnologyArray: React.Dispatch<React.SetStateAction<TechnologieType[]>>;
  empty: boolean
  isLoading: boolean
}

export const TechnologiesCtx = React.createContext<CtxValue | null>(null);

const TechnologiesProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isLoading } = useQuery({
    queryKey: ["techs"],
    queryFn: () => getTechnologies()
  })

  const [empty, setNotTechnologies] = React.useState(true)
  const [technologyArray, setTechnologyArray] = React.useState<TechnologieType[]>([])

  const getTechnologies = React.useCallback(async () => {
    const q = query(collection(db, "technologies"), orderBy("index", "asc"));
    const querySnapshot = await getDocs(q);
    setTechnologyArray(querySnapshot.docs.map(doc => doc.data() as TechnologieType))
  }, [])

  React.useEffect(() => {
      if (!isLoading) setNotTechnologies(technologyArray.length == 0)
  }, [technologyArray, isLoading]);

  return (
    <TechnologiesCtx.Provider value={{ technologyArray, setTechnologyArray, empty, isLoading }}>{children}</TechnologiesCtx.Provider>
  );
};

export default TechnologiesProvider;
