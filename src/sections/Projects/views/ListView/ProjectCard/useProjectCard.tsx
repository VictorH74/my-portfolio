'use client';
import { useGlobalTechnologies } from '@/hooks/useGlobalTechnologies';
import { useTheme } from '@/hooks/UseTheme';
import { ProjectType } from '@/types';
import React from 'react';

export default function useProjectCard(project: ProjectType) {
    const { technologyArray, empty } = useGlobalTechnologies();
    const [video, setShowVideo] = React.useState(false);

    const [loadingImg, setLoadingImg] = React.useState(
        !!project.screenshots.length
    );
    const id = React.useId();
    const { themeColor } = useTheme();

    const icons = empty
        ? undefined
        : project.technologies.map((name) =>
              technologyArray.find((icon) => icon.id === name)
          );

    const showVideo = () => setShowVideo(true);

    const hiddenVideo = () => setShowVideo(false);

    return {
        video,
        loadingImg,
        id,
        themeColor,
        icons,
        showVideo,
        hiddenVideo,
        setLoadingImg,
    };
}
