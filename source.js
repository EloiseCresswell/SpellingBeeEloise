console.log("hello there!");
let score = 0;
let answerSubmit = document.getElementById("submitButton");
answerSubmit.addEventListener("click", getAnswer);
//finding the answer when you submit the button

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
