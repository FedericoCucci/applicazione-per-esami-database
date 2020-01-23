@extends('layouts.tab')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">

<h1 data-db={{$db}} data-tab={{$tab}}>{{$tab}}</h1>
     
        <div class="card" >
                <div class="card-header" >Schema</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
              
                 <div id="schema"></div>
               
                 
              
      

              </div>    
        </div>
     

     
        <div class="card">
        
                <div class="card-header" > Contenuto</div>

                <div class="card-body" >
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
              
                
              <div id="contenuto"></div>
      

              </div>    
        </div>


      

           
        </div>
    </div>
</div>
@endsection
