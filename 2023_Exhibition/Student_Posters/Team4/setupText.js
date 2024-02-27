// lines[0] = new symbol(width * 0.02, height * 0.2, 135, "o");
//lines[0].setEnd( width * 0.8, height * 0.8, "t")

function setupText() {
	textSize(2.5 * poster.vw);
	symbols = [] 
	// shorten strings to be same length if they are different
	if (myString.length > myStringTwo.length) {
		myString.slice(0, myStringTwo.length);
	} else {
		myStringTwo.slice(0, myString);
	}

	// get just characters, no endlines
	let stringOneCharsOnly = myString.split("$").join(""); //
	let myStringTwoCharsOnly = myStringTwo.split("$").join(""); //

	// find out the important values to create grid
	let noLines = myStringTwo.split('$').length - 1 // check how many new line character: \n
	let rows = myStringTwo.split('$'); // split into rows
	let noColums = rows[0].length; // check how many character before new line 
	let noEndcharacter = 0; // we will find this value below
	let noStartcharacter = 0; // we will find this value below
	//
	for (let i = 0; i < stringOneCharsOnly.length; i++) {
		let letter = stringOneCharsOnly.charAt(i);

		if (!hasWhiteSpace(letter)) { // ignore spaces 

			let x = i % noColums + 1;
			let y = floor(i / noColums);

			let mapX = (width / noColums) * x;
			let mapY = (height / noLines) * y;
			// item is an object containing all the important data for each letter
			
			let newSymbole = new symbol(mapX, mapY, 135, letter);
			
			/*
			let item = {
				startX: mapX,
				startY: mapY,
				endX: 0,
				endY: 0,
				x: mapX,
				y: mapY,
				letter: letter,
				endLetter: "",
			}*/
			symbols.push(newSymbole);
		}
	}
	noStartcharacter = symbols.length;
	// add end symbols
	let index = 0;
	for (let i = 0; i < myStringTwoCharsOnly.length; i++) {
		let letter = myStringTwoCharsOnly.charAt(i);
		if (!hasWhiteSpace(letter)) { // ignore spaces 
			index++;
			noEndcharacter++;
			let x = i % noColums + 1;
			let y = floor(i / noColums);

			let mapX = (width / noColums) * x;
			let mapY = (height / noLines) * y;

			if (index < noStartcharacter) {
				// add end positions and letters in
				symbols[index].setEnd(mapX, mapY, letter)
			} else {
				// There are more end positions than start positions:
				//// 1. Make a new item
				//// 2. Give it a random start position
				let randomIndex = floor(random(noStartcharacter))

				let newSymbole = new symbol(symbols[randomIndex].x, symbols[randomIndex].y, 135, symbols[randomIndex].letter);
				newSymbole.setEnd(mapX, mapY, letter)
				/*
				let item = {
					startX: symbols[randomIndex].x,
					startY: symbols[randomIndex].y,
					endX: mapX,
					endY: mapY,
					x: symbols[randomIndex].x,
					y: symbols[randomIndex].y,
					letter: symbols[randomIndex].letter,
					endLetter: letter,
				}
				*/
				symbols.push(newSymbole);
			}
		}
	}

	// If there are start position with out end positions, give random ones
	// not tested!
	/*
		for (let i = noEndcharacter ; i < noStartcharacter; i++) {
			console.log(i);
				let randomIndex = floor(random(noEndcharacter));
				symbols[i].endLetter = symbols[randomIndex].endLetter;
				symbols[i].endX = symbols[randomIndex].endX;
				symbols[i].endY = symbols[randomIndex].endY;
		}	*/
}

function hasWhiteSpace(s) {
	return /\s/g.test(s);
}