import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

interface Props {
  center?: boolean
}

export default function ContactLinks(props: Props) {

  const contacts = [
    { href: "mailto:victorh.almeida7@gmail.com", Icon: EmailIcon },
    {
      href: "https://wa.me/5586994702018",
      Icon: WhatsAppIcon,
    },
    {
      href: "https://github.com/VictorH74",
      Icon: GitHubIcon,
    },
    {
      href: "https://www.linkedin.com/in/victor-almeida-b720201b5/",
      Icon: LinkedInIcon,
    },
  ];

  return (
    <div className={`flex flex-row gap-5 ${props.center && "justify-center"}`}>
      {contacts.map((c, i) => (
        <Link
          target="_blank"
          className="hover:brightness-125 duration-200 animate-contacts-bounce"
          style={{ animationDelay: i + "00ms" }}
          key={c.href}
          href={c.href}
        >
          <c.Icon className="primary-font-color" sx={{
            fontSize: 35,
          }} />
        </Link>
      ))}
    </div>
  );
}
