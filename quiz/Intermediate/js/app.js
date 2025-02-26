
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let Attempt = 0;

// push the questions into the availableQuestions array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
 for(let i = 0; i < totalQuestion; i++){ 
        availableQuestions.push(quiz[i])
    }
}
// set question number and question and options
function getNewQuestion(){
    // set question number
    questionNumber.innerHTML = "Question" + (questionCounter + 1) + " of " + quiz.length;

// set questions next get random questions
const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)] 
currentQuestion = questionIndex;
questionText.innerHTML = currentQuestion.q;

const index1= availableQuestions.indexOf(questionIndex);
// remove the question index so that the question doesn't repeat
availableQuestions.splice(index1,1);

if(currentQuestion.hasOwnProperty("img")){
    const img = document.createElement("img");
    img.src = currentQuestion.img;
    img.className = "question-img";
    questionText.appendChild(img);
}
const optionLen = currentQuestion.options.length
// push options into availableOptions array
for(let i = 0; i < optionLen; i++){
    availableOptions.push(i)
}

optionContainer.innerHTML = '';
let animationDelay = 0.15;
// create options in html
for(let i = 0; i <optionLen; i++){
    // random option
    const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
    // get the position of optionIndex from the availableOptions
    const index2 = availableOptions.indexOf(optonIndex);
    // remove the optionIndex from the availableOptions so that it doesn't repeat
    availableOptions.splice(index2,1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optonIndex];
    option.id = optonIndex;
    option.style.animationDelay =animationDelay + 's';
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option)
    option.setAttribute("onclick","getResult(this)");


}
questionCounter++;
}
// get the result of current attempt
function getResult(element){
  
    const id = parseInt(element.id);
    // get the answer by comparing the id of the clicked option
    if(id === currentQuestion.answer){
        // set the green color to the correct option
        element.classList.add("correct");
        // add indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
        element.classList.add("wrong");
        // add indicator to wrong mark
        updateAnswerIndicator("wrong");
        const optionLen = optionContainer.children.length;
        for(let i = 0; i < optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }

    }
   Attempt++;
    unclickableOptions();
    }
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i = 0 ; i< optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = "";
    const totalQuestion = quiz.length;
   for (let i = 0; i <totalQuestion; i++){
    const indicator = document.createElement("div");
    answersIndicatorContainer.appendChild(indicator);
   }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}
function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }
    else{
        getNewQuestion();
    }
}
function quizOver(){
quizBox.classList.add("hide");
resultBox.classList.remove("hide");
quizResult();
}
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = Attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = Attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML =correctAnswers +" / "+ quiz.length;
}
function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    Attempt = 0;
}
function tryAgainQuiz(){
    // hide the result box
    resultBox.classList.add("hide");
    // show the quz box
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    // hide result box
    resultBox.classList.add("hide");
    // show home box
    homeBox.classList.remove("hide");
    resetQuiz();

}

// ##### STARTING POINT #####
function startQuiz() {

    // hide homebox
    homeBox.classList.add("hide");
      // show homebox
    quizBox.classList.remove("hide");
//    first we will set all questions in availableQuestions array
    setAvailableQuestions();
    // second we will call getNewQuestion(); function
    getNewQuestion();
    // to creaste the indicator of answers
    answersIndicator();
}
window.onload = function (){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}