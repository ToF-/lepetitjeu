(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Position = (function() {

    function Position(data) {
      this.isEqual = __bind(this.isEqual, this);      this.x = data.x;
      this.y = data.y;
    }

    Position.prototype.isEqual = function(position) {
      return this.x === position.x && this.y === position.y;
    };

    return Position;

  })();

}).call(this);
