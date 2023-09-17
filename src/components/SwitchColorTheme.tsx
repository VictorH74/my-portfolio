import { useTheme } from "@/hooks/UseTheme";
import React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { Language } from "@/types/language";
import useLanguage from "@/hooks/UseLanguage";

const colors = [
  {
    offSetClass: "top-[-53%] right-[1%]",
    color: "#4e54fd",
  },
  {
    offSetClass: "top-[-9%] right-[-50%]",
    color: "#35a777",
  },
  {
    offSetClass: "top-[55%] right-[-52%]",
    color: "#fd4e4e",
  },
];

const marks = (lang: Language) => {
  return {
    "pt-BR": [
      {
        value: 1,
        label: "Azul",
      },
      {
        value: 2,
        label: "Verde",
      },
      {
        value: 3,
        label: "Vermelho",
      },
    ],
    en: [
      {
        value: 1,
        label: "Blue",
      },
      {
        value: 2,
        label: "Green",
      },
      {
        value: 3,
        label: "Red",
      },
    ],
  }[lang];
};

export default function SwitchColorTheme() {
  const [showSliderMask, setShowSliderMask] = React.useState(false);
  const lang = useLanguage();
  const { themeColor, setThemeColor } = useTheme();

  const handleChange = (_: Event, value: number | number[]) => {
    setThemeColor(colors[(value as number) - 1].color);
  };

  return (
    <div
      className="fixed bottom-7 left-4"
      onPointerDown={() => setShowSliderMask(true)}
      onPointerLeave={() => setShowSliderMask(false)}
    >
      <Box height={100}>
        <Slider
          sx={{
            color: "#41414145",
            "& .MuiSlider-thumb": {
              backgroundColor: themeColor,
            },
            "& .MuiSlider-valueLabel": {
              color: themeColor,
            },
          }}
          marks={showSliderMask ? marks(lang) : undefined}
          min={1}
          max={3}
          track={false}
          orientation="vertical"
          defaultValue={1}
          onChange={handleChange}
        />
      </Box>
    </div>
  );
}
