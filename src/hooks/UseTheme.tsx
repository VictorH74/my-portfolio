import { ThemeContext } from '@/contexts/ThemeColor';
import React from 'react';

export const useTheme = () => React.useContext(ThemeContext);
