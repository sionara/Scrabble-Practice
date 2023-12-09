window.onload = startPractice;

let letters = ['A','A','A','A','A','A','A','A','A',
'B','B',
'C','C', 
'D', 'D', 'D', 'D',
'E','E','E','E','E','E','E','E','E','E','E','E',
'F','F', 
'G','G','G',
'H','H', 
'I','I','I','I','I','I','I','I','I', 
'J',
'K', 
'L','L','L','L',
'M','M',
'N','N','N','N','N','N',
'O','O','O','O','O','O','O','O', 
'P', 'P',
'Q', 
'R','R','R','R','R','R', 
'S','S','S','S', 
'T','T','T','T','T','T', 
'U','U','U','U', 'V','V', 'W','W', 'X', 'Y','Y', 'Z', "Blank Tile", "Blank Tile"];   // does not account for number of each tile in probability. Could replicate by repeating letters, ex. There are 9 "A" tiles, so we add 9 "A" elements in array
let letterBoxes = document.getElementsByClassName("letters"); //returns array of div elements
let word = document.getElementById("word");
let letterContainer = document.getElementById("letter-container");
let prevClick = []; // an array to keep track of the clicked letters in ORDER.
let errorMsg = document.getElementById("errorMsg");

function generateLetters() {
    for (let i=0; i < letterBoxes.length; i++){
        let letterBox = letterBoxes[i];
        let randomLetter = letters[Math.floor(Math.random()*letters.length)]; //picks random letter by providing random index
        letterBox.innerHTML = randomLetter;
    }
}
function startPractice(){

    generateLetters();
    // handler for clicking letters.
    letterContainer.addEventListener("click", function(e){
        let targetEl = e.target;
        if (targetEl.className === "letters") { // this is to check for if user clicks on the letterContainer element, which is the parent element of the letterBoxes elements.
            if (targetEl.innerText === "Blank Tile"){ // allows user to declare a letter for blank tiles.
                let letter = prompt("What letter would you like to declare?").toUpperCase();
                word.innerText += letter;
            } else {word.innerText += targetEl.innerText;}
            
            targetEl.setAttribute("disabled", ""); //disable button that was used.
            prevClick.push(targetEl);
        }
    });

    function deleteLetter() {
        word.textContent = word.textContent.slice(0, word.textContent.length - 1);
        prevClick[prevClick.length - 1].removeAttribute("disabled");
        prevClick.pop();
    }
    let deleteBtn = document.getElementById("delete");
    deleteBtn.addEventListener("click", deleteLetter);
    
    let refresh = document.getElementById("refresh");
    refresh.addEventListener("click", function(){
        location.reload();
    })

    let submit = document.getElementById("submit");
    submit.addEventListener("click", function(){
        if (word.innerText == "") {errorMsg.innerText = "Please enter a word."}
        else {
            let points = 0;
            let table = document.getElementById("results");
            let newRow = table.insertRow();
            let cell1 = newRow.insertCell();
            let cell2 = newRow.insertCell();

            for (let char of word.textContent){ // this iterates over each letter in word
                if (char == 'Q' || char == 'Z'){
                    points += 10;
                } else if (char == 'J' || char == 'X'){
                    points += 8;
                } else if (char == 'K'){
                    points += 5
                } else if (['F', 'H', 'V', 'W', 'Y'].includes(char)){
                    points += 4;
                } else if (['B', 'C', 'M', 'P'].includes(char)){
                    points += 3;
                } else if (char == 'D' || char =='G'){
                    points += 2;
                } else {
                    points += 1;
                } //blanks are considered 0 points.
            }

                cell1.textContent = word.textContent;
                cell2.textContent = points;

            // on submit, reset the word, reset disabled attribute and generate new letters.
            word.innerText = "";
            prevClick.forEach((letter) => {
                letter.removeAttribute("disabled");
            })
            generateLetters();
            errorMsg.innerText = "";
        }
        
    })
}