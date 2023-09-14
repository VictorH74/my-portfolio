import emailIcon from "@/assets/svg/gmail-icon.svg"
import whatsappIcon from "@/assets/svg/whatsapp-icon.svg"
import linkedinIcon from "@/assets/svg/linkedin-icon.svg"
import githubIcon from "@/assets/svg/github-icon.svg"
import discordIcon from "@/assets/svg/discord-icon.svg"

export const contactIcons = [
    {
        icon: emailIcon,
        link: "mailto:victorh.almeida7@gmail.com",
        alt: "github icon"
    },
    {
        icon: whatsappIcon,
        link: "https://wa.me/5586995483472",
        alt: "whatsapp icon"
    },
    {
        icon: linkedinIcon,
        link: "https://www.linkedin.com/in/victor-almeida-b720201b5/",
        alt: "linkedin icon"
    },
    {
        icon: githubIcon,
        link: "https://github.com/VictorH74",
        alt: "github icon"
    },
    {
        icon: discordIcon,
        link: "https://www.google.com",
        alt: "discord icon"
    },
];

export const inputs = [
    { name: "nome", type: "text" },
    { name: "email", type: "email" },
    { name: "assunto", type: "text" },
    { name: "messagem", as: "textarea", row: 4 },
]