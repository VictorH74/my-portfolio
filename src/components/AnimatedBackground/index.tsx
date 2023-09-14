import { Circle, Circles } from "./styles";

interface BgProps {
    circleAmount: number;
}

export const AnimatedBackground = (props: BgProps) => {
    const leftCalc = (index:number) => Math.ceil(95 / props.circleAmount) * index + 1;
    const durationCalc = () => Math.floor(Math.random() * 35) + 5;
    const delayCalc = () => Math.floor(Math.random() * 10);


    return (
        <Circles>
            {
                new Array(props.circleAmount).fill(undefined).map((_, i) =>
                    <Circle
                        key={i}
                        left={() => leftCalc(i)}
                        size={Math.floor(Math.random() * 125) + 25}
                        duration={durationCalc}
                        delay={delayCalc}
                    />
                )
            }
        </Circles>
    )
}