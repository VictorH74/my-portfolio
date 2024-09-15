'use client';
import { Noto_Sans } from 'next/font/google';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import Loading from '@/components/Loading';
import { fields } from './data';
import useContactMe, { Fields } from './useContactMe';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';

const notoSans = Noto_Sans({ subsets: ['latin'], weight: '400' });
const inputClassName = `${notoSans.className} bg-custom-gray-dark p-4 rounded-md outline-none focus:brightness-90 dark:focus:brightness-150 focus::shadow-lg secondary-font-color duration-200 placeholder:text-custom-gray-light dark:placeholder:text-custom-zinc-light w-full backdrop-blur-md`;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ContactMe() {
    const hook = useContactMe();
    const t = useTranslations('ContactMe_Section');
    const tErrorMsg = useTranslations('contactMe_error_message');

    return (
        <section id="contact-me" className="home-section max-w-[1000px] pt-24 ">
            <form className="grid gap-3 grid-cols-2" onSubmit={hook.onSubmit}>
                <h1 className="section-title col-span-2">{t('title')}</h1>
                {fields.map((f) => {
                    if (f.name === 'message')
                        return (
                            <div key={f.name} className="col-span-2">
                                <textarea
                                    className={inputClassName}
                                    placeholder={t('message')}
                                    rows={6}
                                    {...hook.register(f.name, {
                                        required: true,
                                    })}
                                />
                                {hook.errors[f.name]?.type === 'required' && (
                                    <p className="text-red-500" role="alert">
                                        {tErrorMsg(f.name)}
                                    </p>
                                )}
                            </div>
                        );
                    return (
                        <div
                            key={f.name}
                            className={`${
                                f.row ? 'max-md:col-span-2' : 'col-span-2'
                            }`}
                        >
                            <input
                                className={inputClassName}
                                placeholder={t(f.name)}
                                {...hook.register(f.name as Fields, {
                                    required: true,
                                })}
                            />
                            {hook.errors[f.name as Fields]?.type ===
                                'required' && (
                                <p className="text-red-500" role="alert">
                                    {tErrorMsg(f.name)}
                                </p>
                            )}
                        </div>
                    );
                })}
                <button
                    name="submit button"
                    className={twMerge(
                        'p-3 text-white rounded-md text-base uppercase tracking-wider hover:brightness-125 duration-150 col-span-2 grid place-items-center bg-[var(--theme-color)]',
                        notoSans.className
                    )}
                    type="submit"
                    disabled={hook.submitting}
                >
                    {hook.submitting ? (
                        <Loading color="#fff" width={10} height={24} />
                    ) : (
                        t('submit_text')
                    )}
                </button>

                <div
                    className="w-full cursor-pointer bg-custom-gray-dark p-2 rounded-md hover:brightness-110 duration-150 text-center max-sm:col-span-2 backdrop-blur-md"
                    onClick={hook.selectContent}
                >
                    +55 (86) 99470-2018
                </div>
                <div
                    className="w-full cursor-pointer bg-custom-gray-dark p-2 rounded-md hover:brightness-110 text-center duration-150 max-sm:col-span-2 backdrop-blur-md"
                    onClick={hook.selectContent}
                >
                    victorh.almeida7@gmail.com
                </div>
            </form>
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
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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
}
