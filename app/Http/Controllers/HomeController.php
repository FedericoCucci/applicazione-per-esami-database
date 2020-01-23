<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exercise;
use App\Question;
use App\Databs;
use App\Student;
use App\Answer;
use Auth;
use DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
      
        return view('home');
    }

public function aggiungi(Request $request){
    $ex=new Exercise();
        $ex->user=$request->id;
        $ex->codice=$request->codice;
        $ex->luogo=$request->luogo;
        $ex->testo=$request->testo;
        $ex->data=$request->data_i;
        $ex->orario=$request->orario;
        $ex->ora_inizio=$request->ora_inizio;
        $ex->ora_fine=$request->ora_fine;
        $ex->file=" ";
        $ex->file_inizializzazione=" ";
        $ex->save();

     
}

public function carica(Request $request){
    $cont=DB::table('exercises')->where('user',$request->id)->get();
        echo($cont);
       
} 

public function eliminaEsercizio(Request $request){
 
    DB::table('questions')->where('esercizio',$request->id)->delete();
    DB::table('exercises')->where('id',$request->id)->delete();
    
}

}




