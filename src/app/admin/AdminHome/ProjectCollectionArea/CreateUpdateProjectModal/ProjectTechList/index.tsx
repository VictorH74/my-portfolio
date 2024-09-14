interface ProjectTechListProps {
    techArray: string[];
    onRemoveTechItem(_techName: string): void;
}

export default function ProjectTechList(props: ProjectTechListProps) {
    return (
        props.techArray.length > 0 && (
            <ul className="flex flex-wrap gap-2 mb-1">
                {props.techArray.map((techName) => (
                    <li key={techName}>
                        <p
                            onClick={() => props.onRemoveTechItem(techName)}
                            className="bg-gray-800 p-2 rounded-xl hover:bg-red-400 select-none"
                        >
                            {techName}
                        </p>
                    </li>
                ))}
            </ul>
        )
    );
}
