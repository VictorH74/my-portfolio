interface ProjectTechListProps {
    techArray: string[];
    onRemoveTechItem(_techName: string): void;
}

export const ProjectTechList = (props: ProjectTechListProps) => {
    return (
        props.techArray.length > 0 && (
            <ul className="flex flex-wrap gap-2 mb-1">
                {props.techArray.map((techName) => (
                    <li key={techName}>
                        <p
                            onClick={() => props.onRemoveTechItem(techName)}
                            className="bg-gray-500 p-2 rounded-xl hover:bg-red-400 select-none duration-200 text-white"
                        >
                            {techName}
                        </p>
                    </li>
                ))}
            </ul>
        )
    );
};
