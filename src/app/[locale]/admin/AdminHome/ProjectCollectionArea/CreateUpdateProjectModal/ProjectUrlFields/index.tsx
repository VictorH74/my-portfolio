import { ProjectType } from '@/types';

type UrlKeys<T> = {
    [K in keyof T]: K extends `${string}Url` ? K : never;
}[keyof T];

type UrlProp = Exclude<UrlKeys<ProjectType>, undefined>;

type UrlFieldData = {
    urlProp: UrlProp;
    label: string;
};

interface ProjectUrlFieldsProps {
    value(_urlProp: UrlProp): string;
    onChange(_urlProp: keyof ProjectType, _value: string): void;
}

const fieldsGenerationData: UrlFieldData[] = [
    { urlProp: 'deployUrl', label: 'Deploy URL' },
    {
        urlProp: 'repositoryUrl',
        label: 'Repository URL',
    },
    { urlProp: 'videoUrl', label: 'Video Demo URL' },
];

export const ProjectUrlFields = (props: ProjectUrlFieldsProps) => {
    return fieldsGenerationData.map((field) => (
        <div key={field.urlProp}>
            <label htmlFor={field.urlProp}>{field.label}:</label>
            <input
                id={field.urlProp}
                className="shadow-lg bg-gray-300 p-2 rounded-md outline-blue-500 autofill:none resize-none overflow-hidden w-full"
                type="url"
                value={props.value(field.urlProp)}
                placeholder={`New ${field.label}`}
                onChange={(e) =>
                    props.onChange(field.urlProp, e.currentTarget.value ?? '')
                }
            />
        </div>
    ));
};
