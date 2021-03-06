// Generated by CoffeeScript 1.9.1
(function() {
  var ai_turn, board, check_threat, dim, disable_board, filled, tie, win;

  board = [];

  dim = [0, 1, 2];

  filled = function(cell) {
    var ref;
    return (ref = cell[0].innerHTML) === 'X' || ref === 'O';
  };

  win = function() {
    var status_bar;
    status_bar = $('#status')[0];
    status_bar.style.color = "red";
    status_bar.innerHTML = "AI wins. Reload page to retry.";
    return disable_board();
  };

  tie = function() {
    var status_bar;
    status_bar = $('#status')[0];
    status_bar.style.color = "yellow";
    status_bar.innerHTML = "It's a tie.  Reload page to retry.";
    return disable_board();
  };

  disable_board = function() {
    var k, len, results, row;
    results = [];
    for (k = 0, len = board.length; k < len; k++) {
      row = board[k];
      results.push((function(row) {
        var item, l, len1, results1;
        results1 = [];
        for (l = 0, len1 = row.length; l < len1; l++) {
          item = row[l];
          results1.push((function(item) {
            return item[0].onclick = false;
          })(item));
        }
        return results1;
      })(row));
    }
    return results;
  };

  check_threat = function(rows, cols, me) {
    var cell, empty, i, k, len, owner, ref, threat;
    threat = 0;
    empty = void 0;
    ref = [0, 1, 2];
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      cell = board[rows[i]][cols[i]];
      owner = cell[0].innerHTML;
      if (owner === me) {
        return [0, void 0];
      }
      if (owner === '&nbsp;') {
        empty = cell;
      } else {
        threat += 1;
      }
    }
    return [threat, empty];
  };

  ai_turn = function(cell) {
    var col, empty, i, j, k, l, last_empty, len, len1, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, row, threat;
    if (filled(cell)) {
      return;
    }
    cell[0].innerHTML = 'X';
    if (!filled(board[1][1])) {
      board[1][1][0].innerHTML = 'O';
      return;
    }
    row = cell.row;
    col = cell.col;
    last_empty = void 0;
    ref = _.difference(dim, row);
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      ref1 = check_threat([i, i, i], [0, 1, 2], 'X'), threat = ref1[0], empty = ref1[1];
      if (threat === 2) {
        empty[0].innerHTML = 'O';
        win();
        return;
      }
      if (threat && empty) {
        last_empty = empty;
      }
    }
    ref2 = _.difference(dim, col);
    for (l = 0, len1 = ref2.length; l < len1; l++) {
      j = ref2[l];
      ref3 = check_threat([0, 1, 2], [j, j, j], 'X'), threat = ref3[0], empty = ref3[1];
      if (threat === 2) {
        empty[0].innerHTML = 'O';
        win();
        return;
      }
      if (threat && empty) {
        last_empty = empty;
      }
    }
    if (row !== col) {
      ref4 = check_threat([0, 1, 2], [0, 1, 2], 'X'), threat = ref4[0], empty = ref4[1];
      if (threat === 2) {
        empty[0].innerHTML = 'O';
        win();
        return;
      }
      if (threat && empty) {
        last_empty = empty;
      }
    }
    if (row !== 2 - col) {
      ref5 = check_threat([0, 1, 2], [2, 1, 0], 'X'), threat = ref5[0], empty = ref5[1];
      if (threat === 2) {
        empty[0].innerHTML = 'O';
        win();
        return;
      }
      if (threat && empty) {
        last_empty = empty;
      }
    }
    if (row === col) {
      ref6 = check_threat([0, 1, 2], [0, 1, 2], 'O'), threat = ref6[0], empty = ref6[1];
      if (threat === 2) {
        empty[0].innerHTML = 'O';
        return;
      }
    }
    if (empty && !last_empty) {
      last_empty = empty;
    }
    if (row === 2 - col) {
      ref7 = check_threat([0, 1, 2], [2, 1, 0], 'O'), threat = ref7[0], empty = ref7[1];
      if (threat === 2) {
        empty[0].innerHTML = 'O';
        return;
      }
    }
    if (empty && !last_empty) {
      last_empty = empty;
    }
    ref8 = check_threat([row, row, row], [0, 1, 2], 'O'), threat = ref8[0], empty = ref8[1];
    if (threat === 2) {
      empty[0].innerHTML = 'O';
      return;
    }
    if (empty && !last_empty) {
      last_empty = empty;
    }
    ref9 = check_threat([0, 1, 2], [col, col, col], 'O'), threat = ref9[0], empty = ref9[1];
    if (threat === 2) {
      empty[0].innerHTML = 'O';
      return;
    }
    if (empty && !last_empty) {
      last_empty = empty;
    }
    if (last_empty) {
      return last_empty[0].innerHTML = 'O';
    } else {
      return tie();
    }
  };

  this.initialize = function() {
    var i, k, len, results;
    results = [];
    for (k = 0, len = dim.length; k < len; k++) {
      i = dim[k];
      results.push((function(i) {
        var board_row, j, l, len1, results1, row;
        row = $.create('<tr>');
        $('#board').append(row[0]);
        board_row = [];
        board.push(board_row);
        results1 = [];
        for (l = 0, len1 = dim.length; l < len1; l++) {
          j = dim[l];
          results1.push((function(j) {
            var cell;
            cell = $.create('<td>');
            cell.row = i;
            cell.col = j;
            cell[0].innerHTML = '&nbsp;';
            cell[0].onclick = (function(_this) {
              return function(cell) {
                return function() {
                  return ai_turn(cell);
                };
              };
            })(this)(cell);
            row.append(cell[0]);
            return board_row.push(cell);
          })(j));
        }
        return results1;
      })(i));
    }
    return results;
  };

}).call(this);
