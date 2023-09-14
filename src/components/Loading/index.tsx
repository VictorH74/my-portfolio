
const Loading = () => (
  <div className="flex items-center gap-2 w-fit h-11">
    {Array(3)
      .fill(undefined)
      .map((_, i) => {
        const delay = i * 200;
        return (
          <div
            key={i}
            className={`
      w-[15px] 
      aspect-square 
      bg-main-color 
      rounded-full 
      animate-load-bounce
      `}
            style={{ animationDelay: `${delay}ms` }}
          />
        );
      })}
  </div>
);

export default Loading;
