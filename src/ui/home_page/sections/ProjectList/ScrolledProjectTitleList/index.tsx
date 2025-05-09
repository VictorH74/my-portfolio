import React from 'react';
import { createPortal } from 'react-dom';

import {
    ScrolledProjectTitleListProps,
    useScrolledProjectTitleList,
} from './useScrolledProjectTitleList';

export const ScrolledProjectTitleList: React.FC<
    ScrolledProjectTitleListProps
> = (props) => {
    const hook = useScrolledProjectTitleList(props);

    return createPortal(
        <>
            {hook.scrolledProjectTitleList.map(([id, title], index) => (
                <li key={id} className="animate-fade-in-scale">
                    <button
                        className="bg-secondary-black py-2 px-4 text-white rounded-tl-2xl rounded-tr-md rounded-br-2xl rounded-bl-md hover:scale-105 duration-200 hover:brightness-125 shadow-[2px_2px_8px_#00000042]"
                        onClick={() => {
                            const _projects =
                                document.getElementsByClassName('project-item');

                            const _scrolledProjectListLength =
                                hook.scrolledProjectTitleList.length;

                            let scrollDecriaseFactor: number = 0;

                            const scrollDecrementValue =
                                window.scrollY -
                                window.innerHeight *
                                    (_scrolledProjectListLength - index);

                            const topFromItem = (el: Element) =>
                                el.getBoundingClientRect().top;

                            const nextItem =
                                _projects[_scrolledProjectListLength];

                            const nextOfNextItem =
                                _projects[_scrolledProjectListLength + 1];

                            if (nextOfNextItem) {
                                scrollDecriaseFactor =
                                    window.innerHeight -
                                    topFromItem(nextOfNextItem);
                            } else if (nextItem) {
                                scrollDecriaseFactor =
                                    topFromItem(nextItem) * -1;
                            }

                            window.scrollTo({
                                top:
                                    scrollDecrementValue - scrollDecriaseFactor,
                                behavior: 'smooth',
                            });
                        }}
                    >
                        {title}
                    </button>
                </li>
            ))}
        </>,
        document.getElementById('scrolled-project-name-list-container') ||
            document.body
    );
};
