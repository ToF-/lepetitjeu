(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Position = (function() {

    function Position(data) {
      this.isEqual = __bind(this.isEqual, this);      if (data instanceof Array) {
        this.x = data[0];
        this.y = data[1];
      } else {
        this.x = data.x;
        this.y = data.y;
      }
    }

    Position.prototype.isEqual = function(position) {
      if (position instanceof Array) {
        return this.x === position[0] && this.y === position[1];
      } else {
        return this.x === position.x && this.y === position.y;
      }
    };

    return Position;

  })();

}).call(this);
