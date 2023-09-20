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
import { contactMeSection } from "@/utils/translations";
import { fields } from "./data";
import { TranslationLang } from "@/types/language";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const notoSans = Noto_Sans({ subsets: ["latin"], weight: "400" });
const inputClassName = `${notoSans.className} bg-custom-gray-dark p-4 rounded-md outline-none focus:brightness-50 dark:focus:brightness-150 focus::shadow-lg secondary-font-color duration-200 placeholder:text-custom-gray-light dark:placeholder:text-custom-zinc-light w-full`;

type Fields = "name" | "email" | "subject" | "message";
type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const afterRequiredPtBR = " é obrigatório";
const afterRequiredEn = " field is required";

const errorMessages: TranslationLang = {
  "pt-BR": {
    name: "Nome" + afterRequiredPtBR,
    email: "Email" + afterRequiredPtBR,
    subject: "Assunto" + afterRequiredPtBR,
    message: "Mensagem" + afterRequiredPtBR,
  },
  en: {
    name: "Name" + afterRequiredEn,
    email: "Email" + afterRequiredEn,
    subject: "Subject" + afterRequiredEn,
    message: "Message" + afterRequiredEn,
  },
};

export default function ContactMe() {
  const lang = useLanguage();
  const translate = contactMeSection[lang];
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const { themeColor } = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

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
        {fields.map((f) => {
          if (f.name === "message")
            return (
              <div key={f.name} className="col-span-2">
                <textarea
                  className={inputClassName}
                  placeholder={translate.message}
                  rows={6}
                  {...register(f.name, { required: true })}
                />
                {errors[f.name]?.type === "required" && (
                  <p className="text-red-500" role="alert">{errorMessages[lang][f.name]}</p>
                )}
              </div>
            );
          return (
            <div
              key={f.name}
              className={`${f.row ? "max-md:col-span-2" : "col-span-2"}`}
            >
              <input
                className={inputClassName}
                placeholder={translate[f.name as keyof typeof translate]}
                {...register(f.name as Fields, { required: true })}
              />
              {errors[f.name as Fields]?.type === "required" && (
                <p className="text-red-500" role="alert">{errorMessages[lang][f.name]}</p>
              )}
            </div>
          );
        })}
        <button
          className={`${notoSans.className} p-3 rounded-md text-base uppercase tracking-wider hover:brightness-125 duration-150 col-span-2 grid place-items-center`}
          type="submit"
          style={{ backgroundColor: themeColor }}
          disabled={submitting}
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
