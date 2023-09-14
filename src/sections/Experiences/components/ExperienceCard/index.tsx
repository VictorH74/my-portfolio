import { Noto_Sans } from "next/font/google";

interface Props {
  title: string;
  duration: string;
  paragraphs: string[];
}

const notoSans500 = Noto_Sans({ weight: "500", subsets: ["latin"] });
const notoSans400 = Noto_Sans({ weight: "400", subsets: ["latin"] });

export default function ExperienceCard(props: Props) {
  return (
    <div className="bg-second-color py-6 px-5 grid  gap-[2px] rounded-md flex-1 basis-[400px]">
      <h1 className={`${notoSans500.className} text-main-color text-xl`}>{props.title}</h1>
      <p className={`${notoSans400.className} text-zinc-400 text-sm`}>{props.duration}</p>
      <ul className="px-2">
        {props.paragraphs.map((p, i) => (
          <li key={i} className="list-disc ml-4">
            <p className={`${notoSans400.className} text-sm`}>{p}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
