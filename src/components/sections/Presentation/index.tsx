export const Presentation = () => {
    return (
        <section
            id="presentation"
            className="w-full h-[calc(100vh-100px)] bg-custom-black grid place-items-center sticky top-0 -z-10 overflow-hidden"
        >
            <div className="text-white grid gap-7 font-semibold">
                <h2 className="text-7xl"> Hello!</h2>
                <h1 className="text-8xl">
                    {' '}
                    I&apos;m{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FC69] via-[#4EFFFF] via-[57%] to-[#2382FF]">
                        Victor Hugo Leal
                    </span>{' '}
                </h1>
                <h2 className="text-7xl"> A Jr Web Developer with</h2>
            </div>
        </section>
    );
};
