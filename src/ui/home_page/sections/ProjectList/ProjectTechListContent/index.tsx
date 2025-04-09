import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import React from 'react';

import { techItemImgWidth, techListGap } from '..';
import {
    ProjectTechListProps,
    useProjectTechListContent,
} from './useProjectTechListContent';

export const ProjectTechList: React.FC<ProjectTechListProps> = (props) => {
    const hook = useProjectTechListContent(props);

    return (
        <ul
            ref={hook.TechListContainerRef}
            className="flex flex-wrap"
            style={{ gap: techListGap }}
        >
            {hook.visibleTechList.map((techIconStr, index) => {
                const techIcon = props.iconMap[techIconStr];
                const itemAnimationDelayFactor =
                    index >= hook.maxItemCount ? index - hook.maxItemCount : 0;

                if (techIcon)
                    return (
                        <li
                            key={techIcon.id}
                            className="animate-fade-in-scale-forwards opacity-0"
                            style={{
                                animationDelay:
                                    100 * itemAnimationDelayFactor + 'ms',
                            }}
                        >
                            <Tooltip title={techIcon.name}>
                                <div className="p-2 shadow-md rounded-md">
                                    <Image
                                        alt={techIcon.name + ' icon'}
                                        src={techIcon.src}
                                        height={techItemImgWidth}
                                        width={techItemImgWidth}
                                    />
                                </div>
                            </Tooltip>
                        </li>
                    );
            })}
            {hook.remaingItemCount > 0 && !hook.showAllTechList && (
                <li className="shadow-md rounded-md">
                    <button
                        className="aspect-square font-medium text-gray-500"
                        style={{
                            width: techItemImgWidth + techListGap * 2,
                        }}
                        onClick={hook.toggleReamingListItemsDisplay}
                    >
                        +{hook.remaingItemCount}
                    </button>
                </li>
            )}
        </ul>
    );
};
