// Generated by CoffeeScript 1.3.1
(function() {
  var Player, caseNumber, caseWidth, key, manageKB, myPlayer, paper, players, preparePlayground, socket, tell;

  myPlayer = {};

  players = [];

  paper = {};

  caseWidth = 20;

  caseNumber = 20;

  socket = io.connect('http://192.168.2.53:666');

  socket.on('move', function(data) {
    var currentPlayer, player, playerToMove;
    playerToMove = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = players.length; _i < _len; _i++) {
        player = players[_i];
        if (player.id === data.id) {
          _results.push(player);
        }
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
    currentPlayer.drawing.attr('cx', data.x);
    return currentPlayer.drawing.attr('cy', data.y);
  });

  socket.on('new', function(data) {
    var playerToAdd;
    playerToAdd = new Player(data.id, data.color);
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
    this.x = 0;
    this.y = 0;
    this.drawing = {};
    return this;
  };

  Player.prototype.initialize = function() {
    var circle;
    circle = paper.circle(this.x * caseWidth + caseWidth / 2, this.y * caseWidth + caseWidth / 2, 10);
    circle.attr("fill", this.color);
    return this.drawing = circle;
  };

  manageKB = function(k) {
    switch (k.which) {
      case key.left:
        myPlayer.x -= 1;
        break;
      case key.up:
        myPlayer.y -= 1;
        break;
      case key.right:
        myPlayer.x += 1;
        break;
      case key.down:
        myPlayer.y += 1;
        break;
      default:
        console.log('nop ' + k.which);
    }
    if (myPlayer.x < 0) {
      myPlayer.x = 0;
    }
    if (myPlayer.x > (caseNumber - 1)) {
      myPlayer.x = caseNumber - 1;
    }
    if (myPlayer.y < 0) {
      myPlayer.y = 0;
    }
    if (myPlayer.y > (caseNumber - 1)) {
      myPlayer.y = caseNumber - 1;
    }
    myPlayer.drawing.attr('cx', myPlayer.x * caseWidth + caseWidth / 2);
    myPlayer.drawing.attr('cy', myPlayer.y * caseWidth + caseWidth / 2);
    return tell();
  };

  tell = function() {
    return socket.emit('move', {
      x: myPlayer.drawing.attr('cx'),
      y: myPlayer.drawing.attr('cy'),
      id: myPlayer.id,
      color: myPlayer.color
    });
  };

  preparePlayground = function() {
    var color, drawCase, x, y, _i, _j, _results;
    drawCase = function(x, y, color) {
      var paperCase;
      paperCase = paper.rect(x * caseWidth, y * caseWidth, caseWidth, caseWidth);
      console.log('case x:' + x + ' y:' + y + 'color: ' + color + 'caseWidth: ' + caseWidth);
      if (color) {
        return paperCase.attr('fill', '#ddd');
      } else {
        return paperCase.attr('fill', '#fff');
      }
    };
    color = false;
    _results = [];
    for (y = _i = 0; _i < caseNumber; y = _i += 1) {
      for (x = _j = 0; _j < caseNumber; x = _j += 1) {
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
