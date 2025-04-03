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

    public draw(canvas_ctx: CanvasRenderingContext2D) {
        canvas_ctx.filter = 'blur(30px)';

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
    screenHeight: number
) => {
    const values_factor = screenWidth / 2560;

    const ballSize = 300 * values_factor;
    const ballConstraintAreaRadio = 85 * values_factor;

    const x_factor = (screenWidth / 2 - cWidth / 2) / 2;
    const y_factor = (screenHeight / 2 - cHeight / 2) / 2;

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
            cHeight * 0.94,
            ballConstraintAreaRadio,
            '#4EFFFF',
        ],
        [
            ballSize,
            cWidth * 0.22,
            cHeight * 0.65,
            ballConstraintAreaRadio,
            '#4EFFFF',
        ],
        [
            ballSize,
            cWidth * 0.45,
            cHeight * -0.05,
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
        [ballSize, cWidth * 0.93, cHeight * 0.67, 45, '#2382FF'],
        [
            ballSize,
            cWidth * 0.82,
            cHeight * 0.94,
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
            x > cWidth / 2 ? x + x_factor : x - x_factor,
            y > cHeight / 2 ? y + y_factor : y - y_factor,
            constraint_area_radio,
            color,
            toggleBool
        );
    });
};
