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
