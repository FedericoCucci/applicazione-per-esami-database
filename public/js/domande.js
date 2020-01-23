let b=document.querySelector("#salva");
b.addEventListener("click",salva2);
let studente=b.dataset.studente;
let input=document.querySelectorAll("textarea");
let bProva=document.querySelectorAll(".prova");
let bProva2=document.querySelector("#prova2");
bProva2.addEventListener("click",prova2);
let bRefresh=document.querySelector("#refresh");
bRefresh.addEventListener("click",refresh);

for(but of bProva){
    but.addEventListener("click",prova);
}
let salvare=true;



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
        if(r.length==0){
       
            for(i of input){
                let domanda=i.dataset.domanda;
                let testo=i.value;
               
                
               
                $.ajax({
                    url:"/aggiungiRisposte",
                    type:"post",
                    data:{testo:testo,domanda:domanda,studente:studente}
                   
                })
            
                $.ajax({
                    url:"/caricaRisposte",
                    type:"get",
                    data:{studente:studente},
                    success:function(res){
                        let r=JSON.parse(res);
                if(r.length!=0){
                for(elem of r){
                    
                    for(inp of input){
                        let d=inp.dataset.domanda;
                        if(d==elem.domanda){
                            inp.dataset.risposta=elem.id;
                        }
                    }
                }}
                    } })
            }
} else{
    for(elem of r){
                    
        for(inp of input){
            let d=inp.dataset.domanda;
            if(d==elem.domanda){
                inp.dataset.risposta=elem.id;
                inp.value=elem.testo;
            }
        }
    }
}
} 
})


function orologio(){

    $.ajax({
        url:"/orario",
        type:"get",
        data:{},
        success:function(res){
            let g_corrente=res.slice(0,2);
            let mo_corrente=Number(res.slice(3,5))-1;
            let a_corrente=res.slice(6,10);
            let h=res.slice(11,13);
            let m=res.slice(14,16);
            let s=res.slice(17,19);
            let ora = h + ":" + m;
            document.getElementById("orologio").innerText = ora;
            let div=document.querySelector("#ora_fine");
            let time=div.dataset.ora;
            let data_f=div.dataset.fine;
            let h_fine=time.slice(0,2);
            let m_fine=time.slice(3,5);
            let g_fine=data_f.slice(8,10);
            let mo_fine=Number(data_f.slice(5,7))-1;
            let a_fine=data_f.slice(0,4);
            let data_corrente=new Date(a_corrente,mo_corrente,g_corrente,h,m,s);
            let data_fine= new Date(a_fine,mo_fine,g_fine,h_fine,m_fine,0);
            if(data_corrente>data_fine){
                salvaChiudi();
                salvare=false;
            }


        },
     error:function(){
        alert("Errore nella connessione al server!");
     }

        
    
    });
 
    let l=document.querySelector(".l");
    let codice=l.dataset.id;

    $.ajax({
        url:"/caricaEsercizio",
        type:"post",
        data:{id:codice},
       success:function(res){
        let r=JSON.parse(res);
       if(r.length!=0){
         for(elem of r){
             l.textContent=elem.file;
             l.href="/file/"+elem.file;
            
         }
       }
       }
    
    });



    window.setTimeout("orologio()", 30000);
}

function salva(){
 if(salvare==true){
  let input=document.querySelectorAll("textarea");
  for(ris of input){
      let testo=ris.value;
      let id=ris.dataset.risposta;
      $.ajax({
        url:"/salvaRisposte",
        type:"post",
        data:{id:id,testo:testo},
        success:function(){
            $.ajax({
                url:"/orario",
                type:"get",
                data:{},
                success:function(res){
                    let div=document.querySelector("#salvataggio");
                    div.classList.remove("hidden");
                    let h=res.slice(11,13);
                    let m=res.slice(14,16);
                    
                    let ora = h + ":" + m;
                    document.getElementById("oraSalvataggio").innerText = ora;
                    
                }
            
            });
        }
       
    
    });
  }
  window.setTimeout("salva()",120000);}
}

function salva2(){
    let input=document.querySelectorAll("#risposta");
    $.ajax({
        url:"/orario",
        type:"get",
        data:{},
        error: function(){
            alert("Errore nella connessione al server!");
        }
    
    });
    for(ris of input){
        let testo=ris.value;
        let id=ris.dataset.risposta;
        $.ajax({
          url:"/salvaRisposte",
          type:"post",
          data:{id:id,testo:testo},
          success:function(){
            $.ajax({
                url:"/orario",
                type:"get",
                data:{},
                success:function(res){
                    let div=document.querySelector("#salvataggio");
                    div.classList.remove("hidden");
                    let h=res.slice(11,13);
                    let m=res.slice(14,16);
                    
                    let ora = h + ":" + m;
                    document.getElementById("oraSalvataggio").innerText = ora;
                    
                }
            
            });
          }
      
      });
    }
  }


