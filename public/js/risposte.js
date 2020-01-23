let info=document.querySelector("#informazioni");
let studente=info.dataset.studente;

let div=document.querySelector("#databs");
let nome_db=div.dataset.db;
let tab=document.querySelector("#tabella");
let bProva=document.querySelectorAll(".prova");
let bRisp=document.querySelectorAll(".risp_corr");

for(but of bProva){
    but.addEventListener("click",prova);
}

for(b2 of bRisp){
    b2.addEventListener("click",rispostaCorretta);
}
let input=document.querySelectorAll("textarea");

$.ajaxSetup({
    headers:{
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});



$.ajax({
    url:"/caricaRisposte",
    type:"get",
    data:{studente:studente},

    success:function(res){
        let r=JSON.parse(res);
        if(r.length!=0){
            for(elem of r){
               for(inp of input){
                   let domanda=inp.dataset.domanda;
                   if(domanda==elem.domanda){
                   
                       inp.value=elem.testo;
                       inp.readOnly=true;
                      
                    
                     
                   }
               }
            }
        }
        


}
});



$.ajax({
    url:"/mostraTabelle",
    type:"post",
    data:{database:nome_db},

    success:function(res){
     
     let r=JSON.parse(res);
 
        if(r.length!=0){
            for(elem of r){
                let n="Tables_in_"+nome_db;
                let el=document.createElement("div");
                let link=document.createElement("a");
                link.textContent=elem[n];
              link.href="/tabelle/"+nome_db+"/"+elem[n];
                el.appendChild(link);
                el.classList.add("link");
                tab.appendChild(el);
              
            }
        }
        

}
});

function prova(event){
    let b=event.currentTarget;
    let domanda=b.dataset.domanda;
    let db=b.dataset.db;
    let password=b.dataset.passw;
   
    for(inp of input){
        if(inp.dataset.domanda==domanda){
             query=inp.value;
             
             if(query.length!=0){
            $.ajaxSetup({
                headers:{
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            
            $.ajax({
                url:"/eseguiQuery",
                type:"post",
                data:{q:query,password:password,db:db},
            
               success:function(res){
                   
          
              if(res=="Vuoto"){
                let ris=document.querySelectorAll(".risultati");
                for(elem of ris){
                    if(elem.dataset.domanda==domanda){
                elem.textContent="";
                elem.classList.remove("hidden");
                let p=document.createElement("div");
                p.textContent="Nessun risultato trovato";
                p.classList.add("errore");
                let img=document.createElement("img");
                img.src="../../icone/su.ico";
                img.classList.add("su");
                img.dataset.domanda=domanda;
                img.addEventListener("click",nascondi);
                elem.appendChild(p);
                elem.appendChild(img);
            }
              }}
              else if(res=="Ok"){
                let ris=document.querySelectorAll(".risultati");
                for(elem of ris){
                    if(elem.dataset.domanda==domanda){
                elem.textContent="";
                elem.classList.remove("hidden");
                let p=document.createElement("div");
                p.textContent="Query Ok";
                p.classList.add("successo");
                let img=document.createElement("img");
                img.src="../../icone/su.ico";
                img.classList.add("su");
                img.dataset.domanda=domanda;
                img.addEventListener("click",nascondi);
                elem.appendChild(p);
                elem.appendChild(img);
              }}}else{
              s=res.slice(0,6);
                if(s!="Errore"){
                    let r=JSON.parse(res);
                    let ris=document.querySelectorAll(".risultati");
                    for(elem of ris){
                        if(elem.dataset.domanda==domanda){
                    elem.textContent="";
                    elem.classList.remove("hidden");
                    
                    let img=document.createElement("img");
                    img.src="../../icone/su.ico";
                    img.classList.add("su");
                    img.dataset.domanda=domanda;
                    img.addEventListener("click",nascondi);
                    
                    if(r.length!=0){
                     let chiavi=Object.keys(r[0]);
                     var tab=document.createElement("table");
                     let thead=document.createElement("thead");
                     let tr=document.createElement("tr");
                     for(x of chiavi){
                       let th=document.createElement("th");
                       th.textContent=x;
                      
                       tr.appendChild(th);
                     }
                    
                     thead.appendChild(tr);
                     tab.appendChild(thead);
                     elem.appendChild(tab);

                     for(val of r){
                        let tr=document.createElement("tr");
                        for(x of chiavi){
                        let th=document.createElement("th");
                        th.textContent=val[x];
                      
                        tr.appendChild(th);
                        }
                        tab.appendChild(tr);
                        elem.appendChild(tab);
                    }

                    }
                    elem.appendChild(img);
                }
            }
                    
                }else{
                    let ris=document.querySelectorAll(".risultati");
                    for(elem of ris){
                        if(elem.dataset.domanda==domanda){
                    elem.textContent="";
                    elem.classList.remove("hidden");
                    let p=document.createElement("div");
                    p.textContent=res;
                    p.classList.add("errore");
                    let img=document.createElement("img");
                    img.src="../../icone/su.ico";
                    img.classList.add("su");
                    img.dataset.domanda=domanda;
                    img.addEventListener("click",nascondi);
                    elem.appendChild(p);
                    elem.appendChild(img);
                }
            }
                }
                   
                }}
            });
        }}
    }
}

function nascondi(event){
    let i=event.currentTarget;
    let ris=document.querySelectorAll(".risultati");
    let domanda=i.dataset.domanda;
    for(elem of ris){
        if (elem.dataset.domanda==domanda){
            elem.classList.add("hidden");
        }
    }
    }

    function rispostaCorretta(){
        let b=event.currentTarget;
    let domanda=b.dataset.domanda;
    let db=b.dataset.db;
    let password=b.dataset.passw;
   
   
         $.ajaxSetup({
                headers:{
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                url:"/caricaRispostaCorretta",
                type:"post",
                data:{id:domanda},
            
                success:function(res){
               let query=res;
               if(query!=" "){
            
                $.ajax({
                    url:"/eseguiQuery",
                    type:"post",
                    data:{q:query,password:password,db:db},
                
                   success:function(res){
                       
              
                  if(res=="Vuoto"){
                    let ris=document.querySelectorAll(".risultati");
                    for(elem of ris){
                        if(elem.dataset.domanda==domanda){
                    elem.textContent="";
                    elem.classList.remove("hidden");
                    let p=document.createElement("div");
                    p.textContent="Nessun risultato trovato";
                    p.classList.add("errore");
                    let img=document.createElement("img");
                    img.src="../../icone/su.ico";
                    img.classList.add("su");
                    img.dataset.domanda=domanda;
                    img.addEventListener("click",nascondi);
                    elem.appendChild(p);
                    elem.appendChild(img);
                }
                  }}
                  else if(res=="Ok"){
                    let ris=document.querySelectorAll(".risultati");
                    for(elem of ris){
                        if(elem.dataset.domanda==domanda){
                    elem.textContent="";
                    elem.classList.remove("hidden");
                    let p=document.createElement("div");
                    p.textContent="Query Ok";
                    p.classList.add("successo");
                    let img=document.createElement("img");
                    img.src="../../icone/su.ico";
                    img.classList.add("su");
                    img.dataset.domanda=domanda;
                    img.addEventListener("click",nascondi);
                    elem.appendChild(p);
                    elem.appendChild(img);
                  }}}else{
                  s=res.slice(0,6);
                    if(s!="Errore"){
                        let r=JSON.parse(res);
                        let ris=document.querySelectorAll(".risultati");
                        for(elem of ris){
                            if(elem.dataset.domanda==domanda){
                        elem.textContent="";
                        elem.classList.remove("hidden");
                        
                        let img=document.createElement("img");
                        img.src="../../icone/su.ico";
                        img.classList.add("su");
                        img.dataset.domanda=domanda;
                        img.addEventListener("click",nascondi);
                        
                        if(r.length!=0){
                         let chiavi=Object.keys(r[0]);
                         var tab=document.createElement("table");
                         let thead=document.createElement("thead");
                         let tr=document.createElement("tr");
                         for(x of chiavi){
                           let th=document.createElement("th");
                           th.textContent=x;
                          
                           tr.appendChild(th);
                         }
                        
                         thead.appendChild(tr);
                         tab.appendChild(thead);
                         elem.appendChild(tab);
    
                         for(val of r){
                            let tr=document.createElement("tr");
                            for(x of chiavi){
                            let th=document.createElement("th");
                            th.textContent=val[x];
                          
                            tr.appendChild(th);
                            }
                            tab.appendChild(tr);
                            elem.appendChild(tab);
                        }
    
                        }
                        elem.appendChild(img);
                    }
                }
                        
                    }else{
                        let ris=document.querySelectorAll(".risultati");
                        for(elem of ris){
                            if(elem.dataset.domanda==domanda){
                        elem.textContent="";
                        elem.classList.remove("hidden");
                        let p=document.createElement("div");
                        p.textContent=res;
                        p.classList.add("errore");
                        let img=document.createElement("img");
                        img.src="../../icone/su.ico";
                        img.classList.add("su");
                        img.dataset.domanda=domanda;
                        img.addEventListener("click",nascondi);
                        elem.appendChild(p);
                        elem.appendChild(img);
                    }
                }
                    }
                       
                    }}
                });
              }  else{
                let ris=document.querySelectorAll(".risultati");
                for(elem of ris){
                    if(elem.dataset.domanda==domanda){
                elem.textContent="";
                elem.classList.remove("hidden");
                let p=document.createElement("div");
                p.textContent="Risposta vuota";
                p.classList.add("errore");
                let img=document.createElement("img");
                img.src="../../icone/su.ico";
                img.classList.add("su");
                img.dataset.domanda=domanda;
                img.addEventListener("click",nascondi);
                elem.appendChild(p);
                elem.appendChild(img);
            }
              }
              }
            
        }
            });

          
    
    }