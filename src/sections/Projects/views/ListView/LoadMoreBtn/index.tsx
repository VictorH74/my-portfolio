import { Loading } from '@/components/Loading';
import { useTheme } from '@/hooks/UseTheme';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface LoadMoreBtnProps {
    isLoadingMoreProjects: boolean;
    onClick(): Promise<void>;
    children: string;
}

export const LoadMoreBtn: React.FC<LoadMoreBtnProps> = (props) => {
    const { themeColor } = useTheme();

    if (props.isLoadingMoreProjects)
        return (
            <div className="mt-16 inline-block">
                <Loading />
            </div>
        );

    return (
        <button
            name="show more or less projects button"
            onMouseOver={(e) => {
                const { style } = e.currentTarget;
                style.color = 'white';
                style.backgroundColor = themeColor.color;
            }}
            onMouseLeave={(e) => {
                const { style } = e.currentTarget;
                style.color = themeColor.color;
                style.backgroundColor = 'transparent';
            }}
            className={twMerge(
                'uppercase px-4 py-3 inline-block mt-12 relative overflow-hidden border-2 text-md dark:font-medium rounded-md duration-150 font-[inherit] font-semibold border-[var(--theme-color)]'
            )}
            style={{
                color: themeColor.color,
            }}
            onClick={props.onClick}
            disabled={props.isLoadingMoreProjects}
        >
            {props.children}
        </button>
    );
};
