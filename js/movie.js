"user strict";
function Movie(title,duration,year)
{
  Media.call(this,title,duration);
  this.year=year;
};

Movie.prototype=Object.create(Media.prototype);
Movie.prototype.constructor=Movie;
// Permet de mettre la video dans la balise HTML video
Movie.prototype.toPlayer = function()
{
    let video=document.getElementsByTagName("video")[0];
    video.setAttribute("src","../media/Video/"+this.title+".mp4");
};
// Creation de la balise contenant les informations relatives au film
// qui sera ajoutée à la playlist
Movie.prototype.toHTML = function()
  {
    let div=document.createElement("div");
    div.className="divMedia";
    let divInfo=document.createElement("div");
    divInfo.className="divInfo";
    let title=document.createElement("p");
    title.innerHTML=this.year+" - " +this.title+" "+this.convertDuration();
    divInfo.appendChild(title);
    div.appendChild(divInfo)

    let divlike=this.createDivLike();
    div.appendChild(divlike);
    return div;
  }
