@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
        <h1> Benvenuto {{Auth::user()->nome}} ! </h1>
           
        <div class="card">
            <div class="card-header">  <img src="icone/lista.ico" class="icona"/> I tuoi esercizi</div>
            <div class="card-body"> 
               <div id="esercizi" data-user={{Auth::user()->id}}>
                   
                
                
               </div>

            </div>
            
            </div>
           
           
           
            <div class="card">
                <div class="card-header">Aggiungi esercizio</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <div class="cont"></div>
                 
                    <div class="form-group row">
                            <label for="codice" class="col-md-4 col-form-label text-md-right">{{ __('Codice') }}</label>

                            <div class="col-md-6">
                                <input id="codice" type="text" class="form-control @error('codice') is-invalid @enderror" name="codice" value="{{ old('codice') }}" required autocomplete="codice" autofocus>

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
                                <input id="luogo" type="text" class="form-control @error('luogo') is-invalid @enderror" name="luogo" value="{{ old('luogo') }}" required autocomplete="luogo" autofocus>

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
                                <input id="testo" type="text" class="form-control @error('testo') is-invalid @enderror" name="testo" value="{{ old('testo') }}" required autocomplete="testo" autofocus>

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
                                <input id="data" type="date" class="form-control @error('data') is-invalid @enderror" name="data" value="{{ old('data') }}" required autocomplete="data" autofocus>

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
                                <input id="orario" type="time" class="form-control @error('orario') is-invalid @enderror" name="orario" value="{{ old('orario') }}" required autocomplete="orario" autofocus>

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
                                <input id="ora_inizio" type="time" class="form-control @error('ora_inizio') is-invalid @enderror" name="ora_inizio" value="{{ old('ora_inizio') }}" required autocomplete="ora_inizio" autofocus>

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
                                <input id="ora_fine" type="time" class="form-control @error('ora_fine') is-invalid @enderror" name="ora_fine" value="{{ old('ora_fine') }}" required autocomplete="ora_fine" autofocus>

                                @error('ora_fine')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary" id="b" data-id={{Auth::user()->id}}>
                                <img src="icone/plus.ico" class="icona"/>
                                    {{ __('Aggiungi') }} 
                                </button>
                            </div>
                        </div>
                      

                </div>
            </div>


           
        </div>
    </div>
</div>
@endsection
