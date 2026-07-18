const TOTALS_WIKIMEDIA = [
    3, 15, 33, 61, 95, 138, 189, 247, 313, 388, 469, 559, 657, 762, 876, 997,
    1126, 1263, 1408, 1560, 1722, 1889, 2066, 2250, 2442, 2641, 2850, 3064,
    3289, 3519, 3759, 4005, 4261, 4522, 4794, 5071, 5358, 5652, 5953, 6263,
    6581, 6906, 7239, 7581, 7929, 8287, 8650, 9024, 9404, 9793, 10187, 10594,
    11003, 11425, 11850, 12288, 12729, 13183, 13638, 14109, 14580, 15066, 15553,
    16055, 16557, 17075, 17592, 18126, 18660, 19208, 19758, 20323, 20888, 21468,
    22050, 22645, 23243, 23853, 24467, 25094, 25723, 26364, 27011, 27667, 28329,
    29001, 29679, 30367, 31061
];

// Agregamos el parámetro esDenso (por defecto true)
function generarHemicicloOficial(totalSeats, esDenso = true) {
    if (totalSeats <= 0) return [];

    let rowCount = TOTALS_WIKIMEDIA.findIndex(el => el >= totalSeats) + 1;
    let circleRadius = 0.4 / rowCount;
    let diagramFullness = totalSeats / TOTALS_WIKIMEDIA[rowCount - 1];

    let discardRows = 0;
    
    // Si la opción está activa, calcula el descarte de filas internas para angostar el diseño
    if (esDenso) {
        let handledSpots = 0;
        for (let i = rowCount; i > 0; i--) {
            let magicNumber = 3 * rowCount + 4 * i - 2;
            let maximumSeatsInRow = Math.PI / (2 * Math.asin(2 / magicNumber));
            handledSpots += Math.trunc(maximumSeatsInRow);

            if (handledSpots >= totalSeats) {
                discardRows = i - 1;
                diagramFullness = totalSeats / handledSpots;
                break;
            }
        }
    }

    let positions = [];

    function appendSeatPositions(seatsInRow, rowRadius) {
        let ratio = Math.sin(circleRadius / rowRadius);
        for (let i = 0; i < seatsInRow; i++) {
            let angle = 0;
            if (seatsInRow == 1) {
                angle = Math.PI / 2;
            } else {
                angle = i * (Math.PI - 2 * ratio) / (seatsInRow - 1) + ratio;
            }
            positions.push({
                angle: angle,
                x: 5.0 + 100.0 * (rowRadius * Math.cos(angle) + 1.75),
                y: 5.0 + 100.0 * (1.75 - rowRadius * Math.sin(angle)),
                r: circleRadius * 100.0
            });
        }
    }

    for (let i = discardRows + 1; i < rowCount; i++) {
        let magicNumber = 3.0 * rowCount + 4.0 * i - 2.0;
        let maximumSeatsInRow = Math.PI / (2 * Math.asin(2.0 / magicNumber));
        let seatsInCurrentRow = Math.trunc(diagramFullness * maximumSeatsInRow);
        let currentRowRadius = magicNumber / (4.0 * rowCount);
        appendSeatPositions(seatsInCurrentRow, currentRowRadius);
    }

    let leftoverSeats = totalSeats - positions.length;
    let finalRowRadius = (7 * rowCount - 2) / (4 * rowCount);
    appendSeatPositions(leftoverSeats, finalRowRadius);

    positions.sort((left, right) => {
        let cmpAngle = right.angle - left.angle;
        if (cmpAngle == 0) {
            let cmpX = right.x - left.x;
            if (cmpX == 0) return right.y - left.y;
            return cmpX;
        }
        return cmpAngle;
    });

    return positions;
}