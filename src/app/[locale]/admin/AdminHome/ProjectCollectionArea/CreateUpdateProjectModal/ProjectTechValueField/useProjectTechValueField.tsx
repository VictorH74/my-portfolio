import { useTechnologyList } from '@/hooks/useTechnologyList';
import { ProjectType } from '@/types';
import { Trie } from '@/utils/trie';
import React from 'react';

export interface ProjectTechValueFieldProps {
    onFoundValue(_: ProjectType['technologies']): void;
    projectTechnologies: ProjectType['technologies'];
}

export default function useProjectTechValueField(
    props: ProjectTechValueFieldProps
) {
    const [technologieValue, setTechnologieValue] = React.useState('');
    const [trieSufix, setTrieSufix] = React.useState<string>();
    const trieRef = React.useRef(new Trie());
    const techInputRef = React.useRef<HTMLInputElement>(null);
    const wordSufixSpanRef = React.useRef<HTMLSpanElement>(null);

    const { technologyList, isEmpty: emptyTechArray } = useTechnologyList();

    React.useEffect(() => {
        if (emptyTechArray) return;
        const techNames = technologyList.map((t) => t.id);
        trieRef.current.insert(techNames);
    }, [emptyTechArray, technologyList]);

    React.useEffect(() => {
        if (!technologieValue) {
            setTrieSufix(undefined);
            return;
        }

        const currenValue = technologieValue.toLowerCase();
        const trieResult = trieRef.current?.findFirstByPrefix(currenValue);
        setTrieSufix(
            !(props.projectTechnologies || []).includes(
                technologieValue + trieResult
            )
                ? trieResult
                : undefined
        );

        updateWordSufixSpanPosition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [technologieValue]);

    const updateWordSufixSpanPosition = () => {
        if (!techInputRef.current || !wordSufixSpanRef.current) return;

        const tempSpan = document.createElement('span');
        tempSpan.style.font = window.getComputedStyle(
            techInputRef.current
        ).font;
        tempSpan.textContent = techInputRef.current.value;
        document.body.appendChild(tempSpan);

        const textWidth = tempSpan.getBoundingClientRect().width;
        wordSufixSpanRef.current.style.left = textWidth + 8 + 'px';

        document.body.removeChild(tempSpan);
    };

    return {
        technologieValue,
        setTechnologieValue,
        trieSufix,
        techInputRef,
        wordSufixSpanRef,
        emptyTechArray,
        setTrieSufix,
    };
}
