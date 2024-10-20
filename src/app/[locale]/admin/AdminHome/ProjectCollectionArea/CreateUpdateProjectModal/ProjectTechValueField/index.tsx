import React from 'react';
import { twMerge } from 'tailwind-merge';

import useProjectTechValueField, {
    ProjectTechValueFieldProps,
} from './useProjectTechValueField';

export const ProjectTechValueField = (props: ProjectTechValueFieldProps) => {
    const hook = useProjectTechValueField(props);

    return (
        <div className="relative w-full">
            <span
                ref={hook.wordSufixSpanRef}
                className={twMerge(
                    'absolute inset-y-0 pointer-events-none py-2 text-gray-400 opacity-0',
                    !!hook.trieSufix && 'opacity-100'
                )}
            >
                {hook.trieSufix}
                <span className="ml-1 border rounded-sm py-[2px] px-1 border-gray-400 text-sm font-semibold">
                    Tab
                </span>
            </span>
            <input
                ref={hook.techInputRef}
                autoComplete="off"
                id="technologies"
                className="shadow-lg bg-[#444444] p-2 rounded-md outline-blue-500 resize-none overflow-hidden w-full"
                value={hook.technologieValue}
                placeholder="New technologie"
                disabled={hook.emptyTechArray}
                onKeyDown={(e) => {
                    if (e.code === 'Tab') {
                        const technologies = props.projectTechnologies || [];

                        if (hook.trieSufix !== undefined) {
                            const newValue =
                                hook.technologieValue + hook.trieSufix;
                            if (technologies.includes(newValue)) return;
                            props.onFoundValue([
                                ...technologies,
                                newValue.toLowerCase(),
                            ]);
                            hook.setTechnologieValue('');
                            hook.setTrieSufix(undefined);
                            e.preventDefault();
                        }
                    }
                }}
                onChange={(e) => {
                    const value = e.currentTarget.value;
                    if (value.length <= 20)
                        hook.setTechnologieValue(e.currentTarget.value);
                }}
            />
        </div>
    );
};
