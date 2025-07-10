const ques = document.querySelector("h2");
const ansmain = document.querySelector('.buttons')
const ans1 = document.querySelector(".ans1 button");
const ans2 = document.querySelector(".ans2 button");
const ans3 = document.querySelector(".ans3 button");
const ans4 = document.querySelector(".ans4 button");
const next = document.querySelector(".next button");
const final = document.querySelector('.final')
const restart = document.querySelector('.restart')

ar();
let count = 0;
let score =0;
next.disabled = true;

next.addEventListener("click", () => {
    next.disabled = true;
    ans1.style.color = "black";
    ans2.style.color = "black";
    ans3.style.color = "black";
    ans4.style.color = "black";


    ans1.disabled = false;
    ans2.disabled = false;
    ans3.disabled = false;
    ans4.disabled = false;
    if(count !=11){
        new1();
          final.innerText = `You final score is : ${score} / 10`

    }else{
        ansmain.classList.add("hide")
        final.classList.remove('hide')
        restart.classList.remove('hide')
    }
});
restart.addEventListener('click',()=>{
    final.innerText = "Loading..."
        restart.classList.add('hide')
        ar();
        count= 0;
        score=0;
})
let output = "";
let  currentCorrectAnswers ="";
async function ar() {
    let response ='';
    try{
   response = await fetch(
    "https://quizapi.io/api/v1/questions?apiKey=XgixmpbarmHfePjiAOJUJHFsKd2EgyDJGlsXnKRG&limit=11&category=html"
  );}catch(err){
    console.log(err);
}
  output = await response.json();
  console.log(output);
  ansmain.classList.remove('hide')
  final.classList.add('hide')
  await new1();

}
async function new1() {
  console.log(count);
  ques.innerText = output[count].question;
  ans1.innerText = output[count].answers.answer_a;
  ans2.innerText = output[count].answers.answer_b;
  ans3.innerText = output[count].answers.answer_c;
  ans4.innerText = output[count].answers.answer_d;
  currentCorrectAnswers = output[count].correct_answers;
  count++;
}
ans1.addEventListener("click", () => {
    next.disabled = false;
    checkAnswer("answer_a")
    ans2.disabled = 'true';
    ans3.disabled = 'true';
    ans4.disabled = 'true';
});
ans2.addEventListener("click", () =>{ 
    next.disabled = false;
    checkAnswer("answer_b")
    ans1.disabled = 'true';
    ans3.disabled = 'true';
    ans4.disabled = 'true';
});
ans3.addEventListener("click", () => {
    next.disabled = false;
    checkAnswer("answer_c")
ans1.disabled = 'true';
    ans2.disabled = 'true';
    ans4.disabled = 'true';});

ans4.addEventListener("click", () => {
    next.disabled = false;
    checkAnswer("answer_d")
    ans1.disabled = 'true';
    ans3.disabled = 'true';
    ans2.disabled = 'true';

});
function checkAnswer(answerKey) {
    if (currentCorrectAnswers[answerKey + '_correct'] === 'true') {
        score++;
        if(answerKey == "answer_a"){
            ans1.style.color = "green";
        }else if(answerKey == "answer_b"){
            ans2.style.color = "green";
        }else if(answerKey == "answer_c"){
            ans3.style.color = "green";
        }else if(answerKey == "answer_d"){
            ans4.style.color = "green";
        }
    } else {
        if(answerKey == "answer_a"){
            ans1.style.color = "red";
        }else if(answerKey == "answer_b"){
            ans2.style.color = "red";
        }else if(answerKey == "answer_c"){
            ans3.style.color = "red";
        }else if(answerKey == "answer_d"){
            ans4.style.color = "red";
        }
    }
}