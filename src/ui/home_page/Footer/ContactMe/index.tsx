'use client';
import { Loading } from '@/components/Loading';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useTranslations } from 'next-intl';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { CopyableContentBtn } from './CopyableContentBtn';
import { FormValues, useContactMe } from './useContactMe';

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
        <section className="w-full" id="contact-me">
            <h2 className="text-3xl font-semibold">{t('contact_me_title')}</h2>

            <div className="max-md:my-10 max-lg:px-6 max-lg:py-20 max-lg:relative min-lg:flex min-lg:h-[40rem] bg-primary-black shadow-[0_0.25rem_2.5rem_#00000075] my-20 space-y-10">
                <div className="max-lg:hidden max-xl:p-6 size-full bg-background flex flex-col p-20 text-dark-font gap-6 justify-center">
                    <CallToAction />

                    <hr className="h-[0.188rem] bg-secondary-black w-full" />
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

                <div className="min-lg:hidden space-y-2">
                    <CallToAction />
                </div>

                <form
                    className="max-lg:p-0 max-xl:p-6 min-lg:relative p-20 size-full flex flex-col justify-center gap-2"
                    onSubmit={hook.onSubmit}
                >
                    <div
                        className={twMerge(
                            'absolute inset-0 bg-black/40 backdrop-blur-sm place-items-center duration-300',
                            hook.submitting ? 'grid' : 'hidden'
                        )}
                    >
                        <Loading />
                    </div>
                    {inputData.map((obj) => (
                        <div key={obj.placeholder} className="space-y-1">
                            <input
                                placeholder={obj.placeholder}
                                className={twMerge('', formFieldClassName)}
                                type={obj.type}
                                maxLength={50}
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
                        className="focus:brightness-110 duration-300 rounded-md w-full py-3 bg-background text-dark-font font-semibold cursor-pointer"
                        type="submit"
                        disabled={hook.submitting}
                    >
                        {t('contact_me_msg_submit_btn')}
                    </button>
                </form>

                <hr className="min-lg:hidden h-[0.188rem] bg-secondary-black w-full" />

                <div className="min-lg:hidden space-y-3 -z-10">
                    <CopyableContentBtn content="victorh.almeida7@gmail.com" />
                    <CopyableContentBtn
                        content="+55 (86) 99470-2018"
                        formatContent={(prevContent) => {
                            return prevContent.replace(/\D/g, '');
                        }}
                    />
                </div>
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

const CallToAction = () => {
    const t = useTranslations('Footer');

    return (
        <>
            <h3 className="text-2xl font-semibold text-start">
                {t('contact_me_subtitle')}
            </h3>
            <p className="font-medium text-start">
                {t('contact_me_paragraph_1')} <br />{' '}
                {t('contact_me_paragraph_2')}
            </p>
        </>
    );
};
