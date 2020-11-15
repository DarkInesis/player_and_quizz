"user strict";

// Constructor
function Media(title, duration)
{
    this.title = title;
    this.duration = duration;
    this.isPlaying = false;
};
// Permet de lancer le bon media (suivant si c'est un audio ou une video)
Media.prototype.play = function(type)
  {
    let player=document.getElementsByTagName(type)[0];
    player.play();
    this.isPlaying=true;
  };
// Permet de stopper la lecture du media
Media.prototype.stop = function(type)
  {
    let player=document.getElementsByTagName(type)[0];
    player.pause();
    this.isPlaying =false;
  };
// convertis la durée du média sous la forme minute:secondes
Media.prototype.convertDuration = function()
  {
    let duree=this.duration;
    let minute=parseInt(duree/60);
    duree-=minute*60;
    let seconde=duree;
    let stringDuration=minute+":"+seconde;
    return stringDuration;
  };
// Methode appelée dans la méthode toHTML, qui est commune a Song et Movie. Et permet de crée un bouton compteur de like
Media.prototype.createDivLike=function()
{
  let divButton=document.createElement("div");
  let compteur=document.createElement("p");
  compteur.innerHTML=0;
  divButton.appendChild(compteur);
  let like=document.createElement("button");
  like.innerHTML="❤";
  like.value=false;
  like.className="likeCheckBox"
  like.addEventListener("click", function()
                                    {
                                      if (like.value=="false")
                                      {
                                        like.style.color="rgb(72, 201, 176)";
                                        compteur.innerHTML=parseInt(compteur.innerHTML+1);
                                        like.value=true;
                                      }
                                      else if (like.value=="true")
                                      {
                                        like.style.color="black";
                                        compteur.innerHTML=parseInt(compteur.innerHTML-1);
                                        like.value=false;
                                      }
                                    });
  divButton.appendChild(like);
  divButton.className="divlike"
  return divButton;
}
