import { twMerge } from 'tailwind-merge';

const cubeSide = {
    1: <div className="right bg-[#6bf799]">right</div>,
    2: <div className="left bg-[#ec8686]">left</div>,
    3: <div className="top bg-[#c884ff]">top</div>,
    4: <div className="bottom bg-[#5dc3fd]">bottom</div>,
};

export const Technologies = () => {
    return (
        <section
            id="technologies"
            className="grid place-items-center pb-52 bg-white"
        >
            <div className="max-w-default">
                <h2 className="text-[#444444] text-3xl font-semibold text-center mb-20 uppercase">
                    My Technologies
                </h2>
                <div className="flex justify-center gap-6 flex-wrap">
                    {Array(21)
                        .fill(null)
                        .map((_, i) => {
                            const randomNumber = Math.ceil(Math.random() * 4);

                            return (
                                <div
                                    key={i}
                                    className={twMerge(
                                        'cube-container',
                                        'cube-side-rotation-' + randomNumber
                                    )}
                                >
                                    <div className="cube">
                                        <div className="bg-[#2e2e2e] shadow-lg shrink-0 text-white front"></div>

                                        {
                                            cubeSide[
                                                randomNumber as keyof typeof cubeSide
                                            ]
                                        }
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
};
