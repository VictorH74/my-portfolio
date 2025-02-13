import { PROJECT_GRADIENT_COLORS } from './constants';

export const getProjectGradient = (projectIndex: number) => {
    const gradientColorsLength = PROJECT_GRADIENT_COLORS.length;
    const factor = Math.floor(projectIndex / gradientColorsLength);

    return projectIndex - gradientColorsLength * factor;
};
