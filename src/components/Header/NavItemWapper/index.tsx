import { twMerge } from 'tailwind-merge';

export type WapperDimensionsType = {
    width: number;
    height: number;
    left: number;
};

interface NavItemWapperProps {
    wrapperDimensions: WapperDimensionsType;
    showWrapper: boolean;
}

export default function NavItemWapper(props: NavItemWapperProps) {
    return (
        <div
            className={twMerge(
                'absolute rounded-[20px] duration-200 pointer-events-none z-[3] bg-[#f7f7f7] dark:bg-[#d6d6d6] outline outline-2 outline-[var(--theme-color)] shadow-md',
                props.showWrapper && 'block'
            )}
            style={{
                ...props.wrapperDimensions,
            }}
        />
    );
}
