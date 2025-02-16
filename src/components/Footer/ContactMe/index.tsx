'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { FormValues, useContactMe } from './useContactMe';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { CopyableContentBtn } from './CopyableContentBtn';

const formFieldClassName =
    'bg-secondary-black p-3 outline-none focus:brightness-110 duration-300 rounded-md w-full';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ContactMe = () => {
    const hook = useContactMe();
    const t = useTranslations('Footer');

    const inputData = [
        {
            type: 'text',
            name: 'name',
            placeholder: t('contact_me_name_field_placeholder'),
        },
        {
            type: 'email',
            name: 'email',
            placeholder: t('contact_me_email_field_placeholder'),
        },
    ];

    return (
        <section className="w-full" id="contacts">
            <h2 className="text-3xl font-semibold">{t('contact_me_title')}</h2>

            <div className=" h-[40rem] bg-primary-black shadow-[0_4px_40px_#00000075]  flex my-20">
                <div className="size-full bg-white flex flex-col p-20 text-dark-font gap-6 justify-center">
                    <h3 className="text-2xl font-semibold text-start">
                        {t('contact_me_subtitle')}
                    </h3>
                    <p className="font-medium text-start">
                        {t('contact_me_paragraph_1')} <br />{' '}
                        {t('contact_me_paragraph_2')}
                    </p>
                    <hr className="h-[3px] bg-secondary-black w-full" />
                    <div className="grid gap-2">
                        <CopyableContentBtn content="victorh.almeida7@gmail.com" />
                        <CopyableContentBtn
                            content="+55 (86) 99470-2018"
                            formatContent={(prevContent) => {
                                return prevContent.replace(/\D/g, '');
                            }}
                        />
                    </div>
                </div>
                <form
                    className="boder-2 border-orange-300 size-full flex flex-col p-20 justify-center gap-6"
                    onSubmit={hook.onSubmit}
                >
                    {inputData.map((obj) => (
                        <div key={obj.placeholder} className="space-y-1">
                            <input
                                placeholder={obj.placeholder}
                                className={twMerge('', formFieldClassName)}
                                type={obj.type}
                                {...hook.register(
                                    obj.name as keyof FormValues,
                                    {
                                        required: true,
                                    }
                                )}
                            />
                            {hook.errors[obj.name as keyof FormValues]?.type ===
                                'required' && (
                                <p
                                    className="text-red-500 text-start"
                                    role="alert"
                                >
                                    {t('error_message_' + obj.name)}
                                </p>
                            )}
                        </div>
                    ))}

                    <div className="space-y-1">
                        <textarea
                            placeholder={t('contact_me_msg_field_placeholder')}
                            className={twMerge(
                                'field-sizing-content',
                                formFieldClassName
                            )}
                            {...hook.register('message' as keyof FormValues, {
                                required: true,
                            })}
                        />
                        {hook.errors.message?.type === 'required' && (
                            <p className="text-red-500 text-start" role="alert">
                                {t('error_message_message')}
                            </p>
                        )}
                    </div>

                    <button
                        className="focus:brightness-110 duration-300 rounded-md w-full p-3 bg-white text-dark-font font-semibold cursor-pointer"
                        type="submit"
                        disabled={hook.submitting}
                    >
                        {t('contact_me_msg_submit_btn')}
                    </button>
                </form>
            </div>

            {[
                {
                    open: hook.openSuccessSnackbar,
                    close: hook.closeSuccessSnackbar,
                    alertSeverity: 'success',
                    text: t('success_snackbar_text') + ' 👍',
                },
                {
                    open: hook.openErrorSnackbar,
                    close: hook.closeErrorSnackbar,
                    alertSeverity: 'error',
                    text: t('error_snackbar_text') + ' 😐',
                },
            ].map((d) => (
                <Snackbar
                    key={d.alertSeverity}
                    open={d.open}
                    autoHideDuration={6000}
                    onClose={d.close}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Alert
                        onClose={d.close}
                        severity={d.alertSeverity as AlertColor}
                        sx={{ width: '100%' }}
                    >
                        {d.text}
                    </Alert>
                </Snackbar>
            ))}
        </section>
    );
};
