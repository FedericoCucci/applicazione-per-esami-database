
let d=document.querySelector("#esercizi");
let user=d.dataset.user;

function carica(id){
    $.ajaxSetup({
        headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url:"/carica",
        type:"post",
        data:{id:id},
        success: function(res){
            let r=JSON.parse(res);
            if(r.length!=0){
            for(elem of r){

                let h_inizio=elem.ora_inizio.slice(0,2);
                let m_inizio=elem.ora_inizio.slice(3,5);
                let g_inizio=elem.data.slice(8,10);
                let mo_inizio=Number(elem.data.slice(5,7))-1;
                let a_inizio=elem.data.slice(0,4);

               
             
                let data=new Date();
                let h_corrente=data.getHours();
                let m_corrente=data.getMinutes();
                let g_corrente=data.getDate();
                let mo_corrente=data.getMonth();
                let a_corrente=data.getFullYear();
              
               let data_inizio= new Date(a_inizio,mo_inizio,g_inizio,h_inizio,m_inizio);
               let data_corrente=new Date(a_corrente,mo_corrente,g_corrente,h_corrente,m_corrente);
        

               if(data_corrente<data_inizio){
                let el=document.createElement("div");
                let link=document.createElement("a");
                let span=document.createElement("span");
                let img=document.createElement("img");
                img.src="icone/cestino.ico";
                img.classList.add("elimina");
                span.appendChild(img);
                span.addEventListener("click",elimina);
                link.textContent=elem.codice;
                link.href="/exercise/"+elem.id;
                span.dataset.id=elem.id;
                span.dataset.user=elem.user;
                el.appendChild(link);
                el.appendChild(span);
                el.classList.add("link");
                d.appendChild(el);
               } else{
                let el=document.createElement("div");
                let link=document.createElement("a");
                link.textContent=elem.codice;
                link.href="/exercise/"+elem.id;
                el.appendChild(link);
                el.classList.add("link");
                d.appendChild(el);

               }
            }
        }
        }
    
    });
}

carica(user);





let button=document.querySelector("#b");
button.addEventListener("click",aggiungi);

function aggiungi(event){
    let cont=document.querySelector(".cont");
    cont.textContent="";
    let b=event.currentTarget;
    let id=b.dataset.id;

let form_nome=document.querySelector("#codice");
let codice=form_nome.value;
let form_luogo=document.querySelector("#luogo");
let luogo=form_luogo.value;
let form_testo=document.querySelector("#testo");
let testo=form_testo.value;
let form_orario=document.querySelector("#orario");
let orario=form_orario.value;
let form_data=document.querySelector("#data");
let data=form_data.value;
let form_ora_inizio=document.querySelector("#ora_inizio");
let ora_inizio=form_ora_inizio.value;
let form_ora_fine=document.querySelector("#ora_fine");
let ora_fine=form_ora_fine.value;
let data_i=data.toString();

if(codice==""||luogo==""||testo==""||orario==""||ora_inizio==""||ora_fine==""||data_i==""){
let cont=document.querySelector(".cont");
let err= document.createElement("div");
err.classList.add("errore");
err.textContent="Compila tutti i campi !";

cont.appendChild(err);
event.preventDefault();
}else {
    let res=codice.search(" ");
    if(res!=-1){
        let cont=document.querySelector(".cont");
let err= document.createElement("div");
err.classList.add("errore");
err.textContent="Il codice deve essere senza spazi !";

cont.appendChild(err);
event.preventDefault();
    } else{

d.textContent="";
form_nome.value="";
form_luogo.value="";
form_testo.value="";
form_orario.value="";
form_data.value="";
form_ora_inizio.value="";
form_ora_fine.value="";

$.ajaxSetup({
    headers:{
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$.ajax({
    url:"/aggiungi",
    type:"post",
    data:{id:id,codice:codice,luogo:luogo,testo:testo,orario:orario,data_i:data_i,ora_inizio:ora_inizio,ora_fine:ora_fine},

    success:function(){
        let cont=document.querySelector(".cont");
        let succ= document.createElement("div");
        succ.classList.add("successo");
        succ.textContent="Esercizio inserito correttamente";
        
        cont.appendChild(succ);
        window.setTimeout("nascondi()",5000);
       carica(id);

    }

   
    
});

    }

}

}


function elimina(event){
let c=event.currentTarget;
let id=c.dataset.id;

$.ajax({
    url:"/eliminaEsercizio",
    type:"post",
    data:{id:id,user:user},

    success:function(){
      
        d.textContent="";
        carica(user);

    }

    
    
});
}

function nascondi(){
    let succ=document.querySelector(".successo");
    succ.classList.add("hidden");
}


