"use client";
import React from "react";
import { downloadResume } from "@/utils/resume";
import Hamburger from "./components/Hamburger";
import { Noto_Sans, Raleway } from "next/font/google";
import useHeader from "./useHeader";
import NavListItem from "./NavListItem";
import SettingsMenu from "./SettingsMenu";
import NavItemWapper from "./NavItemWapper";
import { useTheme } from "@/hooks/UseTheme";
import MenuItem from '@mui/material/MenuItem';
import SwitchThemeColorBtn from "../SwitchThemeColorBtn";
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { createPortal } from "react-dom";

const BackgroundAnimation = React.lazy(() => import("@/components/BackgroundAnimation"))

interface SwitchBgAnimationProps extends SwitchProps {
  themeColor: string
}

const SwitchBgAnimation = styled(({ themeColor, ...props }: SwitchBgAnimationProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, themeColor }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: themeColor,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: themeColor,
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
  weight: "300",
});
const notoSans = Noto_Sans({ weight: "400", subsets: ["latin"] });

const Header: React.FC = () => {
  const hook = useHeader();
  const { themeColor } = useTheme();

  return (
    <header className="fixed top-0 inset-x-0 z-10">
      <div
        className={`
          m-auto
          py-3
          px-5
          rounded-2xl
          backdrop-blur-[8px]
          flex
          items-center
          h-fit
          duration-300
          uppercase
          ${hook.scrollUp ? "bg-transparent" : "bg-[#00000055]"}
        `}
      >
        <h1
          className={`grow text-4xl shrink-0 basis-auto  z-[9910] select-none`}
        >
          <span
            className={hook.scrollUp ? "primary-font-color" : "text-custom-white"}
          >
            &lt;
          </span>{" "}
          <span
            className={`line-through  ${raleway.className}`}
            style={{ color: themeColor.color }}
          >
            vh
          </span>{" "}
          <span
            className={hook.scrollUp ? "primary-font-color" : "text-custom-white"}
          >
            /&gt;
          </span>
        </h1>
        {hook.size[0] > 1100 ? (
          <>
            <NavItemWapper
              wrapperDimensions={hook.wrapperDimensions}
              wrapperDisplay={hook.wrapperDisplay}
            />
            <nav
              className="max-lg:hidden z-[4]"
              onMouseOut={hook.moveWrapperToDownloadBtn}
            >
              <ul className="flex flex-wrap items-center py-1">
                {hook.navDataArray.map((data, i) => {
                  const last = i === hook.navDataArray.length - 1;
                  return (
                    <NavListItem
                      className={`
                    ${last ? "p-0" : "p-[10px]"}
                    ${notoSans.className}
                    ${hook.scrollUp
                          ? hook.wrappedLI === "li-" + data.to
                            ? "text-[#ececec]"
                            : "primary-font-color"
                          : "text-[#ececec]"
                        }
                  `}
                      id={`li-${data.to}`}
                      key={i}
                      onClick={
                        last
                          ? downloadResume
                          : () => window.location.replace(`#${data.to || ""}`)
                      }
                      onMouseOver={hook.handleMouseOver}
                    >
                      {last ? (
                        <button
                          className="uppercase p-[10px] rounded-[20px]"
                          ref={hook.downloadResumeBtnRef}
                          onClick={downloadResume}
                        >
                          {hook.translate.downloadResumeBtnInnerText}
                        </button>
                      ) : (
                        data.label
                      )}
                    </NavListItem>
                  );
                })}
                <SettingsMenu
                  onMouseOver={hook.handleMouseOver}
                  onClose={hook.moveWrapperToDownloadBtn}
                >
                  <MenuItem disableTouchRipple>
                    <label className="flex flex-col">
                      {hook.translate.showBgAnimation}
                      <FormControlLabel
                        control={<SwitchBgAnimation
                          themeColor={themeColor.color}
                          sx={{ m: 1 }}
                          defaultChecked
                          onChange={e => {
                            hook.setShowBgAnimation(e.currentTarget.checked)
                          }}
                          checked={hook.showBgAnimation}
                        />}
                        label=""
                      />
                    </label>

                  </MenuItem>
                  <MenuItem disableTouchRipple >
                    <div className="flex flex-col">
                      {hook.translate.switchThemeColor}
                      <SwitchThemeColorBtn />
                    </div>
                  </MenuItem>
                </SettingsMenu>
              </ul>
            </nav>
          </>
        ) : (
          <Hamburger
            navData={hook.navDataArray}
            downloadResumeBtnInnerText={hook.translate.downloadResumeBtnInnerText}
          />
        )}
      </div>

      {
        hook.showBgAnimation && createPortal(
          <React.Suspense fallback={<></>}>
            <BackgroundAnimation />
          </React.Suspense>,
          document.getElementById("bg-animation") || document.body
        )
      }
    </header>
  );
};

export default React.memo(Header);
