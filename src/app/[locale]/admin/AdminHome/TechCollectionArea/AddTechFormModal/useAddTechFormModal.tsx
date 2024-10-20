import { db } from '@/configs/firebaseConfig';
import { BtnAttrType, TechnologieType } from '@/types';
import GradeIcon from '@mui/icons-material/Grade';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { doc, runTransaction, setDoc } from 'firebase/firestore';
import React from 'react';

import { CustomCheckboxProps } from './CustomCheckbox';
import { getTechDocRef } from '../useTechnologiesArea';

export interface AddTechFormModalProps {
    selectedTech: TechnologieType | null;
    setTechnologyArray: React.Dispatch<React.SetStateAction<TechnologieType[]>>;
    resetFieldsCallback(): void;
    onClose(): void;
}

export default function useAddTechFormModal(props: AddTechFormModalProps) {
    const [submittingForm, setSubmittingForm] = React.useState(false);

    const [indexValue, setIndexValue] = React.useState<number | undefined>();
    const [urlValue, setUrlValue] = React.useState('');
    const [idValue, setIdValue] = React.useState('');
    const [nameValue, setNameValue] = React.useState('');
    const [isHidden, setIsHidden] = React.useState(false);
    const [isMain, setIsMain] = React.useState(false);
    const [idFieldModified, setIdFieldModified] = React.useState(false);

    const validUrl = React.useMemo(() => {
        try {
            new URL(urlValue);
            return true;
        } catch {
            return false;
        }
    }, [urlValue]);

    React.useEffect(() => {
        if (!props.selectedTech) return;

        const seedFieldsWithSelectedTech = (tech: TechnologieType) => {
            setIndexValue(tech.index);
            setUrlValue(tech.src);
            setIdValue(tech.id);
            setNameValue(tech.name);
            setIsHidden(!!tech.hidden);
            setIsMain(!!tech.isMain);
        };

        seedFieldsWithSelectedTech(props.selectedTech);
    }, [props.selectedTech]);

    const resetFields = React.useCallback(() => {
        if (indexValue) setIndexValue(undefined);
        if (urlValue) setUrlValue('');
        if (idValue) setIdValue('');
        if (nameValue) setNameValue('');
        if (isHidden) setIsHidden(false);
        if (isMain) setIsMain(false);

        if (!!props.selectedTech) props.resetFieldsCallback();
    }, [idValue, indexValue, isHidden, isMain, nameValue, props, urlValue]);

    const saveTech = async (techData: Omit<TechnologieType, 'index'>) => {
        const collectionSizeRef = doc(db, 'counts', 'technologies');
        await runTransaction(db, async (transaction) => {
            const collectionCount = await transaction.get(collectionSizeRef);

            if (!collectionCount.exists()) {
                throw 'Document does not exist!';
            }

            const collectionSize = collectionCount.data().total as number;
            const docRef = getTechDocRef(techData.id);
            const newTech = { ...techData, index: collectionSize };
            await setDoc(docRef, newTech);
            props.setTechnologyArray((prev) => [...prev, newTech]);
            transaction.update(collectionSizeRef, {
                total: collectionSize + 1,
            });
        });
    };

    const saveUpdateTech = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmittingForm(true);
        const techData: Omit<TechnologieType, 'index'> = {
            src: urlValue,
            id: idValue,
            name: nameValue,
        };

        if (isHidden) techData.hidden = isHidden;
        if (isMain) techData.isMain = isMain;

        if (indexValue) {
            const docRef = getTechDocRef(techData.id);
            await setDoc(docRef, { ...techData, index: indexValue });

            props.setTechnologyArray((prev) =>
                prev.map((t) =>
                    t.index == indexValue ? { ...t, ...techData } : t
                )
            );
        } else {
            saveTech(techData);
        }

        resetFields();
        props.onClose();
        setSubmittingForm(false);
    };

    const fieldGenerationData = React.useMemo<
        React.InputHTMLAttributes<HTMLInputElement>[]
    >(
        () => [
            {
                placeholder: 'URL',
                name: 'iconUrl',
                type: 'url',
                className: 'col-span-2',
                pattern: 'https?://.+',
                value: urlValue,
                onChange: (e) => setUrlValue(e.currentTarget.value),
            },
            {
                placeholder: 'ID',
                name: 'iconId',
                className: 'grid',
                pattern: '[a-z]*',
                value: idValue,
                disabled: !!indexValue,
                onChange: (e) => {
                    const currentV = e.currentTarget.value;
                    setIdValue(currentV);
                    if (!idFieldModified) setIdFieldModified(true);
                    else if (!currentV) setIdFieldModified(false);
                },
            },
            {
                placeholder: 'NAME',
                name: 'iconName',
                className: 'grid',
                value: nameValue,
                onChange: (e) => {
                    const value = e.currentTarget.value;
                    setNameValue(value);
                    if (!indexValue && !idFieldModified) {
                        setIdValue(value.toLowerCase().replaceAll(' ', '_'));
                    }
                },
            },
        ],
        [urlValue, idValue, nameValue, idFieldModified, indexValue]
    );

    const checkboxGenerationData = React.useMemo<CustomCheckboxProps[]>(
        () => [
            {
                checked: isHidden,
                onToggle: (newV) => setIsHidden(newV),
                label: (
                    <>
                        <VisibilityOffIcon /> Is hidden
                    </>
                ),
            },
            {
                checked: isMain,
                onToggle: (newV) => setIsMain(newV),
                label: (
                    <>
                        <GradeIcon /> Is main
                    </>
                ),
            },
        ],
        [isHidden, isMain]
    );
    const buttonGenerationData = React.useMemo<BtnAttrType[]>(
        () => [
            {
                type: 'button',
                onClick: resetFields,
                className: 'bg-custom-gray-light',
                children: (
                    <>
                        Reset <RestartAltIcon />
                    </>
                ),
            },
            {
                className: 'bg-[var(--theme-color)]',
                disabled: submittingForm,
                children: (
                    <>
                        Save <SaveAltIcon />
                    </>
                ),
            },
        ],
        [submittingForm, resetFields]
    );

    return {
        checkboxGenerationData,
        fieldGenerationData,
        buttonGenerationData,
        saveUpdateTech,
        validUrl,
        urlValue,
        setUrlValue,
        idValue,
        setIdValue,
        nameValue,
        setNameValue,
        isHidden,
        setIsHidden,
        isMain,
        setIsMain,
        resetFields,
        submittingForm,
    };
}
