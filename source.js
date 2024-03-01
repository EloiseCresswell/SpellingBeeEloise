console.log("hello there!");
let score = 0;
let answerArray = [];
let answer = "";
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
  //printing each letter onto the corresponding button
  let letterString = constnants + vowels;
  let buttonone = document.getElementById("firstLet");
  buttonone.innerHTML = letterString[0];
  let buttontwo = document.getElementById("secondLet");
  buttontwo.innerHTML = letterString[1];
  let buttonthree = document.getElementById("thirdLet");
  buttonthree.innerHTML = letterString[2];
  let buttonfour = document.getElementById("forthLet");
  buttonfour.innerHTML = letterString[3];
  let buttonfive = document.getElementById("fifthLet");
  buttonfive.innerHTML = letterString[4];
  let buttonsix = document.getElementById("sixLet");
  buttonsix.innerHTML = letterString[5];
  let buttonseven = document.getElementById("sevenLet");
  buttonseven.innerHTML = letterString[6];
  //check if button is clicked, if so put value in answer field
  buttonone.addEventListener("click", function () {
    let letter = buttonone.innerHTML;
    document.getElementById("answer").value += letter;
  });
  buttontwo.addEventListener("click", function () {
    let letter = buttontwo.innerHTML;
    document.getElementById("answer").value += letter;
  });
  buttonthree.addEventListener("click", function () {
    let letter = buttonthree.innerHTML;
    document.getElementById("answer").value += letter;
  });
  buttonfour.addEventListener("click", function () {
    let letter = buttonfour.innerHTML;
    document.getElementById("answer").value += letter;
  });
  buttonfive.addEventListener("click", function () {
    let letter = buttonfive.innerHTML;
    document.getElementById("answer").value += letter;
  });
  buttonsix.addEventListener("click", function () {
    let letter = buttonsix.innerHTML;
    document.getElementById("answer").value += letter;
  });
  buttonseven.addEventListener("click", function () {
    let letter = buttonseven.innerHTML;
    document.getElementById("answer").value += letter;
  });
}
comboLetters();

function deleteButtonWork() {
  let answerProvided = document.getElementById("answer").value;
  let newAnswer = answerProvided.slice(0, -1);
  document.getElementById("answer").value = newAnswer;
}

let deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", deleteButtonWork);
//add delete button using slice(0, -1)

//check if combo letters are in the answer provided...

//function to check if the answer is correct / in the dictionary and run it if clicked
let answerSubmit = document.getElementById("submitButton");
answerSubmit.addEventListener("click", getAnswer);

function getAnswer() {
  document.getElementById("alreadyAnswered").textContent = "";
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
    } else if (answerArray.includes(answer)) {
      console.log("answer already in the answer array");
      document.getElementById("alreadyAnswered").textContent =
        "Answer already submitted!";
    } else {
      console.log("nice word");
      score = score + additionToScore;
      document.getElementById("score").textContent = score;
      document.getElementById("answer").value = "";
    }
    answerArray.push(answer);
    //const movies = await response.json();
    //console.log(movies);
  }
}
