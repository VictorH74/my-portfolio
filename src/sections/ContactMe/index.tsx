"use client"
import useLanguage from "@/hooks/UseLanguage";
import { Noto_Sans } from "next/font/google";
import React from "react";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: "400" });

const translations = {
  "pt-BR": {
    title: "Entre em Contato",
    nameField: "Nome completo",
    emailField: "Endereço de Email",
    subjectField: "Assunto",
    messageField: "Campo de Messagem",
    submitText: "Enviar",
  },
  en: {
    title: "Contact Me",
    nameField: "Submit",
    emailField: "E-mail Address",
    subjectField: "Subject Field",
    messageField: "Message Field",
    submitText: "Submit",
  },
};

export default function ContactMe() {
  const lang = useLanguage();
  const translate = translations[lang];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (process.env.NODE_ENV === "production") return;
    const data = new FormData(e.currentTarget);
    const [name, email, subject, message] = [
      data.get("name"),
      data.get("email"),
      data.get("subject"),
      data.get("message"),
    ];
    console.log({ name, email, subject, message });
  };

  return (
    <section id="contact-me" className="max-w-[1000px] pt-24">
      <form
        className=" grid gap-3"
        onSubmit={handleSubmit}
        onClick={
          process.env.NODE_ENV === "production"
            ? () => alert("Esse formulário está funcional no momento")
            : undefined
        }
      >
        <h1 className="section-title">{translate.title}</h1>
        <div className="flex gap-3 w-full flex-wrap">
          <Input
            type="text"
            placeholder={translate.nameField}
            name="name"
            onChange={(e) => {}}
            className="grow"
          />
          <Input
            type="email"
            placeholder={translate.emailField}
            name="email"
            onChange={() => {}}
            className="grow"
          />
        </div>
        <Input
          type="text"
          placeholder={translate.subjectField}
          name="subject"
          onChange={() => {}}
        />
        <Textarea
          placeholder={translate.messageField}
          name="message"
          onChange={() => {}}
        />
        <button
          className={`${notoSans.className} bg-main-color p-3 rounded-md uppercase tracking-wider hover:brightness-125 duration-150`}
        >
          {translate.submitText}
        </button>
      </form>
    </section>
  );
}

interface InputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const inputClassName = "bg-second-color p-4 rounded-md outline-none focus:brightness-150 focus::shadow-lg duration-200";

const Input = ({ className, ...props }: InputProps) => (
  <input
    required
    className={`${inputClassName} ${className} ${notoSans.className}`}
    {...props}
  />
);

const Textarea = ({ className, ...props }: Omit<InputProps, "type">) => (
  <textarea
    className={`${inputClassName} ${className} ${notoSans.className}`}
    {...props}
    rows={6}
  />
);
