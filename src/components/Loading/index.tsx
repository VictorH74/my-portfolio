import { useTheme } from "@/hooks/UseTheme";

const Loading = () => {
  const { themeColor } = useTheme();

  return (
    <div className="flex items-center gap-2 w-fit h-11">
      {Array(3)
        .fill(undefined)
        .map((_, i) => {
          const delay = i * 200;
          return (
            <div
              key={i}
              className="w-[15px] aspect-square rounded-full animate-load-bounce"
              style={{
                animationDelay: `${delay}ms`,
                backgroundColor: themeColor,
              }}
            />
          );
        })}
    </div>
  );
};

export default Loading;
