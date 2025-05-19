<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePetsTable extends Migration
{
    public function up()
    {
        Schema::create('pets', function (Blueprint $table) {
            $table->id('id');
            $table->string('nombre');
            $table->enum('tipo', ['perro', 'gato', 'otro']);
            $table->string('raza')->nullable();
            $table->integer('edad');
            $table->decimal('peso', 8, 2);
            $table->date('fecha_nacimiento');
            $table->foreignId('dueno_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pets');
    }
} 