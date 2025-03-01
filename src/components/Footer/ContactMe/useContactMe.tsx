import {
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
} from '@/utils/constants';
import emailjs from '@emailjs/browser';
import React from 'react';
import { useForm } from 'react-hook-form';

export type Fields = 'name' | 'email' | 'message';
export type FormValues = {
    name: string;
    email: string;
    message: string;
};

export const useContactMe = () => {
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = handleSubmit(async (data) => {
        const [from_name, from_email, message] = Object.values(data);

        try {
            setSubmitting(true);
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: from_name.toUpperCase(),
                    from_email,
                    subject: 'FROM PERSONAL SITE',
                    message,
                },
                EMAILJS_PUBLIC_KEY
            );
            setOpenSuccessSnackbar(true);
            reset();
        } catch (err) {
            console.error(err);
            setOpenErrorSnackbar(true);
        } finally {
            setSubmitting(false);
        }
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
        selectContent,
    };
};
