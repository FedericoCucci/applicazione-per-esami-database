@extends('layouts.dom')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">

        <div class="card" >
                <div class="card-header" >Credenziali Database</div>

                <div class="card-body" >
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
              
              @foreach($db as $d)
                  <div>Host: {{$d->host}}</div>
                  <div>Nome database: {{$d->nome}}</div>
                  <div>Nome utente: {{$d->nome}}</div>
                  <div>Password: {{$d->password}}</div>
             

              @foreach($es as $object)
             
              <div class="link" >File per dati: <a class="l"  data-id={{$object->id}}> </a></div>
          
      
              <button id="refresh" class="btn btn-primary"  data-db="{{$d->nome}}" data-passw="{{$d->password}}" data-inizia={{$object->file_inizializzazione}}> Reset database</button> <div class="confermaReset"></div>
               
              @endforeach
              @endforeach
              </div>    
        </div>

    <div class="orario"> 
    <span>Ora corrente server: <span id="orologio"></span></span>
    <span id="salvataggio" class="hidden">Ultimo Salvataggio: <span id=oraSalvataggio></span></span>
       @foreach ($es as $object)
   <span id="ora_fine"  data-ora={{$object->ora_fine}} data-fine={{$object->data}}>Ora fine: {{$object->ora_fine}}</span>
    @endforeach
    </div>
     
           
        <div class="card">
                <div class="card-header"><img src="../../icone/lista.ico" class="icona"/>@foreach ($es as $object)
    {{ $object->codice }}</div>
   <h1>{{$object->testo}}</h1>
    @endforeach
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

              @for($i=0;$i<count($dom);$i++)

              <div class="form_risp" >
                            <label for="domanda">{{$i+1}}) {{$dom[$i]->testo }}</label>

                            <div>
                                <textarea id="risposta"  class="form-control @error('codice') is-invalid @enderror"  data-domanda={{$dom[$i]->id}}>
</textarea>
                                @error('risposta')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        @foreach($db as $d)
                     <div class="provaQuery">   <button  class="btn btn-primary prova" data-domanda={{$dom[$i]->id}} data-db="{{$d->nome}}" data-passw="{{$d->password}}"> Prova</button> </div>
 
                     <div class="risultati hidden" data-domanda={{$dom[$i]->id}} >
                   
                
                 
                   </div>
 @endforeach
 
              @endfor

              @foreach($stud as $s)
 
 <div >
     <div id=div_btn2>
         <button type="submit" id="salva" class="btn btn-primary" data-studente={{$s->id}}>
         <img src="../../icone/salva.ico" class="icona"/>
             {{ __('Salva') }} 
         </button>
        
     </div>
 </div>

 @endforeach

 
 

           
        </div>
        
    </div>
    <div class="card">
            <div class="card-header">Query di prova</div>
            <div class="card-body"> 
               <textarea id="query" class="form-control">
                   
                
                
               </textarea>

               @foreach($db as $d)
                     <div class="provaQuery">   <button id="prova2" class="btn btn-primary"  data-db="{{$d->nome}}" data-passw="{{$d->password}}"> Prova</button> </div>
 
                     <div class="ris hidden"  >
                   
                
                 
                   </div>
 @endforeach

            </div>
            
            </div>
</div>
@endsection
