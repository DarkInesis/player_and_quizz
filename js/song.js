"user strict";
function Song(title,duration,artiste)
  {
    Media.call(this,title,duration);
    this.artiste=artiste;
  };
Song.prototype=Object.create(Media.prototype);
Song.prototype.constructor=Song;
// Permet de mettre la musique dans la balise HTML audio
Song.prototype.toPlayer=function()
  {
      let audio=document.getElementsByTagName("audio")[0];
      audio.setAttribute("src","../media/Song/"+this.artiste+" - "+this.title+".mp3");
  };
  // Creation de la balise contenant les informations relatives a la musique
 // qui sera ajoutée à la playlist
Song.prototype.toHTML = function()
  {
    let div=document.createElement("div");
    div.className="divMedia";
    let divInfo=document.createElement("div");
    divInfo.className="divInfo";
    let title=document.createElement("p");
    let audio=document.getElementsByTagName("audio")[0];
    title.innerHTML=this.artiste+" - " +this.title+"  "+this.convertDuration();
    divInfo.appendChild(title);
    div.appendChild(divInfo)

    let divLike=this.createDivLike();
    div.appendChild(divLike);
    return div;
  }
