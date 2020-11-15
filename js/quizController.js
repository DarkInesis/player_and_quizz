"user strict"

// Tableau d'artistes
var artistesTab=["Diam's","Jason Derulo","Colonel Reyel","Keen'V","Kmaro","Jena Lee","Koxie","Crazy Frog","Martin Solveig","Tokyo Hotel","Pitbull","Kesha","Usher","Sean Paul","LMFAO","David Guetta","Akon"];

//fonction qui retourne une tableau de 4 artistes tirés aléatoirement dans artistesTab
function tabAlea(){
  let artistes=[];
  let indiceArtiste=0;
  for (var i = 0; i < 4; i++) {
    indiceArtiste=random(artistesTab.length);
    artistes[i]=artistesTab[indiceArtiste];
  }
  return artistes;
}

//fonction qui retourne un tableau de 4 dates tirées aléatoirement autour de la bonne réponse
function dateGenerator(date){
  let dates=[];
  let min=date-50;
  let max=date;
  for (var i = 0; i < 4; i++) {
    dateg=Math.floor(Math.random() * (max - min + 1) + min);
    if(dateg==date){
      dateg=dateg-1;
    }
    dates[i]=dateg;
  }
  return dates;
};

//fonction qui retourne un nombre entier tiré aléatoirement entre 0 et (number - 1)
function random(number){
  return Math.floor(Math.random() * number);
};

//fonction qui génère des questions aléatoires en fonction du type de média contenu dans la playlist
function questionGenerator(){
  let question="";
  let reponse="";
  let choix="";
  let indiceMedias=random(Myplaylist.medias.length);
  if(Myplaylist.medias[indiceMedias].constructor.name=="Song"){
    question="Qui a chanté "+Myplaylist.medias[indiceMedias].title+" ?";
    reponse=Myplaylist.medias[indiceMedias].artiste;
    choix=createChoice(reponse,tabAlea());
  }
  else{
    question="En quelle année est sorti le film "+Myplaylist.medias[indiceMedias].title+" ?";
    reponse=Myplaylist.medias[indiceMedias].year;
    choix=createChoice(reponse,dateGenerator(reponse));
  }
  return [question,reponse,choix];
};

//fonction qui génère un tableau où la bonne réponse se trouve à un indice aléatoire
function createChoice(answer,tabAlea){
  indiceAnswer=random(4);
  tabAlea[indiceAnswer]=answer;
  return tabAlea;
};

//fonction qui prend en entrée un élément HTML et un choix
//elle teste si l'élément cliqué est la bonne réponse et affiche la prochaine question
function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(guess);
    displayQuiz();
  }
};

//fonction similaire à la précédente mais qui s'applique au blind test avec le champ de texte que va remplir l'utilisateur
function guessBlind(id, element) {
  var button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(element.value);
    let audio=document.getElementsByTagName("audio")[0];
    audio.pause();
    displayQuiz();
  }
};

//fonction qui affiche la trace de la question en cours
function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

//fonction affiche le score à la fin du quiz
function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h4 id='score'> Your scores is: " + quiz.score + "</h4>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};

//fonction qui récupère les médias de type "Song" et retourne un tableau contenant ceux-ci
function getSongsInPlaylist(){
  songs=[];
  let j=0;
  for (var i = 0; i < Myplaylist.medias.length; i++) {
    if(Myplaylist.medias[i].constructor.name=="Song"){
      songs[j]=Myplaylist.medias[i];
      j=j+1;
    }
  }
  return songs;
}

//fonction qui affiche le quiz et gère tous ses composants
function displayQuiz() {
  if(quiz.isEnded()) {
    showScores();
  }
  else {
    if(quiz.getQuestionIndex().constructor.name=="QuestionQCM"){
      var choices = quiz.getQuestionIndex().choices;
      quiz.getQuestionIndex().toHTML();
      for (let i = 0; i < choices.length; i++) {
        guess("btn" + i, choices[i]);
      }
    }
    else{
      quiz.getQuestionIndex().toHTML();
      let element= document.getElementById("reponse");
      guessBlind("submitBlind",element);
      element.value="";
    }
    showProgress();
  }
};

let questions=[];

//cette boucle va créer une liste de questions aléatoires
for (var i = 0; i < 4; i++) {
  if(random(2)==0){
    generator=questionGenerator();
    let questionQCM=new QuestionQCM(generator[0],generator[2],generator[1]);
    questions[i]=questionQCM;
  }
  else{
    let songs=getSongsInPlaylist();
    let artisteToFind=random(songs.length);
    let questionBlind=new QuestionBlind("Qui chante cette chanson ?",songs[artisteToFind],songs[artisteToFind]);
    questions[i]=questionBlind;
  }
}
//Creation du quiz à partir des questions générés précédemmment
var quiz = new Quiz(questions);

//Affichage du quiz
displayQuiz();
