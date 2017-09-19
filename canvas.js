module.exports =
{

  LINE : 'X',
   BORDER_UP :'-',
   BORDER_SIDE : '|',
   state: [],
   visited: [],

  max_X: function() {
    return this.state[0].length
  },
  max_Y: function() {
    return this.state.length
  },

  bucketfill: function(x, y, c) {
      x = parseInt(x)
      y = parseInt(y)
      var curNode = x + "." + y

      if (this.visited.indexOf(curNode) > 0) {
          return
      }

      this.visited.push(curNode)

      if (x == 0 || y == 0 || x == this.max_X() || y == this.max_Y()) {
          return
      }

      if (this.state[y][x] == LINE || this.state[y][x] == c || this.state[y][x] == '-' || this.state[y][x] == '|') {
          return
      }

      this.state[y][x] = c


      //this.draw()
      this.bucketfill(x - 1, y, c)
      this.bucketfill(x + 1, y, c)
      this.bucketfill(x, y - 1, c)
      this.bucketfill(x, y + 1, c)
  }
,
  create: function(W, H) {
      var border = []


      for (var i = 0; i < W; i++) {
          border.push('-')
      }
      border = border.concat([this.BORDER_UP, this.BORDER_UP])

      this.state.push(border)

      for (var i = 0; i < H; i++) {
          var line = [];
          line.push(this.BORDER_SIDE)
          for (var j = 0; j < W; j++) {
              line.push(' ')
          }
          line.push(this.BORDER_SIDE)
          this.state.push(line)
      }

      this.state.push(border)
  },
  line: function(x1, y1, x2, y2) {
      if (x1 != x2 && y1 != y2)
        return
      if (x1 > this.max_X() || x2 > this.max_X() || y1 > this.max_Y() || y2 > this.max_Y())
        return

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
      return

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
