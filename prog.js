var readlineSync = require('readline-sync');


/*
C w h           Should create a new canvas of width w and height h.
L x1 y1 x2 y2   Should create a new line from (x1,y1) to (x2,y2). Currently only
                horizontal or vertical lines are supported. Horizontal and vertical lines
                will be drawn using the 'x' character.
R x1 y1 x2 y2   Should create a new rectangle, whose upper left corner is (x1,y1) and
                lower right corner is (x2,y2). Horizontal and vertical lines will be drawn
                using the 'x' character.
B x y c         Should fill the entire area connected to (x,y) with "colour" c. The
                behaviour of this is the same as that of the "bucket fill" tool in paint
                programs.
Q               Should quit the program.
*/

var answer = ''
var cmd = ''

class Canvas {
    var LINE = 'X'
    var BORDER_UP = '-'
    var BORDER_SIDE = '|'

    constructor() {
        this.state = []
        this.visited = []

    }
    bucketfill(x, y, c, lvl) {

        x = parseInt(x)
        y = parseInt(y)
        var curNode = x + "." + y

        if (this.visited.indexOf(curNode) > 0) {
            return
        }

        this.visited.push(curNode)



        if (lvl < 0) {
            return
        }

        if (x == 0 || y == 0 || x == this.state[0].length || y == this.state.length) {
            return
        }

        if (this.state[y][x] == LINE) {
            return
        }

        if (this.state[y][x] == c || this.state[y][x] == '-' || this.state[y][x] == '|') {
            return
        }




        if (this.state[y][x] == 'E') {
            this.state[y][x] = c
        }

        //this.draw()
        this.bucketfill(x - 1, y, c, lvl - 1)
        this.bucketfill(x + 1, y, c, lvl - 1)
        this.bucketfill(x, y - 1, c, lvl - 1)
        this.bucketfill(x, y + 1, c, lvl - 1)
    }

    create(W, H) {
        var border = []


        for (var i = 0; i < W; i++) {
            border.push('-')
        }
        border = border.concat([BORDER_UP, BORDER_UP])

        this.state.push(border)

        for (var i = 0; i < H; i++) {
            var line = [];
            line.push(BORDER_SIDE)
            for (var j = 0; j < W; j++) {
                line.push(' ')
            }
            line.push(BORDER_SIDE)
            this.state.push(line)
        }

        this.state.push(border)
    }



    line(x1, y1, x2, y2) {



        if (x1 != x2 && y1 != y2)
            return

        if (x1 == x2) {
            var s = Math.min(y1, y2)
            var e = Math.max(y1, y2)
            for (var y = s; y <= e; y++) {
                var x = x1
                this.state[y][x] = LINE
            }
        }
        if (y1 == y2) {

            var s = Math.min(x1, x2)
            var e = Math.max(x1, x2)
            for (var x = s; x <= e; x++) {
                var y = y1
                this.state[y][x] = LINE
            }
        }
    }


    rectangle(x1, y1, x2, y2) {
        this.line(x1, y1, x1, y2)
        this.line(x2, y1, x2, y2)
        this.line(x1, y1, x2, y1)
        this.line(x1, y2, x2, y2)
    }




    draw() {
        this.state.forEach(
            function(line) {
                console.log(line.join(''))
            }
        )
    }




}


let c = new Canvas();

while (cmd[0] != "Q") {
    answer = readlineSync.question('');
    var cmd = answer.split(" ");
    var day

    switch (cmd[0]) {
        case "C":
            var W = cmd[1]
            var H = cmd[2]
            c.create(W, H)
            c.draw()

            break;
        case "L":
            c.line(cmd[1], cmd[2], cmd[3], cmd[4])
            c.draw()

            break;
        case "R":
            c.rectangle(cmd[1], cmd[2], cmd[3], cmd[4])
            c.draw()
            break;
        case "B":
            c.visited = []
            c.bucketfill(cmd[1], cmd[2], cmd[3], 100)
            c.draw()
            break;

    }
}
