var assert = require('assert');
var c = require('./canvas');





describe('Canvas Creation C 20 4', function() {
  c.create(20, 4);


  it('number of column should be 20 + 2 borders', function() {
    assert.equal(c.max_X(), 22);
  });

  it('number of row should be 4 + 2 borders', function() {
    assert.equal(c.max_Y(), 6);
  });
});

describe('Draw Line L 1 2 6 2', function() {

  c.line(1,2,6,2)
  var numberOfLine = c.hash('X')
  it('number of line should be 6', function() {
    assert.equal(numberOfLine, 6);
  });
});

describe('Draw Line L 6 3 6 4', function() {

//enter command: L 6 3 6 4
  c.line(6,3,6,4)
  var numberOfLine = c.hash('X')
  it('number of line should be 8', function() {
    assert.equal(numberOfLine, 8);
  });

});

describe('Draw rectangle R 14 1 18 3', function() {


  c.rectangle(14, 1, 18, 3)

  var numberOfLine = c.hash('X')
  it('number of line should be 20', function() {
    assert.equal(numberOfLine, 20);
  });

});

describe('bucketfill B 10 3 o', function() {
  c.bucketfill(10, 3, 'o')

  var numberOfLine = c.hash('X')
  var numberOfEmptySpace = c.hash(' ')
  var numberOfBucketFilled = c.hash('o')

  it('number of line should be 20', function() {
    assert.equal(numberOfLine, 20);
  });
  it('number of empty space  be 13', function() {
    assert.equal(numberOfEmptySpace, 13);
  });

  it('number of bucket filled be 47', function() {
    assert.equal(numberOfBucketFilled, 47);
  });
});


describe('bucketfill B 20 20 o //draw outside exception', function() {

  function testError() {
      c.bucketfill(20, 20, 'o')
  }

  it('draw outside exception', function() {
    assert.throws(testError, Error, "Draw in the canvas only");
  });

});
