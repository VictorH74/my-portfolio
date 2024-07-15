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
    {
      href: "mailto:victorh.almeida7@gmail.com",
      Icon: EmailIcon,
      arialLabel: "link to owner email"
    },
    {
      href: "https://wa.me/5586994702018",
      Icon: WhatsAppIcon,
      arialLabel: "link to owner whatsapp chat"
    },
    {
      href: "https://github.com/VictorH74",
      Icon: GitHubIcon,
      arialLabel: "link to owner github profile"
    },
    {
      href: "https://www.linkedin.com/in/victor-almeida-b720201b5/",
      Icon: LinkedInIcon,
      arialLabel: "link to owner linkedin profile"
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
          aria-label={c.arialLabel}
        >
          <c.Icon className="primary-font-color" sx={{
            fontSize: 35,
          }} />
        </Link>
      ))}
    </div>
  );
}
