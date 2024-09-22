import ModalContainer from '@/components/ModalContainer';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import CustomCheckbox from './CustomCheckbox';
import useAddTechFormModal, {
    AddTechFormModalProps,
} from './useAddTechFormModal';

export default function AddTechFormModal(props: AddTechFormModalProps) {
    const hook = useAddTechFormModal(props);

    return (
        <ModalContainer>
            <div className="bg-gray-200 dark:bg-[#3f3f3f] w-full max-w-[700px] rounded-md p-3 animate-scale">
                <div className="text-right py-2">
                    <button onClick={props.onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <form
                    className=" mt-5 animate-scale"
                    onSubmit={hook.saveUpdateTech}
                >
                    <div className="grid grid-cols-2 gap-2 grow">
                        {hook.fieldGenerationData.map(
                            ({ className, ...inputAttrs }) => (
                                <input
                                    key={inputAttrs.name}
                                    {...inputAttrs}
                                    className={twMerge(
                                        'border p-2 rounded-md',
                                        className
                                    )}
                                    onFocus={(e) => e.target.select()}
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
                                        'p-2 rounded-md w-full',
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
