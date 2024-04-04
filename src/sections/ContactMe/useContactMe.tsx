import useLanguage from "@/hooks/UseLanguage";
import { useTheme } from "@/hooks/UseTheme";
import { useForm } from "react-hook-form";
import React from "react";
import emailjs from "@emailjs/browser";
import {
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
} from "@/utils/constants";
import { contactMeSection } from "@/utils/translations";
import { TranslationLang } from "@/types";

export type Fields = "name" | "email" | "subject" | "message";
type FormValues = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

const afterRequiredPtBR = " é obrigatório";
const afterRequiredEn = " field is required";

export const errorMessages: TranslationLang = {
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

export default function useContactMe() {
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

    const onSubmit = handleSubmit((data) => {
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
    })

    const closeSuccessSnackbar = () => setOpenSuccessSnackbar(false);
    const closeErrorSnackbar = () => setOpenErrorSnackbar(false);

    return ({
        translate,
        openSuccessSnackbar,
        openErrorSnackbar,
        handleSubmit,
        onSubmit,
        lang,
        register,
        errors,
        closeSuccessSnackbar,
        closeErrorSnackbar,
        submitting,
        themeColor,
    })
}