import { ModalContainer } from '@/components/ModalContainer';
import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import CustomCheckbox from './CustomCheckbox';
import useAddTechFormModal, {
    AddTechFormModalProps,
} from './useAddTechFormModal';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { CloseButton } from '../../../../components/CloseButton';
import { SelectFileIconButton } from '@/components/SelectFileIconButton';
import RemoveIcon from '@mui/icons-material/Remove';

export default function AddTechFormModal(props: AddTechFormModalProps) {
    const hook = useAddTechFormModal(props);

    return (
        <ModalContainer onClose={props.onClose}>
            <div className="bg-gray-200 w-full max-w-[700px] rounded-md p-3">
                <div className="text-right py-2">
                    <CloseButton onClick={props.onClose} />
                </div>
                <div className="w-fit m-auto">
                    <div className="flex gap-3">
                        <div className="p-2">
                            {hook.iconUrl ? (
                                <div className="relative">
                                    <Image
                                        loading="lazy"
                                        placeholder="empty"
                                        height={50}
                                        width={50}
                                        className="h-[8.1rem] w-auto"
                                        src={hook.iconUrl}
                                        alt="icon"
                                    />
                                    {hook.iconFileValue && (
                                        <button
                                            className="absolute inset-0 bg-red-400/70 duration-200 grid place-items-center text-white cursor-pointer hover:opacity-100 opacity-0"
                                            onClick={() => {
                                                hook.setIconFileValue(
                                                    undefined
                                                );
                                            }}
                                        >
                                            <RemoveIcon sx={{ fontSize: 50 }} />
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="h-[8.1rem] aspect-square grid place-items-center text-gray-600">
                                    <SelectFileIconButton
                                        onChange={hook.selectIconFile}
                                        icon={AddPhotoAlternateIcon}
                                        iconFontSize={50}
                                        className="bg-transparent hover:bg-gray-300 hover:text-gray-600 size-full rounded-none"
                                        accept=".png,.jpg,.jpeg,.gif,.webp"
                                    />
                                </div>
                            )}
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
                                {hook.nameValue || 'Tech name'}
                            </div>
                        </div>
                    </div>
                </div>

                <form
                    className=" mt-5 animate-scale"
                    onSubmit={hook.submitForm}
                >
                    <div className="grid grid-cols-2 gap-2 grow">
                        {hook.fieldGenerationData.map(
                            ({ className, ...inputAttrs }) => (
                                <React.Fragment key={inputAttrs.name}>
                                    <input
                                        {...inputAttrs}
                                        className={twMerge(
                                            'rounded-md bg-gray-300',
                                            className
                                        )}
                                    />
                                    {inputAttrs.name == 'iconUrl' && (
                                        <>
                                            {hook.urlValue &&
                                                hook.invalidUrl && (
                                                    <p className="col-span-2 text-sm text-red-400 font-semibold">
                                                        Invalid Icon Url
                                                    </p>
                                                )}
                                        </>
                                    )}
                                </React.Fragment>
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
