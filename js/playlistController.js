"user strict";
// Affichage de la playlist
Myplaylist.renderInElement();
Myplaylist.updateSelectedHTML();
// Ajout des fonctionnalités aux boutons gerant la playlist
document.getElementById("playMedia").addEventListener("click", function(){Myplaylist.play()});
document.getElementById("stopMedia").addEventListener("click", function(){Myplaylist.stop()});
document.getElementById("nextMedia").addEventListener("click", function(){Myplaylist.next()});
// Ajout de la selection du media en cliquant dessus
let listDivInfo=document.getElementsByClassName("divInfo");
for(let numMedia=0;numMedia<listDivInfo.length;numMedia++)
{
  let divInfo=listDivInfo[numMedia];
  divInfo.addEventListener("click", function(){Myplaylist.selectMedia(numMedia)});
}
// Ajout de l'automatisation, en fin de media, a passer au suivant
let aud=document.getElementsByTagName("audio")[0];
aud.onended = function() { Myplaylist.next();};
let vid=document.getElementsByTagName("video")[0];
vid.onended = function() { Myplaylist.next();};
