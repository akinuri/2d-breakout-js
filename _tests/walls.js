let wallThickness = 60;

let topWall = new Wall(
    0,
    0,
    canvas.width - wallThickness,
    wallThickness,
);

let rightWall = new Wall(
    canvas.width - wallThickness,
    0,
    wallThickness,
    canvas.height - wallThickness,
);

let bottomWall = new Wall(
    wallThickness,
    canvas.height - wallThickness,
    canvas.width - wallThickness,
    wallThickness,
);

let leftWall = new Wall(
    0,
    wallThickness,
    wallThickness,
    canvas.height - wallThickness,
);

function recalculateWalls() {
    topWall.init(
        0,
        0,
        canvas.width - wallThickness,
        wallThickness,
    );
    rightWall.init(
        canvas.width - wallThickness,
        0,
        wallThickness,
        canvas.height - wallThickness,
    );
    bottomWall.init(
        wallThickness,
        canvas.height - wallThickness,
        canvas.width - wallThickness,
        wallThickness,
    );
    leftWall.init(
        0,
        wallThickness,
        wallThickness,
        canvas.height - wallThickness,
    );
}