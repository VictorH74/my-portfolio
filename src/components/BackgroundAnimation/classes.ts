import { RGBType } from "@/types";

type CenterAreaType = { left: number; top: number, bottom: number, right: number };

const grayColorRGBValues = [83, 83, 83] as const

export class Hexagon {
    size: number;
    sizeFactor: number;
    _colorAndSizePercentage: number = 0;
    _position: { x: number, y: number };
    _speed: number;
    _directionX: 1 | -1;
    _directionY: 1 | -1;
    _canvasCtx: CanvasRenderingContext2D;
    _canvasWidth: number;
    _canvasHeight: number;
    _centerArea: CenterAreaType;
    _RGBValues: RGBType;

    constructor(canvasWidth: number, canvasHeight: number, canvasCtx: CanvasRenderingContext2D, centerArea: CenterAreaType, RGBValues: RGBType) {
        this.size = Math.floor(Math.random() * (200 - 150 + 1)) + 150;
        this.sizeFactor = 0.5;
        this._position = {
            x: Math.random() * (canvasWidth + 450 - this.size * 2) + this.size,
            y: Math.random() * (canvasHeight + 450 - this.size * 2) + this.size
        };
        this._speed = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
        this._directionX = Math.round(Math.random()) > 0 ? 1 : -1;
        this._directionY = Math.round(Math.random()) > 0 ? 1 : -1;
        this._canvasCtx = canvasCtx
        this._canvasWidth = canvasWidth
        this._canvasHeight = canvasHeight
        this._centerArea = centerArea
        this._RGBValues = RGBValues
    }

    set centerArea(value: CenterAreaType) {
        this._centerArea = value;
    }

    set colorAndSizePercentage(value: number) {
        this._colorAndSizePercentage = value
    }

    set canvasWidth(value: number) {
        this._canvasWidth = value
    }

    set canvasHeight(value: number) {
        this._canvasHeight = value
    }

    set RGBValues(value: RGBType) {
        this._RGBValues = value
    }

    private update() {
        const { x: prevXPos, y: prevYPos } = this._position;

        // REVERT HEXAGON DIRECTION
        const xConstraint = prevXPos - this.size < -450
            || prevXPos + this.size > this._canvasWidth + 450;
        const yConstraint = prevYPos - this.size < -450
            || prevYPos + this.size > this._canvasHeight + 450;

        if (xConstraint) this._directionX *= -1;
        if (yConstraint) this._directionY *= -1;

        // UPDATE HEXAGON POSITION
        this._position = {
            x: (prevXPos + this._directionX / this._speed),
            y: (prevYPos + this._directionY / this._speed),
        }

        // UPDATE HEXAGON SIZE AND COLOR LEVEL
        const { x: xPos, y: yPos } = this._position;
        const { left: centerAreaLeft, right: centerAreaRight } = this._centerArea

        const hexagonXBeforeCenter = xPos >= centerAreaLeft - centerAreaLeft / 3 && xPos <= centerAreaLeft
        const hexagonXAfterCenter = xPos <= centerAreaRight + centerAreaLeft / 3 && xPos >= centerAreaRight

        // const hexagonYBeforeCenter = yPos >= this._centerArea.top - this._centerArea.top / 3 && yPos <= this._centerArea.top
        // const hexagonYAfterCenter = yPos <= this._centerArea.bottom + this._centerArea.top / 3 && yPos >= this._centerArea.bottom


        // const hexagonInCenterArea = xPos > centerAreaLeft - centerAreaLeft / 3 && xPos < centerAreaRight + centerAreaLeft / 3 && yPos > this._centerArea.top - this._centerArea.top / 3 && yPos < this._centerArea.bottom + this._centerArea.top / 3

        if (hexagonXBeforeCenter) {
            const percent = (xPos - (centerAreaLeft - centerAreaLeft / 3)) / (centerAreaLeft / 3)
            this._colorAndSizePercentage = percent
        }
        else if (hexagonXAfterCenter) {
            const percent = 1 - ((xPos - centerAreaRight) / (centerAreaLeft / 3));
            this._colorAndSizePercentage = percent;
        }
        else if (xPos > centerAreaLeft && xPos < centerAreaRight) {
            this._colorAndSizePercentage = 1;
        }


        // if (hexagonYBeforeCenter) {
        //     const percent = (yPos - (this._centerArea.top - this._centerArea.top / 3)) / (this._centerArea.top / 3)
        //     this._colorAndSizePercentage = percent
        // }
        // else if (hexagonYAfterCenter) {
        //     const percent = 1 - ((yPos - this._centerArea.bottom) / (this._centerArea.top / 3));
        //     this._colorAndSizePercentage = percent
        // }

        // this._colorAndSizePercentage = (XYPercents[0] + XYPercents[1]) / 2
    }

    private calculatePercentageRGBValue = (percentage: number) => {
        const newRGB: RGBType = [0, 0, 0]

        for (let i = 0; i < 3; i++) {
            const [min, max] = [
                this._RGBValues[i],
                grayColorRGBValues[i]
            ].toSorted();

            const difference = max - min
            const value = (1 - percentage) * difference
            newRGB[i] = value + min;
        }

        return newRGB
    }

    draw() {
        const [r, g, b] = this.calculatePercentageRGBValue(this._colorAndSizePercentage)
        this.update()
        this._canvasCtx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.50)`;
        this._canvasCtx.beginPath()

        const calculateSize = (percentage: number, minValue: number, maxValue: number) => {
            return minValue + (1.0 - percentage) * (maxValue - minValue);
        }

        // hexagon shape
        for (let i = 1; i <= 6; i += 1)
            this._canvasCtx.lineTo(this._position.x + calculateSize(this._colorAndSizePercentage, 80, this.size) * Math.cos(i * 2 * Math.PI / 6), this._position.y + calculateSize(this._colorAndSizePercentage, 80, this.size) * Math.sin(i * 2 * Math.PI / 6));

        this._canvasCtx.fill()
        this._canvasCtx.closePath()
    }
}