function salvaChiudi(){
    let input=document.querySelectorAll("textarea");
    for(ris of input){
        let testo=ris.value;
        let id=ris.dataset.risposta;
        ris.disabled=true;
        $.ajax({
          url:"/salvaRisposte",
          type:"post",
          data:{id:id,testo:testo},
         
      
      });
    }
    let b=document.querySelector("#salva");
    b.removeEventListener("click",salva2);
  
  }

function prova(event){
    let b=event.currentTarget;
    let domanda=b.dataset.domanda;
    let db=b.dataset.db;
    let password=b.dataset.passw;
    salva2();
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
function nascondi2(){
  
    let ris=document.querySelector(".ris");
  
    
    ris.classList.add("hidden");
    }

function prova2(event){
    let b=event.currentTarget;
    let db=b.dataset.db;
    let password=b.dataset.passw;
     textarea=document.querySelector("#query");
    let query=textarea.value;
   
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
            let ris=document.querySelector(".ris");
            ris.textContent="";
            textarea.value=" ";
            ris.classList.remove("hidden");
            let p=document.createElement("div");
            p.textContent="Nessun risultato trovato";
            p.classList.add("errore");
            let img=document.createElement("img");
            img.src="../../icone/su.ico";
            img.classList.add("su");
            img.addEventListener("click",nascondi2);
            ris.appendChild(p);
            ris.appendChild(img);
        
          }
          else if(res=="Ok"){
            let ris=document.querySelector(".ris");
            ris.textContent="";
            textarea.value=" ";
            ris.classList.remove("hidden");
            let p=document.createElement("div");
            p.textContent="Query Ok";
            p.classList.add("successo");
            let img=document.createElement("img");
            img.src="../../icone/su.ico";
            img.classList.add("su");
            img.addEventListener("click",nascondi2);
            ris.appendChild(p);
            ris.appendChild(img);
          }else{
          s=res.slice(0,6);
            if(s!="Errore"){
                let r=JSON.parse(res);
                let ris=document.querySelector(".ris");
                
                ris.textContent="";
                textarea.value=" ";
                ris.classList.remove("hidden");
                
                let img=document.createElement("img");
                img.src="../../icone/su.ico";
                img.classList.add("su");
               
                img.addEventListener("click",nascondi2);
                
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
                 ris.appendChild(tab);

                 for(val of r){
                    let tr=document.createElement("tr");
                    for(x of chiavi){
                    let th=document.createElement("th");
                    th.textContent=val[x];
                  
                    tr.appendChild(th);
                    }
                    tab.appendChild(tr);
                    ris.appendChild(tab);
                }

                }
                ris.appendChild(img);
       
                
            }else{
                let ris=document.querySelector(".ris");
                ris.textContent="";
              
                ris.classList.remove("hidden");
                let p=document.createElement("div");
                p.textContent=res;
                p.classList.add("errore");
                let img=document.createElement("img");
                img.src="../../icone/su.ico";
                img.classList.add("su");
              
                img.addEventListener("click",nascondi2);
                ris.appendChild(p);
                ris.appendChild(img);
          
            }
               
            }},
            error: function(){
                alert("Errore nella connessione al server!");
            }

        });
    }
}

function refresh(event){
let bool=confirm("Vuoi resettare il database?");
if(bool==true){
let i=event.currentTarget;
let db=i.dataset.db;
let password=i.dataset.passw;
let inizia=i.dataset.inizia;
$.ajaxSetup({
    headers:{
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$.ajax({
    url:"/refresh",
    type:"post",
    data:{db:db,password:password,inizia:inizia},
    success:function(){
        let cont=document.querySelector(".confermaReset");
        let succ= document.createElement("div");
        succ.classList.add("successo");
        succ.textContent="Database resettato";
        
        cont.appendChild(succ);
        window.setTimeout("nascondi3()",5000);
      

    },
    error: function(){
        alert("Errore nella connessione al server!");
    }
    
});
}
}

function nascondi3(){
    let succ=document.querySelector(".successo");
    succ.classList.add("hidden");
}