'use strict';

var readlineSync = require('readline-sync');
var c = require('./canvas');

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

var cmd = []

while (cmd[0] != "Q") {
    var input = readlineSync.question('');
    var cmd = input.split(" ");

    switch (cmd[0]) {
        case "C":
            var W = cmd[1]
            var H = cmd[2]
            c.create(W, H)
            c.draw()
            break;
        case "L":

            try {
              //x1, y1, y2, y2
                c.line(cmd[1], cmd[2], cmd[3], cmd[4])
                c.draw()
            } catch (e) {
                console.log(e.message)
            }
            break;
        case "R":
            try {
                //x1, y1, y2, y2
                c.rectangle(cmd[1], cmd[2], cmd[3], cmd[4])
                c.draw()
            } catch (e) {
                console.log(e.message)
            }
            break;
        case "B":
            try{
                c.visited = []
                //x, y, colour
                c.bucketfill(cmd[1], cmd[2], cmd[3])
                c.draw()
              } catch (e) {
                  console.log(e.message)
            }
            break;

    }
}
