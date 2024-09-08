import React from 'react';
import CustomCheckbox from './CustomCheckbox';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { twMerge } from 'tailwind-merge';
import { TechnologieType } from '@/types';
import { getTechDocRef } from '..';
import { doc, runTransaction, setDoc } from 'firebase/firestore';
import { db } from '@/configs/firebaseConfig';

interface AddTechFormProps {
    selectedTech: TechnologieType | null;
    setTechnologyArray: React.Dispatch<React.SetStateAction<TechnologieType[]>>;
    resetFieldsCallback(): void;
}

type FieldType = {
    placeholder: string;
    name: string;
    className: string;
    type?: string;
    pattern: string;
    value: string;
    onChange(_e: React.ChangeEvent<HTMLInputElement>): void;
};

export default function AddTechForm(props: AddTechFormProps) {
    const [submittingForm, setSubmittingForm] = React.useState(false);

    const [indexValue, setIndexValue] = React.useState<number | undefined>();
    const [urlValue, setUrlValue] = React.useState('');
    const [idValue, setIdValue] = React.useState('');
    const [nameValue, setNameValue] = React.useState('');
    const [isHidden, setIsHidden] = React.useState(false);
    const [isMain, setIsMain] = React.useState(false);

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

    const resetFields = () => {
        if (indexValue) setIndexValue(undefined);
        if (urlValue) setUrlValue('');
        if (idValue) setIdValue('');
        if (nameValue) setNameValue('');
        if (isHidden) setIsHidden(false);
        if (isMain) setIsMain(false);

        if (!!props.selectedTech) props.resetFieldsCallback();
    };

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
        setSubmittingForm(false);
    };

    return (
        <form
            className="flex flex-row mt-5 animate-scale"
            onSubmit={saveUpdateTech}
        >
            <div className="grid grid-cols-2 gap-2 grow">
                {(
                    [
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
                            onChange: (e) => setIdValue(e.currentTarget.value),
                        },
                        {
                            placeholder: 'NAME',
                            name: 'iconName',
                            className: 'grid',
                            value: nameValue,
                            onChange: (e) =>
                                setNameValue(e.currentTarget.value),
                        },
                    ] as FieldType[]
                ).map(({ className, ...ipt }) => (
                    <input
                        key={ipt.name}
                        {...ipt}
                        className={twMerge('border p-2 rounded-md', className)}
                        onFocus={(e) => e.target.select()}
                        required
                    />
                ))}
            </div>
            <div className="w-fit grosw-0 px-2 grid grid-rows-2 gap-2">
                <CustomCheckbox
                    value={isHidden}
                    onToggle={(newV) => setIsHidden(newV)}
                    label="Is hidden"
                />
                <CustomCheckbox
                    value={isMain}
                    onToggle={(newV) => setIsMain(newV)}
                    label="Is main"
                />
            </div>
            <div className="max-w-[200px] w-full grosw-0 px-2 grid grid-rows-2 gap-2">
                <button
                    className="p-2 rounded-md w-full bg-gray-200 dark:bg-[#3f3f3f]"
                    type="button"
                    onClick={resetFields}
                >
                    Reset <RestartAltIcon />
                </button>
                <button
                    className="p-2 rounded-md w-full bg-[var(--theme-color)]"
                    disabled={submittingForm}
                >
                    Save <SaveAltIcon />
                </button>
            </div>
        </form>
    );
}
