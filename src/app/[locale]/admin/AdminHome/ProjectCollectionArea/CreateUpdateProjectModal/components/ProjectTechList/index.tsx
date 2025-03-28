import { useTechnologyIconMap } from '@/hooks/useTechnologyIconMap';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from 'next/image';

interface ProjectTechListProps {
    techArray: string[];
    onRemoveTechItem(_techName: string): void;
}

export const ProjectTechList = (props: ProjectTechListProps) => {
    const iconMap = useTechnologyIconMap();

    return (
        props.techArray.length > 0 && (
            <ul className="flex flex-wrap gap-2 mb-1">
                {iconMap &&
                    props.techArray.map((techId) => {
                        const techIcon = iconMap[techId];
                        if (techIcon)
                            return (
                                <li
                                    key={techId}
                                    className="cursor-pointer p-2 bg-gray-300 rounded-xl select-none overflow-hidden relative"
                                >
                                    <Image
                                        alt={techIcon.name + 'icon'}
                                        src={techIcon.src}
                                        height={25}
                                        width={25}
                                    />
                                    <span
                                        className="absolute inset-0 grid place-items-center text-white cursor-pointer bg-red-400 opacity-0 hover:opacity-100 duration-200"
                                        onClick={() =>
                                            props.onRemoveTechItem(techId)
                                        }
                                    >
                                        <RemoveIcon />
                                    </span>
                                </li>
                            );
                    })}
            </ul>
        )
    );
};
