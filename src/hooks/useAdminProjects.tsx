import { adminProjectsCtx } from '@/contexts/AdminProjectsContext';
import React from 'react';

export const useAdminProjects = () => {
    const context = React.useContext(adminProjectsCtx);
    if (!context) throw new Error('Missing AdminProjectsProvider');

    return context;
};
