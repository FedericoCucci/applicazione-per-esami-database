<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('matricola');
            $table->text('nome');
            $table->text('cognome');
            $table->text('password');
            $table->bigInteger('esercizio')->unsigned();
            $table->bigInteger('database')->unsigned();
            $table->foreign('esercizio')->references('id')->on('exercises');
            $table->foreign('database')->references('id')->on('databs');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
