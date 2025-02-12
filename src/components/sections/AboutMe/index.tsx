import { twMerge } from 'tailwind-merge';

export const AboutMe = () => {
    return (
        <section
            id="about-me"
            className="grid place-items-center py-52 relative bg-white"
        >
            <div className="max-w-default">
                <div className="flex gap-5 justify-center items-center">
                    <div className="size-[380px] aspect-square bg-[#2e2e2e] rounded-2xl"></div>
                    <div className="overflow-auto w-fit text-[#444444] font-medium">
                        <h2 className="text-4xl">Victor Leal</h2>
                        <h3 className="text-2xl">Junior Web Developer</h3>
                        <div className={twMerge('space-y-2 mt-3')}>
                            <p>
                                Iniciei minha jornada em 2020 quando ingressei
                                no curso de Ciência da Computação na faculdade.
                                No entanto, devido à pandemia e outros fatores,
                                tomei a decisão de interromper meus estudos,
                                após concluir o 5º período. A experiência
                                acadêmica proporcionou uma sólida base em
                                desenvolvimento de software, algo que se tornou
                                fundamental para minha jornada autodidata.
                            </p>
                            <p>
                                A programação se tornou um verdadeiro hobby. Boa
                                parte do meu tempo livre é dedicada à leitura de
                                artigos e documentações sobre as mais recentes
                                tecnologias. Acredito firmemente que essa
                                dedicação constante me impulsionará para o
                                sucesso no futuro.
                            </p>
                            <p>
                                Me mantenho motivado e estou sempre aberto a
                                aprender novas tecnologias ou adquirir o
                                conhecimento e experiência necessária para meu
                                crescimento profissional. Estou sempre a
                                disposição para enfrentar desafios e abraçar
                                oportunidades de aprendizado
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-10 items-center mt-7">
                    <div className="w-full h-[3px] bg-[#2e2e2e]" />
                    <button className="w-fit shrink-0 px-8 py-5 rounded-full uppercase bg-[#2e2e2e] text-white font-medium">
                        Download Resume
                    </button>
                    <div className="w-full h-[3px] bg-[#2e2e2e]" />
                </div>
            </div>
        </section>
    );
};
