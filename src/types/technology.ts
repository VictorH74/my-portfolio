export type TechnologyType = {
    index: number;
    id: string;
    name: string;
    src: string;
    hidden?: boolean;
    isMain?: boolean;
    color?: {
        background: string;
        heading: string;
    };
};

export type CreateTechnologyType = Omit<TechnologyType, 'index'>;

export type UpdateTechnologyType = Partial<Omit<TechnologyType, 'id'>>;
