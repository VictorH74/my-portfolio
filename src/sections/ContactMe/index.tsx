"use client";
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

const fieldDatas = [
  { name: "nameField", type: "text", preClassName: "max-md:" },
  { name: "emailField", type: "email", preClassName: "max-md:" },
  { name: "subjectField", type: "text" },
  { name: "messageField" },
];

export default function ContactMe() {
  const lang = useLanguage();
  const translate = translations[lang];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (process.env.NODE_ENV === "production") return;
    const data = new FormData(e.currentTarget);
    const [name, email, subject, message] = [
      data.get("nameField"),
      data.get("emailField"),
      data.get("subjectField"),
      data.get("messageField"),
    ];
    console.log({ name, email, subject, message });
  };

  return (
    <section id="contact-me" className="max-w-[1000px] pt-24">
      <form
        className="grid gap-3 grid-cols-2"
        onSubmit={handleSubmit}
        onClick={
          process.env.NODE_ENV === "production"
            ? () => alert("Esse formulário não está funcional no momento")
            : undefined
        }
      >
        <h1 className="section-title col-span-2">{translate.title}</h1>
        {fieldDatas.map((f) => {
          if (f.name === "messageField")
            return (
              <Textarea
                key={f.name}
                className="col-span-2"
                placeholder={translate.messageField}
                name="messageField"
              />
            );
          return (
            <Input
              key={f.name}
              className={`${f.preClassName || ""}col-span-2`}
              placeholder={translate[f.name as keyof typeof translate]}
              name={f.name}
            />
          );
        })}
        <button
          className={`${notoSans.className} bg-main-color p-3 rounded-md uppercase tracking-wider hover:brightness-125 duration-150 col-span-2`}
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
}

const inputClassName =
  "bg-second-color p-4 rounded-md outline-none focus:brightness-150 focus::shadow-lg duration-200";

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
