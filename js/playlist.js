"user strict";
// Constructor
function Playlist()
{
    this.medias = new Array();
    this.nowPlayingIndex =0;
};
// Permet de faire play. Si le media n'est pas dans le player, il l'ajoute.
// Gere le cas ou le media est un Song et le cas ou il est un Movie
Playlist.prototype.play = function()
  {
    let media=this.medias[this.nowPlayingIndex];
    // Partie Song
    if (media.constructor.name == "Song")
    {
      let source=document.getElementsByTagName("audio")[0].getAttribute("src");
      if (source==null)
        {
          media.toPlayer();
        }
      else if (!source.includes(media.title))
        {
          media.toPlayer();
        }
      media.play("audio");
    }
    // Partie Movie
    else if (media.constructor.name == "Movie")
    {
      let source=document.getElementsByTagName("video")[0].getAttribute("src");
      if (source==null)
        {
          media.toPlayer();
        }
      else if (!source.includes(media.title))
        {
          media.toPlayer();
        }
      media.play("video");
      // Dans le cas d'une video, on scroll jusqu'au lecteur video
      setTimeout(function(){window.scrollTo(0,document.body.scrollHeight);},150);
    }
  };
// Permet de mettre en pause le media (Song ou Movie)
Playlist.prototype.stop = function()
  {
    let media=this.medias[this.nowPlayingIndex];
    if (media.constructor.name == "Song")
    {
      media.stop("audio");
    }
    else if (media.constructor.name == "Movie")
    {
      media.stop("video");
    }
  };
// Permet de créer un media (Song ou Movie) et de l'ajouter a la playlist
Playlist.prototype.add=function(title,duration,option,type)
  {
    if(type=="Song")
    {
      var media = new Song(title,duration,option);
    }
    else if(type=="Movie")
    {
      var media = new Movie(title,duration,option);
    }
    this.medias.push(media);
  }
// Permet de lire le media suivant (recommence du debut, si fin de liste)
Playlist.prototype.next=function()
  {
    this.stop();
    if(this.nowPlayingIndex+1<this.medias.length)
    {
      this.nowPlayingIndex=this.nowPlayingIndex+1;
    }
    else {
      {
        this.nowPlayingIndex=0;
        this.resetPlayer();
      }
    }
        this.play();
        this.updateSelectedHTML();
  }
// Permet de faire l'affichage de la playlist
Playlist.prototype.renderInElement=function()
  {
    let baliseUl=document.getElementById("playlistList");
    let footerPlaylistList=document.getElementById("footerPlaylistList");
    for (let i=0;i<this.medias.length;i++)
    {
      let media=this.medias[i];
      let divMedia=media.toHTML();
      divMedia.className="divMedia";
      let liMedia=document.createElement("li");
      liMedia.className="notSelected";
      liMedia.appendChild(divMedia);
      baliseUl.insertBefore(liMedia,footerPlaylistList);
    }
  }
// Met a jour le html, pour pouvoir afficher correctement le media joué
Playlist.prototype.updateSelectedHTML=function()
{
  let playlistList=document.getElementById("playlistList");
  let listMedia=playlistList.getElementsByTagName("li");
  for (let i=1; i<this.medias.length+1;i++)
  {
    if(i==this.nowPlayingIndex+1)
    {
      listMedia[i].className="isSelected";
    }
    else
    {
      listMedia[i].className="notSelected";
    }
  }
}
// Permet de reset les player
Playlist.prototype.resetPlayer=function()
{
  let aud=document.getElementsByTagName("audio")[0];
  let vid=document.getElementsByTagName("video")[0];
  aud.setAttribute("src", null);
  vid.setAttribute("src", null);
}
// Permet de lancer le media dont le numero est donne en argument
// (Sert lors d'un clique sur un nom de media)
Playlist.prototype.selectMedia=function(numMedia)
{
  this.resetPlayer();
  this.nowPlayingIndex=numMedia;
  this.play();
  this.updateSelectedHTML();
}