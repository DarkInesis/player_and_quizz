"user strict"

//Objet QuestionQCM
function QuestionQCM(text, choices, answer){
  this.text=text;
  this.choices=choices;
  this.answer=answer;
}

// Méthode qui prend en paramètre le choix de l'utilisateur et le compare avec la réponse
// Retourne True si le choix est bon et False sinon
QuestionQCM.prototype.isCorrectAnswer=function(choice){
  return this.answer===choice;
}

// Méthode qui va permettre de mettre à jour les éléments contenus dans le HTML avec les différents paramètres de l'objet
QuestionQCM.prototype.toHTML=function(){
  let blinddisplay=document.getElementById("BlindTest").style.display="none";
  let qcmdisplay=document.getElementById("QCM").style.display="block";
  let questionParagraph=document.getElementById("question");
  questionParagraph.innerHTML=this.text;
  for(let i=0;i<4;i++){
    let span=document.getElementsByTagName("span")[i];
    span.innerHTML=this.choices[i];
  }
}
