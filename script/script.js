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
'U','U','U','U', 'V','V', 'W','W', 'X', 'Y','Y', 'Z', "", ""];   // does not account for number of each tile in probability. Could replicate by repeating letters, ex. There are 9 "A" tiles, so we add 9 "A" elements in array
let letterBoxes = document.getElementsByClassName("letters"); //returns array of div elements
let word = document.getElementById("word");
let letterContainer = document.getElementById("letter-container");

function generateLetters() {
    for (let i=0; i < letterBoxes.length; i++){
        let letterBox = letterBoxes[i];
        let randomLetter = letters[Math.floor(Math.random()*letters.length)]; //picks random letter by providing random index
        letterBox.innerHTML = randomLetter;
    }
}
function startPractice(){

    generateLetters();

    letterContainer.addEventListener("click", function(e){
        let targetEl = e.target;
        if (targetEl.className === "letters") { // this is to check for if user clicks on the letterContainer element, which is the parent element of the letterBoxes elements.
            word.innerHTML += targetEl.textContent;
        }
    });

    function deleteLetter() {
        word.textContent = word.textContent.slice(0, word.textContent.length - 1);
    }
    let deleteBtn = document.getElementById("delete");
    deleteBtn.addEventListener("click", deleteLetter);
    
    let refresh = document.getElementById("refresh");
    refresh.addEventListener("click", function(){
        generateLetters();
    })

    let submit = document.getElementById("submit");
    submit.addEventListener("click", function(){
        let points = 0;
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
        alert("Your word scored:" + points + " points!");
    })
}