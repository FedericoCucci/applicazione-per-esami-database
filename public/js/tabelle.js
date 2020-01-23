let h1=document.querySelector("h1");
let nome_db=h1.dataset.db;
let nome_tab=h1.dataset.tab;
let schema=document.querySelector("#schema");
let cont=document.querySelector("#contenuto");
let Attr= new Array();
$.ajaxSetup({
    headers:{
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});


$.ajax({
    url:"/caricaSchema",
    type:"post",
    data:{db:nome_db,tab:nome_tab},

    success:function(res){
        var tab=document.createElement("table");
        let thead=document.createElement("thead");
        let tr=document.createElement("tr");
        let th=document.createElement("th");
        th.textContent="Field";
       
        let th1=document.createElement("th");
        th1.textContent="Type";
       
        let th2=document.createElement("th");
        th2.textContent="Key";
       
        tr.appendChild(th);
        tr.appendChild(th1);
        tr.appendChild(th2);
        thead.appendChild(tr);
        tab.appendChild(thead);
        let r=JSON.parse(res);
        if(r.length!=0){
         
            for(elem of r){
              let tr1=document.createElement("tr");
              let th3=document.createElement("th");
           
              th3.textContent=elem.Field;
              Attr.push(elem.Field);
           
              let th4=document.createElement("th");
              th4.textContent=elem.Type;
             
              let th5=document.createElement("th");
              th5.textContent=elem.Key;
            
              tr1.appendChild(th3);
              tr1.appendChild(th4);
              tr1.appendChild(th5);
              tab.appendChild(tr1);
            }
        }
        
     
      
      schema.appendChild(tab);

      var tab1=document.createElement("table");
      let thead1=document.createElement("thead");
      let tr6=document.createElement("tr");
      for(elem of Attr){
        let th=document.createElement("th");
        th.textContent=elem;
       
        tr6.appendChild(th);
      }
     
      thead1.appendChild(tr6);
      tab1.appendChild(thead1);

      $.ajax({
        url:"/caricaContenuto",
        type:"post",
        data:{db:nome_db,tab:nome_tab},
    
        success:function(res){
          
         let r=JSON.parse(res);
            if(r.length!=0){
               
                for(elem of r){
                    let tr=document.createElement("tr");
                    for(x of Attr){
                    let th=document.createElement("th");
                    th.textContent=elem[x];
                  
                    tr.appendChild(th);
                    }
                    tab1.appendChild(tr);
                  
                }
            }
        
    
    }
    });
    cont.appendChild(tab1);

}
});





