import { useTheme } from '@/hooks/UseTheme';
import { useForm } from 'react-hook-form';
import React from 'react';
import emailjs from '@emailjs/browser';
import {
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
} from '@/utils/constants';

export type Fields = 'name' | 'email' | 'subject' | 'message';
export type FormValues = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

// const sendEmailData = async (_: unknown, formData: FormData) => {
//     const from_name = formData.get('name') as string;
//     const from_email = formData.get('email') as string;
//     const subject = formData.get('subject') as string;
//     const message = formData.get('message') as string;

//     await emailjs.send(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_TEMPLATE_ID,
//         {
//             from_name,
//             from_email,
//             subject: subject.toUpperCase(),
//             message,
//         },
//         EMAILJS_PUBLIC_KEY
//     );
// };

export default function useContactMe() {
    // const [] = React.useActionState(onSubmit, undefined);
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
                {
                    from_name,
                    from_email,
                    subject: subject.toUpperCase(),
                    message,
                },
                EMAILJS_PUBLIC_KEY
            )
            .then(
                () => {
                    setOpenSuccessSnackbar(true);
                    setSubmitting(false);
                },
                (error) => {
                    console.error(error.text);
                    setOpenErrorSnackbar(true);
                    setSubmitting(false);
                }
            );
    });

    const closeSuccessSnackbar = () => setOpenSuccessSnackbar(false);
    const closeErrorSnackbar = () => setOpenErrorSnackbar(false);

    const selectContent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(e.target as Node);
        if (!selection) return;
        selection.removeAllRanges();
        selection.addRange(range);
    };

    return {
        openSuccessSnackbar,
        openErrorSnackbar,
        handleSubmit,
        onSubmit,
        register,
        errors,
        closeSuccessSnackbar,
        closeErrorSnackbar,
        submitting,
        themeColor,
        selectContent,
    };
}
