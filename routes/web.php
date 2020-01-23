<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::post('/carica', 'HomeController@carica')->name('carica');
Route::post('/aggiungi','HomeController@aggiungi')->name('aggiungi');
Route::post('/eliminaEsercizio','HomeController@eliminaEsercizio')->name('eliminaEsercizio');
Route::get('/exercise/{id}','ExerciseController@esercizio')->name('exercise');
Route::post('/modifica','ExerciseController@modifica')->name('modifica');
Route::post('/aggiungiDomanda','ExerciseController@aggiungiDomanda')->name('aggiungiDomanda');
Route::post('/caricaDomande', 'ExerciseController@caricaDomande')->name('caricaDomande');
Route::post('/eliminaDomanda', 'ExerciseController@eliminaDomanda')->name('eliminaDomanda');
Route::post('/modificaDomanda','ExerciseController@modificaDomanda')->name('modificaDomanda');
Route::get('/loginStudent', 'StudentController@login')->name('loginStudent');
Route::any('/aggiungiStudente','StudentController@aggiungiStudente')->name('aggiungiStudente');
Route::get('/domande','ExerciseController@domande')->name('domande');

Route::get('/domande/{id}/{matricola}','StudentController@domande')->name('domande');
Route::post('/aggiungiRisposte','StudentController@aggiungiRisposte')->name('aggiungiRisposte');
Route::get('/caricaRisposte','StudentController@caricaRisposte')->name('caricaRisposte');
Route::post('/salvaRisposte','StudentController@salvaRisposte')->name('salvaRisposte');
Route::get('/orario','StudentController@orario')->name('orario');

Route::post('/caricaStudenti', 'ExerciseController@caricaStudenti')->name('caricaStudenti');
Route::get('/studente/{esercizio}/{id}','ExerciseController@studente')->name('studente');
Route::post('/mostraTabelle','ExerciseController@mostraTabelle')->name('mostraTabelle');
Route::get('/tabelle/{db}/{tab}','ExerciseController@tabelle')->name('tabelle');
Route::post('/caricaSchema','ExerciseController@caricaSchema')->name('caricaSchema');
Route::post('/caricaContenuto','ExerciseController@caricaContenuto')->name('caricaContenuto');
Route::post('/aggiungiFile','ExerciseController@aggiungiFile')->name('aggiungiFile');
Route::post('/aggiungiFileInizia','ExerciseController@aggiungiFileInizia')->name('aggiungiFileInizia');
Route::get('/file/{nome}','ExerciseController@apriFile')->name('apriFile');
Route::post('/caricaEsercizio','ExerciseController@caricaEsercizio')->name('caricaEsercizio');
Route::post('/eseguiQuery','ExerciseController@eseguiQuery')->name('eseguiQuery');
Route::post('/refresh','ExerciseController@refresh')->name('refresh');
Route::post('/caricaRispostaCorretta','ExerciseController@caricaRispostaCorretta')->name('caricaRispostaCorretta');
