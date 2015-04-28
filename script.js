$(document).ready(function() {
	game.init();
});

window.X = "X";
window.O = "O";

var board = {
	init: function() {
		$(".subBoardSpace").click(function() {
			if (!$(this).parent().parent().hasClass("currentBoard") || $(this).hasClass("x") || $(this).hasClass("o")) {
				return;
			}
			
			board.currentBoard = $(this).parent().parent().data("space");
			board.place(game.currentPlayer, this);
			if (game.existsSubWin(board.currentBoard)) {
				game.declareSubWinner(board.currentBoardWinner, board.currentBoard);
				
				if (game.existsGameWinner()) {
					return;
				}
			}
			
			game.switchPlayer();
			game.switchBoard($(this).data("space"));
		});
		
		$(".reset").click(game.reset);
	},
	
	currentBoard: "",
	currentBoardWinner: "",
	
	place: function(which, where) {
		$(where).addClass(which.toLowerCase());
	}
};

var game = {
	init: function() {
		this.switchPlayer(X);
		board.init();
	},
	
	currentPlayer: "",
	
	switchPlayer: function(player) {
		if (player) {
			game.currentPlayer = player;
		}
		else {
			game.currentPlayer = (game.currentPlayer == X) ? O : X;
		}
		$(".subBoardSpace").removeClass("turnX turnO").addClass("turn" + game.currentPlayer);
	},
	switchBoard: function(whichBoard) {
		board.currentBoard = whichBoard;
		$(".subBoard").removeClass("currentBoard currentBoardX currentBoardO")
		
		if (!$(".board" + whichBoard).hasClass("won")) {
			$(".board" + whichBoard).addClass("currentBoard currentBoard" + game.currentPlayer);
			return;
		}
		$(".subBoard").not(".won").addClass("currentBoard currentBoard" + game.currentPlayer);
	},
	
	winningCombinations: [
		/^.*0.*1.*2.*$/,
		/^.*3.*4.*5.*$/,
		/^.*6.*7.*8.*$/,
		/^.*0.*3.*6.*$/,
		/^.*1.*4.*7.*$/,
		/^.*2.*5.*8.*$/,
		/^.*0.*4.*8.*$/,
		/^.*2.*4.*6.*$/
	],
	existsSubWin: function(whichBoard) {
		var allX = "",
			allO = "";
		
		$(".board" + whichBoard + " .subBoardSpace.x").each(function() {
			allX += $(this).data("space");
		});
		$(".board" + whichBoard + " .subBoardSpace.o").each(function() {
			allO += $(this).data("space");
		});
		
		for (i in game.winningCombinations) {
			if (game.winningCombinations[i].test(allX)) {
				board.currentBoardWinner = X;
				return true;
			}
			if (game.winningCombinations[i].test(allO)) {
				board.currentBoardWinner = O;
				return true;
			}
		}
		return false;
	},
	declareSubWinner: function(winner, whichBoard) {
		$(".board" + whichBoard).addClass("won won" + winner);
	},
	
	existsGameWinner: function() {
		var allX = "",
			allO = "";
		
		$(".wonX").each(function() {
			allX += $(this).data("space");
		});
		$(".wonO").each(function() {
			allO += $(this).data("space");
		});
		
		for (i in game.winningCombinations) {
			if (game.winningCombinations[i].test(allX)) {
				game.declareGameWinner(X);
				return true;
			}
			if (game.winningCombinations[i].test(allO)) {
				game.declareGameWinner(O);
				return true;
			}
		}
		return false;
	},
	declareGameWinner: function(who) {
		$(".subBoard").removeClass("currentBoard currentBoardX currentBoardO")
		window.setTimeout(function() {
			alert(who + " wins!");
			game.reset();
		}, 500);
	},
	
	
	reset: function() {
		$(".subBoard").removeClass("won wonX wonO currentBoard currentBoardX currentBoardO").addClass("currentBoard");
		$(".subBoardSpace").removeClass("turnX turnO x o");
		game.switchPlayer(X);
	}
};