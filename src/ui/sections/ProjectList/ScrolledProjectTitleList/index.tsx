import React from 'react';
import {
    ScrolledProjectTitleListProps,
    useScrolledProjectTitleList,
} from './useScrolledProjectTitleList';
import { createPortal } from 'react-dom';

export const ScrolledProjectTitleList: React.FC<
    ScrolledProjectTitleListProps
> = (props) => {
    const hook = useScrolledProjectTitleList(props);

    return createPortal(
        <>
            {hook.scrolledProjectTitleList.map(([id, title], index) => (
                <li key={id} className="mb-3 animate-fade-in-scale">
                    <button
                        className="bg-secondary-black py-2 px-4 text-white rounded-lg hover:scale-105 duration-200 hover:brightness-125"
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
