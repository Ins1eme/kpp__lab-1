var readlineSync = require("readline-sync");

var number;
var complexity = {
	0: 15,
	1: 10,
	2: 5,
};


if (!readlineSync.keyInYN("Hello, do you want to play a game?")) {
	return false;
}

var complexityArray = ["Ease", "Normal" , "Hard"],
	complexityNumber = readlineSync.keyInSelect(complexityArray, "Choose complexity of the game: "),
	regExp = (/[0-9]{4}/),
	randomArr = [];
	complexityCount = complexity[complexityNumber],
	countBulls = 0,
	countCows = 0;

function getUserStringArray() {

	number = readlineSync.question("Enter the number (4 symbols): ", {
		limitMessage: "Input correct number, please."
	});

	while(number.match(regExp) === null || number.length !== 4) {
		console.log("Input correct number, please.");
		getUserStringArray();
	}

	return number.toString().split("");;
}

function getRandomArray(array){

	while(array.length < 4) {
		var index = Math.floor(Math.random() * (9)).toString();
		if(array.indexOf(index) === -1){
			array.push(index.toString());		
		}
	}
	return array;
}

getRandomArray(randomArr);

(function checkCowsAndBulls() {
	while(true){
		if(complexityCount) {

			var userArray = getUserStringArray();

			for(var i = 0; i < randomArr.length; i++){
				if(userArray[i] === randomArr[i]){
					countBulls++;
					if(countBulls === randomArr.length){
						return console.log("YOU WON , this number " +  randomArr.join(""));
					}
				}
				for(var j = 0; j < userArray.length; j++){
					if(randomArr[i] === userArray[j] && userArray[i] !== randomArr[i]){
						countCows++
					}
				}
			}

			console.log("Bulls: " + countBulls + " Cows: " + countCows);

			countBulls = 0;
			countCows = 0;

			complexityCount--;
			
		}else {
			return console.log("YOU LOOSE, this number " + randomArr.join(""));
		}
	}
})();