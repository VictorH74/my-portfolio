interface ProjectListErrorProps {
    retry(): void
}

export function ProjectListError(props: ProjectListErrorProps) {
    return (
        <button
            className="text-red-400 font-medium py-2 px-6 pb-16 w-full text-center cursor-pointer"
            onClick={() => props.retry()}
        >
            Error trying loading projects! Retry
        </button>
    )
}