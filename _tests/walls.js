let wallThickness = 80;

let topWall   = new Wall(
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