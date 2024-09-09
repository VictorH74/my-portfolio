import { ProjectType } from '@/types';
import { twMerge } from 'tailwind-merge';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

interface AdminProjectWarningsProps {
    projects: ProjectType[];
}

export default function AdminProjectWarnings(props: AdminProjectWarningsProps) {
    return (
        <div className="mb-2 flex gap-2">
            {(() => {
                const counts: [number, number, number] = [0, 0, 0];
                const projectCount = props.projects.length;

                props.projects.forEach((p) => {
                    if (p.deployUrl) counts[0]++;
                    if (p.videoUrl) counts[1]++;
                    if (p.repositoryUrl) counts[2]++;
                });

                return (
                    [
                        [counts[0], 'Deploy', LinkIcon],
                        [counts[1], 'Video', PlayCircleFilledIcon],
                        [counts[2], 'Repository', GitHubIcon],
                    ] as const
                ).map(([count, name, Icon], i) => (
                    <div
                        key={i}
                        className={twMerge(
                            'p-4 grow rounded-md text-gray-600x font-semibold text-center relative',
                            count === 0
                                ? 'bg-green-500'
                                : count === projectCount
                                ? 'bg-red-500'
                                : 'bg-yellow-500'
                        )}
                    >
                        <h3 className="text-3xl">
                            {projectCount - count} / {projectCount}
                        </h3>
                        <p className="tracking-wide">
                            <Icon className="-translate-y-[2px] mr-2" />
                            Without {name} Url
                        </p>
                    </div>
                ));
            })()}
        </div>
    );
}
