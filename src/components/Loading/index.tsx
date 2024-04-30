import { useTheme } from "@/hooks/UseTheme";

interface Props {
  color?: string;
  width?: number;
  height?: number;
}

const Loading = (props: Props) => {
  const { themeColor } = useTheme();

  return (
    <div className="flex items-center gap-2 w-fit" style={{height: props.height}}>
      {Array(3)
        .fill(undefined)
        .map((_, i) => {
          const delay = i * 200;
          return (
            <div
              key={i}
              className="aspect-square rounded-full animate-load-bounce"
              style={{
                animationDelay: `${delay}ms`,
                backgroundColor: props.color || themeColor,
                width: props.width || 15,
              }}
            />
          );
        })}
    </div>
  );
};

export default Loading;
