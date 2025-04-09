import { IconMapType } from '@/hooks/useTechnologyIconMap';
import { useWindowResize } from '@/hooks/useWindowResize';
import { ProjectType } from '@/types';
import React from 'react';

import { techItemImgWidth, techListGap } from '..';

export interface ProjectTechListProps {
    techList: ProjectType['technologies'];
    iconMap: IconMapType;
}

export const useProjectTechListContent = (props: ProjectTechListProps) => {
    const [showAllTechList, setShowAllTechList] = React.useState(false);
    const [maxItemCount, setMaxItemCount] = React.useState(0);
    const [remaingItemCount, setRemaingItemCount] = React.useState(0);

    const TechListContainerRef = React.useRef<HTMLUListElement>(null);

    const [width] = useWindowResize();

    const visibleTechList = React.useMemo(() => {
        if (showAllTechList) return props.techList;

        return props.techList.slice(0, maxItemCount);
    }, [showAllTechList, maxItemCount, props]);

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

    return {
        TechListContainerRef,
        showAllTechList,
        maxItemCount,
        remaingItemCount,
        visibleTechList,
        toggleReamingListItemsDisplay,
    };
};
