<?php

namespace App\Http\Controllers;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use App\Exercise;
use App\Question;
use App\Student;
use App\Databs;
use Illuminate\Support\Facades\Storage;
use DB;


class ExerciseController extends Controller
{
    public function esercizio($p1){
        $esercizi=DB::table('exercises')->where('id',$p1)->get();
        return view('exercise',compact('esercizi'));
       
    }

    public function modifica(Request $request){
      
        DB::table('exercises')
            ->where('id', $request->id)
            ->update(['codice'=>$request->codice]);

            DB::table('exercises')
            ->where('id', $request->id)
            ->update(['luogo'=>$request->luogo]);

            DB::table('exercises')
            ->where('id', $request->id)
            ->update(['testo'=>$request->testo]);

            DB::table('exercises')
            ->where('id', $request->id)
            ->update(['orario'=>$request->orario]);

            DB::table('exercises')
            ->where('id', $request->id)
            ->update(['data'=>$request->data_i]);

            DB::table('exercises')
            ->where('id', $request->id)
            ->update(['ora_inizio'=>$request->ora_inizio]);

            DB::table('exercises')
            ->where('id', $request->id)
            ->update(['ora_fine'=>$request->ora_fine]);
    }
 
    public function aggiungiDomanda(Request $request){
       $rispostaCorretta=$request->risp;
       if(strlen($rispostaCorretta)==0){
           $rispostaCorretta=" ";
       }
     $q=new Question();
     $q->testo=$request->testo;
     $q->esercizio=$request->id;
     $q->risposta_corretta=$rispostaCorretta;
     $q->save();
    }

    public function caricaDomande(Request $request){
        $cont=DB::table('questions')->where('esercizio',$request->id)->get();
        echo($cont);
    }

    public function eliminaDomanda(Request $request){
        DB::table('questions')->where('id',$request->id)->delete();
    }

    public function modificaDomanda(Request $request){
        DB::table('questions')
            ->where('id', $request->id)
            ->update(['testo'=>$request->testo]);
    }

    public function caricaStudenti(Request $request){
        $stud=DB::table('students')->where('esercizio',$request->id)->get();
        echo($stud);
    }

    public function aggiungiFile(Request $request){
        DB::table('exercises')
        ->where('id', $request->id)
        ->update(['file'=>$request->nomeFile]);
      Storage::disk('local')->put($request->nomeFile,$request->cont);
    }

    public function aggiungiFileInizia(Request $request){
        DB::table('exercises')
        ->where('id', $request->id)
        ->update(['file_inizializzazione'=>$request->nomeFile]);
      Storage::disk('local')->put($request->nomeFile,$request->cont);
    }



    public function studente($es,$stud){
        $stud=DB::table('students')->where('id',$stud)->get();
        foreach($stud as $s){
            $id_db=$s->database;
        }
       $dom=DB::table('questions')->where('esercizio', $es)->get();
       $db=DB::table('databs')->where('id',$id_db)->get();
       return view('studente',compact('dom','stud','db'));
    }

    public function mostraTabelle(Request $request){
    $nome_db=$request->database;
    $conn=mysqli_connect("localhost","root","",$nome_db);
    $query="SHOW TABLES";
    $res=mysqli_query($conn,$query);

    while($row=mysqli_fetch_assoc($res)){
        $table[]=$row;
        }    

        echo json_encode($table);
        

    }

    public function tabelle($db,$tab){
        return view('tabelle',compact('db','tab'));
    }

    public function caricaSchema(Request $request){
        $nome_db=$request->db;
        $nome_tab=$request->tab;
        $conn=mysqli_connect("localhost","root","",$nome_db);
        $query="DESCRIBE ".$nome_tab;
        $res=mysqli_query($conn,$query);
    
        while($row=mysqli_fetch_assoc($res)){
            $schema[]=$row;
            }    
    
            echo json_encode($schema);
    
        }
    


    public function caricaContenuto(Request $request){
        $nome_db=$request->db;
        $nome_tab=$request->tab;
        $conn=mysqli_connect("localhost","root","",$nome_db);
        $query="SELECT * FROM ".$nome_tab;
        $res=mysqli_query($conn,$query);
    
        while($row=mysqli_fetch_assoc($res)){
            $cont[]=$row;
            }    
    
            echo json_encode($cont);
    
        }

       

        
        
        public function apriFile($p1){
            $contents = Storage::get($p1);
           echo $contents;

   

        }

        public function caricaEsercizio(Request $request){
            $cont=DB::table('exercises')->where('id',$request->id)->get();
            echo($cont);
        }

        public function eseguiQuery(Request $request){
            $nome_db=$request->db;
            $query=$request->q;
            $password=$request->password;
            $q=explode(";",$query);
           
            foreach($q as $t){
                trim($t);
            }
            array_pop($q);
            
            $num=count($q);
         
            
            $conn=mysqli_connect("localhost",$nome_db,$password,$nome_db);
            if($num==1||$num==0){
            $res=mysqli_query($conn,$query) or die("Errore: ".mysqli_error($conn));
       
         if($res===TRUE){
             echo "Ok";
         }else{
            $num_row=mysqli_num_rows($res);
           if($num_row==0){
              echo "Vuoto";
          }
          else{
            while($row=mysqli_fetch_assoc($res)){
                $cont[]=$row;
                }    
        
                echo json_encode($cont);
            
            }
         }} else{
        
            $res=mysqli_multi_query($conn,$query) or die("Errore: ".mysqli_error($conn));
       
            if($res===TRUE){
                echo "Ok";
            }

         }
       
            
    }

    public function refresh(Request $request){
        $nome_db=$request->db;
        $password=$request->password;
        $inizia=$request->inizia;
        $query = Storage::get($inizia);
        
        $conn=mysqli_connect("localhost",$nome_db,$password,$nome_db);
        mysqli_query($conn,"DROP DATABASE ".$nome_db);

        DB::statement("CREATE DATABASE ".$nome_db);
        DB::statement("GRANT ALL PRIVILEGES ON ".$nome_db.".* TO '".$nome_db."'@'localhost' IDENTIFIED BY'".$password."'");
        $conn=mysqli_connect("localhost",$nome_db,$password,$nome_db);
        mysqli_multi_query($conn,$query);
      
        
        
    }

    public function caricaRispostaCorretta(Request $request){
        $cont=DB::table('questions')->where('id',$request->id)->get();  
        foreach($cont as $c){
            $risp=$c->risposta_corretta;
            echo($risp);
        }
    }

}

