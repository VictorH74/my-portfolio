import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { SxProps } from "@mui/material";
import { useTheme } from "@/hooks/UseTheme";

interface Props {
  center?: boolean
}

export default function ContactLinks(props: Props) {
  const { themeColor } = useTheme();

  const sx: SxProps = {
    fontSize: 35,
    color: themeColor,
  };

  const contacts = [
    { href: "mailto:victorh.almeida7@gmail.com", icon: <EmailIcon sx={sx} /> },
    {
      href: "https://wa.me/5586995483472",
      icon: <WhatsAppIcon sx={sx} />,
    },
    {
      href: "https://github.com/VictorH74",
      icon: <GitHubIcon sx={sx} />,
    },
    {
      href: "https://www.linkedin.com/in/victor-almeida-b720201b5/",
      icon: <LinkedInIcon sx={sx} />,
    },
  ];

  return (
    <div className={`flex flex-row gap-5 ${props.center && "justify-center"}`}>
      {contacts.map((c, i) => (
        <Link
          target="_blank"
          className="hover:brightness-125 duration-200 animate-contacts-bounce"
          style={{animationDelay: i + "00ms"}}
          key={c.href}
          href={c.href}
        >
          {c.icon}
        </Link>
      ))}
    </div>
  );
}
