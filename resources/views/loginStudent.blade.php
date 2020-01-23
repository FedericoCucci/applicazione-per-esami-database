@extends('layouts.st')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
     
           
        <div class="card" id="card1">
                <div class="card-header">Login</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <div class="errore">
                    @if($errore==true)
                   {{$stringa}}
                    @endif
                    </div>
                <form name="login" method='post' action='/aggiungiStudente'>
                    <div class="form-group row">
                            <label for="codice" class="col-md-4 col-form-label text-md-right">{{ __('Codice Esercizio') }}</label>

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
                            <label for="nome" class="col-md-4 col-form-label text-md-right">{{ __('Nome') }}</label>

                            <div class="col-md-6">
                                <input id="nome" type="text" class="form-control @error('nome') is-invalid @enderror" name="nome" value="{{ old('nome') }}" required autocomplete="nome" autofocus>

                                @error('nome')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="cognome" class="col-md-4 col-form-label text-md-right">{{ __('Cognome') }}</label>

                            <div class="col-md-6">
                                <input id="cognome" type="text" class="form-control @error('cognome') is-invalid @enderror" name="cognome" value="{{ old('cognome') }}" required autocomplete="cognome" autofocus>

                                @error('cognome')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="matricola" class="col-md-4 col-form-label text-md-right">{{ __('Matricola') }}</label>

                            <div class="col-md-6">
                                <input id="matricola" type="text" class="form-control @error('matricola') is-invalid @enderror" name="matricola" value="{{ old('matricola') }}" required autocomplete="matricola" autofocus>

                                @error('matricola')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>


                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" value="{{ old('password') }}" required autocomplete="password" autofocus>

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                       

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary" id="b" >
                                <img src="../../icone/login.ico" class="icona"/>
                                    {{ __('Login') }} 
                                </button>
                            </div>
                        </div>
                     
</form>
                </div>
            </div>

       
           
        </div>
    </div>
</div>
@endsection
