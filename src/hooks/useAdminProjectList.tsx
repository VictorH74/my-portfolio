import { adminProjectListCtx } from '@/contexts/AdminProjectListCtx';
import React from 'react';

export const useAdminProjectList = () => {
    const context = React.useContext(adminProjectListCtx);
    if (!context) throw new Error('Missing AdminProjectsProvider');

    return context;
};
