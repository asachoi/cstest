module.exports =
{

  LINE : 'X',
   BORDER_UP :'-',
   BORDER_SIDE : '|',
   state: [],
   visited:[],



  max_X: function() {
    return this.state[0].length
  },
  max_Y: function() {
    return this.state.length
  },
  hash: function(symbol) { //testing function, return count of input symbol
    var sum = 0;
    this.state.forEach(
      function(line) {
        sum += line.filter(
          function(p) {
            return p == symbol
          }
        ).length
      }
    )
    return sum;
  },

  bucketfill: function(x, y, c) {
      x = parseInt(x) //ensure the data type
      y = parseInt(y) //ensure the data type
      var curNode = x + "." + y

      if (this.visited.indexOf(curNode) > 0) {
          return //stop if eval already
      }

      this.visited.push(curNode)


      if(x > this.max_X() || y > this.max_Y()) {
          throw new Error("Draw in the canvas only")
      }
      if (x == 0 || y == 0 || x == this.max_X() || y == this.max_Y()) {
          return //reach boundary
      }

      if (this.state[y][x] == this.LINE || this.state[y][x] == c || this.state[y][x] == this.BORDER_UP || this.state[y][x] == this.BORDER_SIDE) {
          return //stop if filled already or reach the borderss
      }

      this.state[y][x] = c //fill character

      this.bucketfill(x - 1, y, c) //spread the eval to neighborhood
      this.bucketfill(x + 1, y, c)
      this.bucketfill(x, y - 1, c)
      this.bucketfill(x, y + 1, c)
  }
,
  create: function(W, H) {
      var border = []

      for (var i = 0; i < W; i++) { //create the updown border
          border.push('-')
      }
      border = border.concat([this.BORDER_UP, this.BORDER_UP]) //add two pixels

      this.state.push(border) //top border

      for (var i = 0; i < H; i++) {
          var line = [];
          line.push(this.BORDER_SIDE) //border left
          for (var j = 0; j < W; j++) {
              line.push(' ')
          }
          line.push(this.BORDER_SIDE) //right border
          this.state.push(line)
      }

      this.state.push(border) //bottom border
  },
  line: function(x1, y1, x2, y2) {
      if (x1 != x2 && y1 != y2)
        throw new Error("Currently only horizontal or vertical lines are supported")
      if (x1 > this.max_X() || x2 > this.max_X() || y1 > this.max_Y() || y2 > this.max_Y())
        throw new Error("Draw in the canvas only")

      if (x1 == x2) {
          var s = Math.min(y1, y2)
          var e = Math.max(y1, y2)
          for (var y = s; y <= e; y++) {
              var x = x1
              this.state[y][x] = this.LINE
          }
      }
      if (y1 == y2) {

          var s = Math.min(x1, x2)
          var e = Math.max(x1, x2)
          for (var x = s; x <= e; x++) {
              var y = y1
              this.state[y][x] = this.LINE
          }
      }
  },
  rectangle: function(x1, y1, x2, y2) {

    if (x1 > this.max_X() || x2 > this.max_X() || y1 > this.max_Y() || y2 > this.max_Y())
      throw new Error("Draw in the canvas only")

    this.line(x1, y1, x1, y2)
    this.line(x2, y1, x2, y2)
    this.line(x1, y1, x2, y1)
    this.line(x1, y2, x2, y2)
  },
  draw: function() {
      this.state.forEach(
          function(line) {
              console.log(line.join(''))
          }
      )
  }


};
