import { useTheme } from "@/hooks/UseTheme";
import React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { THEME_COLORS } from "@/utils/constants";

const colors = THEME_COLORS

export default function SwitchThemeColorBtn() {
  const { themeColor, setThemeColor } = useTheme();
  const [sliderValue, setSliderValue] = React.useState(2);

  const handleChange = (_: Event, value: number | number[]) => {
    setThemeColor(colors[(value as number) - 1]);
  };

  React.useEffect(() => {
    colors.forEach((c, i) => {
      if (themeColor.color === c.color)
        setSliderValue(i + 1);
    })
  }, [themeColor]);

  const lightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;

  return (
    <div className="fixed bottom-10 left-4">
      <Box height={100}>
        <Slider
          sx={{
            color: lightTheme ? "#414141b0" : "#d8d8d845",
            "& .MuiSlider-thumb": {
              backgroundColor: themeColor.color,
            },
          }}
          marks={true}
          min={1}
          max={3}
          track={false}
          orientation="vertical"
          value={sliderValue}
          onChange={handleChange}
        />
      </Box>
    </div>
  );
}
