'use client';
import Image from 'next/image';

export const FooterLogo = () => {
    const goToTop = () => {
        if (window.location.hash) {
            window.history.replaceState(
                null,
                '',
                window.location.pathname + window.location.search
            );
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className="cursor-pointer relative after:absolute after:content-['Top'] after:bg-background after:top-1/2 after:left-full after:-translate-1/2 after:opacity-0 after:size-fit after:px-4 after:py-2 after:rounded-xl after:shadow-md hover:after:opacity-100 hover:after:translate-x-1/3 after:-scale-50 hover:after:scale-100 after:duration-300 after:text-dark-font after:font-semibold"
            onClick={goToTop}
        >
            <Image
                data-aos="zoom-in"
                width={85}
                height={85}
                src="me-logo-v2.svg"
                alt="logo"
                className="select-none pointer-events-none"
                style={{ width: '86px', height: 'auto' }}
            />
        </button>
    );
};
