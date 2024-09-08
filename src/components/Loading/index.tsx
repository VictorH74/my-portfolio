import { useTheme } from '@/hooks/UseTheme';

interface Props {
    color?: string;
    width?: number;
    height?: number;
}

const Loading = (props: Props) => {
    const { themeColor } = useTheme();

    return (
        <div
            className="flex items-center gap-2 w-fit"
            style={{ height: props.height }}
        >
            {/* TODO: improve className */}
            {Array(3)
                .fill(undefined)
                .map((_, i) => (
                    <div
                        key={i}
                        className="aspect-square rounded-full animate-load-bounce"
                        style={{
                            animationDelay: `${i * 200}ms`,
                            backgroundColor: props.color || themeColor.color,
                            width: props.width || 15,
                        }}
                    />
                ))}
        </div>
    );
};

export default Loading;
