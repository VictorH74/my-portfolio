import { useTheme } from "@/hooks/UseTheme";
import { Noto_Sans } from "next/font/google";

interface Props {
  title: string;
  duration: string;
  paragraphs: string[];
}

const notoSans500 = Noto_Sans({ weight: "500", subsets: ["latin"] });
const notoSans400 = Noto_Sans({ weight: "400", subsets: ["latin"] });

export default function ExperienceCard(props: Props) {
  const { themeColor } = useTheme();
  return (
    <div className="secondary-bg-color py-6 px-5 grid  gap-[2px] rounded-md flex-1 basis-[400px]">
      <h1
        style={{ color: themeColor }}
        className={`${notoSans500.className} text-xl`}
      >
        {props.title}
      </h1>
      <p className={`${notoSans400.className} secondary-font-color text-sm`}>
        {props.duration}
      </p>
      <ul className="px-2">
        {props.paragraphs.map((p, i) => (
          <li key={i} className="list-disc ml-4 ">
            <p
              className={`${notoSans400.className} text-sm primary-font-color`}
            >
              {p}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
