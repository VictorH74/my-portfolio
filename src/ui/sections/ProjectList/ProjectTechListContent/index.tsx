import { IconMapType } from '@/hooks/useTechnologyIconMap';
import { ProjectType } from '@/types';
import Image from 'next/image';
import React from 'react';

import Tooltip from '@mui/material/Tooltip';
import { techItemImgWidth, techListGap } from '..';
import { useWindowResize } from '@/hooks/useWindowResize';

interface ProjectTechListProps {
    techList: ProjectType['technologies'];
    iconMap: IconMapType;
}

export const ProjectTechList: React.FC<ProjectTechListProps> = (props) => {
    const [showAllTechList, setShowAllTechList] = React.useState(false);
    const [maxItemCount, setMaxItemCount] = React.useState(0);
    const [remaingItemCount, setRemaingItemCount] = React.useState(0);

    const TechListContainerRef = React.useRef<HTMLUListElement>(null);

    const [width] = useWindowResize();

    React.useEffect(() => {
        getDisplayTechItemMaxCount(props.techList.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    const getDisplayTechItemMaxCount = (listLength: number) => {
        if (!TechListContainerRef.current) return;

        const containerWidth =
            TechListContainerRef.current.getBoundingClientRect().width;

        const itemWidth = techItemImgWidth + techListGap * 2;

        const listTotalWidth =
            itemWidth * listLength + techListGap * (listLength - 1);

        if (listTotalWidth > containerWidth) {
            // massete para resolver erro de renderização dos icones na lista 🍷🗿
            if (containerWidth < width * 0.7) {
                setTimeout(() => {
                    getDisplayTechItemMaxCount(listLength);
                }, 50);
                return;
            }

            const techListRemaingWidth = listTotalWidth - containerWidth;

            let currentXSize = 0;
            let remaingItemCount = 1;
            for (
                let currentRemaingItems = 1;
                currentXSize < techListRemaingWidth;
                currentRemaingItems++
            ) {
                currentXSize =
                    itemWidth * currentRemaingItems +
                    (currentRemaingItems - 1) * techListGap;
                remaingItemCount = currentRemaingItems;
            }

            setMaxItemCount(listLength - (remaingItemCount + 1));
            setRemaingItemCount(remaingItemCount + 1);
            return;
        }

        setMaxItemCount(listLength);
        setRemaingItemCount(0);
    };

    const toggleReamingListItemsDisplay = () => {
        setShowAllTechList((prev) => !prev);
    };

    return (
        <ul
            ref={TechListContainerRef}
            className="flex flex-wrap"
            style={{ gap: techListGap }}
        >
            {props.techList
                .slice(
                    0,
                    showAllTechList ? props.techList.length : maxItemCount
                )
                .map((techIconStr) => {
                    const techIcon = props.iconMap[techIconStr];

                    if (techIcon)
                        return (
                            <li key={techIcon.id}>
                                <Tooltip title={techIcon.name}>
                                    <div className="p-2 shadow-md rounded-md">
                                        <Image
                                            alt={techIcon.name + 'icon'}
                                            src={techIcon.src}
                                            height={techItemImgWidth}
                                            width={techItemImgWidth}
                                        />
                                    </div>
                                </Tooltip>
                            </li>
                        );
                })}
            {remaingItemCount > 0 && !showAllTechList && (
                <li className="shadow-md rounded-md">
                    <button
                        className="aspect-square font-medium text-gray-500"
                        style={{
                            width: techItemImgWidth + techListGap * 2,
                        }}
                        onClick={toggleReamingListItemsDisplay}
                    >
                        +{remaingItemCount}
                    </button>
                </li>
            )}
        </ul>
    );
};
