"use client";
import useLanguage from "@/hooks/UseLanguage";
import { useTheme } from "@/hooks/UseTheme";
import { Noto_Sans } from "next/font/google";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import emailjs from "@emailjs/browser";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from "@/utils/constants";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import Loading from "@/components/Loading";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const notoSans = Noto_Sans({ subsets: ["latin"], weight: "400" });
const inputClassName = `${notoSans.className} bg-custom-gray-dark p-4 rounded-md outline-none focus:brightness-50 dark:focus:brightness-150 focus::shadow-lg secondary-font-color duration-200 placeholder:text-custom-gray-light dark:placeholder:text-custom-zinc-light`;
const translations = {
  "pt-BR": {
    title: "Entre em Contato",
    nameField: "Nome completo",
    emailField: "Endereço de Email",
    subjectField: "Assunto",
    messageField: "Campo de Messagem",
    submitText: "Enviar",
    successSnackbarText: "Email enviado!",
    errorSnackbarText: "Houve algum erro ao enviar email",
  },
  en: {
    title: "Contact Me",
    nameField: "Full name",
    emailField: "E-mail Address",
    subjectField: "Subject Field",
    messageField: "Message Field",
    submitText: "Submit",
    successSnackbarText: "Email sent!",
    errorSnackbarText: "There was an error sending email",
  },
};

type FormValues = {
  nameField: string;
  emailField: string;
  subjectField: string;
  messageField: string;
};

const fieldDatas = [
  { name: "nameField", type: "text", row: true },
  { name: "emailField", type: "email", row: true },
  { name: "subjectField", type: "text" },
  { name: "messageField" },
];

export default function ContactMe() {
  const lang = useLanguage();
  const translate = translations[lang];
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const { themeColor } = useTheme();
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const [from_name, from_email, subject, message] = Object.values(data);
    reset();
    setSubmitting(true);
    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name, from_email, subject: subject.toUpperCase(), message },
        EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setOpenSuccessSnackbar(true);
          setSubmitting(false);
        },
        (error) => {
          console.log(error.text);
          setOpenErrorSnackbar(true);
          setSubmitting(false);
        }
      );
  };

  const closeSuccessSnackbar = () => setOpenSuccessSnackbar(false);
  const closeErrorSnackbar = () => setOpenErrorSnackbar(false);

  return (
    <section id="contact-me" className="max-w-[1000px] pt-24">
      <form
        className="grid gap-3 grid-cols-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="section-title col-span-2">{translate.title}</h1>
        {fieldDatas.map((f) => {
          if (f.name === "messageField")
            return (
              <textarea
                key={f.name}
                className={`${inputClassName} col-span-2`}
                placeholder={translate.messageField}
                rows={6}
                {...register(f.name)}
              />
            );
          return (
            <input
              key={f.name}
              className={`${inputClassName} ${
                f.row ? "max-md:col-span-2" : "col-span-2"
              }`}
              placeholder={translate[f.name as keyof typeof translate]}
              {...register(
                f.name as
                  | "nameField"
                  | "emailField"
                  | "subjectField"
                  | "messageField"
              )}
            />
          );
        })}
        <button
          className={`${notoSans.className} p-3 rounded-md text-base uppercase tracking-wider hover:brightness-125 duration-150 col-span-2 grid place-items-center`}
          type="submit"
          style={{ backgroundColor: themeColor }}
        >
          {submitting ? (
            <Loading color="#fff" width={10} height={24} />
          ) : (
            translate.submitText
          )}
        </button>
      </form>
      {[
        {
          open: openSuccessSnackbar,
          close: closeSuccessSnackbar,
          alertSeverity: "success",
          text: translate.successSnackbarText + " 👍",
        },
        {
          open: openErrorSnackbar,
          close: closeErrorSnackbar,
          alertSeverity: "error",
          text: translate.errorSnackbarText + " 😐",
        },
      ].map((d) => (
        <Snackbar
          key={d.alertSeverity}
          open={d.open}
          autoHideDuration={6000}
          onClose={d.close}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={d.close}
            severity={d.alertSeverity as AlertColor}
            sx={{ width: "100%" }}
          >
            {d.text}
          </Alert>
        </Snackbar>
      ))}
    </section>
  );
}
