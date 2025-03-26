import { ModalContainer } from '@/components/ModalContainer';
import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import CustomCheckbox from './CustomCheckbox';
import useAddTechFormModal, {
    AddTechFormModalProps,
} from './useAddTechFormModal';
import { CloseButton } from '../../components/CloseButton';

export default function AddTechFormModal(props: AddTechFormModalProps) {
    const hook = useAddTechFormModal(props);

    return (
        <ModalContainer onClose={props.onClose}>
            <div className="bg-gray-200 w-full max-w-[700px] rounded-md p-3 animate-scale">
                <div className="text-right py-2">
                    <CloseButton onClick={props.onClose} />
                </div>
                {hook.validUrl && (
                    <div className="w-fit m-auto">
                        <div className="flex gap-3">
                            <div className="p-2">
                                <Image
                                    loading="lazy"
                                    placeholder="empty"
                                    height={50}
                                    width={50}
                                    className="h-[8.1rem] w-auto"
                                    src={hook.urlValue}
                                    alt="icon"
                                />
                            </div>

                            <div
                                className="p-2"
                                style={{
                                    backgroundColor:
                                        hook.bgColorValue ||
                                        'oklch(0.37 0.013 285.805)',
                                    color: hook.headingColorValue || 'white',
                                }}
                            >
                                <div className="h-[8.1rem] aspect-square grid place-items-center">
                                    {hook.nameValue}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <form
                    className=" mt-5 animate-scale"
                    onSubmit={hook.submitForm}
                >
                    <div className="grid grid-cols-2 gap-2 grow">
                        {hook.fieldGenerationData.map(
                            ({ className, ...inputAttrs }) => (
                                <input
                                    key={inputAttrs.name}
                                    {...inputAttrs}
                                    className={twMerge(
                                        'rounded-md bg-gray-300',
                                        className
                                    )}
                                    required
                                />
                            )
                        )}
                    </div>
                    <div className="flex my-2 flex-row gap-2">
                        {hook.checkboxGenerationData.map((data, index) => (
                            <CustomCheckbox key={index} {...data} />
                        ))}
                    </div>
                    <div className="w-full grosw-0 mt-4 flex flex-row gap-2">
                        {hook.buttonGenerationData.map(
                            ({ className, ...rest }, index) => (
                                <button
                                    key={index}
                                    className={twMerge(
                                        'p-2 rounded-md w-full cursor-pointer',
                                        className
                                    )}
                                    {...rest}
                                />
                            )
                        )}
                    </div>
                </form>
            </div>
        </ModalContainer>
    );
}
