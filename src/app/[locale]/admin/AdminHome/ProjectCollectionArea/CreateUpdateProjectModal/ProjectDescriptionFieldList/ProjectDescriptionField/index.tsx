import { TextArea } from '@/components/TextArea';
import { useAi } from '@/hooks/useAi';
import { LangType } from '@/types';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import GeminiAiButton from './GeminiAiButton';

interface ProjectDescriptionFieldProps {
    lang: LangType;
    value: string;
    onChange(_value: string): void;
}

export default function ProjectDescriptionField(
    props: ProjectDescriptionFieldProps
) {
    const uppercaseLang = React.useMemo(
        () => props.lang.slice(0, 2).toUpperCase(),
        [props.lang]
    );
    const {
        responseText,
        done,
        generateContentStream,
        resetResponseText,
        stopResponse,
    } = useAi();

    return (
        <div className="flex items-centers gap-2 mb-2" key={props.lang}>
            <div className="py-2">
                <label
                    className="font-semibold text-sm uppercase"
                    htmlFor={`description${uppercaseLang}`}
                >
                    {uppercaseLang}
                </label>
            </div>

            <div className="w-full h-fit">
                <TextArea
                    required
                    id={`description${uppercaseLang}`}
                    className="w-full"
                    value={props.value}
                    placeholder="New description (PT)"
                    onChange={props.onChange}
                />
                {responseText && (
                    <>
                        <div className="w-full p-2 border-2 border-custom-gray-light relative rounded-md bg-custom-gray-light mb-2">
                            {done && (
                                <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/20 duration-200 flex items-center justify-center gap-3">
                                    {[
                                        {
                                            label: 'Replace current',
                                            className:
                                                'bg-gradient-to-r from-[#765C9E] to-[#1D99D7]',
                                            onClick: () => {
                                                props.onChange(responseText);
                                                resetResponseText();
                                            },
                                        },
                                        {
                                            label: 'Cancel',
                                            className: 'bg-red-400',
                                            onClick: resetResponseText,
                                        },
                                    ].map((data) => (
                                        <button
                                            key={data.label}
                                            className={twMerge(
                                                'py-1 px-2 rounded-md duration-200 hover:brightness-110 hover:scale-105 text-white shadow-md',
                                                data.className
                                            )}
                                            type="button"
                                            onClick={data.onClick}
                                        >
                                            {data.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <p>{responseText}</p>
                        </div>
                        {!done && (
                            <div className="w-full text-center">
                                <button
                                    className="py-1 px-3 bg-custom-gray-light font-semibold rounded-md"
                                    type="button"
                                    onClick={stopResponse}
                                >
                                    Stop Generating
                                </button>
                            </div>
                        )}
                    </>
                )}
                {props.value && (
                    <GeminiAiButton
                        onClick={() => {
                            generateContentStream(
                                'retorne o texto de forma aprimorada sem formatação de texto e entre 2 a 6 linhas: ' +
                                    props.value
                            );
                        }}
                    />
                )}
            </div>
        </div>
    );
}
