class Player {
    constructor(blockSize, color) {
        this.size = Math.floor(blockSize / 1.3);
        this.offset = Math.floor((blockSize - this.size) / 2);
        this.speed = this.offset;
        this.color = color;
        this.actionX = 0;
        this.actionY = 0;
        this.position = {
            x1: this.offset,
            y1: this.offset
        };
        this.borders = [];
        grid.forEach(row =>
            row.forEach(col =>
                col.borderLines.forEach((line, index) =>
                    col.walls[index] ? this.borders.push(line) : null
                )
            )
        );
    }

    moveX(direction) {
        if (direction === "right") this.actionX += this.speed;
        else if (direction === "left") this.actionX -= this.speed;
    }

    moveY(direction) {
        if (direction === "down") this.actionY += this.speed;
        else if (direction === "up") this.actionY -= this.speed;
    }

    checkPlayerPos() {
        var x1 = this.position.x1 + this.actionX;
        var y1 = this.position.y1 + this.actionY;
        var x2 = x1 + this.size;
        var y2 = y1 + this.size;
        if (x1 < 0 || x2 > canvasWidth) {
            this.actionX = 0;
        }
        if (y1 < 0 || y2 > canvasHeight) {
            this.actionY = 0;
        }

        this.borders.forEach(line => {
            if (
                this.intersects(
                    x1,
                    y1,
                    x2,
                    y1,
                    line.x1,
                    line.y1,
                    line.x2,
                    line.y2
                ) ||
                this.intersects(
                    x2,
                    y1,
                    x2,
                    y2,
                    line.x1,
                    line.y1,
                    line.x2,
                    line.y2
                ) ||
                this.intersects(
                    x1,
                    y2,
                    x2,
                    y2,
                    line.x1,
                    line.y1,
                    line.x2,
                    line.y2
                ) ||
                this.intersects(
                    x1,
                    y1,
                    x1,
                    y2,
                    line.x1,
                    line.y1,
                    line.x2,
                    line.y2
                )
            ) {
                this.actionX = 0;
                this.actionY = 0;
            }
        });
    }

    intersects(x1, y1, x2, y2, xx1, yy1, xx2, yy2) {
        return x1 <= xx1 && x2 >= xx2 && y1 <= yy1 && y2 >= yy2;
    }

    update() {
        this.position.x1 += this.actionX;
        this.position.y1 += this.actionY;
        this.actionX = 0;
        this.actionY = 0;
    }
}
