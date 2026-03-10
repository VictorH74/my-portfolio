onmessage = (e) => {
    const [mousePos, currentPos, canvasSize] = e.data;

    const { x: currXPercent, y: currYPercent } = currentPos;
    const { x: finalXPercent, y: finalYPercent } = {
        x: mousePos.x / canvasSize.width,
        y: mousePos.y / canvasSize.height,
    };

    const xDistance = Math.abs(finalXPercent - currXPercent);
    const yDistance = Math.abs(finalYPercent - currYPercent);
    const hypotenuse = Math.sqrt(xDistance ** 2 + yDistance ** 2);
    const speed = 1 / hypotenuse;

    postMessage({
        finalPosPercent: { x: finalXPercent, y: finalYPercent },
        xIncrement: (xDistance / 100) * (finalXPercent < currXPercent ? -1 : 1),
        yIncrement: (yDistance / 100) * (finalYPercent < currYPercent ? -1 : 1),
        speed,
    });
};
