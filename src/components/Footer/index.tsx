'use client';
import Image from 'next/image';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import React from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

// TODO: fetch contacts from firebase backend and make dinamic
export const Footer = () => {
    return (
        <footer className="bg-custom-black p-28  text-center">
            <div className="mx-auto size-fit grid place-items-center gap-7 text-[#D2D2D3]">
                <Image width={85} height={85} src="me-logo-v2.svg" alt="logo" />
                <ul className="flex flex-row gap-9">
                    <li>
                        <MuiIcon Icon={EmailIcon} />
                        victorh.almeida7@gmail.com
                    </li>
                    <li>
                        <MuiIcon Icon={GitHubIcon} />
                        VictorH74
                    </li>
                    <li>
                        <MuiIcon Icon={LinkedInIcon} />
                        Victor Leal
                    </li>
                    <li>
                        <MuiIcon Icon={WhatsAppIcon} />
                        (86) 9 9470-2018
                    </li>
                </ul>
                <p className="text-sm font-semibold">
                    &copy; {new Date().getFullYear()} created with 🤍 by Victor
                    Leal
                </p>
            </div>
        </footer>
    );
};

const MuiIcon: React.FC<{
    Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
        muiName: string;
    };
}> = ({ Icon }) => {
    return <Icon className="text-[#D2D2D3] mr-2" fontSize="large" />;
};
