"use strict";

//fonction appelée lors du clic sur le bouton "Submit"
//elle permet de vérifier les 3 champs du formulaire
// et d'afficher un message personnalisé si ceux-ci sont correctement renseignés
//Cette fonction retourne un booléen : "true" si le formulaire est bien rempli et "false" sinon
function validateForm(){
  //on récupère les valeurs des 3 champs du formulaire dans des variables
  let nameValue=document.getElementById('name').value;
  let firstNameValue=document.getElementById('first_name').value;
  let emailValue=document.getElementById('email').value;
  //pour le nom et le prénom on vérifie juste si ceux-ci ne sont pas vides
  if (nameValue==""){
    alert("Name can't be blank");
    document.getElementById('name').focus();
    return false;
  }
  else if (firstNameValue==""){
    alert("First name can't be blank");
    document.getElementById('first_name').focus();
    return false;
  }
  //pour le champ du mail, on appelle la fonction de vérification d'email
  else if (validateEmail(emailValue)==false)
    return false;
  else {
    //on écrit un message personnalisé dans une balise de type "p"
    document.getElementById('message').innerHTML="Hello "+firstNameValue+" "+nameValue+" !";
    //on affiche le message à la place du bouton "Submit" et en cachant celui-ci
    document.getElementById('message').style.display="block";
    document.getElementById('submitForm').style.display="none";
    return true;
  }
}


// fonction de validation d'un mail qui prend en entrée la valeur du champ mail de notre formulaire
// et qui renvoie un booléen : "true" si le format du mail est valide et "false" sinon
function validateEmail(email_value){
  //regex d'un mail
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(email_value.match(mailformat)){
    document.getElementById('email').focus();
    return true;
  }
  else{
    alert("You have entered an invalid email address!");
    document.getElementById('email').focus();
    return false;
  }
}


//Création du formulaire
let x = document.getElementById("div_form");
let createform = document.createElement('form');
x.appendChild(createform);

//Ajout de l'entête du formulaire
let heading = document.createElement('h2');
heading.innerHTML = "Sign up : ";
createform.appendChild(heading);

//Ajout d'une ligne après l'entête
let line = document.createElement('hr');
createform.appendChild(line);

//Ajout des 3 champs qui composent le formulaire
let fields=['Name :','First name :','E-mail :'];
let fieldsId=['name','first_name','email'];
for(let i=0;i<fields.length;i++){
  let linebreak = document.createElement('br');
  createform.appendChild(linebreak);

  let namelabel = document.createElement('label');
  namelabel.innerHTML = fields[i];
  createform.appendChild(namelabel);

  let field = document.createElement('input');
  field.setAttribute('id',fieldsId[i]);
  field.setAttribute("type", "text");
  createform.appendChild(field);
}

//Ajout du bouton pour soumettre le formulaire qui, quand on clique dessus,
// appelle la fonction de validation vue précédemment
var submitelement = document.createElement('input');
submitelement.setAttribute("id","submitForm");
submitelement.setAttribute("type", "button");
submitelement.setAttribute("value", "Submit");
submitelement.setAttribute("onclick","return validateForm()");
createform.appendChild(submitelement);

//Ajout du champ de texte pour le message personnalisé
//Champ caché par défaut
var message = document.createElement('p');
message.setAttribute("id","message");
message.style.display="none";
createform.appendChild(message);
