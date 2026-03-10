import Link from 'next/link';
import React from 'react';

export const urlActionClassName =
    'w-full flex gap-3 items-center font-medium p-2 hover:brightness-110 hover:scale-105 hover:bg-white hover:shadow-md duration-200';

export const ProjectItemLink: React.FC<
    { href: string } & React.PropsWithChildren
> = (props) => {
    return (
        <Link href={props.href} className={urlActionClassName} target="_blank">
            {props.children}
        </Link>
    );
};
