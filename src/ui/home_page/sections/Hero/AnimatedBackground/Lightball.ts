export type LightballRequiredParams = [number, number, number, number, string];
export type LightballParams = [number, number, number, number, string, boolean];

export class Lightball {
    private negative: boolean;

    private size: number;

    private x: number = 0;
    private y: number = 0;

    private x_location: number;
    private y_location: number;

    private constraint_area_radio: number;

    private color: string;

    constructor(
        size: number,
        x: number,
        y: number,
        constraint_area_radio: number,
        color: string,
        negative?: boolean
    ) {
        this.negative = negative || false;
        this.size = size;
        this.x = x;
        this.y = y;
        this.x_location = x;
        this.y_location = y;
        this.constraint_area_radio = constraint_area_radio;
        this.color = color;
    }

    public update(mousePositionPercent: { x: number; y: number }) {
        const min_x = this.x - this.constraint_area_radio;
        const min_y = this.y - this.constraint_area_radio;

        const x_position_area = this.x + this.constraint_area_radio - min_x;
        const y_position_area = this.y + this.constraint_area_radio - min_y;

        const new_x =
            x_position_area *
            (this.negative
                ? 1 - mousePositionPercent.x
                : mousePositionPercent.x);
        const new_y =
            y_position_area *
            (this.negative
                ? 1 - mousePositionPercent.y
                : mousePositionPercent.y);

        this.x_location = min_x + new_x;
        this.y_location = min_y + new_y;
    }

    public draw(canvas_ctx: CanvasRenderingContext2D, blurValue: number) {
        canvas_ctx.filter = `blur(${blurValue}px)`;

        canvas_ctx.fillStyle = this.color;
        // canvas_ctx.shadowColor = this.color;
        // canvas_ctx.shadowBlur = 300;
        canvas_ctx.beginPath();
        const a = (2 * Math.PI) / 6;
        for (let i = 0; i < 6; i++) {
            canvas_ctx.lineTo(
                this.x_location + this.size * Math.cos(a * i),
                this.y_location + this.size * Math.sin(a * i)
            );
        }
        // canvas_ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        canvas_ctx.fill();
        canvas_ctx.closePath();
    }
}

export const generateLightballs = (
    cWidth: number,
    cHeight: number,
    screenWidth: number,
    screenHeight: number,
    computeValue: (v: number) => number
) => {
    const ballSize = computeValue(300);
    const ballConstraintAreaRadio = computeValue(85);

    const x_factor = (screenWidth / 2 - cWidth / 2) / 2;
    const y_factor = (screenHeight / 2 - cHeight / 2) / 2;

    const getRelativeDirectionPos = (
        directionPosition: number,
        directionFactor: number,
        canvasDimensionSize: number
    ) => {
        const canvasDimensionCenter = canvasDimensionSize / 2;

        if (directionPosition < canvasDimensionCenter) directionFactor *= -1;
        return directionPosition + directionFactor;
    };

    const datas: LightballRequiredParams[] = [
        [
            ballSize,
            cWidth * 0.05,
            cHeight * 0.053,
            ballConstraintAreaRadio,
            '#00FC69',
        ],
        [
            ballSize,
            cWidth * 0.108,
            cHeight * 0.184,
            ballConstraintAreaRadio,
            '#00FC69',
        ],
        [
            ballSize,
            cWidth * 0.02,
            cHeight * 0.47,
            ballConstraintAreaRadio,
            '#00FC69',
        ],
        [
            ballSize,
            cWidth * 0.15,
            cHeight * 0.92,
            ballConstraintAreaRadio,
            '#4EFFFF',
        ],
        [
            ballSize,
            cWidth * 0.22,
            cHeight * 0.63,
            ballConstraintAreaRadio,
            '#4EFFFF',
        ],
        [
            computeValue(350),
            cWidth * 0.45,
            cHeight * -0.01,
            ballConstraintAreaRadio,
            '#4EFFFF',
        ],
        [
            ballSize,
            cWidth * 0.77,
            cHeight * 0.48,
            ballConstraintAreaRadio,
            '#4EFFFF',
        ],
        [
            ballSize,
            cWidth * 0.9,
            cHeight * 0.08,
            ballConstraintAreaRadio,
            '#4EFFFF',
        ],
        [
            ballSize,
            cWidth * 0.98,
            cHeight * 0.35,
            ballConstraintAreaRadio,
            '#4EFFFF',
        ],
        [ballSize, cWidth * 0.92, cHeight * 0.673, 45, '#2382FF'],
        [
            computeValue(400),
            cWidth * 0.799,
            cHeight * 0.96,
            ballConstraintAreaRadio,
            '#2382FF',
        ],
        [ballSize, cWidth * 1, cHeight * 0.94, 100, '#2382FF'],
    ];

    let toggleBool = true;

    return datas.map((data) => {
        const [size, x, y, constraint_area_radio, color] = data;
        toggleBool = !toggleBool;
        return new Lightball(
            size,
            getRelativeDirectionPos(x, x_factor, cWidth),
            getRelativeDirectionPos(y, y_factor, cHeight),
            constraint_area_radio,
            color,
            toggleBool
        );
    });
};
