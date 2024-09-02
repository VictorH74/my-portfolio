'use client';
import React from 'react';
import useLanguage from '@/hooks/UseLanguage';
import { useTheme } from '@/hooks/UseTheme';
import useTechnologies from '@/hooks/UseTechnologies';
import { projectItem } from '@/utils/translations';
import { ProjectType } from '@/types';

export default function useProjectCard(project: ProjectType) {
    const { technologyArray } = useTechnologies();
    const [video, setShowVideo] = React.useState(false);

    const [loadingImg, setLoadingImg] = React.useState(
        !!project.screenshots.length
    );
    const id = React.useId();
    const lang = useLanguage();
    const { themeColor } = useTheme();
    const translate = projectItem(project.description)[lang];

    const icons = project.technologies.map((name) =>
        technologyArray.find((icon) => icon.id === name)
    );

    const showVideo = () => setShowVideo(true);

    const hiddenVideo = () => setShowVideo(false);

    return {
        video,
        loadingImg,
        id,
        themeColor,
        translate,
        icons,
        showVideo,
        hiddenVideo,
        setLoadingImg,
    };
}
