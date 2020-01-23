@extends('layouts.risp')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">

        @foreach($stud as $st)
        <div class="card" >
                <div class="card-header" id="informazioni" data-studente={{$st->id}}>Informazioni studente</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
              
                  <div>Nome: {{$st->nome}}</div>
                  <div>Cognome: {{$st->cognome}}</div>
                  <div>Matricola: {{$st->matricola}}</div>
                  @foreach($db as $d)
                  <div id="databs" data-db={{$d->nome}}>Database: {{$d->nome}}</div>
                  @endforeach
                 
              
      

              </div>    
        </div>
        @endforeach

        <div class="card" >
                <div class="card-header"> <img src="../../icone/lista.ico" class="icona"/> Risposte</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
              
                    @for($i=0;$i<count($dom);$i++)


              <div class="domanda">{{$i+1}}) {{$dom[$i]->testo }}</div>
           
            <textarea id="risposta"  class="form-control @error('codice') is-invalid @enderror"  data-domanda={{$dom[$i]->id}}>
</textarea>
            @foreach($db as $d)
            <div class="provaQuery">   <button  class="btn btn-primary prova" data-domanda={{$dom[$i]->id}} data-db="{{$d->nome}}" data-passw="{{$d->password}}"> Prova</button> <button  class="btn btn-primary risp_corr" data-domanda={{$dom[$i]->id}} data-db="{{$d->nome}}" data-passw="{{$d->password}}"> Risposta Corretta</button></div>
 
                     <div class="risultati hidden" data-domanda={{$dom[$i]->id}} > </div>
                     @endforeach


@endfor

                  

              </div>    
        </div>
        <div class="card">
        
                <div class="card-header" > <img src="../../icone/tabella.ico" class="icona"/> Tabelle</div>

                <div class="card-body" >
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
              
                 <div id="tabella"></div>
              
      

              </div>    
        </div>


      

           
        </div>
    </div>
</div>
@endsection
