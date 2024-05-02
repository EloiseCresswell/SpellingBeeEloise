//Variables used during:
const scoreCookie = getCookie(`score`);
let score = scoreCookie ? Number(scoreCookie) : 0;
let answerArray = getCookie(`answer`) ? JSON.parse(getCookie(`answer`)) : [];
let answer = "";
let CONSTANANTS = "BCDFGHJKLMNPQRSTVWXYZ";
let VOWELS = "AEIOU";

//changing HTML depedning on the score  of the cookie  when webpage is loaded (if cookie has a score)
document.getElementById("score").innerHTML = scoreCookie ? scoreCookie : 0;

//function to get a random letter depending on the string given

function getRandomLetters(amount, letterString) {
  let randomLetters = "";
  for (let i = 0; i < amount; i++) {
    let randomLet = letterString.charAt(
      Math.floor(Math.random() * letterString.length)
    );
    letterString = letterString.replace(randomLet, "");
    randomLetters += randomLet;
    console.log(randomLetters);
  }
  return randomLetters;
}
//Read a cookie to give cookie letters (from googles)
function getCookie(cname) {
  //   let name = cname + "=";
  //   let decodedCookie = decodeURIComponent(document.cookie);
  //   let ca = decodedCookie.split(";");
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) == " ") {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
}
//function to produce the string for the letters

let letterString = "";
function comboLetters() {
  //checking if we have a cookie set to letters
  let cookieLetters = getCookie("letters");
  if (cookieLetters) {
    letterString = cookieLetters;
  } else {
    let consties = getRandomLetters(5, CONSTANANTS);
    let vowlies = getRandomLetters(2, VOWELS);
    letterString =
      consties[0] +
      vowlies[0] +
      consties[1] +
      vowlies[1] +
      consties[2] +
      consties[3] +
      consties[4];
  }
  //expiring the cookie
  let exdate = new Date();
  exdate.setHours(23);
  exdate.setMinutes(59);
  exdate.setSeconds(59);
  //COOKIE TIME
  document.cookie = `letters=${letterString}; expires=${exdate}`;
  let buttonId = [
    "firstLet",
    "secondLet",
    "thirdLet",
    "forthLet",
    "fifthLet",
    "sixLet",
    "sevenLet",
  ];
  buttonId.forEach(function (element, index) {
    let button = document.getElementById(element);
    button.innerHTML = letterString[index];
    button.addEventListener("click", function () {
      let letter = button.innerHTML;
      document.getElementById("answer").value += letter;
    });
  });
}
comboLetters();

//function to add event listeners for when specific keys are pressed
document.addEventListener("keydown", function keyPressed(event) {
  let key = event.key;
  let upperKey = key.toUpperCase();
  console.log(key);
  console.log(letterString);
  //check if the key pressed is part of the letterString
  if (letterString.includes(upperKey)) {
    document.getElementById("answer").value += upperKey;
  }
});

function deleteButtonWork() {
  let answerProvided = document.getElementById("answer").value;
  let newAnswer = answerProvided.slice(0, -1);
  document.getElementById("answer").value = newAnswer;
}

//function delete key to work
document.addEventListener("keydown", function deleteKeyWork(event) {
  if (event.keyCode == 8) {
    let answerProvided = document.getElementById("answer").value;
    let newAnswer = answerProvided.slice(0, -1);
    document.getElementById("answer").value = newAnswer;
  }
});

//function to get enter to submit the answer
document.addEventListener("keydown", function sendAnswer(event) {
  if (event.keyCode == 13) {
    getAnswer();
  }
});

let deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", deleteButtonWork);

let answerSubmit = document.getElementById("submitButton");
answerSubmit.addEventListener("click", getAnswer);

function getAnswer() {
  document.getElementById("alreadyAnswered").textContent = "";
  answer = document.getElementById("answer").value;
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + answer;
  checkDictionary();
  //changing the score based on answer length...
  let additionToScore = 1;
  if (answer.length > 4) {
    additionToScore = 2;
  }

  //function to check if the given word is in fact a word in the dictionary
  async function checkDictionary() {
    const response = await fetch(url);
    if (response.status === 404) {
      setAlreadyAnswered(`${answer} is not a word, try again!`);
    } else if (answerArray.includes(answer)) {
      setAlreadyAnswered("Answer already submitted!");
    } else {
      const buttonfour = document.getElementById("forthLet").innerHTML;
      if (answer.includes(buttonfour)) {
        setAlreadyAnswered(`${answer}, nice word!`);
        score = score + additionToScore;
        document.getElementById("score").textContent = score;
        document.getElementById("answer").value = "";
        answerArray.push(answer);
        //add cookie to store the score
        //expiring the cookie
        let exdate = new Date();
        exdate.setHours(23);
        exdate.setMinutes(59);
        exdate.setSeconds(59);
        document.cookie = `score=${score}; expires=${exdate};`;
        document.cookie = `answer=${JSON.stringify(
          answerArray
        )}; expires=${exdate};`;
      } else {
        setAlreadyAnswered(`Must include the highlighted word, ${buttonfour}`);
      }
    }
  }
}
function setAlreadyAnswered(text) {
  document.getElementById("alreadyAnswered").textContent = text;
}
