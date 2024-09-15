import Skeleton from '@mui/material/Skeleton';

interface CardSkeletonCollectionProps {
    amount: number;
}

export default function CardSkeletonCollection(
    props: CardSkeletonCollectionProps
) {
    return (
        <>
            {Array(props.amount)
                .fill(undefined)
                .map((_, i) => (
                    <div
                        key={i}
                        className="relative w-[300px] h-96 shadow-lg bg-gray-200 dark:bg-[#3f3f3f] shrink-0 grow-0 rounded-md flex flex-col overflow-hidden"
                    >
                        <Skeleton
                            variant="rectangular"
                            width={300}
                            height={280}
                        />
                        <div className="flex flex-col h-full p-2 gap-2">
                            <Skeleton width="60%" />
                            <Skeleton />
                            <Skeleton width="50%" />
                            <div className="grow" />
                            <Skeleton width="70%" />
                            <Skeleton width="70%" />
                        </div>
                    </div>
                ))}
        </>
    );
}
