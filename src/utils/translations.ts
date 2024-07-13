export const presentationSection = {
    "pt-BR": {
        iAm: "Olá! Eu sou",
        text_3: "Um Desenvolvedor de Software Jr",
        text_4: "@ FullStack",
        with: "com"
    },
    en: {
        iAm: "Hello! I'm",
        text_3: "A Mid Software Developer",
        text_4: "@ FullStack",
        with: "with"
    },
};

export const aboutMeSection = {
    "pt-BR": {
        title: "Me conheça",
        paragraphs: [
            "Iniciei minha jornada na programação em 2020 quando ingressei no curso de Ciência da Computação na faculdade. No entanto, devido à pandemia e outros fatores, tomei a decisão de interromper meus estudos, após concluir o 5º período. A experiência acadêmica proporcionou uma sólida base em desenvolvimento de software, algo que se tornou fundamental para minha jornada autodidata.",

            "A programação se tornou um verdadeiro hobby. A maior parte do meu tempo livre é dedicada à leitura de artigos e documentações sobre as mais recentes tecnologias. Acredito firmemente que essa dedicação constante me impulsionará para o sucesso no futuro.",

            "Me mantenho motivado e estou sempre aberto a aprender novas tecnologias ou adquirir qualquer conhecimento e experiência necessária para meu crescimento profissional. Minha disposição para enfrentar desafios e abraçar oportunidades de aprendizado é uma característica que me impulsiona constantemente na minha jornada.",
        ],
        downloadResumeBtnText: "Baixar Currículo",
        resumeSizeText: "Tamanho",
    },
    en: {
        title: "About Me",
        paragraphs: [
            "I started my programming journey in 2020 when I enrolled in the Computer Science course at college. However, due to the pandemic and other factors, I made the decision to interrupt my studies after completing the 5th period. The academic experience provided a solid foundation in software development, something that became fundamental to my self-taught journey.",

            "Programming has become a real hobby. Most of my free time is dedicated to reading articles and documentation about the latest technologies. I firmly believe that this constant dedication will propel me to success in the future.",

            "I stay motivated and am always open to learning new technologies or acquiring any knowledge and experience necessary for my professional growth. My willingness to face challenges and embrace learning opportunities is a characteristic that constantly drives me on my journey.",
        ],
        downloadResumeBtnText: "Download Resume",
        resumeSizeText: "Size",
    },
};

export const experienceSection = {
    "pt-BR": {
        title: "Experiência",
        experience: [
            {
                title: "Desenvolvedor Web Jr | 99freelas",
                duration: "Jul/2022 - Fev/2023",
                paragraphs: [
                    "Todos os projetos, concluí usando a biblioteca React.js",
                    "Fui responsável por desenvolver tanto o front-end quanto o Backend em Django e Docker para um cliente, onde foram utilizados diversas ferramentas externas como o sistema de pagamento digital do pagar.me para assinaturas premiums na aplicação",
                    "Participei de um projeto onde fui responsável por migrar todo o front-end da aplicação do cliente de Django para React. Além disso, introduzi o GraphQL na API Django",
                ],
            },
            {
                title: "Estágio TI | Cabrália",
                duration: "Ago/2021 - Jan/2022",
                paragraphs: [
                    "Pequena empresa na minha cidade onde atuei como estagiario",
                    "Fui responsável por fazer a manutenção e administração de entrada e saída dos equipamentos da empresa e implementações básicas de funcionalidade do backend em java da aplicação da empresa",
                    "Primeiro contato com a linguagem Java usando o framework Spring Boot",
                ],
            },
        ],
    },
    en: {
        title: "Experience",
        experience: [
            {
                title: "Web Developer Jr | 99freelas",
                duration: "Jul/2022 - Feb/2023",
                paragraphs: [
                    "All projects, I completed using the React.js library",
                    "I was responsible for developing both the front-end and backend in Django and Docker for a client, where several external tools were used such as the pay.me digital payment system for premium subscriptions in the application",
                    "I participated in a project where I was responsible for migrating the entire front-end of the client application from Django to React. Additionally, I introduced GraphQL into the Django API",
                ],
            },
            {
                title: "IT Internship | Cabrália",
                duration: "aug/2021 - jan/2022",
                paragraphs: [
                    "Small company in my city where I worked as an intern",
                    "I was responsible for maintaining and administering the input and output of the company's equipment and basic implementations of backend functionality in Java for the company's application",
                    "First contact with the Java language using the Spring Boot framework",
                ],
            },
        ]
    },
}

export const projectsSection = {
    "pt-BR": {
        title: "Veja meus projetos!",
        showMoreOn: "mostrar menos",
        showMoreOff: "mostrar tudo",
    },
    en: {
        title: "See my projects!",
        showMoreOn: "show less",
        showMoreOff: "show all",
    },
};

export const projectItem = (projectDescription: { PT: string; EN: string }) => ({
    "pt-BR": {
        skillsTitle: "Habilidades usada",
        productionLinkText: "Demostração",
        repoLinkText: "Repositório do github",
        projectDescription: projectDescription.PT,
    },
    en: {
        skillsTitle: "Skills used",
        productionLinkText: "Demo",
        repoLinkText: "Github repository",
        projectDescription: projectDescription.EN,
    },
});

export const contactMeSection = {
    "pt-BR": {
        title: "Entre em Contato",
        name: "Nome completo",
        email: "Endereço de Email",
        subject: "Assunto",
        message: "Campo de Messagem",
        submitText: "Enviar",
        successSnackbarText: "Email enviado!",
        errorSnackbarText: "Houve algum erro ao enviar o email",
    },
    en: {
        title: "Contact Me",
        name: "Full name",
        email: "E-mail Address",
        subject: "Subject Field",
        message: "Message Field",
        submitText: "Submit",
        successSnackbarText: "Email sent!",
        errorSnackbarText: "There was an error sending email",
    },
};

export const contactsSection = {
    "pt-BR": {
        time: "Tempo decorrido",
        footerParagraph: "criado por Victor Almeida em 2022",
        seconds: "segundos",
        minutes: "minutos",
    },
    en: {
        time: "Elapsed time",
        footerParagraph: "create by Victor Almeida in 2022",
        seconds: "seconds",
        minutes: "minutes",
    },
};
