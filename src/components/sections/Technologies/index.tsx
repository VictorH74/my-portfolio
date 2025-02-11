export const Technologies = () => {
    return (
        <section id="technologies" className="grid place-items-center mb-52">
            <div className="max-w-default">
                <h2 className="text-[#444444] text-3xl font-semibold text-center mb-20 uppercase">
                    My Technologies
                </h2>
                <div className="flex justify-center gap-6 flex-wrap">
                    {Array(21)
                        .fill(null)
                        .map((_, i) => (
                            <div
                                key={i}
                                className="size-[170px] bg-[#2e2e2e] rounded-xl shadow-lg shrink-0 text-white"
                            ></div>
                        ))}
                </div>
            </div>
        </section>
    );
};
