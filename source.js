console.log("hello there!");
let score = 0;

//finding the answer when you submit the button

//function to give 7 random letters...
let characters = "BCDFGHJKLMNPQRSTVWXYZ";

function fiveRandomConsts() {
  let randomLetters = "";
  for (let i = 0; i < 5; i++) {
    let randomLet = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    characters = characters.replace(randomLet, "");
    randomLetters += randomLet;
  }
  return randomLetters;
}

//Vowel function
let vowels = "AEIOU";

function twoRandomVowels() {
  let randomLettersVowels = "";
  for (let i = 0; i < 2; i++) {
    let randomLet = vowels.charAt(Math.floor(Math.random() * vowels.length));
    //console.log(randomLet);
    vowels = vowels.replace(randomLet, "");
    randomLettersVowels += randomLet;
    //console.log(randomLetters);
  }
  return randomLettersVowels;
}

//combining the two functions together to produce the string for the letters
function comboLetters() {
  const constnants = fiveRandomConsts();
  const vowels = twoRandomVowels();
  document.getElementById("letters").innerHTML = constnants + vowels;
}

comboLetters();

//check if combo letters are in the answer provided...

//function to check if the answer is correct / in the dictionary and run it if clicked
let answerSubmit = document.getElementById("submitButton");
answerSubmit.addEventListener("click", getAnswer);
function getAnswer() {
  answer = document.getElementById("answer").value;
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + answer;
  checkDictionary();

  //changing the score based on answer length...
  //if <4 - score 1
  //if >4 - score 2
  let additionToScore = 1;
  if (answer.length > 4) {
    additionToScore = 2;
  }

  //function to check if the given word is in fact a word in the dictionary
  async function checkDictionary() {
    const response = await fetch(url);
    if (response.status === 404) {
      console.log("not a word");
    } else {
      console.log("nice word");
      score = score + additionToScore;
      document.getElementById("score").textContent = score;
    }
    //const movies = await response.json();
    //console.log(movies);
  }
}
