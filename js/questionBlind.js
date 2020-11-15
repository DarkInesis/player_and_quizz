"user strict"

// Objet QuestionBlind
function QuestionBlind(text, answer, media){
  this.text=text;
  this.answer=media.artiste;
  this.media=media;
}

// Méthode qui prend en paramètre le choix de l'utilisateur et le compare avec la réponse
// Retourne True si le choix est bon et False sinon
QuestionBlind.prototype.isCorrectAnswer=function(choice){
  return this.answer===choice;
}

// Méthode qui va permettre de mettre à jour les éléments contenus dans le HTML avec les différents paramètres de l'objet
QuestionBlind.prototype.toHTML=function(){
  let qcmdisplay=document.getElementById("QCM").style.display="none";
  let blinddisplay=document.getElementById("BlindTest").style.display="block";
  let questionParagraph=document.getElementById("question");
  questionParagraph.innerHTML=this.text;
  let playerAudio=document.getElementsByTagName("audio")[0];
  playerAudio.setAttribute("src","../media/Song/"+this.media.artiste+" - "+this.media.title+".mp3");
  playerAudio.controls=true;
  playerAudio.autoplay=true;
}
