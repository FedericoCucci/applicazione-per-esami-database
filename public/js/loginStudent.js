
const form= document.forms["login"];
form.addEventListener("submit",login);

function login(event){
   
    let cont=document.querySelector(".cont");
    cont.textContent="";


let codice=form.codice.value;


let n=codice.search(" ");



 if(n!=-1){
    let cont=document.querySelector(".cont");
    let err= document.createElement("div");
    err.classList.add("errore");
    err.textContent="Il codice dell'esercizio deve essere senza spazi !";
    cont.appendChild(err);
event.preventDefault();

} }

           

