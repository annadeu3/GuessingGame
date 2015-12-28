/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
$(document).ready(function() {
	var userGuess = 0;
	var guesses = [];
	var winningNumber = generateWinningNumber();
	var maxGuess = 5;


/* **** Guessing Game Functions **** */

	function generateWinningNumber() {
		return Math.round(Math.random() * 100);
	}


	function playersGuessSubmission() {
		userGuess = +$('#playersGuess').val();
		if (!dupeNum(userGuess)) {
			guesses.push(userGuess);
			checkGuess();
		} else {
			$('#status').text("You entered this number alredy!");
			$('#status').css("color", "red");
		}
		
		$('#playersGuess').val("");
	}



	function guessMessage() {
		var mes1 = lowerOrHigher();
		var mes2;
		var numDiff = Math.abs(userGuess - winningNumber);

		if (numDiff > 25) {
			mes2 = "Brrr... You're super cold! Try Again!\n "
		} else if (numDiff <= 25 && numDiff >= 15) {
			mes2 = "Is it me? Or you're just cool?\n "
		} else if (numDiff < 15 && numDiff >= 8) {
			mes2 = "Oh! You're definitely getting warmer!\n "
		} else {
			mes2 = "It's getting HOT in here!\n "
		}
		$('#message1').text(mes2);
		$('#message2').text(mes1);
	}


	function lowerOrHigher(){
		if(userGuess > winningNumber) {
			return "Choose a lower number!";
		} else {
			return "Choose a higher number!";
		}
	}

// Check if the Player's Guess is the winning number 

	function checkGuess(){
		var guessesLeft = maxGuess - guesses.length;

		if (userGuess === winningNumber) {
			$('#status').text("Congrats, Pal! You guessed the correct number!");
			$('#status').css("color", "orange");
			$("#win").css("display", "block")
			$(".input").hide();
			$("#message1").hide();
			$("#message2").hide();
			$("body").addClass("winning");
			$("#start").hide();
			$(".lead").hide();
			$(".rules").hide();
		} else if (guessesLeft > 0) {
			if (guessesLeft === 1) {
				$("#status").text("You're down to ONE last guess");
				$('#status').addClass("guesses");
				guessMessage();
			} else {
				$("#status").text("You have " + (guessesLeft) + " guesses left.");
				$('#status').addClass("guesses");
				guessMessage();
			}
		} else {
			$('#status').text("YOU LOST! Click Play Again!");
			$("body").addClass("loser");
			$(".input").hide();
			$("#message1").hide();
			$("#message2").hide();
			$("#start").hide();
			$("#submit").hide();
			$("#hint").hide();
			$(".lead").hide();
			$(".rules").hide();
			$("#lost").css("display", "block");
		}
	}

	function dupeNum(num) {
		return guesses.indexOf(num) > -1;
	}

//hint gives correct answer
	function provideHint() {
		$('#message1').text("Give " + winningNumber + " a try!");
		$('#message1').css("font-family", "Montserrat");
		$('#message1').css("color", "tomato");	
	}


// Allow the "Player" to Play Again
	function playAgain() {
		location.reload();
	}

/* **** Event Listeners/Handlers ****  */
	$('#playersGuess').keyup(function(event) {
	        if (event.keyCode === 13) { 
	            $('#submit').click();
	        }
	    });

	$("#submit").click(playersGuessSubmission);
	$("#hint").click(provideHint);
	$("#reset").click(playAgain);

});