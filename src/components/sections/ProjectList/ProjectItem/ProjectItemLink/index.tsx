import Link from 'next/link';
import React from 'react';

export const ProjectItemLink: React.FC<
    { href: string } & React.PropsWithChildren
> = (props) => {
    return (
        <Link
            href={props.href}
            className="w-full flex gap-3 items-center font-medium p-2"
        >
            {props.children}
        </Link>
    );
};
