import React from 'react';

export const TechnologyListCtx = React.createContext({});

export const TechnologyListProvider = () => {
    return <TechnologyListCtx.Provider value={{}}></TechnologyListCtx.Provider>;
};
