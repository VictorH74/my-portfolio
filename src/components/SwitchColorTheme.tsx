import { useTheme } from "@/hooks/UseTheme";
import React from "react";

const colorBtns = [
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

// const colorClasses = colorBtns.map((c) => "scrollbar-" + c.color.slice(1));

export default function SwitchColorTheme() {
  const [showColors, setShowColors] = React.useState(false);
  const { setThemeColor } = useTheme();

  const toggle = () => setShowColors((prev) => !prev);

  const handleClick = (color: string) => {
    toggle();
    setThemeColor(color);

    // change body scrollbar color
    // NOT WORKING 🤔
    // const bodyRef = document.body;
    // colorClasses.forEach((c) => {
    //   if (bodyRef.classList.contains(c)) {
    //     bodyRef.classList.remove(c);
    //   }
    // });
    // bodyRef.classList.add(`scrollbar-${color.slice(1)}`);
  };

  return (
    <div className="fixed w-8 aspect-square bottom-7 left-4">
      <button
        onClick={toggle}
        className="relative w-full h-full aspect-square rounded-full rotatge-45 z-50"
        style={{
          background:
            "linear-gradient(155deg, rgba(78,84,253,1) 28%, rgba(53,167,119,1) 56%, rgba(253,78,78,1) 82%)",
        }}
      >
        {colorBtns.map((b, i) => (
          <button
            key={b.color}
            style={{ transitionDelay: i + "00ms", backgroundColor: b.color }}
            onClick={() => handleClick(b.color)}
            className={`absolute w-4 duration-150 aspect-square rounded-full hover:scale-125 ${
              showColors
                ? `opacity-1 ${b.offSetClass}`
                : "opacity-0 pointer-events-none top-1/3 right-1/3"
            }`}
          />
        ))}
      </button>
    </div>
  );
}
