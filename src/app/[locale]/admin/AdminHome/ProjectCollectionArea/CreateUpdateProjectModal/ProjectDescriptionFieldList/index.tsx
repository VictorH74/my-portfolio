import { LangType, ProjectType } from '@/types';
import { LANGUAGES } from '@/utils/server-constants';

import ProjectDescriptionField from './ProjectDescriptionField';

interface ProjectDescriptionFieldListProps {
    projectDescription: ProjectType['description'];
    onFieldChange(_lang: LangType, _value: string): void;
}

export const ProjectDescriptionFieldList = (
    props: ProjectDescriptionFieldListProps
) => {
    return LANGUAGES.map((lang) => (
        <ProjectDescriptionField
            key={lang}
            lang={lang}
            onChange={(value) => props.onFieldChange(lang, value)}
            value={props.projectDescription?.[lang] ?? ''}
        />
    ));
};
