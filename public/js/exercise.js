let divDom=document.querySelector("#domande");
let idDom=divDom.dataset.es;
caricaDomande(idDom);
let carica=document.querySelector("#caricaFile");
carica.addEventListener("click",caricaFile);
let caricaInizia=document.querySelector("#caricaFileInizia");
caricaInizia.addEventListener("click",caricaFileInizia);

let form_ora_inizio=document.querySelector("#ora_inizio");
let form_nome=document.querySelector("#codice");
let b=document.querySelector("#caricaFile");
let es=b.dataset.id;
$.ajaxSetup({
    headers:{
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$.ajax({
    url:"/caricaEsercizio",
    type:"post",
    data:{id:es},

    success:function(res){
        let r=JSON.parse(res);
        if(r.length!=0){
            for(elem of r){
               if(elem.file!=" "){
                   let d=document.querySelector(".verificaFile");
                   d.textContent="E' stato caricato il file '"+elem.file+"'";
               }if(elem.file_inizializzazione!=" "){
                let d=document.querySelector(".verificaFileInizia");
                d.textContent="E' stato caricato il file '"+elem.file_inizializzazione+"'";
            }
            }
        }
       

}
});

    
    let form_luogo=document.querySelector("#luogo");
    let form_data=document.querySelector("#data");
   let data_i=form_data.value.toString();
    let form_testo=document.querySelector("#testo");
    let form_orario=document.querySelector("#orario");
   
    let form_ora_fine=document.querySelector("#ora_fine");
    let time=form_ora_inizio.value;
   let h_inizio=time.slice(0,2);
   let m_inizio=time.slice(3,5);
   let g_inizio=data_i.slice(8,10);
   let mo_inizio=Number(data_i.slice(5,7))-1;
   let a_inizio=data_i.slice(0,4);
  

   let data=new Date();
   let h_corrente=data.getHours();
   let m_corrente=data.getMinutes();
   let g_corrente=data.getDate();
   let mo_corrente=data.getMonth();
   let a_corrente=data.getFullYear();
 
  let data_inizio= new Date(a_inizio,mo_inizio,g_inizio,h_inizio,m_inizio);
  let data_corrente=new Date(a_corrente,mo_corrente,g_corrente,h_corrente,m_corrente);
 

   

      
   let btn=document.querySelector("#modifica_esercizio");
   let btn2=document.querySelector("#aggiungi_domanda");
  
   if(data_corrente<data_inizio){
      
 btn.addEventListener("click",modifica);
 btn2.addEventListener("click",aggiungi_domanda);
   } 
    else{

     let b=document.querySelector("#div_btn");
     b.removeChild(btn);
    let input=document.querySelectorAll(".form-control");
    for(i of input){
        i.disabled=true;
    }

    
    let b_d=document.querySelector("#div_btn_domanda");
    b_d.removeChild(btn2);

    let form_domanda=document.querySelector("#form_domanda");
    form_domanda.textContent="";

    
    
   }


   let div=document.querySelector("#studenti");
   let id=div.dataset.id;
   let divStud=document.querySelector("#st");
   $.ajaxSetup({
    headers:{
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$.ajax({
    url:"/caricaStudenti",
    type:"post",
    data:{id:id},

    success:function(res){
        let r=JSON.parse(res);
        if(r.length!=0){
            divStud.classList.remove("hidden");
            for(elem of r){
                let el=document.createElement("div");
                let link=document.createElement("a");
                link.textContent=elem.nome+" "+elem.cognome+" "+elem.matricola;
                link.href="/studente/"+id+"/"+elem.id;
                el.appendChild(link);
                el.classList.add("link");
                div.appendChild(el);
            }
        }else {
            divStud.classList.add("hidden");
        }
        

}
});


function modifica(event){
    let b=event.currentTarget;
    let id=b.dataset.es;
    let codice=form_nome.value;
    let data=form_data.value;
    let luogo=form_luogo.value;
    let testo=form_testo.value;
    let orario=form_orario.value;
    let ora_inizio=form_ora_inizio.value;
    let ora_fine=form_ora_fine.value;
    let data_i=data.toString();

    $.ajaxSetup({
        headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    
    $.ajax({
        url:"/modifica",
        type:"post",
        data:{id:id,codice:codice,luogo:luogo,testo:testo,orario:orario,data_i:data_i,ora_inizio:ora_inizio,ora_fine:ora_fine},
    
        success:function(){
           
            window.location.replace("/exercise/"+id);
    
}
    });
}

function aggiungi_domanda(event){
    let cont=document.querySelector(".cont");
    cont.textContent="";
    let b=event.currentTarget;
    let id=b.dataset.es;
   
    let form_domanda=document.querySelector("#domanda");
    let dom=form_domanda.value;
    let form_rispCorr=document.querySelector("#rispostaCorretta");
    let rispCorr=form_rispCorr.value;

    if(dom==""){
        let cont=document.querySelector(".cont");
        let err= document.createElement("div");
        err.classList.add("errore");
        err.textContent="Compila tutti i campi !";
        
        cont.appendChild(err);
        event.preventDefault();
    }else{
         
        $.ajaxSetup({
            headers:{
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url:"/aggiungiDomanda",
            type:"post",
            data:{id:id,testo:dom,risp:rispCorr},
        
            success:function(){
               form_domanda.value="";
               form_rispCorr.value="";
               divDom.textContent="";
               caricaDomande(id);
                
        
    }
        });
    }
    
}

function caricaDomande(id){
    $.ajaxSetup({
        headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url:"/caricaDomande",
        type:"post",
        data:{id:id},
        success: function(res){
            let r=JSON.parse(res);
            if(r.length!=0){
            for(elem of r){
                if(data_corrente<data_inizio){
                let d=document.querySelector("#domande");
                let div=document.createElement("div");
                let el=document.createElement("textarea");
                let span=document.createElement("span");
                let img1=document.createElement("img");
                img1.src="../icone/cestino.ico";
                img1.classList.add("elimina");
               
                let img2=document.createElement("img");
                img2.src="../icone/salva.ico";
                img2.classList.add("modifica");
             
                img1.dataset.id=elem.id;
                img1.dataset.esercizio=elem.esercizio;
                img1.addEventListener("click",eliminaDomanda);
                span.appendChild(img1);
                img2.dataset.id=elem.id;
                img2.dataset.esercizio=elem.esercizio;
                img2.addEventListener("click",modificaDomanda);
                span.classList.add("input-group-addon");
              
                span.appendChild(img2);
              
                el.value=elem.testo;
                el.dataset.id=elem.id;
            el.classList.add("form-control");
             
                div.appendChild(el);
                div.appendChild(span);
                
             div.classList.add("input-group");
             div.classList.add("dom");
              
                d.appendChild(div);
                } else{

                    let d=document.querySelector("#domande");
                    let div=document.createElement("div");
                    let el=document.createElement("textarea");
            
                    el.value=elem.testo;
                    el.dataset.id=elem.id;
                el.classList.add("form-control");
                 el.disabled=true;
                    div.appendChild(el);
                    
                  div.classList.add("input-group");
                   
                    d.appendChild(div);
                }
                
            }
        }
        }
    
    });

}

function modificaDomanda(event){
    let c=event.currentTarget;
    let id=c.dataset.id;
    let esercizio=c.dataset.esercizio

    let input=document.querySelectorAll("textarea");
    for(i of input){
 
        if(i.dataset.id==id){
            let testo=i.value;
        
            $.ajaxSetup({
                headers:{
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            
            $.ajax({
                url:"/modificaDomanda",
                type:"post",
                data:{id:id,testo:testo},
            
                success:function(){
                    divDom.textContent="";
            caricaDomande(esercizio);
                  
            
        }
            });

            
        }
    }
}

function eliminaDomanda(event){
    let c=event.currentTarget;
    let id=c.dataset.id;
    let esercizio=c.dataset.esercizio
    
    $.ajax({
        url:"/eliminaDomanda",
        type:"post",
        data:{id:id},
    
        success:function(){
            divDom.textContent="";
            caricaDomande(esercizio);
    
        }
    
        
        
    });
}

function caricaFile(event){
    let b=event.currentTarget;
    let inp=document.querySelector("#file");
    let nomeFile=inp.files[0].name;
    let file=inp.files[0];
   
    let id=b.dataset.id;
    var reader = new FileReader();
    reader.onload = function(event) {
    
    
        var testo = event.target.result;
        let cont=testo;
        $.ajaxSetup({
            headers:{
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        
        $.ajax({
            url:"/aggiungiFile",
            type:"post",
            data:{id:id,nomeFile:nomeFile,cont:cont},
        
            success:function(){
               
                window.location.replace("/exercise/"+id);
        
    }
        });
        
    };
    reader.readAsText(file);
    

}

function caricaFileInizia(event){
    let b=event.currentTarget;
    let inp=document.querySelector("#fileInizia");
    let nomeFile=inp.files[0].name;
    let file=inp.files[0];
   
    let id=b.dataset.id;
    var reader = new FileReader();
    reader.onload = function(event) {
    
    
        var testo = event.target.result;
        let cont=testo;
        $.ajaxSetup({
            headers:{
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        
        $.ajax({
            url:"/aggiungiFileInizia",
            type:"post",
            data:{id:id,nomeFile:nomeFile,cont:cont},
        
            success:function(){
               
                window.location.replace("/exercise/"+id);
        
    }
        });
        
    };
    reader.readAsText(file);
    

}