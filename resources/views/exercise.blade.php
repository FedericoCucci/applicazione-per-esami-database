@extends('layouts.es')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
        <h1> @foreach ($esercizi as $object)
    {{ $object->codice }}
@endforeach </h1>
            <div class="card">
                <div class="card-header">Dati</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    @foreach ($esercizi as $elem)
                    <div class="form-group row">
                            <label for="codice" class="col-md-4 col-form-label text-md-right">{{ __('Codice') }}</label>

                            <div class="col-md-6">
                                <input id="codice" type="text" class="form-control @error('codice') is-invalid @enderror" name="codice" value="{{ $elem->codice }}" required autocomplete="codice" autofocus>

                                @error('codice')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="luogo" class="col-md-4 col-form-label text-md-right">{{ __('Luogo') }}</label>

                            <div class="col-md-6">
                                <input id="luogo" type="text" class="form-control @error('luogo') is-invalid @enderror" name="luogo" value="{{ $elem->luogo }}" required autocomplete="luogo" autofocus>

                                @error('luogo')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="testo" class="col-md-4 col-form-label text-md-right">{{ __('Testo') }}</label>

                            <div class="col-md-6">
                                <input id="testo" type="text" class="form-control @error('testo') is-invalid @enderror" name="testo" value="{{ $elem->testo }}" required autocomplete="testo" autofocus>

                                @error('testo')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="data" class="col-md-4 col-form-label text-md-right">{{ __('Data') }}</label>

                            <div class="col-md-6">
                                <input id="data" type="date" class="form-control @error('data') is-invalid @enderror" name="data" value="{{ $elem->data }}" required autocomplete="data" autofocus>

                                @error('data')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="orario" class="col-md-4 col-form-label text-md-right">{{ __('Orario') }}</label>

                            <div class="col-md-6">
                                <input id="orario" type="time" class="form-control @error('orario') is-invalid @enderror" name="orario" value="{{ $elem->orario }}" required autocomplete="orario" autofocus>

                                @error('orario')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="ora_inizio" class="col-md-4 col-form-label text-md-right">{{ __('Ora inizio') }}</label>

                            <div class="col-md-6">
                                <input id="ora_inizio" type="time" class="form-control @error('ora_inizio') is-invalid @enderror" name="ora_inizio" value="{{ $elem->ora_inizio }}" required autocomplete="ora_inizio" autofocus>

                                @error('ora_inizio')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="ora_fine" class="col-md-4 col-form-label text-md-right">{{ __('Ora fine') }}</label>

                            <div class="col-md-6">
                                <input id="ora_fine" type="time" class="form-control @error('ora_fine') is-invalid @enderror" name="ora_fine" value="{{ $elem->ora_fine }}" required autocomplete="ora_fine" autofocus>

                                @error('ora_fine')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                   
                        
                        <div class="form-group row mb-0" >
                            <div class="col-md-6 offset-md-4" id=div_btn>
                                <button type="submit" class="btn btn-primary" id="modifica_esercizio" data-es={{$elem->id}} >
                                <img src="../icone/salva.ico" class="icona"/>
                                    {{ __('Modifica') }} 
                                </button>
                            </div>
                        </div>

                      
                      

                </div>
            </div>


            <div class="card">
            <div class="card-header">  <img src="../icone/domanda.ico" class="icona"/> Domande</div>
            <div class="card-body"> 
               <div id="domande" data-es={{$elem->id}}>
                   
                
                
               </div>
         <div class="cont"></div>
               <div id="form_domanda">
               <div class="form-group row">
                            
                            <div class="col-md-6">
                              <textarea id="domanda" placeholder="Inserisci la domanda..." cols=35></textarea>

                                @error('domanda')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror

                                <textarea id="rispostaCorretta" placeholder="Inserisci la risposta corretta..." cols=35></textarea>

@error('rispostaCorretta')
    <span class="invalid-feedback" role="alert">
        <strong>{{ $message }}</strong>
    </span>
@enderror
                            </div>
                        </div>

                        
                           
                          
                        
                   
                        
                        <div class="form-group row mb-0" >
                            <div class="col-md-6 offset-md-4" id=div_btn_domanda>
                                <button type="submit" class="btn btn-primary" id="aggiungi_domanda" data-es={{$elem->id}} >
                                <img src="../icone/plus.ico" class="icona"/>
                                    {{ __('Aggiungi') }} 
                                </button>
                            </div>
                        </div>
               </div>

            </div>

            </div>

            <div class="card">
            <div class="card-header">Carica file dati</div>
            <div class="card-body"> 
             
       <div class="form-group row">
                        
                            <div class="col-md-6">
                              <input  type="file" id="file" ></input>

                                @error('domanda')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                   
                        
                     
                            <div class="col-md-6 offset-md-4" id=div_btn_file>
                                <button type="submit" class="btn btn-primary" id=caricaFile data-id={{$elem->id}}>
                                <img src="../icone/upload.ico" class="upload"/>
                                    {{ __('Carica') }} 
                                </button>
                            </div>

                            <div class="verificaFile"></div>



                        
            </div>
            
            </div>

            <div class="card">
            <div class="card-header">Carica file inizializzazione</div>
            <div class="card-body"> 
             
       <div class="form-group row">
                        
                            <div class="col-md-6">
                              <input  type="file" id="fileInizia" ></input>

                                @error('domanda')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                   
                        
                     
                            <div class="col-md-6 offset-md-4" id=div_btn_file>
                                <button type="submit" class="btn btn-primary" id=caricaFileInizia data-id={{$elem->id}}>
                                <img src="../icone/upload.ico" class="upload"/>
                                    {{ __('Carica') }} 
                                </button>
                            </div>

                            <div class="verificaFileInizia"></div>



                        
            </div>
            
            </div>

            <div class="card" id="st">
            <div class="card-header">Studenti</div>
            <div class="card-body"> 
               <div id="studenti" data-id={{$elem->id}}>
                   
                
                
               </div>

            </div>
            
            </div>
            @endforeach 

            
        </div>
    </div>
</div>
@endsection
