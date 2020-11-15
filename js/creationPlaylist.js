"user strict";
// Creation de la playlist
let Myplaylist=new Playlist();
// Tableau des donnees liees aux musiques
var titresMusiques=["Oui ou Non","Confessions nocturnes","Pikachu","Boss of me","Pas de panique a bord"];
var artistesMusiques=["Angele","Diam's","Pokemon","They Might Be Giants","Les Ratz"];
var durationMusiques=[20,20,3, 85,91];
// Creation et ajout des musiques a la playlist
for(let i=0;i<titresMusiques.length;i++)
{
  Myplaylist.add(titresMusiques[i],durationMusiques[i],artistesMusiques[i],"Song");
}
// Tableau des donnees liees aux films
var titresMovie=["JOKER","Star Wars"];
var anneeMovie=["2019","2019"];
var durationMovie=[84,119];
// Creation et ajout des films a la playlist
for(let i=0;i<titresMovie.length;i++)
{
  Myplaylist.add(titresMovie[i],durationMovie[i],anneeMovie[i],"Movie");
}
