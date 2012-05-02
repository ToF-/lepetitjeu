(function() {
  var Coordinate, Player, caseNumber, caseWidth, key, manageKB, myPlayer, paper, players, preparePlayground, socket, tell;

  myPlayer = {};

  players = [];

  paper = {};

  caseWidth = 20;

  caseNumber = 20;

  socket = io.connect(window.location.href);

  socket.on('move', function(data) {
    var currentPlayer, player, playerToMove;
    playerToMove = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = players.length; _i < _len; _i++) {
        player = players[_i];
        if (player.id === data.id) _results.push(player);
      }
      return _results;
    })();
    if (playerToMove.length === 0) {
      currentPlayer = new Player(data.id, data.color);
      currentPlayer.initialize();
      players.push(currentPlayer);
    } else {
      currentPlayer = playerToMove[0];
    }
    currentPlayer.coordinate = new Coordinate(data.coordinate);
    return currentPlayer.updateDrawing();
  });

  socket.on('new', function(data) {
    var playerToAdd;
    playerToAdd = new Player(data.myPlayer.id, data.myPlayer.color);
    playerToAdd.initialize();
    return players.push(playerToAdd);
  });

  socket.on('myPlayer', function(data) {
    myPlayer = new Player(data.id, data.color);
    myPlayer.initialize();
    return players.push(myPlayer);
  });

  socket.on('disconnect', function(id) {
    var playerToErase, _i, _len, _ref;
    _ref = players.filter(function(element) {
      return element.id === id;
    });
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      playerToErase = _ref[_i];
      playerToErase.drawing.remove();
    }
    return players = players.filter(function(element) {
      return element.id !== id;
    });
  });

  key = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  };

  Player = function(id, color) {
    this.id = id;
    this.color = color;
    this.coordinate = new Coordinate({
      x: 0,
      y: 0
    });
    this.drawing = {};
    this.updateDrawing = function() {
      this.drawing.attr('cx', this.coordinate.x * caseWidth + caseWidth / 2);
      this.drawing.attr('cy', this.coordinate.y * caseWidth + caseWidth / 2);
      return this;
    };
    this.initialize = function() {
      var circle;
      circle = paper.circle(this.coordinate.x * caseWidth + caseWidth / 2, this.coordinate.y * caseWidth + caseWidth / 2, 10);
      circle.attr("fill", this.color);
      return this.drawing = circle;
    };
    return this;
  };

  Coordinate = function(obj) {
    this.x = obj.x;
    this.y = obj.y;
    this.areEqual = function(coordinate) {
      return this.x === coordinate.x && this.y === coordinate.y;
    };
    return this;
  };

  manageKB = function(k) {
    var tempCoordinate;
    tempCoordinate = new Coordinate(myPlayer.coordinate);
    switch (k.which) {
      case key.left:
        tempCoordinate.x -= 1;
        break;
      case key.up:
        tempCoordinate.y -= 1;
        break;
      case key.right:
        tempCoordinate.x += 1;
        break;
      case key.down:
        tempCoordinate.y += 1;
        break;
      default:
        console.log('nop ' + k.which);
    }
    if (tempCoordinate.x < 0) tempCoordinate.x = 0;
    if (tempCoordinate.x > (caseNumber - 1)) tempCoordinate.x = caseNumber - 1;
    if (tempCoordinate.y < 0) tempCoordinate.y = 0;
    if (tempCoordinate.y > (caseNumber - 1)) tempCoordinate.y = caseNumber - 1;
    if ((players.filter(function(element) {
      return element.id !== myPlayer.id && element.coordinate.areEqual(tempCoordinate);
    })).length === 0) {
      myPlayer.coordinate = tempCoordinate;
      myPlayer.updateDrawing();
    } else {
      console.log('colision');
    }
    return tell();
  };

  tell = function() {
    return socket.emit('move', {
      coordinate: myPlayer.coordinate,
      id: myPlayer.id,
      color: myPlayer.color
    });
  };

  preparePlayground = function() {
    var color, drawCase, x, y, _results;
    drawCase = function(x, y, color) {
      var paperCase;
      paperCase = paper.rect(x * caseWidth, y * caseWidth, caseWidth, caseWidth);
      if (color) {
        return paperCase.attr('fill', '#eee');
      } else {
        return paperCase.attr('fill', '#fff');
      }
    };
    color = false;
    _results = [];
    for (y = 0; y < caseNumber; y += 1) {
      for (x = 0; x < caseNumber; x += 1) {
        drawCase(x, y, color);
        color = !color;
      }
      _results.push(color = !color);
    }
    return _results;
  };

  $(function() {
    paper = Raphael(10, 50, caseWidth * caseNumber, caseWidth * caseNumber);
    preparePlayground();
    socket.emit('new');
    return $(document).keydown(manageKB);
  });

}).call(this);
