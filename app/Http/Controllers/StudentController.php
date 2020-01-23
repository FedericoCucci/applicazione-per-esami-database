<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Exercise;
use App\Databs;
use App\Student;
use App\Answer;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

class StudentController extends Controller
{
    public function login()
    {   $errore=false;
        $stringa=" ";
        return view('loginStudent',compact('errore','stringa'));
    }


    public function aggiungiStudente(Request $request){
        $host=$_SERVER['HTTP_HOST'];
        $cont=DB::table('exercises')->where('codice',$request->codice)->get();
        $request->matricola=strtolower($request->matricola);
        if(count($cont)==0){
            $errore=true;
            $stringa="Codice sbagliato!"  ;
            return view('loginStudent',compact('errore','stringa'));

        }
        else{
        foreach($cont as $es){
            $id_es=$es->id;
            $cod=$es->codice;
            $dataIn=$es->data;
            $ora=$es->ora_inizio;
            $fine=$es->ora_fine;
            $fileInizia=$es->file_inizializzazione;
           
        }

        $anno=substr($dataIn,0,4);
        $mese=substr($dataIn,5,2);
        $giorno=substr($dataIn,8,2);
        date_default_timezone_set('Europe/Rome');
        $d=$giorno."-".$mese."-".$anno." ".$ora.":00";
        $f=$giorno."-".$mese."-".$anno." ".$fine.":00";
        $dataInizio=strtotime($d);
        $datacorrente=strtotime("now");
        $dataFine=strtotime($f);}
      
        if($datacorrente<$dataInizio){
            $errore=true;
            $stringa="Esercizio non ancora iniziato! Inizia alle ".$ora  ;
            return view('loginStudent',compact('errore','stringa'));
        }else if($datacorrente>$dataFine){
            $errore=true;
            $stringa="Esercizio finito!";
            return view('loginStudent',compact('errore','stringa'));
        }else{
            $stud=DB::table('students')->where('esercizio',$id_es)->where('matricola',$request->matricola)->get();
            if(count($stud)==0){
       
        $nome_db=$id_es."_".$cod."_".$request->matricola;
            $db=new Databs();
            $db->host=$host;
            $db->nome=$nome_db;
            $db->password=$request->password;
            $db->save();

            $d=DB::table('databs')->where('nome',$nome_db)->get();
            foreach($d as $elem){
                $codice_db=$elem->id;
            }
     

     
            $student=new Student();
            $student->nome=$request->nome;
            $student->cognome=$request->cognome;
            $student->matricola=$request->matricola;
            $student->password=$request->password;
            $student->esercizio=$id_es;
            $student->database=$codice_db;
            $student->save();
            session(["matricola"=> $request->matricola]);
           
            $query = Storage::get($fileInizia);
          DB::statement("CREATE DATABASE ".$nome_db);
         DB::statement("GRANT ALL PRIVILEGES ON ".$nome_db.".* TO '".$nome_db."'@'localhost' IDENTIFIED BY'".$request->password."'");
         $conn=mysqli_connect("localhost","root","",$nome_db);
         mysqli_multi_query($conn,$query);
        
         return redirect('/domande/'.$id_es.'/'.$request->matricola);
           
        } else{
            foreach($stud as $st){
            if($st->password==$request->password){
                session(["matricola"=> $request->matricola]);
                return redirect('/domande/'.$id_es.'/'.$request->matricola);
            } else{
                $errore=true;
                $stringa="Password errata";
                return view('loginStudent',compact('errore','stringa'));
            }
            }
        } 

    }}

    public function domande($p1,$p2){
      
       if(session("matricola")==$p2){
        $es=DB::table('exercises')->where('id',$p1)->get();
        $dom=DB::table('questions')->where('esercizio',$p1)->get();
        $stud=DB::table('students')->where('esercizio',$p1)->where('matricola',$p2)->get();
        foreach($stud as $st){
            $codice_db=$st->database;
        }
        $db=DB::table('databs')->where('id',$codice_db)->get();

        return view('domande',compact('es','dom','stud','db'));}else{
            $errore=true;
            $stringa="Accesso negato";
            return view('loginStudent',compact('errore','stringa'));   }
 
    }

  

    public function aggiungiRisposte(Request $request){
        $answer=new Answer();
        $t=$request->testo;
        if(strlen($t)==0){
            $t=" ";
        }
        $answer->testo=$t;
        $answer->studente=$request->studente;
        $answer->domanda=$request->domanda;
        $answer->save();

       

    }

    public function caricaRisposte(Request $request){
        $cont=DB::table('answers')->where('studente',$request->studente)->get();
        echo($cont);
    }

    public function salvaRisposte(Request $request){
        $t=$request->testo;
        if($t==""){
            $t=" ";
        }
        DB::table('answers')
        ->where('id', $request->id)
        ->update(['testo'=>$t]);
    }

    public function orario(Request $request){
$data=time();
date_default_timezone_set('Europe/Rome');
echo date("d/m/Y H:i:s",$data);


}



}

