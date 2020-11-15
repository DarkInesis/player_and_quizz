"user strict"

// Objet Quiz qui contient un tableau de questions
function Quiz(questions){
  this.score=0;
  this.questions=questions;
  this.questionIndex=0;
}

// Méthode qui retourne l'index de la question en cours
Quiz.prototype.getQuestionIndex= function(){
  return this.questions[this.questionIndex];
}

// Méthode qui va incrémenter le score si l'utilisateur a bien répondu et qui va incrémenter l'index
Quiz.prototype.guess= function(answer){
  if(this.getQuestionIndex().isCorrectAnswer(answer)){
    this.score++;
  }
  this.questionIndex++;
}

// Méthode qui teste si le quiz est terminé
Quiz.prototype.isEnded= function(){
  return this.questionIndex=== this.questions.length;
}
