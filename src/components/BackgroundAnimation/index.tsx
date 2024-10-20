import { useBackgroundAnimation } from './useBackgroundAnimation';

const BackgroundAnimation = () => {
    const hook = useBackgroundAnimation();

    return (
        <div className="fixed inset-0  ">
            <span ref={hook.centerRef} className="absolute inset-[43%]"></span>
            <canvas ref={hook.canvasRef} className="size-full"></canvas>
        </div>
    );
};

export default BackgroundAnimation;
